// Atlas Mobile: guarda a "casca" do app para abrir sem internet. O canal com o notebook nunca passa por aqui.
// Sempre busca a versão publicada primeiro (furando o cache do GitHub Pages); a cópia guardada só entra sem internet.
// O app compara a cópia que abriu com a publicada para saber se há atualização.
const CACHE = 'atlas-mobile-v2';
const CASCA = ['index.html', 'manifest.webmanifest', 'icone-192.png', 'icone-512.png', 'icone-180.png'];
const base = () => self.registration.scope;
function chaveDe(url) {                       // "./" e "index.html?x" viram a mesma chave
  const u = new URL(url); u.search = ''; u.hash = '';
  if (u.href === base() || u.pathname.endsWith('/')) u.pathname += 'index.html';
  return u.href;
}
async function buscar(chave, fresca) {
  const u = new URL(chave); if (fresca) u.searchParams.set('v', Date.now());
  let r = await fetch(u.href, { cache: fresca ? 'no-store' : 'default' });
  if (r.redirected) r = new Response(await r.blob(), { status: r.status, statusText: r.statusText, headers: r.headers });
  return r;
}
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CASCA.map(a => {
    const k = new URL(a, base()).href;
    return buscar(k, true).then(r => r.ok && c.put(k, r)).catch(() => { });
  }))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || !u.href.startsWith(base())) return;   // ntfy, fontes: direto pela rede
  const chave = chaveDe(u.href);
  const fresca = e.request.mode === 'navigate' || /\.(html|js|json|webmanifest)$/.test(new URL(chave).pathname);
  e.respondWith((async () => {
    try {
      const r = await buscar(chave, fresca);
      if (r.ok) { const c = await caches.open(CACHE); await c.put(chave, r.clone()); }
      return r;
    } catch (x) {
      return (await caches.match(chave)) || (await caches.match(new URL('index.html', base()).href)) || Response.error();
    }
  })());
});
