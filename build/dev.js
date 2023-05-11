import merge from "./config";

export default ({ env }) => {
  const { server, resolve, Csspxtoviewport, REACT, AutoImport } = merge({
    env,
  });
  return {
    server,
    resolve,
    plugins: [REACT, AutoImport],
    css: {
      postcss: {
        plugins: [Csspxtoviewport],
      },
    },
  };
};
