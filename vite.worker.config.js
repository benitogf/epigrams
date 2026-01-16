import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.browser': true,
  },
  build: {
    outDir: 'docs/static',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/C137/worker.js'),
      name: 'worker',
      formats: ['iife'],
      fileName: () => 'worker.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'stream': 'stream-browserify',
      'events': 'events',
    },
  },
})
