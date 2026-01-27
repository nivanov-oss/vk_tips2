
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Базовая ссылка './' гарантирует, что скрипты найдутся даже в подпапке GitHub Pages
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Оптимизация для работы внутри iframe ВК
    target: 'esnext'
  },
  server: {
    port: 3000
  }
});
