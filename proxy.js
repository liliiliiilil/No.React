module.exports = (env) => {
  switch (env.proxy) {
    case "dev":
    case "prod":
      return {
        "/api": {
          target: "https://www.baidu.com",
          pathRewrite: { "^/api": "" },
          secure: false, // https
        },
      };
  }
};
