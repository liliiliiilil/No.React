import moduleGenerator from "./plop-templates/module.js";
import componentGenerator from "./plop-templates/component.js";
export default (plop) => {
  plop.setGenerator("module", moduleGenerator);
  plop.setGenerator("component", componentGenerator);
};
