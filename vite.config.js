import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://task-manager-backend-bay.vercel.app",
  //       changeOrigin: true,
  //     },
  //   },
  // },
  plugins: [react()],
});
