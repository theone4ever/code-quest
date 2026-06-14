/* ============================================================
   Python engine — runs the kid's code in the browser via Skulpt
   ============================================================ */

const PyRunner = (() => {
  let editor = null;
  let running = false;

  function createEditor(textarea) {
    editor = CodeMirror.fromTextArea(textarea, {
      mode: "python",
      lineNumbers: true,
      indentUnit: 4,
      viewportMargin: Infinity,
      autofocus: false,
      matchBrackets: true,      // highlights the partner of the bracket at the cursor
      autoCloseBrackets: true,  // auto-inserts the closing ) ] } " '
      styleActiveLine: true,    // softly highlights the line being edited
    });
    return editor;
  }

  function getCode() {
    return editor ? editor.getValue() : "";
  }

  function setCode(code) {
    if (editor) {
      editor.setValue(code);
      editor.refresh();
    }
  }

  function builtinRead(file) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][file] === undefined) {
      throw "File not found: '" + file + "'";
    }
    return Sk.builtinFiles["files"][file];
  }

  function writeOut(consoleEl, text, cls) {
    const span = document.createElement("span");
    if (cls) span.className = cls;
    span.textContent = text;
    consoleEl.appendChild(span);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  // Shows an input box inside the console and resolves with the typed value.
  function askInput(consoleEl, promptText) {
    return new Promise(resolve => {
      if (promptText) writeOut(consoleEl, promptText);
      const row = document.createElement("div");
      row.className = "console-input-row";
      const field = document.createElement("input");
      field.type = "text";
      field.placeholder = "type here + Enter ⏎";
      row.appendChild(field);
      consoleEl.appendChild(row);
      consoleEl.scrollTop = consoleEl.scrollHeight;
      field.focus();
      field.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          const value = field.value;
          row.remove();
          writeOut(consoleEl, value + "\n", "sys");
          Sk.execStart = new Date(); // don't count thinking time against the limit
          resolve(value);
        }
      });
    });
  }

  // Runs code. Returns {ok, output, error}
  async function run(code, consoleEl, turtleWrap) {
    if (running) return { ok: false, output: "", error: "already-running" };
    running = true;

    let captured = "";
    consoleEl.innerHTML = "";
    const usesTurtle = /\bimport\s+turtle\b/.test(code);

    const turtleDiv = document.getElementById("turtle-canvas");
    if (turtleDiv) turtleDiv.innerHTML = "";
    if (turtleWrap) turtleWrap.style.display = usesTurtle ? "flex" : "none";

    Sk.configure({
      output: text => { captured += text; writeOut(consoleEl, text); },
      read: builtinRead,
      inputfun: promptText => askInput(consoleEl, promptText),
      inputfunTakesPrompt: true,
      __future__: Sk.python3,
      execLimit: 15000,
      killableWhile: true,
      killableFor: true,
    });

    if (usesTurtle) {
      Sk.TurtleGraphics = { target: "turtle-canvas", width: 420, height: 320 };
    }

    try {
      await Sk.misceval.asyncToPromise(() =>
        Sk.importMainWithBody("<stdin>", false, code, true)
      );
      running = false;
      return { ok: true, output: captured, error: null };
    } catch (err) {
      running = false;
      const msg = friendlyError(err);
      writeOut(consoleEl, "\n" + msg + "\n", "err");
      return { ok: false, output: captured, error: msg };
    }
  }

  // Turn scary Python tracebacks into kid-friendly messages.
  function friendlyError(err) {
    let raw = err.toString();
    let tip = "";
    if (raw.includes("SyntaxError")) {
      tip = "🦊 Check for a missing colon : , quote \" or bracket — Python is picky about those!";
    } else if (raw.includes("NameError")) {
      tip = "🦊 Python doesn't know that name. Did you spell a variable or function differently than where you created it?";
    } else if (raw.includes("IndentationError") || raw.includes("bad token")) {
      tip = "🦊 Check your spaces! Code inside if / for / def needs exactly 4 spaces at the start.";
    } else if (raw.includes("TypeError")) {
      tip = "🦊 You might be mixing text and numbers. Use int() to turn input text into a number.";
    } else if (raw.includes("IndexError")) {
      tip = "🦊 You asked for a list position that doesn't exist. Remember lists start at 0!";
    } else if (raw.includes("TimeLimitError") || raw.includes("Time limit")) {
      raw = "Your program ran too long — probably a loop that never ends!";
      tip = "🦊 Make sure something inside your while loop changes, so it can finish.";
    }
    return "❌ " + raw + (tip ? "\n" + tip : "");
  }

  return { createEditor, getCode, setCode, run, get editor() { return editor; } };
})();
