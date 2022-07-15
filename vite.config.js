import { defineConfig } from "vite";
const path = require('path');
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    port: 5000,
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/main.js"),
      name: "Vue3TuiGrid",
      fileName: (format) => `vue3-tui-grid.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
