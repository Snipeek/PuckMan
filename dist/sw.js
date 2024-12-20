self.addEventListener('fetch', (event) => {
    // Мы хотим применить стратегию SWR только для GET-запросов
    if (event.request.method !== 'GET') return;

    // Используем `respondWith`, чтобы указать, как обработать запрос
    event.respondWith(
        caches.open('dynamic-cache').then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                // В то время как возвращаем кэшированный ответ (если он есть), начинаем получение нового ответа из сети
                const networkFetch = fetch(event.request).then((networkResponse) => {
                    // Когда мы его получили, обновим кэш для будущих запросов
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse; // возвращаем сетевой ответ для тех случаев, когда в кэше ничего не было
                });

                // Возвращаем кэшированный ответ сразу, но обновляем его в фоне
                return cachedResponse || networkFetch;
            });
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
})

self.skipWaiting();