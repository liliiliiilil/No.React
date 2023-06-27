module.exports = {
  plugins: [
    require("postcss-preset-env"),
    {
      "postcss-px-to-viewport": {
        unitToConvert: "px",
        viewportWidth: 1366,
        unitPrecision: 6,
        selectorBlackList: ["ignore-"],
        exclude: [/node_modules/],
      },
    },
  ],
};
