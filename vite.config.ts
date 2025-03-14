import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
   // Load environment variables based on the current mode (development, production, etc.)
   const env = loadEnv(mode, process.cwd())

   return {
     base: env.VITE_BASE_URL || '/', // Use the VITE_BASE_URL environment variable
     plugins: [react()],
     build: {
      outDir: 'build', // Default is 'dist'
    },
     // ...other configurations...
   }
})
