import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import typescript2 from "rollup-plugin-typescript2";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    port: 5000,
  },
  plugins: [
    vue(),
    typescript2({
      check: false,
      include: ["src/components/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
        exclude: ["vite.config.ts"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@/": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "./src/TuiGridPlugin.ts",
      formats: ["es", "cjs"],
      name: "Vue3TuiGrid",
      fileName: (format) => (format === "es" ? "index.js" : "index.common.js"),
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
