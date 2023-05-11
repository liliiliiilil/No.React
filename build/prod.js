import gzip from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import merge from "./config";

export default ({ mode }) => {
  const { server, resolve, Csspxtoviewport, REACT, AutoImport } = merge({
    mode,
  });
  return {
    base: "./",
    build: {
      chunkSizeWarningLimit: 100,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          comments: true,
          // manualChunks: (code) => {
          // if (code.includes("react")) {
          //   return "react";
          // }
          // if (code.includes("antd")) {
          //   return "antd";
          // }
          // if (code.includes("lodash")) {
          //   return "lodash";
          // }
          // return "vendor";
          // },
        },
      },
    },
    server,
    resolve,
    plugins: [REACT, AutoImport, gzip(), visualizer({ open: false })],
    css: {
      postcss: {
        plugins: [Csspxtoviewport],
      },
    },
  };
};
