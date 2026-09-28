// Service Worker básico para Pico y Placa Colombia (PWA v1)
// Estrategia: Cache-first para assets estáticos + Network-first para HTML.
// Incrementar CACHE_VERSION para forzar invalidación de cache en nueva release.
const CACHE_VERSION = 'ppc-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/ciudades',
  '/bogota',
  '/medellin',
  '/cali',
  '/favicon.svg',
  '/manifest.webmanifest',
  '/robots.txt',
  '/sitemap-index.xml'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Evitar cache de /api/* (siempre network)
  if (url.pathname.startsWith('/api/')) return;

  // Estrategia: Cache-first para assets estáticos (css, js, svg, png, jpg, webp, fonts)
  const staticExt = /\.(css|js|mjs|svg|png|jpe?g|webp|woff2?|ttf|ico|webmanifest)$/i;
  if (staticExt.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((resp) => {
          if (resp && resp.status === 200 && resp.type === 'basic') {
            const clone = resp.clone();
            caches.open(CACHE_VERSION).then((c) => c.put(req, clone)).catch(() => {});
          }
          return resp;
        }).catch(() => cached || caches.match('/'));
      })
    );
    return;
  }

  // HTML: Network-first, fallback cache, fallback offline page simple
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req).then((resp) => {
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, clone)).catch(() => {});
        }
        return resp;
      }).catch(() =>
        caches.match(req).then((cached) => cached || caches.match('/').then((r) => r || new Response('Sin conexión. Intenta de nuevo.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })))
      )
    );
  }
});
