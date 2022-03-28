import { resolve } from "path";
import { defineConfig } from "vite";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({ sassVariables: "src/assets/style/quasar-variables.sass" }),
    Pages({
      nuxtStyle: true,
      dirs: [
        { dir: "src/pages", baseRoute: "" },
        { dir: "src/pages/blank", baseRoute: "" },
      ],
    }),
    Layouts(),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
      "~": resolve(__dirname, "src"),
    },
  },
  // server: {
  //   https: false,
  //   port: 3001,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8600",
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
  define: {
    "process.env": {},
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // reportCompressedSize: true,
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/")) {
            // Set the NPM package
            const modules = ["quasar", "@quasar", "vue", "@vue"];
            const chunk = modules.find((module) => id.includes(`/node_modules/${module}`));
            return chunk ? `vendor-${chunk}` : "vendor";
          }
        },
      },
    },
  },
});
