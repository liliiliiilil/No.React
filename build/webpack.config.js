const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const openBrowser = require("react-dev-utils/openBrowser");
const proxy = require("../proxy");
module.exports = (env) => {
  return {
    devServer: {
      proxy: proxy(env),
      // port: 3000,
      compress: true,
      open: false,
      onListening: (devServer) => {
        const { port } = devServer.server.address();
        openBrowser(`http://127.0.0.1:${port}`);
      },
      hot: true,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, "../public"),
      },
    },
    stats: {
      moduleAssets: false,
      modules: false,
      builtAt: true,
    },
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(scss|sass|css)$/i,
          use: [
            env.development ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/i,
          type: "asset",
          generator: {
            filename: "static/images/[contenthash:8][ext]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024,
            },
          },
        },
        {
          test: /\.(otf|eot|woff2?|ttf|svg)$/i,
          type: "asset",
          generator: {
            filename: "static/fonts/[hash:8][ext]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024,
            },
          },
        },
        {
          test: /\.(txt|xml)$/i,
          type: "asset",
          generator: {
            filename: "static/file/[contenthash:8][ext]",
          },
        },
        {
          test: /.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: "asset/resource",
          generator: {
            filename: "static/media/[contenthash:8][ext]",
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".scss"],
      alias: {
        "#": path.resolve(__dirname, "../src/components"),
        "@": path.resolve(__dirname, "../src/modules"),
        assets: path.resolve(__dirname, "../src/assets"),
        utils: path.resolve(__dirname, "../src/utils"),
      },
    },
    plugins: [
      require("unplugin-auto-import/webpack")({
        include: [/\.[tj]sx?$/],
        imports: [
          "react",
          "react-router-dom",
          {
            axios: [["default", "axios"]],
          },
        ],
        dirs: ["src/plugins"],
        dts: "./plugins.d.ts",
        eslintrc: {
          enabled: true,
          filepath: "./.plugins.json",
          globalsPropValue: true,
        },
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        minify: {
          collapseWhitespace: true, //去空格
          removeComments: true, // 去注释
        },
      }),
      new MiniCssExtractPlugin({
        filename: "static/style/[contenthash:8].css",
      }),
    ],
  };
};
