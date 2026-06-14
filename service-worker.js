/* ============================================================
   Service worker — makes Aurora's Code Quest work 100% offline.
   Cache-first: once installed, the app never needs the network
   (perfect for travel / blocked or flaky connections).
   Only the AI tutor (Nova) reaches the internet, and its calls
   are cross-origin so they bypass this worker entirely.
   ============================================================ */

const CACHE = "aurora-quest-v5";

const FONTS = Array.from({ length: 22 }, (_, i) => `vendor/font${i + 1}.woff2`);

const PRECACHE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/style.css",
  "js/data.js",
  "js/python.js",
  "js/widgets.js",
  "js/assistant.js",
  "js/app.js",
  "vendor/fonts.css",
  "vendor/codemirror.min.css",
  "vendor/codemirror.min.js",
  "vendor/python.min.js",
  "vendor/matchbrackets.min.js",
  "vendor/closebrackets.min.js",
  "vendor/activeline.min.js",
  "vendor/skulpt.min.js",
  "vendor/skulpt-stdlib.js",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-512-maskable.png",
].concat(FONTS);

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      // ignore individual 404s so one missing file can't break the whole install
      .then(cache => Promise.all(PRECACHE.map(url =>
        cache.add(new Request(url, { cache: "reload" })).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin GETs. Cross-origin (the AI API) passes through.
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;
      return fetch(req).then(resp => {
        // cache successful same-origin responses for next time
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return resp;
      }).catch(() => {
        // offline & not cached: fall back to the app shell for navigations
        if (req.mode === "navigate") return caches.match("index.html", { ignoreSearch: true });
        return Response.error();
      });
    })
  );
});
