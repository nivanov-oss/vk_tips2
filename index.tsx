
import React from 'react';
import ReactDOM from 'react-dom/client';
import bridge from '@vkontakte/vk-bridge';
import App from './App';

// Инициализируем мост. Если мы не в ВК, он просто проигнорирует вызов.
try {
  bridge.send('VKWebAppInit').catch(e => console.log('Bridge init failed, likely not in VK', e));
} catch (e) {
  console.error('VK Bridge error', e);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
