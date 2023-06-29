// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";

export default defineConfig({
  build: {
    outDir: "./js",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  plugins: [
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
});
