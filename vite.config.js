import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/se_project_react/", // Set base for both dev and build
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      overlay: true, // Keep disabled for now
    },
  },
  build: {
    rollupOptions: {
      input: "/src/main.jsx", // Explicit entry point
    },
  },
});
