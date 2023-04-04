import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { params } from "@ampt/sdk";

console.log(params("AMPT_URL"), "params?");

process.env.VITE_AMPT_WS_URL =
  params("AMPT_URL").replace("https", "wss") + "/_ws";

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
