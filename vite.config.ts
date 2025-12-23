import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "https://app-stg.mealivery.com/",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
  plugins: [
      tailwindcss(),
      react({
      babel: {
        plugins: [
            ['babel-plugin-react-compiler']],
      },
    }),
  ],
})
