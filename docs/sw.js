const CACHE_NAME = 'static-cache-v1';
const PRECACHE_URLS = [
    '/', // Главная страница
    '/index.html', // Основной HTML файл
    '/styles.css', // Основной CSS файл
    '/script.js', // Основной JS файл
    '/images/logo.png', // Пример изображения
    // Добавьте другие необходимые файлы
];

// Устанавливаем SW и кэшируем все необходимые статические файлы
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_URLS);
        })
    );

    // Следует активировать сразу после установки
    self.skipWaiting();
});

// Активируем новый SW и очищаем старый кэш
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName !== CACHE_NAME;
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).then((networkResponse) => {
                return caches.open('dynamic-cache').then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(() => {
                // Если запрос не прошел (например, когда оффлайн), можно вернуть что-то из кэша
            });
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
