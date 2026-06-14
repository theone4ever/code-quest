/* ============================================================
   Aurora's Code Quest — app shell: state, routing, rendering
   ============================================================ */

/* ---------------- state ---------------- */
const STORE_KEY = "auroraQuest";

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* fresh start */ }
  return { xp: 0, completed: {}, badges: {}, days: [], name: "Aurora", everRan: false };
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function todayKey() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function recordActivity() {
  const t = todayKey();
  if (!state.days.includes(t)) {
    state.days.push(t);
    saveState();
  }
  checkBadges();
}

function currentStreak() {
  const days = new Set(state.days);
  let streak = 0;
  const d = new Date();
  // streak may end today or yesterday (still alive)
  if (!days.has(todayKey())) d.setDate(d.getDate() - 1);
  while (true) {
    const key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    if (days.has(key)) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return streak;
}

function levelFor(xp) {
  let lvl = LEVELS[0], next = null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xp) { lvl = LEVELS[i]; next = LEVELS[i + 1] || null; }
  }
  return { lvl, next };
}

/* ---------------- gamification ---------------- */
function awardXP(amount) {
  state.xp += amount;
  saveState();
  updateHeader();
  const pill = document.getElementById("xp-pill");
  pill.classList.remove("bump");
  void pill.offsetWidth;
  pill.classList.add("bump");
}

function completeLesson(lesson) {
  if (state.completed[lesson.id]) return false;
  state.completed[lesson.id] = true;
  recordActivity();
  awardXP(lesson.xp);
  confettiBurst();
  toast(`+${lesson.xp} XP — ${pick(["Fantastiskt!", "Bra jobbat!", "Amazing work!", "You rock!", "Nova is proud of you!"])} ⭐`);
  checkBadges();
  saveState();
  return true;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function earnBadge(id) {
  if (state.badges[id]) return;
  state.badges[id] = true;
  saveState();
  const b = BADGES.find(x => x.id === id);
  if (b) setTimeout(() => { toast(`Badge earned: ${b.icon} ${b.name}!`); confettiBurst(); }, 900);
}

function checkBadges() {
  WORLDS.forEach(w => {
    if (w.lessons.every(l => state.completed[l.id])) earnBadge(w.id);
  });
  const s = currentStreak();
  if (s >= 3) earnBadge("streak3");
  if (s >= 7) earnBadge("streak7");
  if (ALL_LESSONS.every(l => state.completed[l.id])) earnBadge("champion");
}

/* ---------------- header ---------------- */
function updateHeader() {
  document.getElementById("xp-count").textContent = state.xp;
  document.getElementById("streak-count").textContent = currentStreak();
}

/* ---------------- toast ---------------- */
let toastTimer = null;
function toast(msg) {
  const el = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add("hidden"), 3200);
}

/* ---------------- confetti ---------------- */
function confettiBurst() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth; canvas.height = innerHeight;
  const colors = ["#2bf0a8", "#4cc9ff", "#a78bfa", "#ffd166", "#ff8fd8"];
  const parts = Array.from({ length: 120 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 200,
    y: innerHeight / 3,
    vx: (Math.random() - 0.5) * 11,
    vy: Math.random() * -10 - 3,
    size: Math.random() * 7 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
  }));
  let frame = 0;
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.32; p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    frame++;
    if (frame < 110) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  tick();
}

/* ---------------- stars ---------------- */
function makeStars() {
  const holder = document.getElementById("stars");
  for (let i = 0; i < 90; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const size = Math.random() * 2.4 + 0.6;
    s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}vw;top:${Math.random() * 100}vh;animation-delay:${Math.random() * 3}s;animation-duration:${2 + Math.random() * 4}s`;
    holder.appendChild(s);
  }
}

/* ---------------- challenge checking ---------------- */
function checkChallenge(check, code, output, runOk) {
  if (!runOk) return false;
  if (check.codeAll && !check.codeAll.every(k => code.includes(k))) return false;
  if (check.outputAny && !check.outputAny.some(k => output.includes(k))) return false;
  if (check.outputAll && !check.outputAll.every(k => output.includes(k))) return false;
  if (check.minPrints && (code.match(/print\s*\(/g) || []).length < check.minPrints) return false;
  if (check.minInputs && (code.match(/input\s*\(/g) || []).length < check.minInputs) return false;
  if (check.minVars && (code.match(/^\s*\w+\s*=[^=]/gm) || []).length < check.minVars) return false;
  return true;
}

/* ---------------- router ---------------- */
function route() {
  const hash = location.hash.replace("#", "") || "home";
  const [page, id] = hash.split("/");
  const app = document.getElementById("app");
  app.innerHTML = "";
  window.scrollTo(0, 0);

  document.querySelectorAll(".nav a").forEach(a => {
    a.classList.toggle("active", a.dataset.nav === page);
  });

  if (page === "home") renderHome(app);
  else if (page === "world") renderWorld(app, id);
  else if (page === "lesson") renderLesson(app, id);
  else if (page === "badges") renderBadges(app);
  else if (page === "guide") renderGuide(app);
  else if (page === "certificate") renderCertificate(app);
  else renderHome(app);

  updateHeader();
}

/* ---------------- pages ---------------- */
function worldProgress(w) {
  const done = w.lessons.filter(l => state.completed[l.id]).length;
  return { done, total: w.lessons.length };
}

function worldUnlocked(index) {
  return true; // all worlds open — explore freely, the map shows the suggested order
}

function renderHome(app) {
  const { lvl, next } = levelFor(state.xp);
  const pct = next ? Math.min(100, Math.round(((state.xp - lvl.xp) / (next.xp - lvl.xp)) * 100)) : 100;
  const doneCount = Object.keys(state.completed).length;

  app.innerHTML = `
    <section class="hero">
      <span class="fox">🦊</span>
      <h1>Welcome back, <span class="grad-text">${state.name}</span>!</h1>
      <p class="sub">${doneCount === 0
        ? `I'm Nova, your guide. ${WORLDS.length} worlds of code and AI magic are waiting under the northern lights. Ready?`
        : `You've finished ${doneCount} of ${ALL_LESSONS.length} adventures. The aurora is getting brighter! ✨`}</p>
    </section>
    <div class="progress-banner">
      <span class="level-name">${lvl.icon} Level: ${lvl.name}</span>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <span style="color:var(--text-dim);font-size:0.9rem;white-space:nowrap">${next ? next.xp - state.xp + " XP to " + next.name : "MAX level! 👑"}</span>
    </div>
    <div class="world-grid">
      ${WORLDS.map((w, i) => {
        const p = worldProgress(w);
        const unlocked = worldUnlocked(i);
        const full = p.done === p.total;
        return `
        <a class="world-card" href="#world/${w.id}" style="--wcolor:${w.color}">
          <span class="emoji">${w.emoji}</span>
          <h3>${i + 1}. ${w.name}</h3>
          <div class="tagline">${w.tagline}</div>
          <div class="mini-track"><div class="mini-fill" style="width:${(p.done / p.total) * 100}%"></div></div>
          <div class="meta">
            <span>${p.done} / ${p.total} done</span>
            ${full ? `<span class="done-tag">✔ Complete</span>` : ""}
          </div>
        </a>`;
      }).join("")}
    </div>`;
}

function renderWorld(app, id) {
  const w = WORLDS.find(x => x.id === id);
  if (!w) return renderHome(app);
  const typeLabel = { lesson: "Lesson", quiz: "Quiz", widget: "AI Playground", project: "Project" };
  app.innerHTML = `
    <a class="back-link" href="#home">← Back to the map</a>
    <div class="world-header">
      <span class="emoji">${w.emoji}</span>
      <div><h1 style="color:${w.color}">${w.name}</h1><p>${w.tagline}</p></div>
    </div>
    <div class="lesson-list">
      ${w.lessons.map((l, i) => `
        <a class="lesson-row ${state.completed[l.id] ? "done" : ""}" href="#lesson/${l.id}">
          <span class="check">${state.completed[l.id] ? "✔" : i + 1}</span>
          <span>
            <span class="l-title">${l.title}</span><br>
            <span class="l-type">${typeLabel[l.type] || "Lesson"}</span>
          </span>
          <span class="l-xp">⭐ ${l.xp} XP</span>
        </a>`).join("")}
    </div>`;
}

function renderLesson(app, id) {
  const lesson = ALL_LESSONS.find(l => l.id === id);
  if (!lesson) return renderHome(app);
  const world = WORLDS.find(w => w.id === lesson.world);
  const idx = ALL_LESSONS.indexOf(lesson);
  const prev = ALL_LESSONS[idx - 1], next = ALL_LESSONS[idx + 1];

  app.innerHTML = `
    <div class="lesson-head">
      <div class="crumbs"><a href="#home">Map</a> › <a href="#world/${world.id}">${world.emoji} ${world.name}</a></div>
      <h1>${lesson.title} ${state.completed[lesson.id] ? "✅" : ""}</h1>
    </div>
    <div class="learn-card" id="learn">${lesson.learn || ""}</div>
    <div id="activity"></div>
    <div class="lesson-nav">
      ${prev ? `<a class="btn" href="#lesson/${prev.id}">← ${prev.title}</a>` : `<a class="btn" href="#world/${world.id}">← Back</a>`}
      ${next ? `<a class="btn btn-primary" href="#lesson/${next.id}">Next: ${next.title} →</a>` : `<a class="btn btn-primary" href="#certificate">🎓 Get your certificate!</a>`}
    </div>`;

  const activity = document.getElementById("activity");
  if (lesson.type === "quiz") renderQuiz(activity, lesson);
  else if (lesson.type === "widget") renderWidgetLesson(activity, lesson);
  else renderCodeLesson(activity, lesson);
}

/* ----- coding lesson / project ----- */
function renderCodeLesson(container, lesson) {
  container.innerHTML = `
    <div class="editor-card">
      <div class="editor-toolbar">
        <span class="dot" style="background:#ff6b81"></span>
        <span class="dot" style="background:#ffd166"></span>
        <span class="dot" style="background:#2bf0a8"></span>
        <span class="title">my_program.py</span>
        <button class="btn btn-small" id="reset-btn">↩ Reset code</button>
      </div>
      <textarea id="code-area"></textarea>
      <div class="run-bar">
        <button class="btn btn-run" id="run-btn">▶ RUN</button>
        <span style="color:var(--text-dim);font-size:0.88rem">…then watch the console below</span>
      </div>
      <div class="console" id="console"><span class="sys">The console — your program talks here. Press RUN! 🚀</span></div>
      <div id="turtle-wrap"><div id="turtle-canvas"></div></div>
    </div>
    ${lesson.challenge ? `
    <div class="challenge-card">
      <h3>🏆 Challenge</h3>
      <p>${lesson.challenge.text}</p>
      ${(lesson.challenge.hints || []).map((h, i) =>
        `<details class="hint"><summary>💡 Hint ${i + 1}</summary><p>${h}</p></details>`).join("")}
      <div class="challenge-status ${state.completed[lesson.id] ? "pass" : "wait"}" id="ch-status">
        ${state.completed[lesson.id] ? "✅ Completed! You can still keep playing with the code." : "⏳ Run your code — I'll check it automatically!"}
      </div>
    </div>` : ""}`;

  const ta = document.getElementById("code-area");
  ta.value = lesson.starter || "# Write your code here\n";
  PyRunner.createEditor(ta);

  // "Try it" buttons on example code boxes
  document.querySelectorAll("#learn .codebox").forEach(box => {
    const code = box.textContent;
    const btn = document.createElement("button");
    btn.className = "btn btn-small try-btn";
    btn.textContent = "📋 Try it";
    btn.onclick = () => {
      PyRunner.setCode(code.trim() + "\n");
      document.getElementById("code-area").closest(".editor-card").scrollIntoView({ behavior: "smooth", block: "center" });
    };
    box.appendChild(btn);
  });

  document.getElementById("reset-btn").onclick = () => {
    if (confirm("Put back the starting code? Your changes will be lost.")) {
      PyRunner.setCode(lesson.starter || "");
    }
  };

  const runBtn = document.getElementById("run-btn");
  runBtn.onclick = async () => {
    runBtn.disabled = true;
    runBtn.textContent = "⏳ Running…";
    const code = PyRunner.getCode();
    const result = await PyRunner.run(code, document.getElementById("console"), document.getElementById("turtle-wrap"));
    runBtn.disabled = false;
    runBtn.textContent = "▶ RUN";
    recordActivity();

    if (result.ok && !state.everRan) {
      state.everRan = true;
      saveState();
      earnBadge("first-run");
    }

    if (lesson.challenge && !state.completed[lesson.id]) {
      const status = document.getElementById("ch-status");
      if (checkChallenge(lesson.challenge.check || {}, code, result.output, result.ok)) {
        status.className = "challenge-status pass";
        status.textContent = "✅ Challenge complete! Amazing work!";
        completeLesson(lesson);
      } else if (result.ok) {
        status.className = "challenge-status wait";
        status.textContent = "🔎 It runs! But the challenge isn't quite done — read it again or peek at a hint.";
      }
    }
    updateHeader();
  };
}

/* ----- quiz lesson ----- */
function renderQuiz(container, lesson) {
  let answered = 0, correct = 0;
  container.innerHTML = `
    <div class="panel">
      <p style="margin-top:0">${lesson.intro || ""}</p>
      <div id="quiz-holder"></div>
      <div class="challenge-status wait" id="quiz-status"></div>
    </div>`;
  const holder = container.querySelector("#quiz-holder");

  lesson.quiz.forEach((q, qi) => {
    const div = document.createElement("div");
    div.className = "quiz-q";
    div.innerHTML = `
      <div class="q-text">${qi + 1}. ${q.q}</div>
      <div class="quiz-opts">
        ${q.options.map((o, oi) => `<button class="quiz-opt" data-oi="${oi}">${o}</button>`).join("")}
      </div>
      <p class="quiz-why"></p>`;
    holder.appendChild(div);

    div.querySelectorAll(".quiz-opt").forEach(btn => {
      btn.onclick = () => {
        if (div.dataset.done) return;
        div.dataset.done = "1";
        answered++;
        const oi = Number(btn.dataset.oi);
        const why = div.querySelector(".quiz-why");
        div.querySelectorAll(".quiz-opt")[q.answer].classList.add("correct");
        if (oi === q.answer) { correct++; }
        else btn.classList.add("wrong");
        why.style.display = "block";
        why.innerHTML = (oi === q.answer ? "✅ " : "❌ ") + q.why;

        if (answered === lesson.quiz.length) {
          const status = container.querySelector("#quiz-status");
          status.className = "challenge-status pass";
          status.textContent = `🎉 Quiz done — ${correct} of ${lesson.quiz.length} correct!`;
          recordActivity();
          if (!state.completed[lesson.id]) completeLesson(lesson);
        }
      };
    });
  });
}

/* ----- widget lesson (AI demos) ----- */
function renderWidgetLesson(container, lesson) {
  container.innerHTML = `
    <div id="widget-holder"></div>
    <div class="challenge-status ${state.completed[lesson.id] ? "pass" : "wait"}" id="wstatus" style="margin-bottom:20px">
      ${state.completed[lesson.id] ? "✅ Completed — but you can play as much as you like!" : "🎮 Play with the playground above to complete this lesson!"}
    </div>`;
  const holder = container.querySelector("#widget-holder");
  const init = Widgets[lesson.widget];
  if (init) {
    init(holder, done => {
      if (done && !state.completed[lesson.id]) {
        const st = document.getElementById("wstatus");
        if (st) { st.className = "challenge-status pass"; st.textContent = "✅ Lesson complete — you trained an AI!"; }
        recordActivity();
        completeLesson(lesson);
      }
    });
  }
}

/* ----- badges page ----- */
function renderBadges(app) {
  checkBadges();
  const earned = Object.keys(state.badges).length;
  app.innerHTML = `
    <section class="hero">
      <h1>🏅 Badge Collection</h1>
      <p class="sub">${earned} of ${BADGES.length} collected. Each badge is a story about something you achieved!</p>
    </section>
    <div class="badge-grid">
      ${BADGES.map(b => `
        <div class="badge-card ${state.badges[b.id] ? "earned" : "locked"}">
          <div class="b-icon">${b.icon}</div>
          <h3>${b.name}</h3>
          <p>${b.desc}</p>
        </div>`).join("")}
    </div>`;
}

/* ----- parent guide ----- */
function renderGuide(app) {
  app.innerHTML = `
    <section class="hero"><h1>👨‍👧 Parent's Guide</h1>
    <p class="sub">How to make this summer project a success — for you and Aurora.</p></section>

    <div class="panel">
      <h2>How the app works</h2>
      <p>Aurora's Code Quest is a complete summer curriculum: <b>${WORLDS.length} worlds, ${ALL_LESSONS.length} lessons</b>, picking up exactly where her Hour of Python journey is now (lists &amp; if/else) and ending with hands-on AI literacy and four creative projects. Python runs <b>right in the browser</b> — nothing to install, and nothing she writes ever leaves this computer. Progress, XP, badges and streaks are saved locally in the browser.</p>
      <ul>
        <li><b>Worlds 1–2</b> review and strengthen what she knows (print, variables, input, if/else).</li>
        <li><b>Worlds 3–5</b> add the big three: loops, lists, functions — with turtle art for the creative side.</li>
        <li><b>World 6 — AI Academy</b> teaches how AI actually works: she trains a real classifier, drives a word-predictor (the core idea behind ChatGPT), builds a chatbot in Python, and learns AI safety habits.</li>
        <li><b>World 7 — AI Lab</b> goes deeper with experiments: computer vision with pixels, a decision-tree animal guesser that learns and remembers, a sentiment analyzer she codes herself, and binary search "mind reading".</li>
        <li><b>World 8</b> is four open-ended projects designed to be shown off to the family.</li>
      </ul>
    </div>

    <div class="panel">
      <h2>A rhythm that works</h2>
      <p>Research on kids' coding programs is consistent: <b>short, regular, social</b> beats long and solo.</p>
      <ul>
        <li><b>2–3 sessions a week, 20–40 minutes</b> — about one lesson per session. The whole quest fits perfectly in a Swedish summer break.</li>
        <li><b>Sit nearby for the first lessons of each world</b>, then let her drive. Ask "what do you think happens if…?" rather than giving answers.</li>
        <li><b>Celebrate the projects.</b> Worlds end with things made to be shown — the quiz game wants a contestant, the story generator wants an audience.</li>
        <li><b>Streaks are motivating but forgiving</b> — a missed day just resets the 🔥 counter, never her progress.</li>
      </ul>
    </div>

    <div class="panel">
      <h2>When she's hungry for more</h2>
      <ul class="resource-list">
        <li>🐍 <a href="https://hourofpython.trinket.io" target="_blank" rel="noopener">Hour of Python (Trinket)</a> — finish the original course; this app continues from it.</li>
        <li>🤖 <a href="https://machinelearningforkids.co.uk" target="_blank" rel="noopener">Machine Learning for Kids</a> — train real ML models and use them in Scratch/Python projects.</li>
        <li>📷 <a href="https://teachablemachine.withgoogle.com" target="_blank" rel="noopener">Google Teachable Machine</a> — train an image/sound model with the webcam in minutes. Magical follow-up to the "Teach the Robot" lesson.</li>
        <li>🕹️ <a href="https://codecombat.com" target="_blank" rel="noopener">CodeCombat</a> — learn Python by playing an adventure game (she liked codeSpark, this is the next step up).</li>
        <li>🎓 <a href="https://code.org" target="_blank" rel="noopener">Code.org</a> — huge free catalogue, including AI units for her age group.</li>
        <li>🇸🇪 <a href="https://www.hejdigital.se" target="_blank" rel="noopener">Kodcentrum / local code clubs</a> — Sweden has free coding clubs (kodklubbar) for kids; a social option for autumn.</li>
      </ul>
    </div>

    <div class="panel">
      <h2>🦊 Nova — the AI tutor (optional)</h2>
      <p>There's a floating <b>“Ask Nova”</b> button in the bottom-right corner. Nova is an AI coding buddy who gives Aurora <b>hints and guiding questions</b> (not full answers) when she's stuck — so she stays self-sufficient. Nova always knows which lesson she's on and can look at her current code.</p>
      <p>It's <b>off until you add an API key</b> (click Nova → ⚙️). It works with <b>any OpenAI-compatible provider</b>, so you can switch freely:</p>
      <ul>
        <li><b>Easiest — <a href="https://openrouter.ai/keys" target="_blank" rel="noopener">OpenRouter</a>:</b> one key unlocks hundreds of models. Base URL <code>https://openrouter.ai/api/v1</code>, then pick a model like <code>openai/gpt-4o-mini</code> (cheap), <code>anthropic/claude-3.5-haiku</code>, or <code>google/gemini-flash-1.5</code>.</li>
        <li><b>OpenAI directly:</b> Base URL <code>https://api.openai.com/v1</code>, model <code>gpt-4o-mini</code>.</li>
        <li><b>Free / local:</b> a local Ollama or LM Studio server also works (e.g. <code>http://localhost:11434/v1</code>).</li>
      </ul>
      <p><b>Privacy &amp; safety:</b> the key and chats stay in this browser — nothing is sent anywhere except the AI provider you chose. Nova is instructed to be kid-friendly, stay on coding, give hints rather than answers, and never ask for personal info. A small per-question cost applies on paid providers (a cheap model like gpt-4o-mini is fractions of a cent per question). The <b>🔌 Test</b> button in settings confirms your key works.</p>
    </div>

    <div class="panel">
      <h2>📱 Use it offline / on the iPad (great for travel)</h2>
      <p>This app is fully <b>offline-capable</b> — every part (lessons, Python, AI demos) runs with <b>no internet</b> once installed. Ideal for trips or unreliable networks.</p>
      <p>It's hosted at <a href="https://theone4ever.github.io/code-quest/" target="_blank" rel="noopener"><b>theone4ever.github.io/code-quest</b></a> (GitHub Pages).</p>
      <ol>
        <li>On the iPad, over wifi, open <b>theone4ever.github.io/code-quest</b> in <b>Safari</b>.</li>
        <li>Tap <b>Share → Add to Home Screen</b>, then open it once from the home screen while still online so it finishes caching.</li>
        <li>It now works offline, full-screen, like a real app. Aurora's progress is saved on the iPad.</li>
      </ol>
      <p><b>Do this before travelling.</b> Only Nova (the AI tutor) needs the internet — for China, set it to DeepSeek or Kimi above (they work without a VPN).</p>
    </div>

    <div class="panel">
      <h2>Housekeeping</h2>
      <p>Progress is stored in this browser only. Finishing everything unlocks a printable <a href="#certificate">diploma 🎓</a>.</p>
      <button class="btn" id="rename-btn">✏️ Change player name</button>
      <button class="btn" id="reset-progress" style="border-color:var(--danger);color:var(--danger)">⚠️ Reset all progress</button>
    </div>`;

  document.getElementById("reset-progress").onclick = () => {
    if (confirm("Really delete ALL progress, XP and badges? This cannot be undone!")) {
      localStorage.removeItem(STORE_KEY);
      state = loadState();
      location.hash = "#home";
      route();
    }
  };
  document.getElementById("rename-btn").onclick = () => {
    const n = prompt("Player name:", state.name);
    if (n && n.trim()) { state.name = n.trim(); saveState(); toast("Welcome, " + state.name + "!"); }
  };
}

/* ----- certificate ----- */
function renderCertificate(app) {
  const done = Object.keys(state.completed).length;
  const all = ALL_LESSONS.length;
  const finished = done === all;
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  app.innerHTML = `
    <div class="certificate">
      <div style="font-size:3rem">🌌🦊🌌</div>
      <p style="letter-spacing:3px;color:var(--text-dim)">THE ACADEMY OF NORTHERN LIGHTS</p>
      <h1 class="grad-text">Certificate of Achievement</h1>
      <p>is proudly presented to</p>
      <div class="cert-name">${state.name}</div>
      <p style="max-width:520px;margin:18px auto">
        ${finished
          ? `for completing <b>all ${all} adventures</b> of Aurora's Code Quest — mastering Python programming, training real AI models, and building four original projects.`
          : `progress so far: <b>${done} of ${all}</b> adventures complete. Finish the quest to earn the full diploma!`}
      </p>
      <p style="font-size:1.6rem">${finished ? "👑 Aurora Borealis Champion 👑" : "⭐ Quest in progress ⭐"}</p>
      <p style="color:var(--text-dim)">${today}</p>
    </div>
    <div style="text-align:center">
      ${finished ? `<button class="btn btn-primary" onclick="window.print()">🖨️ Print my diploma</button>` : `<a class="btn btn-primary" href="#home">Back to the quest →</a>`}
    </div>`;
  if (finished) confettiBurst();
}

/* ---------------- boot ---------------- */
window.addEventListener("hashchange", route);
window.addEventListener("load", () => {
  makeStars();
  route();
  updateHeader();
});
