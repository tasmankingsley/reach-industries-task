import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/reach-industries-task/',
  plugins: [react()],
  build: {
    outDir: 'docs',
  },
})
