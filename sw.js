/* Flagline service worker: opens the app instantly and keeps it working offline.
   The build stamp below changes whenever the app changes, which creates a fresh
   cache and retires the old one. Nothing here talks to any other website. */
const BUILD = '53224cfa';
const CACHE = 'flagline-' + BUILD;
const CORE = ["./index.html","./manifest.json","./favicon.svg","./apple-touch-icon.png","./icon-192.png"];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // cache: 'reload' skips the browser's own HTTP cache, so a new build never stores stale files
    await Promise.all(CORE.map(async (url) => {
      const res = await fetch(new Request(url, { cache: 'reload' }));
      if (!res.ok) throw new Error(url + ' returned ' + res.status);
      await cache.put(url, res);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('flagline-') && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(req.mode === 'navigate' ? openPage(event) : fromCache(req));
});

// The app is a single page. Show the saved copy straight away and refresh it quietly in the
// background, so an updated index.html is picked up on the next launch.
async function openPage(event) {
  const cache = await caches.open(CACHE);
  const saved = await cache.match('./index.html');
  const refresh = fetch(new Request('./index.html', { cache: 'no-cache' }))
    .then((res) => (res.ok ? cache.put('./index.html', res) : null))
    .catch(() => null);
  if (saved) { event.waitUntil(refresh); return saved; }
  try { return await fetch(event.request); } catch (err) { await refresh; return (await cache.match('./index.html')) || Response.error(); }
}

async function fromCache(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}
