//--------------------------------------------------------------------
// おらがサービスワーカー
//--------------------------------------------------------------------
var cacheName = 'cache1';

// キャッシュ対象
var filesToCache = [
  '/',
  '/index.html',
  '/neko.jpg'
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

  console.log('[ServiceWorker] Fetch', e.request.url);

  e.respondWith(

    caches.match(e.request).then(function(response) 
    {
      if(response) {

        console.log('[ServiceWorker] Match');
        return response;

      } else {
        console.log('[ServiceWorker] Not match');
        return fetch(e.request);
      }
    })
  );
});


