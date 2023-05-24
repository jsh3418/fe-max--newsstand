import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@style": path.resolve(__dirname, "./src/style"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});