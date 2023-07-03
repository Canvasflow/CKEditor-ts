// vite.config.js
import { resolve } from "path";
import { defineConfig } from "file:///Users/jjzcru/Workspace/Canvasflow/ckeditor-ts/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/jjzcru/Workspace/Canvasflow/ckeditor-ts/node_modules/vite-plugin-dts/dist/index.mjs";
import { createRequire } from "node:module";
import ckeditor5 from "file:///Users/jjzcru/Workspace/Canvasflow/ckeditor-ts/node_modules/@ckeditor/vite-plugin-ckeditor5/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/jjzcru/Workspace/Canvasflow/ckeditor-ts";
var __vite_injected_original_import_meta_url = "file:///Users/jjzcru/Workspace/Canvasflow/ckeditor-ts/vite.config.js";
var require2 = createRequire(__vite_injected_original_import_meta_url);
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "canvasflow-editor",
      fileName: "canvasflow-editor"
    }
  },
  plugins: [
    dts(),
    ckeditor5({ theme: require2.resolve("@ckeditor/ckeditor5-theme-lark") })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamp6Y3J1L1dvcmtzcGFjZS9DYW52YXNmbG93L2NrZWRpdG9yLXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamp6Y3J1L1dvcmtzcGFjZS9DYW52YXNmbG93L2NrZWRpdG9yLXRzL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qanpjcnUvV29ya3NwYWNlL0NhbnZhc2Zsb3cvY2tlZGl0b3ItdHMvdml0ZS5jb25maWcuanNcIjsvLyB2aXRlLmNvbmZpZy5qc1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5pbXBvcnQgeyBjcmVhdGVSZXF1aXJlIH0gZnJvbSBcIm5vZGU6bW9kdWxlXCI7XG5jb25zdCByZXF1aXJlID0gY3JlYXRlUmVxdWlyZShpbXBvcnQubWV0YS51cmwpO1xuXG5pbXBvcnQgY2tlZGl0b3I1IGZyb20gXCJAY2tlZGl0b3Ivdml0ZS1wbHVnaW4tY2tlZGl0b3I1XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxuICAgICAgbmFtZTogXCJjYW52YXNmbG93LWVkaXRvclwiLFxuICAgICAgZmlsZU5hbWU6IFwiY2FudmFzZmxvdy1lZGl0b3JcIixcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgZHRzKCksXG4gICAgY2tlZGl0b3I1KHsgdGhlbWU6IHJlcXVpcmUucmVzb2x2ZShcIkBja2VkaXRvci9ja2VkaXRvcjUtdGhlbWUtbGFya1wiKSB9KSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsU0FBUyxxQkFBcUI7QUFHOUIsT0FBTyxlQUFlO0FBUHRCLElBQU0sbUNBQW1DO0FBQTJKLElBQU0sMkNBQTJDO0FBS3JQLElBQU1BLFdBQVUsY0FBYyx3Q0FBZTtBQUk3QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osVUFBVSxFQUFFLE9BQU9BLFNBQVEsUUFBUSxnQ0FBZ0MsRUFBRSxDQUFDO0FBQUEsRUFDeEU7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJyZXF1aXJlIl0KfQo=