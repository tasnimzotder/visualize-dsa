const { resolve } = require('path');
import { defineConfig } from 'vite';

module.exports = {
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'tower-of-hanoi': resolve(__dirname, 'games/tower-of-hanoi/index.html'),
      },
    },
  },
  defineConfig: {
    base: '/viz-games/',
  },
};
