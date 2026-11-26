// Offline cache for Morris演講練習. Change VERSION whenever any file changes.
const VERSION = "v1";
const CACHE = "morris-speech-" + VERSION;
const FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-180.png",
  "audio/treasure-70.mp3", "audio/treasure-85.mp3", "audio/treasure-100.mp3",
  "audio/chair-70.mp3", "audio/chair-85.mp3", "audio/chair-100.mp3"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("morris-speech-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).catch(() => e.request.mode === "navigate" ? caches.match("index.html") : Response.error())));
});
