import path from "path";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import postcsspxtoviewport8plugin from "postcss-px-to-viewport-8-plugin";
export default (env) => {
  return {
    server: {
      host: true,
      open: true,
      base: "/",
      proxy: {
        "^/api": {
          target: "http://www.google.com",
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/posts/, ''),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve("./src/modules"),
        "#": path.resolve("./src/components"),
        assets: path.resolve("./src/assets"),
        utils: path.resolve("./src/utils"),
      },
      extensions: [".tsx", ".ts", ".js", ".json"],
    },
    Csspxtoviewport: postcsspxtoviewport8plugin({
      unitToConvert: "px",
      viewportWidth: 1366,
      selectorBlackList: ["ignore-"],
      exclude: [/node_modules/],
    }),
    REACT: react(),
    AutoImport: AutoImport({
      include: [/\.[tj]sx?$/, /\.md$/],
      imports: [
        "react",
        "react-router-dom",
        {
          axios: [["default", "axios"]],
        },
      ],
      dirs: ["./src/plugins", "./src/modules/*/store.ts"],
      dts: "./.plugins.d.ts",
      eslintrc: {
        enabled: true,
        filepath: "./.plugins.json",
        globalsPropValue: true,
      },
    }),
  };
};
