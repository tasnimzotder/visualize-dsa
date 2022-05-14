const { resolve } = require('path');
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    base: '/viz-games/',
    rollupOptions: {
      input: {
        main_a: resolve(__dirname, 'index.html'),
        'games/tower-of-hanoi': resolve(
          __dirname,
          'games/tower-of-hanoi/index.html'
        ),
        main_b: resolve(__dirname, 'index.html'),
        'viz/search': resolve(__dirname, 'viz/search/index.html'),
      },
    },
  },
  base: '/',
});
