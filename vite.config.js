import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        worker: path.resolve(__dirname, 'src/lib/C137/worker.js'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'worker') {
            return 'static/worker.js'
          }
          return 'assets/[name]-[hash].js'
        },
      },
    },
  },
  server: {
    port: 5173,
  },
})
