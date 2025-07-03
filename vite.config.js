import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Match your production domain root (https://aaron2320.mooo.com)
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      overlay: true,
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    // Remove the input option unless you need multiple entry points
    // input: { main: 'index.html' } // Uncomment and adjust if needed for multiple entries
  },
});
