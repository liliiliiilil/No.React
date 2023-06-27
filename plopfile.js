const moduleGenerator = require("./plop-templates/module.js");
const componentGenerator = require("./plop-templates/component.js");
module.exports = (plop) => {
  plop.setGenerator("module", moduleGenerator);
  plop.setGenerator("component", componentGenerator);
};
