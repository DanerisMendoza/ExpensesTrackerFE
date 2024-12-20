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
      "@components": path.resolve(__dirname, "src/components"),
      "@src": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
