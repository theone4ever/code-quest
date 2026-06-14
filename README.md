# 🌌 Aurora's Code Quest

A gamified summer web app for learning **Python programming and AI**, built for a curious kid
just getting started — picking up where the [Hour of Python](https://hourofpython.trinket.io) journey left off
(lists & if/else) and ending with hands-on AI literacy and creative projects.

## ▶️ How to run it

No installation, no accounts, **no internet needed**. From this folder:

```bash
python3 -m http.server 8000
```

…then open **http://localhost:8000** in any browser. Every asset (the code editor,
the Python engine, the fonts) is bundled in `vendor/` — nothing is fetched from a CDN,
so it works fully offline.

## 📱 Put it on Aurora's iPad (works offline — great for travel)

The app is an installable **PWA**: once loaded once, it caches itself and runs with
**zero network** afterwards — perfect for the China trip / flaky connections.

It's already hosted on **GitHub Pages**:

### 👉 https://theone4ever.github.io/code-quest/

1. **On the iPad, over home wifi**, open that URL in **Safari**.
2. Tap **Share → Add to Home Screen**. An app icon appears.
3. Open it from the home screen **once while still online** so it finishes caching.
4. Done — it now works **offline, full-screen, like a native app**. Her progress saves on the iPad.

*(The service worker that enables offline only installs over HTTPS, which is why it's hosted
rather than opened from a file — a plain `http://` laptop address won't work on iOS.)*

> Do steps 1–4 **before you travel**. After that, the lessons need no connection at all.
> Only the AI tutor (Nova) needs internet — see the in-app **👨‍👧 Parents** tab for a
> China-friendly provider (DeepSeek / Kimi work without a VPN).

## 🗺️ What's inside

| World | Theme | Skills |
|---|---|---|
| ⭐ Starlight Basics | warm-up | print, variables, math, input |
| 🏔️ Decision Peaks | choices | booleans, if/elif/else, and/or + quiz |
| 🌀 Loop Lagoon | repetition | for, while, range, turtle art |
| 📚 List Library | collections | lists, indexes, loops over lists, random |
| 🌲 Function Forest | own commands | def, parameters, return |
| 🤖 AI Academy | AI literacy | trains a real k-NN classifier, drives a next-word predictor (how ChatGPT works), builds a chatbot, AI safety quiz |
| 🧪 AI Lab | AI experiments | robot vision (images = numbers), a decision-tree animal guesser that learns & remembers, code-your-own sentiment analyzer, binary-search mind reader |
| 🎨 Project Studio | creation | 4 open projects: story generator, quiz game, aurora art, book-recommender |

**34 lessons · a full summer at 3 short sessions/week.**

## ✨ Features

- **Real Python in the browser** (Skulpt) — with turtle graphics, `input()`, `random`, kid-friendly error messages, and an infinite-loop guard
- **Gamification**: XP, 7 levels (Spark → Galaxy Master), 11 badges, daily streaks, confetti 🎉
- **Interactive AI playgrounds** — no-code machine learning demos she trains herself
- **📖 Nova's Notebook** — short, fun reads explaining the *why* behind the code (grounded in the AI4K12 "5 Big Ideas in AI" + CS Unplugged), each earning XP toward a Curious Mind badge
- **Auto-checked challenges** with progressive hints in every lesson
- **Parent's guide** (👨‍👧 in the nav) with a suggested rhythm and follow-up resources
- **Printable diploma** when the quest is complete 🎓
- Progress saved locally in the browser (nothing leaves the computer)

## 🔧 Tech

Plain HTML/CSS/JS — no build step, no dependencies fetched at runtime. Skulpt (Python),
CodeMirror (editor) and the fonts are all vendored in `vendor/`. A service worker
(`service-worker.js`) + `manifest.webmanifest` make it an offline-capable, installable PWA.
All lesson content lives in `js/data.js` — easy to add lessons or tweak wording.

**Updating after edits:** bump the `?v=N` query on the assets in `index.html` *and* the
`CACHE` name in `service-worker.js` so the offline cache refreshes on next online load.
