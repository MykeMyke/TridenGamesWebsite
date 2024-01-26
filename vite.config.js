import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import basicSsl from "@vitejs/plugin-basic-ssl";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    chunkSizeWarningLimit: 800,
    outDir: "./build",
  },
  plugins: [react(), basicSsl()],
  optimizeDeps: {
    include: ["@mui/material/Tooltip"], //goddam Popper styled.default is not a function
  },
  server: {
    host: "0.0.0.0",
    port: 443,
  },
  test: {
    environment: "jsdom",
  },
});
