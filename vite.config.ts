import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    // O segredo está aqui: 'true' permite QUALQUER host gerado pela Vercel
    allowedHosts: true
  }
})
