import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/v3': {
        target: 'https://stageerpapi.ayekart.com',
        changeOrigin: true,
      },
      '/v1': {
        target: 'http://erpstage.ayekart.com:8000',
        changeOrigin: true,
      },
      '/v2': {
        target: 'http://erpstage.ayekart.com:8000',
        changeOrigin: true,
      },
      '/v11': {
        target: 'http://erpstage.ayekart.com:9000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v11/, '/v1'),
      },
      '/v22': {
        target: 'http://erpstage.ayekart.com:9000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v22/, '/v2'),
      },
    },
  },
})
