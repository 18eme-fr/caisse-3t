// Garde l'appli disponible sans réseau.
// La page est toujours demandée au réseau d'abord (version la plus récente),
// la copie locale ne sert que lorsqu'il n'y a pas de connexion.
const CACHE = "caisse-3t-v16";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "logo.png"];

self.addEventListener("install", e => {
  // cache: "reload" contourne le cache HTTP du navigateur, sinon une ancienne page pourrait être recopiée
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});

// Supprime les copies des anciennes versions. Appelé à l'activation et à chaque ouverture,
// car une ancienne version encore en train de terminer peut recréer sa copie juste après.
const cleanup = () => caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))));

self.addEventListener("activate", e => {
  e.waitUntil(cleanup().then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isPage = req.mode === "navigate" || (url.origin === location.origin && /\/(index\.html)?$/.test(url.pathname));

  if (url.pathname.endsWith("/version.json")) return; // toujours le réseau

  if (isPage) {
    e.waitUntil(cleanup());
    e.respondWith(
      fetch(req, { cache: "no-store" })
        .then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put("index.html", res.clone()));
          return res;
        })
        .catch(() => caches.open(CACHE).then(c => c.match("index.html")))
    );
    return;
  }

  // Icônes, logo, polices : copie locale, rafraîchie en arrière-plan
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req, { ignoreSearch: true });
    const fresh = fetch(req).then(res => {
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
      return res;
    }).catch(() => cached);
    return cached || fresh;
  }));
});
