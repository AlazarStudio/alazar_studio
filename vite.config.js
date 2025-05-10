import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // 👈 ОБЯЗАТЕЛЬНО, если сайт открывается с корня домена
  plugins: [react()],
})
