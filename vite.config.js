import react from '@vitejs/plugin-react'
import { defineConfig } from "vite";
import path from 'path'

export default defineConfig({
  base: '/PuckMan/',
  plugins: [
    react()
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
