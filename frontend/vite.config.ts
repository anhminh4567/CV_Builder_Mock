import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3100,
  },
  plugins: [react(), tsconfigPaths()],
});
