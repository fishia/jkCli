const CACHE_NAME = 'YMTD_CACHE'
const urlsToCache = [
  '/static/imgs/pwa/icon-72x72.png',
  '/static/imgs/pwa//icon-96x96.png',
  '/static/imgs/pwa//icon-128x128.png',
  '/static/imgs/pwa//icon-144x144.png',
  '/static/imgs/pwa//icon-152x152.png',
  '/static/imgs/pwa//icon-192x192.png',
  '/static/imgs/pwa//icon-384x384.png',
  '/static/imgs/pwa//icon-512x512.png',
  '/static/favicon.ico',
]

self.addEventListener('install', event => {
  self.skipWaiting()

  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)))
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(responseCache => {
      const fetchRequest = event.request.clone()
      return fetch(fetchRequest)
        .then(response => {

          // 如果请求失败或非Get请求，则不进行缓存
          // if (!response.ok || event.request.method !== 'GET') {
          //   return response
          // }

          // const responseToCache = response.clone()

          // event.waitUntil(
          //   caches.open(CACHE_NAME).then(cache => {
          //     cache.put(event.request, responseToCache)
          //   })
          // )

          return response
        })
        .catch(err => {
          console.log(err)
          if (responseCache) {
            return responseCache
          }
          return {
            errorCode: 500,
            errorMessage: '服务器开小差了',
            errors: [],
          }
        })
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        )
      )
  )
})
