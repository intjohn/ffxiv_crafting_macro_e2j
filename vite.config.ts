import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  base: '/ffxiv_crafting_macro_e2j/',
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, 'assets'),
      MuiBarrel: path.resolve(__dirname, 'src/muiBarrel'),
      Util: path.resolve(__dirname, 'src/util'),
    },
  },
});
