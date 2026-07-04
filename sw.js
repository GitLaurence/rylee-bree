/* ══════════════════════════════════════════════════
   Service Worker — Cache-first offline support
   ══════════════════════════════════════════════════ */

const CACHE = 'bedtime-v5';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './css/animations.css',
  './js/sounds.js',
  './js/storyVideo.js',
  './js/app.js',
  './js/games.js',
  './js/timer.js',
  './data/stories.js',
];
const PRECACHE_OPTIONAL = [
  'https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:wght@400;600;700;800&display=swap',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async c => {
      // A single failed request (blocked, offline, transient) makes addAll()
      // reject and abort caching the whole app shell — so the same-origin
      // shell files are cached as a unit...
      await c.addAll(PRECACHE);
      // ...and the cross-origin font CSS is best-effort on top of that.
      await Promise.all(PRECACHE_OPTIONAL.map(url => c.add(url).catch(() => {})));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Video elements issue Range requests for streaming/seeking — caching
  // and replaying partial (206) responses can corrupt playback, so let
  // those go straight to the network.
  if (e.request.headers.has('range')) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone).catch(() => {})).catch(() => {});
        return res;
      }).catch(() => {
        // Offline and not cached — fall back to the app shell for page
        // navigations so the toddler sees the book, not a browser error.
        if (e.request.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
