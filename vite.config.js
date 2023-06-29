// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "canvasflow-editor",
      fileName: "canvasflow-editor",
    },
  },
  plugins: [
    dts(),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
});
