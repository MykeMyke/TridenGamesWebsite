import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    chunkSizeWarningLimit: 800,
    outDir: "./build",
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["@mui/material/Tooltip"], //goddam Popper styled.default is not a function
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  test: {
    environment: "jsdom",
  },
});
