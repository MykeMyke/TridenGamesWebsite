import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    chunkSizeWarningLimit: 800,
    outDir: './build'
  },
  plugins: [react()],
  server: {
      port: 3000
    },
  test: {
    environment: 'jsdom',
  }
})