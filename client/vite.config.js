import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5174,
    hmr: {
      overlay: true, // Affiche les erreurs HMR dans le navigateur
    },
    watch: {
      usePolling: true, // Utile sur Windows pour détecter les changements
    },
  },
})
