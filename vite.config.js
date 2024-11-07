import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression() // Plugin pour compresser les fichiers (gzip ou brotli)
  ],
  base: './', // Utilisation de chemins relatifs pour faciliter le déploiement
  build: {
    outDir: 'dist', // Nom du dossier de sortie, personnalisable si besoin
    assetsDir: 'assets', // Regroupe les assets pour une structure organisée
    sourcemap: false, // Désactive les sourcemaps en production pour réduire la taille
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',       // Supprime le hash
        chunkFileNames: 'assets/[name].js',       // Supprime le hash
        assetFileNames: 'assets/[name][extname]'  // Supprime le hash
      }
    }
  },
  define: {
    'process.env': process.env
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
});
