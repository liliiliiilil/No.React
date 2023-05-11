export default {
  description: "创建一个公共组件",
  prompts: [
    {
      type: "input",
      name: "code",
      message: "请输入组件的英文名称",
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/components/{{pascalCase code}}/index.tsx",
      templateFile: "plop-templates/component/index.hbs",
    },
    {
      type: "add",
      path: "src/components/{{pascalCase code}}/style.scss",
      templateFile: "plop-templates/component/style.hbs",
    },
  ],
};
