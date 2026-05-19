const CACHE_NAME = 'data-analyst-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/version.json',
  '/data.json',
  '/classworks.json',
];

const FONT_URLS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Try to cache all static assets; don't fail install if some fail
      for (const url of STATIC_ASSETS) {
        try {
          const req = new Request(url, { cache: 'reload' });
          const res = await fetch(req);
          if (res.ok) cache.put(url, res);
        } catch {}
      }
      // Also cache the current page's JS/CSS by intercepting
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // For Google Fonts — cache-first
  if (FONT_URLS.some((f) => url.origin.startsWith(f))) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        try {
          const net = await fetch(event.request);
          if (net.ok && event.request.method === 'GET') {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, net.clone());
          }
          return net;
        } catch {
          const cached = await caches.match(event.request);
          return cached || new Response('', { status: 200, headers: { 'Content-Type': 'font/woff2' } });
        }
      })()
    );
    return;
  }

  // For app assets (JS, CSS, JSON, etc.) — network-first with cache fallback
  if (
    url.origin === self.location.origin &&
    (url.pathname.endsWith('.js') ||
     url.pathname.endsWith('.css') ||
     url.pathname.endsWith('.json') ||
     url.pathname.endsWith('.png') ||
     url.pathname.endsWith('.svg') ||
     url.pathname.endsWith('.ico') ||
     url.pathname.endsWith('.woff2') ||
     url.pathname.match(/^\/assets\//))
  ) {
    event.respondWith(
      (async () => {
        try {
          const net = await fetch(event.request);
          if (net.ok && event.request.method === 'GET') {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, net.clone());
          }
          return net;
        } catch {
          const cached = await caches.match(event.request);
          return cached || new Response('', { status: 200 });
        }
      })()
    );
    return;
  }

  // For navigation requests (HTML pages) — serve cached index.html as app shell
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const net = await fetch(event.request);
          if (net.ok && event.request.method === 'GET') {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, net.clone());
          }
          return net;
        } catch {
          const cached = await caches.match('/index.html');
          return cached || new Response('Offline — please check your connection', { status: 503 });
        }
      })()
    );
    return;
  }

  // Everything else — stale-while-revalidate
  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      const fetchPromise = (async () => {
        try {
          const net = await fetch(event.request);
          if (net.ok && event.request.method === 'GET') {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, net.clone());
          }
          return net;
        } catch {}
        return null;
      })();

      if (cached) {
        fetchPromise.then((fresh) => {
          if (fresh && cached) {
            // Optionally update the page in background
          }
        });
        return cached;
      }

      const fresh = await fetchPromise;
      return fresh || cached || new Response('Offline', { status: 503 });
    })()
  );
});
