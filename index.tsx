
import React from 'react';
import ReactDOM from 'react-dom/client';
import bridge from '@vkontakte/vk-bridge';
import App from './App';

// Безопасная инициализация VK Bridge
const initVK = async () => {
  try {
    await bridge.send('VKWebAppInit');
    console.log('VK Bridge initialized');
  } catch (e) {
    console.log('Running outside of VK or Bridge init failed');
  }
};

initVK();

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
