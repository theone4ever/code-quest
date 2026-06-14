/* ============================================================
   Nova AI Tutor — a friendly in-app coding helper.

   Provider-agnostic: talks to any OpenAI-compatible
   /chat/completions endpoint (OpenRouter, OpenAI, Groq,
   Together, a local Ollama/LM Studio, …). The parent sets
   the API base URL + key + model once in Settings.

   To use Claude models, point the base URL at OpenRouter
   (https://openrouter.ai/api/v1) and pick a model like
   "anthropic/claude-3.5-haiku".
   ============================================================ */

const Assistant = (() => {
  const CFG_KEY = "auroraAssistantCfg";
  const DEFAULTS = {
    baseUrl: "https://openrouter.ai/api/v1",
    apiKey: "",
    model: "openai/gpt-4o-mini",
  };

  let cfg = loadCfg();
  let history = [];        // {role:'user'|'assistant', content}
  let open = false;
  let streaming = false;
  let els = {};            // cached DOM nodes

  function loadCfg() {
    try {
      const raw = localStorage.getItem(CFG_KEY);
      if (raw) return Object.assign({}, DEFAULTS, JSON.parse(raw));
    } catch (e) { /* ignore */ }
    return Object.assign({}, DEFAULTS);
  }
  function saveCfg() { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); }
  function isConfigured() { return cfg.apiKey && cfg.baseUrl && cfg.model; }

  /* ---------- lesson context (so Nova knows where Aurora is) ---------- */
  function currentContext() {
    const hash = location.hash.replace("#", "");
    const [page, id] = hash.split("/");
    if (page !== "lesson" || typeof ALL_LESSONS === "undefined") return null;
    const lesson = ALL_LESSONS.find(l => l.id === id);
    if (!lesson) return null;
    const world = (typeof WORLDS !== "undefined") ? WORLDS.find(w => w.id === lesson.world) : null;
    const learnText = (lesson.learn || "")
      .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 900);
    let code = "";
    try { code = (typeof PyRunner !== "undefined" && PyRunner.editor) ? PyRunner.getCode() : ""; } catch (e) {}
    return {
      title: lesson.title,
      world: world ? world.name : "",
      type: lesson.type,
      learn: learnText,
      challenge: lesson.challenge ? lesson.challenge.text : "",
      code: code,
    };
  }

  function systemPrompt() {
    const ctx = currentContext();
    let p =
`You are Nova, a friendly arctic fox 🦊 — the coding tutor inside "Aurora's Code Quest", a learn-to-code app. You are helping Aurora, a curious kid learning Python and AI for the very first time. She loves tennis 🎾, piano 🎹 and reading 📚.

How you help:
- Be warm, patient and playful. A little emoji is nice; don't overdo it.
- Keep answers SHORT — usually 2 to 5 sentences. Long walls of text lose her.
- Use very simple English and explain one idea at a time. (If she writes in Swedish, reply in Swedish.)
- This is LEARNING, not answer-giving. For challenges and exercises, give a small HINT and ask a guiding question ("What do you think happens if…?"). Do NOT hand over the full solution unless she has really tried and asks directly — and even then, explain every line so she learns.
- When she shows code with a bug, point her to the line and the idea. Don't silently rewrite everything.
- Celebrate progress. If she's stuck or frustrated, be kind and give one tiny next step.
- Stay on Python that runs in this app (print, input, variables, if/elif/else, for/while, range, lists, functions, turtle, random) and gentle, age-appropriate AI concepts.
- If asked about anything unsafe, private, or not kid-appropriate, gently steer back to coding. Never ask for or repeat passwords or personal details.`;

    if (ctx) {
      p += `\n\n--- Where Aurora is right now ---\nWorld: ${ctx.world}\nLesson: ${ctx.title}`;
      if (ctx.learn) p += `\nThe lesson teaches: ${ctx.learn}`;
      if (ctx.challenge) p += `\nThe challenge is: ${ctx.challenge}`;
      if (ctx.code && ctx.code.trim()) p += `\nHer current code in the editor:\n\`\`\`python\n${ctx.code.slice(0, 1500)}\n\`\`\``;
      p += `\nUse this so your help is specific to what she is doing now.`;
    }
    return p;
  }

  /* ---------- networking (OpenAI-compatible, streaming) ---------- */
  async function streamReply(onDelta) {
    const url = cfg.baseUrl.replace(/\/+$/, "") + "/chat/completions";
    const messages = [{ role: "system", content: systemPrompt() }]
      .concat(history.slice(-12));

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + cfg.apiKey,
        // Optional OpenRouter attribution headers (harmless elsewhere):
        "HTTP-Referer": location.origin || "https://aurora.codequest",
        "X-Title": "Aurora's Code Quest",
      },
      body: JSON.stringify({
        model: cfg.model,
        messages,
        stream: true,
        temperature: 0.6,
        max_tokens: 700,
      }),
    });

    if (!resp.ok) {
      let detail = "";
      try { detail = (await resp.json())?.error?.message || ""; } catch (e) {
        try { detail = await resp.text(); } catch (e2) {}
      }
      throw new Error(`HTTP ${resp.status}${detail ? " — " + detail : ""}`);
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();
      for (const line of lines) {
        const t = line.trim();
        if (!t.startsWith("data:")) continue;
        const data = t.slice(5).trim();
        if (data === "[DONE]") return;
        try {
          const json = JSON.parse(data);
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) onDelta(delta);
        } catch (e) { /* skip keep-alives / partials */ }
      }
    }
  }

  /* ---------- tiny safe markdown ---------- */
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function formatMessage(text) {
    const parts = text.split(/```/);
    let html = "";
    parts.forEach((chunk, i) => {
      if (i % 2 === 1) {
        const body = chunk.replace(/^[a-zA-Z]*\n/, "");
        html += `<pre><code>${esc(body.replace(/\n$/, ""))}</code></pre>`;
      } else {
        let s = esc(chunk)
          .replace(/`([^`]+)`/g, "<code>$1</code>")
          .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
          .replace(/\n/g, "<br>");
        html += s;
      }
    });
    return html;
  }

  /* ---------- DOM ---------- */
  function build() {
    const btn = document.createElement("button");
    btn.id = "nova-fab";
    btn.className = "nova-fab";
    btn.title = "Ask Nova for help";
    btn.innerHTML = `<span class="nova-fab-fox">🦊</span><span class="nova-fab-label">Ask&nbsp;Nova</span>`;
    btn.onclick = toggle;
    document.body.appendChild(btn);

    const panel = document.createElement("div");
    panel.id = "nova-panel";
    panel.className = "nova-panel hidden";
    panel.innerHTML = `
      <div class="nova-head">
        <span class="nova-head-title">🦊 Nova <small>your coding buddy</small></span>
        <div class="nova-head-actions">
          <button class="nova-icon" id="nova-new" title="Start a new chat">🧹</button>
          <button class="nova-icon" id="nova-settings" title="Settings">⚙️</button>
          <button class="nova-icon" id="nova-close" title="Close">✕</button>
        </div>
      </div>
      <div class="nova-body" id="nova-body"></div>
      <div class="nova-quick" id="nova-quick"></div>
      <form class="nova-input" id="nova-form">
        <textarea id="nova-text" rows="1" placeholder="Ask Nova anything about your code…"></textarea>
        <button class="nova-send" id="nova-send" type="submit" title="Send">▶</button>
      </form>`;
    document.body.appendChild(panel);

    els = {
      panel,
      body: panel.querySelector("#nova-body"),
      quick: panel.querySelector("#nova-quick"),
      form: panel.querySelector("#nova-form"),
      text: panel.querySelector("#nova-text"),
      send: panel.querySelector("#nova-send"),
    };

    panel.querySelector("#nova-close").onclick = toggle;
    panel.querySelector("#nova-settings").onclick = openSettings;
    panel.querySelector("#nova-new").onclick = newChat;
    els.form.onsubmit = e => { e.preventDefault(); send(els.text.value); };
    els.text.addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(els.text.value); }
    });
    els.text.addEventListener("input", autosize);
  }

  function autosize() {
    els.text.style.height = "auto";
    els.text.style.height = Math.min(els.text.scrollHeight, 120) + "px";
  }

  function toggle() {
    open = !open;
    els.panel.classList.toggle("hidden", !open);
    document.getElementById("nova-fab").classList.toggle("nova-fab-open", open);
    if (open) {
      renderQuick();
      if (!history.length) greet();
      setTimeout(() => els.text.focus(), 50);
    }
  }

  function greet() {
    const ctx = currentContext();
    const where = ctx ? ` I can see you're on <b>${esc(ctx.title)}</b>.` : "";
    addBubble("nova",
      `Hej Aurora! 🦊 I'm Nova.${where} Stuck on something, or want a hint? Just ask — or tap a button below. 🌌`);
  }

  function renderQuick() {
    const ctx = currentContext();
    const chips = [];
    if (ctx && ctx.challenge) chips.push(["😟 I'm stuck", "I'm stuck on this challenge. Can you give me ONE small hint to get unstuck — not the whole answer please?"]);
    if (ctx) chips.push(["🧠 Explain this", "Can you explain this lesson in a simpler way, with one tiny example?"]);
    if (ctx && ctx.type !== "quiz" && ctx.type !== "widget") chips.push(["🔍 Check my code", "__CHECK_CODE__"]);
    chips.push(["💡 Give me an idea", "Give me a fun, simple idea for something I could make with what I'm learning."]);

    els.quick.innerHTML = "";
    chips.forEach(([label, prompt]) => {
      const c = document.createElement("button");
      c.className = "nova-chip";
      c.textContent = label;
      c.onclick = () => send(prompt);
      els.quick.appendChild(c);
    });
  }

  function addBubble(who, html) {
    const b = document.createElement("div");
    b.className = "nova-bubble nova-" + who;
    b.innerHTML = html;
    els.body.appendChild(b);
    els.body.scrollTop = els.body.scrollHeight;
    return b;
  }

  function newChat() {
    history = [];
    els.body.innerHTML = "";
    greet();
  }

  function setBusy(busy) {
    streaming = busy;
    els.send.disabled = busy;
    els.text.disabled = busy;
  }

  async function send(raw) {
    if (streaming) return;
    let text = (raw || "").trim();
    if (!text) return;

    if (!isConfigured()) { openSettings(true); return; }

    // special: attach current code
    if (text === "__CHECK_CODE__") {
      const ctx = currentContext();
      const code = ctx && ctx.code ? ctx.code : "";
      if (!code.trim()) { addBubble("nova", "Write a little code in the editor first, then I'll take a look! 🦊"); return; }
      text = "Here is my code. Can you spot anything to fix or improve? Give me a hint, don't rewrite it all:\n```python\n" + code + "\n```";
      addBubble("user", "🔍 Please check my code");
    } else {
      addBubble("user", esc(text).replace(/\n/g, "<br>"));
    }

    els.text.value = "";
    autosize();
    history.push({ role: "user", content: text });

    const bubble = addBubble("nova", `<span class="nova-typing"><i></i><i></i><i></i></span>`);
    setBusy(true);

    let acc = "";
    try {
      await streamReply(delta => {
        acc += delta;
        bubble.innerHTML = formatMessage(acc);
        els.body.scrollTop = els.body.scrollHeight;
      });
      if (!acc.trim()) bubble.innerHTML = "Hmm, I didn't get a reply. Try asking again? 🦊";
      else history.push({ role: "assistant", content: acc });
    } catch (err) {
      bubble.classList.add("nova-error");
      bubble.innerHTML = errorHelp(err);
    } finally {
      setBusy(false);
      els.text.focus();
    }
  }

  function errorHelp(err) {
    const msg = (err && err.message) ? err.message : String(err);
    let tip = "";
    if (/401|403|invalid|key/i.test(msg)) tip = "The API key looks wrong or expired. A grown-up can fix it in ⚙️ Settings.";
    else if (/429|rate/i.test(msg)) tip = "Too many questions too fast — wait a few seconds and try again.";
    else if (/404|model/i.test(msg)) tip = "That model name might be wrong. Check it in ⚙️ Settings.";
    else if (/Failed to fetch|NetworkError|CORS/i.test(msg)) tip = "I couldn't reach the internet or the API address. Check the connection and the Base URL in ⚙️ Settings.";
    else tip = "Something went wrong reaching the AI. A grown-up can check ⚙️ Settings.";
    return `🦊 Oops! ${tip}<br><small style="opacity:.6">(${esc(msg).slice(0, 160)})</small>`;
  }

  /* ---------- settings modal ---------- */
  function openSettings(firstTime) {
    const wrap = document.createElement("div");
    wrap.className = "nova-modal-wrap";
    wrap.innerHTML = `
      <div class="nova-modal">
        <h3>⚙️ Nova AI Settings</h3>
        ${firstTime ? `<p class="nova-firstrun">👋 To turn on Nova the AI tutor, a grown-up needs to add an API key once. It stays on this computer only.</p>` : ""}
        <div class="nova-presets" id="nv-presets">
          <span class="nova-presets-label">Provider:</span>
          <button class="nova-preset" data-p="openrouter">OpenRouter</button>
          <button class="nova-preset" data-p="deepseek">DeepSeek 🇨🇳</button>
          <button class="nova-preset" data-p="moonshot">Kimi 🇨🇳</button>
          <button class="nova-preset" data-p="openai">OpenAI</button>
        </div>
        <label>API Base URL
          <input id="nv-url" type="text" placeholder="https://openrouter.ai/api/v1" value="${esc(cfg.baseUrl)}">
        </label>
        <label>API Key
          <input id="nv-key" type="password" placeholder="sk-..." value="${esc(cfg.apiKey)}">
        </label>
        <label>Model
          <input id="nv-model" type="text" placeholder="openai/gpt-4o-mini" value="${esc(cfg.model)}">
        </label>
        <p class="nova-hint">Works with any OpenAI-compatible API — tap a <b>Provider</b> above to fill in the address, then paste that provider's key. <b>Outside China</b>, <a href="https://openrouter.ai/keys" target="_blank" rel="noopener">OpenRouter</a> is easiest (one key, hundreds of models). <b>Inside China</b> (no VPN), use <a href="https://platform.deepseek.com" target="_blank" rel="noopener">DeepSeek</a> or <a href="https://platform.moonshot.cn" target="_blank" rel="noopener">Kimi/Moonshot</a> — both reachable without a VPN. The key &amp; chats stay on this device.</p>
        <div class="nova-modal-status" id="nv-status"></div>
        <div class="nova-modal-actions">
          <button class="btn btn-small" id="nv-test">🔌 Test</button>
          <span style="flex:1"></span>
          <button class="btn btn-small" id="nv-cancel">Cancel</button>
          <button class="btn btn-small btn-primary" id="nv-save">Save</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    wrap.addEventListener("click", e => { if (e.target === wrap) wrap.remove(); });

    const get = () => ({
      baseUrl: wrap.querySelector("#nv-url").value.trim(),
      apiKey: wrap.querySelector("#nv-key").value.trim(),
      model: wrap.querySelector("#nv-model").value.trim(),
    });
    const status = wrap.querySelector("#nv-status");

    // Provider quick-fills (base URL + a sensible default model; key stays whatever's typed)
    const PRESETS = {
      openrouter: { url: "https://openrouter.ai/api/v1", model: "openai/gpt-4o-mini" },
      deepseek:   { url: "https://api.deepseek.com/v1",   model: "deepseek-chat" },
      moonshot:   { url: "https://api.moonshot.cn/v1",    model: "moonshot-v1-8k" },
      openai:     { url: "https://api.openai.com/v1",     model: "gpt-4o-mini" },
    };
    wrap.querySelectorAll(".nova-preset").forEach(b => {
      b.onclick = () => {
        const p = PRESETS[b.dataset.p];
        if (!p) return;
        wrap.querySelector("#nv-url").value = p.url;
        wrap.querySelector("#nv-model").value = p.model;
        wrap.querySelectorAll(".nova-preset").forEach(x => x.classList.remove("on"));
        b.classList.add("on");
        status.textContent = "Filled in " + b.textContent.trim() + " — now paste that provider's API key.";
      };
    });

    wrap.querySelector("#nv-cancel").onclick = () => wrap.remove();
    wrap.querySelector("#nv-save").onclick = () => {
      cfg = Object.assign({}, DEFAULTS, get());
      saveCfg();
      wrap.remove();
      if (open) { renderQuick(); }
    };
    wrap.querySelector("#nv-test").onclick = async () => {
      const test = Object.assign({}, DEFAULTS, get());
      if (!test.apiKey || !test.baseUrl || !test.model) { status.textContent = "Fill in all three fields first."; return; }
      status.textContent = "Testing…";
      try {
        const r = await fetch(test.baseUrl.replace(/\/+$/, "") + "/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + test.apiKey },
          body: JSON.stringify({ model: test.model, messages: [{ role: "user", content: "Say hi in 3 words." }], max_tokens: 16 }),
        });
        if (r.ok) { status.innerHTML = "✅ Works! Don't forget to Save."; }
        else {
          let d = ""; try { d = (await r.json())?.error?.message || ""; } catch (e) {}
          status.innerHTML = `❌ HTTP ${r.status}${d ? " — " + esc(d).slice(0, 120) : ""}`;
        }
      } catch (e) {
        status.innerHTML = "❌ " + esc(e.message || String(e)).slice(0, 140);
      }
    };
  }

  function init() {
    build();
  }

  return { init, openSettings };
})();

window.addEventListener("load", () => Assistant.init());
