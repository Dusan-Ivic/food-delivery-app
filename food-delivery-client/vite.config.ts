import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  preview: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
});
