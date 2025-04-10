import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/se_project_react-main/",
  plugins: [react()],
  server: {
    port: 3000, // Change the port number to 3000
  },
});
