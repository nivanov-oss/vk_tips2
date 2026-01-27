
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  // Это критически важно: превращаем обращения к process.env в безопасные объекты для браузера
  define: {
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY)
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'esnext'
  }
});
