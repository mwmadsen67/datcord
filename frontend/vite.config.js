import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    define: {
      'process.env': {},
    },
    build: {
      outDir: 'build',
    },
    server: {
      proxy: {
        '/api': {
           target: 'http://localhost:5000',
           changeOrigin: true,
           secure: false,      
           ws: true,
        }
      }
    },
    plugins: [react()],
  };
});