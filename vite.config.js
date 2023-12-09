import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: "dist", // Output directory for the build
    assetsDir: "assets", // Directory for static assets
    sourcemap: true, // Generate source maps
  },
  server: {
    port: 3000, // Specify the port for the development server
  },
});
