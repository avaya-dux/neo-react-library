import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
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
    // TODO: the css files doesn't seem to usable via the dp, need to figure out why

    // TODO: I'm (Joe) a big confused about how/why we need `rollupOptions`. Should probably do further research.
    // most likely has to do with "library-mode"
    // https://vitejs.dev/config/build-options.html#build-lib
    // https://vitejs.dev/guide/build.html#library-mode
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "react",

          // other "globals" from old lib:
          // "loglevel": "log",
        },
      },
    },
  },
});
