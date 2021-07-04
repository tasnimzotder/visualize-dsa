const { resolve } = require('path');
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    base: '/viz-games/',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'games/tower-of-hanoi': resolve(
          __dirname,
          'games/tower-of-hanoi/index.html'
        ),
      },
    },
  },
  base: '/viz-games/',
});
