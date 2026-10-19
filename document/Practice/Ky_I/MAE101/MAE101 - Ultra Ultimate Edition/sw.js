const CACHE = "mae101-study-hub-v4";
const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./vendor/mathjax/tex-svg.js",
  "./preview_v2.html",
  "./data/v2/test_20.json",
  "./data/v2/test_20.js",
  "./data/v2/questions_v2.json",
  "./data/v2/questions_v2.js",
  "./data/v2/batches/batch_01.json",
  "./data/v2/progress.json",
  "./data/v2/reclassification.json",
  "./data/v2/answer_conflicts.json",
  "./data/v2/anomalies.json",
  "./data/questions.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) return response;
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      });
    }),
  );
});
