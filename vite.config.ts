import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    alias: {
      components: "/src/components",
      utils: "/src/utils",
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: "src/index.ts",
      name: "@avaya/neo-react",
      fileName: "avaya-neo-react",
    },
  },
});
