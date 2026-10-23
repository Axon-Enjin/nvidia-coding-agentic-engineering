import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const apiOrigin = "http://127.0.0.1:8000";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { assetsInlineLimit: 0 },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  server: {
    host: "127.0.0.1",
    proxy: {
      "/api": {
        target: apiOrigin,
        changeOrigin: true,
        headers: { Origin: apiOrigin },
      },
    },
  },
});
