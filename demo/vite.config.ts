import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages deploys to /react-glasskit/ subdirectory
  base: '/react-glasskit/',
  resolve: {
    alias: {
      // Let the demo import from the library source directly
      'react-glasskit': path.resolve(__dirname, '../src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
