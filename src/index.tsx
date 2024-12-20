import React from 'react';
import { createRoot } from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Root } from '@/root';

const node = document.getElementById('root');

export const history = createBrowserHistory({ window });

let root = createRoot(node);

root.render(
  <HistoryRouter history={history}>
    <Root />
  </HistoryRouter>
);


if ('serviceWorker' in navigator) {
  // Регистрируем Service Worker
  navigator.serviceWorker.register('/PuckMan/sw.js').then((registration) => {
    // Слушаем появление новой версии
    registration.onupdatefound = () => {
      const newWorker = registration.installing;

      newWorker.onstatechange = () => {
        switch (newWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              // Новая версия активирована, можно уведомить пользователя
              console.log('New content is available; please refresh.');
              // Например, можно предложить пользователю перезагрузить страницу
              // if (confirm('Новая версия доступна. Обновить?')) {
              //
              // }
              window.location.reload();
            } else {
              console.log('Content is cached for offline use.');
            }
            break;
        }
      };
    };
  }).catch((error) => {
    console.error('Error during service worker registration:', error);
  });

  // Отслеживание смены текущего Service Worker
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Controller change detected. Page will reload.');
    window.location.reload();
  });
}
