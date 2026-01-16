
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/wooahhan/', // FIXED: Matches your actual GitHub repo name
  build: {
    outDir: 'dist',
  },
  define: {
    // Prevents "ReferenceError: process is not defined" in browser
    'process.env': {},
  },
});
