/* ============================================================
   Interactive AI demo widgets for the AI Academy world.
   Each init function renders into a container and calls
   onProgress() when Aurora has genuinely played with it.
   ============================================================ */

const Widgets = {

  /* ---------- 1. AI or Not? ---------- */
  "ai-or-not": function (container, onProgress) {
    const items = [
      { thing: "🧮 A calculator app", ai: false, why: "It follows exact fixed rules (2+2 is always 4). No learning involved." },
      { thing: "🎵 Spotify suggesting songs you might like", ai: true, why: "It learned your taste from millions of listening examples." },
      { thing: "🚦 A traffic light changing every 30 seconds", ai: false, why: "It's just a timer — fixed rules, no learning." },
      { thing: "📸 Your phone unlocking when it sees your face", ai: true, why: "It learned what YOUR face looks like from example photos." },
      { thing: "✉️ Email putting junk mail in the spam folder", ai: true, why: "It learned from millions of examples of spam vs real mail." },
      { thing: "⏰ An alarm clock ringing at 07:00", ai: false, why: "A simple rule: when time == 07:00, ring. You could code this today!" },
      { thing: "🗣️ Translating Swedish to English instantly", ai: true, why: "It learned from millions of translated sentences." },
      { thing: "🎮 A chess computer that improves by playing itself", ai: true, why: "It learns from experience — millions of practice games." },
    ];
    let idx = 0, score = 0;

    const stage = document.createElement("div");
    stage.className = "widget-stage";
    container.appendChild(stage);

    function render() {
      if (idx >= items.length) {
        stage.innerHTML = `<h3 style="text-align:center">🎉 You got ${score} of ${items.length}!</h3>
          <p style="text-align:center">Now you know the secret: <b>AI = programs that learn from examples.</b></p>`;
        onProgress(true);
        return;
      }
      const it = items[idx];
      stage.innerHTML = `
        <p style="text-align:center;color:var(--text-dim)">${idx + 1} / ${items.length}</p>
        <h3 style="text-align:center;font-size:1.3rem">${it.thing}</h3>
        <div class="widget-controls" style="justify-content:center;margin-top:14px">
          <button class="btn btn-primary" data-pick="true">🤖 AI (it learns)</button>
          <button class="btn" data-pick="false">⚙️ Not AI (fixed rules)</button>
        </div>
        <p class="quiz-why" id="aion-why" style="display:none;text-align:center"></p>`;
      stage.querySelectorAll("[data-pick]").forEach(btn => {
        btn.onclick = () => {
          const pick = btn.dataset.pick === "true";
          const why = stage.querySelector("#aion-why");
          const right = pick === it.ai;
          if (right) score++;
          why.style.display = "block";
          why.innerHTML = (right ? "✅ <b>Correct!</b> " : "❌ <b>Not quite.</b> ") + it.why +
            ` <br><button class="btn btn-small" style="margin-top:8px" id="aion-next">Next →</button>`;
          stage.querySelectorAll("[data-pick]").forEach(b => b.disabled = true);
          why.querySelector("#aion-next").onclick = () => { idx++; render(); };
        };
      });
    }
    render();
  },

  /* ---------- 2. Teach the Robot (k-nearest-neighbours) ---------- */
  "knn": function (container, onProgress) {
    const stage = document.createElement("div");
    stage.className = "widget-stage";
    stage.innerHTML = `
      <div class="widget-controls">
        <button class="btn btn-small selected" data-mode="apple">Add 🍎</button>
        <button class="btn btn-small" data-mode="banana">Add 🍌</button>
        <button class="btn btn-small" data-mode="ask">Ask the robot ❓</button>
        <button class="btn btn-small" data-mode="clear" style="margin-left:auto">🧹 Clear</button>
      </div>
      <canvas width="560" height="360"></canvas>
      <div class="knn-legend">
        <span>↔️ round … long</span><span>↕️ big … small</span>
        <span id="knn-msg" style="color:var(--green);font-weight:700"></span>
      </div>`;
    container.appendChild(stage);

    const canvas = stage.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const msg = stage.querySelector("#knn-msg");
    let mode = "apple";
    let points = [];   // {x, y, label}
    let asks = 0, adds = 0;
    let lastGuess = null; // {x, y, label, neighbours}

    stage.querySelectorAll("[data-mode]").forEach(btn => {
      btn.onclick = () => {
        if (btn.dataset.mode === "clear") { points = []; lastGuess = null; msg.textContent = ""; draw(); return; }
        mode = btn.dataset.mode;
        stage.querySelectorAll("[data-mode]").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      };
    });

    function canvasPos(e) {
      const r = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - r.left) * (canvas.width / r.width),
        y: (e.clientY - r.top) * (canvas.height / r.height),
      };
    }

    canvas.addEventListener("click", e => {
      const p = canvasPos(e);
      if (mode === "ask") {
        if (points.length < 2) { msg.textContent = "Teach me some fruits first!"; return; }
        const neighbours = [...points]
          .sort((a, b) => dist(a, p) - dist(b, p))
          .slice(0, Math.min(3, points.length));
        const apples = neighbours.filter(n => n.label === "apple").length;
        const label = apples > neighbours.length / 2 ? "apple" : "banana";
        lastGuess = { ...p, label, neighbours };
        msg.textContent = `I think... ${label === "apple" ? "🍎 apple!" : "🍌 banana!"}`;
        asks++;
        if (asks >= 3 && adds >= 4) onProgress(true);
      } else {
        points.push({ ...p, label: mode });
        lastGuess = null;
        msg.textContent = "";
        adds++;
      }
      draw();
    });

    function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

    function draw() {
      ctx.fillStyle = "#0a0f24";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // grid
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      for (let x = 0; x < canvas.width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
      // neighbour lines
      if (lastGuess) {
        ctx.strokeStyle = "rgba(76,201,255,0.7)";
        ctx.lineWidth = 2;
        lastGuess.neighbours.forEach(n => {
          ctx.beginPath(); ctx.moveTo(lastGuess.x, lastGuess.y); ctx.lineTo(n.x, n.y); ctx.stroke();
        });
      }
      ctx.font = "26px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      points.forEach(p => ctx.fillText(p.label === "apple" ? "🍎" : "🍌", p.x, p.y));
      if (lastGuess) {
        ctx.font = "30px serif";
        ctx.fillText(lastGuess.label === "apple" ? "🍎" : "🍌", lastGuess.x, lastGuess.y);
        ctx.strokeStyle = "#2bf0a8";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(lastGuess.x, lastGuess.y, 24, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    draw();
  },

  /* ---------- Robot Eyes: images are just numbers ---------- */
  "pixels": function (container, onProgress) {
    const SIZE = 12;
    let grid = new Array(SIZE * SIZE).fill(0);
    let robotView = false, painting = false, paintCount = 0, sawRobot = false, usedFilter = false;

    const HEART = [
      "000000000000",
      "001100001100",
      "011110011110",
      "111111111111",
      "111111111111",
      "011111111110",
      "001111111100",
      "000111111000",
      "000011110000",
      "000001100000",
      "000000000000",
      "000000000000",
    ].join("").split("").map(Number);

    const stage = document.createElement("div");
    stage.className = "widget-stage";
    stage.innerHTML = `
      <div class="widget-controls">
        <button class="btn btn-small" id="px-robot">🤖 Robot view</button>
        <button class="btn btn-small" id="px-invert">✨ Invert</button>
        <button class="btn btn-small" id="px-heart">❤️ Load heart</button>
        <button class="btn btn-small" id="px-clear" style="margin-left:auto">🧹 Clear</button>
      </div>
      <div class="pixel-grid" id="px-grid"></div>
      <p style="text-align:center;color:var(--text-dim);font-size:0.9rem;margin:10px 0 0" id="px-msg">Drag across the grid to paint! 🖌️</p>`;
    container.appendChild(stage);

    const gridEl = stage.querySelector("#px-grid");
    const msg = stage.querySelector("#px-msg");
    const cells = [];
    for (let i = 0; i < SIZE * SIZE; i++) {
      const c = document.createElement("div");
      c.className = "pixel-cell";
      c.addEventListener("mousedown", e => { e.preventDefault(); painting = true; paint(i); });
      c.addEventListener("mouseenter", () => { if (painting) paint(i); });
      cells.push(c);
      gridEl.appendChild(c);
    }
    window.addEventListener("mouseup", () => { painting = false; });
    // touch support for tablets
    gridEl.addEventListener("touchmove", e => {
      e.preventDefault();
      const t = e.touches[0];
      const el = document.elementFromPoint(t.clientX, t.clientY);
      const idx = cells.indexOf(el);
      if (idx >= 0) paint(idx);
    }, { passive: false });

    function paint(i) {
      grid[i] = 1;
      paintCount++;
      draw();
      maybeDone();
    }

    function draw() {
      cells.forEach((c, i) => {
        c.classList.toggle("on", grid[i] === 1);
        c.classList.toggle("num", robotView);
        c.textContent = robotView ? grid[i] : "";
      });
    }

    function maybeDone() {
      if (paintCount >= 15 && sawRobot && usedFilter) onProgress(true);
    }

    stage.querySelector("#px-robot").onclick = function () {
      robotView = !robotView;
      sawRobot = true;
      this.textContent = robotView ? "🙂 Human view" : "🤖 Robot view";
      msg.textContent = robotView
        ? "THIS is all the computer ever sees — a list of 144 numbers!"
        : "Back to human view. Pretty, right? Same numbers though!";
      draw();
      maybeDone();
    };
    stage.querySelector("#px-invert").onclick = () => {
      grid = grid.map(v => 1 - v);
      usedFilter = true;
      msg.textContent = "Invert = new_pixel is 1 - old_pixel. A photo filter is just MATH! ✨";
      draw();
      maybeDone();
    };
    stage.querySelector("#px-heart").onclick = () => {
      grid = HEART.slice();
      paintCount = Math.max(paintCount, 15);
      msg.textContent = "A heart… or 144 numbers? Both! Try 🤖 Robot view.";
      draw();
      maybeDone();
    };
    stage.querySelector("#px-clear").onclick = () => {
      grid.fill(0);
      msg.textContent = "Blank canvas — paint something!";
      draw();
    };
    draw();
  },

  /* ---------- The Animal Guesser that learns (decision tree) ---------- */
  "animal": function (container, onProgress) {
    const KEY = "auroraAnimalBrain";
    let tree;
    try { tree = JSON.parse(localStorage.getItem(KEY)); } catch (e) { tree = null; }
    if (!tree) tree = { q: "Does it live in water?", yes: { animal: "fish" }, no: { animal: "dog" } };

    let node = tree, parent = null, side = null;
    let taught = 0, rounds = 0;

    const stage = document.createElement("div");
    stage.className = "widget-stage";
    stage.innerHTML = `
      <div id="ag-box"></div>
      <div class="widget-controls" style="margin:12px 0 0">
        <span id="ag-stats" style="color:var(--text-dim);font-size:0.9rem"></span>
        <button class="btn btn-small" id="ag-brain" style="margin-left:auto">🧠 Look inside my brain</button>
      </div>
      <div id="ag-tree" style="display:none"></div>`;
    container.appendChild(stage);

    const box = stage.querySelector("#ag-box");

    function save() { localStorage.setItem(KEY, JSON.stringify(tree)); }
    function countAnimals(n) { return n.animal ? 1 : countAnimals(n.yes) + countAnimals(n.no); }
    function stats() {
      stage.querySelector("#ag-stats").textContent = `🤖 I know ${countAnimals(tree)} animals so far!`;
    }

    function restart() {
      node = tree; parent = null; side = null;
      box.innerHTML = `
        <h3 style="margin:0 0 6px">🤖 Think of an animal…</h3>
        <p style="margin:0 0 12px;color:var(--text-dim)">Got one in your head? I'll guess it with yes/no questions.</p>
        <button class="btn btn-primary" id="ag-go">I'm ready!</button>`;
      box.querySelector("#ag-go").onclick = ask;
      stats();
    }

    function ask() {
      if (node.animal) return guess();
      box.innerHTML = `
        <h3 style="margin:0 0 12px">🤖 ${node.q}</h3>
        <div class="widget-controls">
          <button class="btn btn-primary" id="ag-yes">✅ Yes</button>
          <button class="btn" id="ag-no">❌ No</button>
        </div>`;
      box.querySelector("#ag-yes").onclick = () => { parent = node; side = "yes"; node = node.yes; ask(); };
      box.querySelector("#ag-no").onclick = () => { parent = node; side = "no"; node = node.no; ask(); };
    }

    function guess() {
      box.innerHTML = `
        <h3 style="margin:0 0 12px">🤖 Is it… a <span style="color:var(--green)">${node.animal}</span>?</h3>
        <div class="widget-controls">
          <button class="btn btn-primary" id="ag-right">🎉 YES!</button>
          <button class="btn" id="ag-wrong">😅 Nope</button>
        </div>`;
      box.querySelector("#ag-right").onclick = () => {
        rounds++;
        box.innerHTML = `<h3 style="margin:0">🎉 I WIN! I'm getting smarter every day.</h3>
          <button class="btn btn-primary" style="margin-top:12px" id="ag-again">Play again</button>`;
        box.querySelector("#ag-again").onclick = restart;
        check();
      };
      box.querySelector("#ag-wrong").onclick = teach;
    }

    function teach() {
      const wrong = node.animal;
      box.innerHTML = `
        <h3 style="margin:0 0 6px">😅 You beat me! Teach me, please:</h3>
        <p style="margin:0 0 8px">What was your animal?</p>
        <input class="ag-input" id="ag-animal" placeholder="e.g. penguin">
        <p style="margin:12px 0 8px">Write a yes/no question that is <b>YES for your animal</b> but <b>NO for a ${wrong}</b>:</p>
        <input class="ag-input" id="ag-q" placeholder="e.g. Does it have feathers?">
        <div class="widget-controls" style="margin-top:12px">
          <button class="btn btn-primary" id="ag-save">🧠 Teach me!</button>
        </div>`;
      box.querySelector("#ag-save").onclick = () => {
        const animal = box.querySelector("#ag-animal").value.trim();
        let q = box.querySelector("#ag-q").value.trim();
        if (!animal || !q) return;
        if (!q.endsWith("?")) q += "?";
        const newNode = { q, yes: { animal }, no: { animal: wrong } };
        if (parent) parent[side] = newNode;
        else tree = newNode;
        save();
        taught++; rounds++;
        box.innerHTML = `<h3 style="margin:0">🧠✨ Got it! I will NEVER mix up a ${animal} and a ${wrong} again. Try me!</h3>
          <button class="btn btn-primary" style="margin-top:12px" id="ag-again">Play again</button>`;
        box.querySelector("#ag-again").onclick = restart;
        stats();
        renderTree();
        check();
      };
    }

    function check() { if (taught >= 1 && rounds >= 2) onProgress(true); }

    function renderTree() {
      const el = stage.querySelector("#ag-tree");
      function html(n) {
        if (n.animal) return `<li class="bt-leaf">🐾 ${n.animal}</li>`;
        return `<li><span class="bt-q">❓ ${n.q}</span>
          <ul><li><b>yes →</b><ul>${html(n.yes)}</ul></li><li><b>no →</b><ul>${html(n.no)}</ul></li></ul></li>`;
      }
      el.innerHTML = `<ul class="brain-tree">${html(tree)}</ul>`;
    }

    stage.querySelector("#ag-brain").onclick = function () {
      const el = stage.querySelector("#ag-tree");
      const show = el.style.display === "none";
      el.style.display = show ? "block" : "none";
      this.textContent = show ? "🙈 Hide my brain" : "🧠 Look inside my brain";
      if (show) renderTree();
    };

    restart();
  },

  /* ---------- 3. The Word Wizard (bigram next-word predictor) ---------- */
  "ngram": function (container, onProgress) {
    const sample =
`Nova the fox lives in the snowy forest. Nova the fox loves to play in the snow. The snow is cold but the fox is warm. Aurora plays tennis in the summer. Aurora plays piano in the winter. The summer is sunny and the winter is snowy. Aurora reads a book about a fox. The book about the fox is funny.`;

    const stage = document.createElement("div");
    stage.className = "widget-stage";
    stage.innerHTML = `
      <p style="margin-top:0"><b>1. Training text</b> (edit it — make it about anything you like!)</p>
      <textarea id="ng-text"></textarea>
      <div class="widget-controls" style="margin-top:10px">
        <button class="btn btn-primary" id="ng-learn">🧠 Learn!</button>
        <span id="ng-stats" style="color:var(--text-dim);font-size:0.9rem"></span>
      </div>
      <div id="ng-play" style="display:none">
        <p><b>2. Now write like an AI</b> — tap a word to add it, watch what it suggests next:</p>
        <div class="story-out" id="ng-story"><i style="color:var(--text-dim)">tap a word below to start…</i></div>
        <div class="word-chips" id="ng-chips"></div>
        <div class="widget-controls" style="margin-top:10px">
          <button class="btn btn-small" id="ng-reset">🔄 Start a new sentence</button>
          <button class="btn btn-small" id="ng-auto">🤖 Auto-write 10 words</button>
        </div>
      </div>`;
    container.appendChild(stage);

    const textEl = stage.querySelector("#ng-text");
    textEl.value = sample;
    let model = null;      // word -> {nextWord: count}
    let starts = [];
    let sentence = [];
    let taps = 0;

    function tokenize(text) {
      return text.toLowerCase().replace(/[^a-zåäöé\s.!?']/gi, "").split(/\s+/).filter(Boolean);
    }

    stage.querySelector("#ng-learn").onclick = () => {
      const words = tokenize(textEl.value);
      if (words.length < 10) { alert("Give the wizard a bit more text to learn from! (at least 10 words)"); return; }
      model = {};
      starts = [];
      for (let i = 0; i < words.length - 1; i++) {
        const w = words[i].replace(/[.!?]$/, "");
        const isEnd = /[.!?]$/.test(words[i]);
        const next = words[i + 1].replace(/[.!?]$/, "");
        if (isEnd) { starts.push(next); continue; }
        if (!model[w]) model[w] = {};
        model[w][next] = (model[w][next] || 0) + 1;
      }
      starts.push(words[0].replace(/[.!?]$/, ""));
      stage.querySelector("#ng-stats").textContent =
        `Learned from ${words.length} words — the wizard now knows what follows ${Object.keys(model).length} different words!`;
      stage.querySelector("#ng-play").style.display = "block";
      sentence = [];
      renderChips();
      renderStory();
    };

    function suggestions() {
      const last = sentence[sentence.length - 1];
      let pool;
      if (!last || !model[last]) {
        pool = {};
        starts.forEach(s => pool[s] = (pool[s] || 0) + 1);
      } else {
        pool = model[last];
      }
      return Object.entries(pool).sort((a, b) => b[1] - a[1]).slice(0, 5);
    }

    function renderStory() {
      const el = stage.querySelector("#ng-story");
      el.innerHTML = sentence.length
        ? sentence.join(" ")
        : `<i style="color:var(--text-dim)">tap a word below to start…</i>`;
    }

    function renderChips() {
      const chipsEl = stage.querySelector("#ng-chips");
      chipsEl.innerHTML = "";
      suggestions().forEach(([word, count]) => {
        const chip = document.createElement("button");
        chip.className = "word-chip";
        chip.textContent = word + (count > 1 ? ` ×${count}` : "");
        chip.onclick = () => {
          sentence.push(word);
          taps++;
          if (taps >= 8) onProgress(true);
          renderStory(); renderChips();
        };
        chipsEl.appendChild(chip);
      });
    }

    stage.querySelector("#ng-reset").onclick = () => { sentence = []; renderStory(); renderChips(); };
    stage.querySelector("#ng-auto").onclick = () => {
      for (let i = 0; i < 10; i++) {
        const sug = suggestions();
        if (!sug.length) break;
        // weighted random pick — a tiny taste of "temperature"
        const total = sug.reduce((s, [, c]) => s + c, 0);
        let r = Math.random() * total;
        let pick = sug[0][0];
        for (const [w, c] of sug) { r -= c; if (r <= 0) { pick = w; break; } }
        sentence.push(pick);
      }
      taps += 4;
      if (taps >= 8) onProgress(true);
      renderStory(); renderChips();
    };
  },
};
