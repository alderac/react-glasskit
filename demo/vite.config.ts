import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages deploys to /react-glasskit/ subdirectory
  base: '/react-glasskit/',
  resolve: {
    alias: {
      // Let the demo import from the library source directly
      'react-glasskit': path.resolve(import.meta.dirname, '../src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
