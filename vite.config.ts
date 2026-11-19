import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '127.0.0.1',   // dev (npm run dev): IPv4, чтобы localhost не упирался в ::1
    port: 5173,
    strictPort: true,    // не «перепрыгивать» на другой порт при занятости
    // Прокси к backend-сервису: относительный '/api' во время разработки
    // направляется на map-service__backend (порт 3000).
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '127.0.0.1',   // preview (npm run preview): та же причина
    port: 4173,
    strictPort: true,
  },
})