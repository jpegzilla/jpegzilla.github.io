const FILES_TO_CACHE = [
  "./",
  "./works",
  "./blog",
  "./favicon.ico",
  "./manifest.json",
  "./browserconfig.xml",
  "./index.html",
  "./404.html",
  "./css/main.min.css",
  "./css/error.min.css",
  "./js/main.js",
  "./js/utils.js",
  "./js/scroll.min.js"
];

const JPEGZILLA_VERSION = "5v002.7";
const CACHE_NAME = "jpegzilla_5v002.7";
const cacheWhitelist = [CACHE_NAME];

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log("[ServiceWorker] Pre-caching offline page");
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
        caches.keys().then(keyList => {
          return Promise.all(
            keyList.map(key => {
              if (cacheWhitelist.indexOf(key) === -1) {
                console.log("[ServiceWorker] removing old key in cache: ", key);
                return caches.delete(key);
              }
            })
          );
        });
      })
  );
});

// self.addEventListener("fetch", event => {
//   if (event.request.method !== "GET") {
//     console.log("[ServiceWorker] fetch event ignored - not a get request");
//     return;
//   }
//
//   const fromNetwork = resp => {
//     let cacheCopy = resp.clone();
//     console.log("[ServiceWorker] response from network: ", event.request.url);
//
//     caches
//       .open(JPEGZILLA_VERSION + "_pages")
//       .then(cache => {
//         cache.put(event.request, cacheCopy);
//       })
//       .then(() => {
//         console.log(
//           "[ServiceWorker] fetch response stored in cache:",
//           event.request.url
//         );
//       });
//   };
//
//   event.respondWith(
//     caches.match(event.request).then(cached => {
//       let networked = fetch(event.request).then(fromNetwork);
//
//       console.log(
//         "[ServiceWorker] fetch event",
//         cached ? "(cached)" : "(network)",
//         event.request.url
//       );
//
//       return cached || networked;
//     })
//   );
// });
