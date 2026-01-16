
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/woo-ah-han/', // Set this to your repository name to fix path issues on GitHub Pages
  build: {
    outDir: 'dist',
  },
});
