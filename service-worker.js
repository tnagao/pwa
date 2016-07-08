//--------------------------------------------------------------------
// おらがサービスワーカー
//--------------------------------------------------------------------
var cacheName = 'cache1';

// キャッシュ対象
var filesToCache = [
  '/pwa/',
  '/pwa/index.html',
  '/pwa/neko.jpg'
];

//--------------------------------------------------------------------
// サービスワーカーのインストール ==> キャッシュ対象をローカルに保存
//--------------------------------------------------------------------
self.addEventListener('install', function(e) {

  console.log('[ServiceWorker] Install');

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {

      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

//--------------------------------------------------------------------
// リクエストを傍受 ==> キャッシュ対象はキャッシュで応答
//--------------------------------------------------------------------
self.addEventListener('fetch', function(e) {

  e.respondWith(

    caches.match(e.request).then(function(response) 
    {
      if(response) {

        console.log('[ServiceWorker] Match', e.request.url);
        return response;

      } else {
        console.log('[ServiceWorker] Not match', e.request.url);
        return fetch(e.request);
      }
    })
  );
});


