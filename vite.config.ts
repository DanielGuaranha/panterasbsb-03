import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    host: true, 
    port: 3000,
    // Adicione esta linha para corrigir o erro:
    allowedHosts: ['sb-25gwbhq0xro5.vercel.run'] 
  }
})
