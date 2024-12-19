import { defineConfig } from 'vite';
import path from "path";
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "/"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@src": path.resolve(__dirname, "src"), 
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
})
