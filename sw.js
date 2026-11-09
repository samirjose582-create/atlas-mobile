// Atlas Mobile: guarda a "casca" do app para abrir na hora (e sem internet). O canal com o notebook nunca passa por aqui.
const CACHE = 'atlas-mobile-v1';
const CASCA = ['./', 'index.html', 'manifest.webmanifest', 'icone-192.png', 'icone-512.png', 'icone-180.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CASCA)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;       // ntfy, fontes: direto pela rede
  // rede primeiro (pega versões novas), cache se estiver sem internet
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
