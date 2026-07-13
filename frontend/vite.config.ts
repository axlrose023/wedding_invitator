import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev: Vite serves the SPA and proxies /api to the FastAPI app on :8000.
// Prod: `npm run build` -> dist/, which FastAPI serves as static files.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8000",
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
