/**
 * MAD101 STUDIO — SERVICE WORKER (OFFLINE PWA)
 * sw.js
 */

const CACHE_NAME = 'mad101-studio-v2.1';

const STATIC_ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'ui/tokens.css',
  'ui/base.css',
  'ui/components.css',
  'vendor/mathjax/tex-svg.js',
  'questions_data.js',
  'v2/questions_v2.js',
  'data/v2/questions_v2.js',
  'app.bundle.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching static app shell...');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Pre-caching non-fatal warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Cache-first for vendor files (MathJax, fonts, images)
  if (url.pathname.includes('/vendor/') || url.pathname.endsWith('.png') || url.pathname.endsWith('.webp')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => cachedResponse);
      })
    );
    return;
  }

  // Stale-while-revalidate for HTML, CSS, JS
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch((err) => {
        // Network failed, return cached response if present
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
