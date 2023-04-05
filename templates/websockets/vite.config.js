import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { params } from "@ampt/sdk";

// If on older version of @ampt/sdk - AMPT_WS_URL will not be available.
process.env.VITE_AMPT_WS_URL =
  params("AMPT_WS_URL") || params("AMPT_URL").replace("https", "wss") + "/_ws";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "static",
  },
  server: {
    open: true,
    port: process.env.PORT || 3000,
  },
});
