import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api/":{
        target:"http://localhost:4030"
        // target:"https://mern-b5-ecom.vercel.app/"
      }
    }
  }
})
