/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// public/ = páginas HTML antiguas (se copian tal cual a la raíz de dist/).
// app/index.html = app React, servida en /app/ (dist/app/index.html).
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'app/assets',
    rollupOptions: { input: { app: 'app/index.html' } },
  },
  test: {
    include: ['app/src/**/*.test.ts'],
    environment: 'node',
    env: { TZ: 'America/Caracas' },
  },
})
