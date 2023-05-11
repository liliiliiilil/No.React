export default {
  description: "创建一个模块",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "请输入创建模块的中文名称",
    },
    {
      type: "input",
      name: "code",
      message: "请输入存储模块的文件名称",
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/modules/{{lowerCase code}}/locale/zh_CN.ts",
      templateFile: "plop-templates/module/locale/zh_CN.hbs",
    },
    {
      type: "add",
      path: "src/modules/{{lowerCase code}}/locale/en_US.ts",
      templateFile: "plop-templates/module/locale/en_US.hbs",
    },
    {
      type: "add",
      path: "src/modules/{{lowerCase code}}/views/index.tsx",
      templateFile: "plop-templates/module/views/index.hbs",
    },
    {
      type: "add",
      path: "src/modules/{{lowerCase code}}/views/style.scss",
      templateFile: "plop-templates/module/views/style.hbs",
    },
    {
      type: "add",
      path: "src/modules/{{lowerCase code}}/route.tsx",
      templateFile: "plop-templates/module/route.hbs",
    },
    {
      type: "add",
      path: "src/modules/{{lowerCase code}}/service.ts",
      templateFile: "plop-templates/module/service.hbs",
    },
    {
      type: "add",
      path: "src/modules/{{lowerCase code}}/store.ts",
      templateFile: "plop-templates/module/store.hbs",
    },
  ],
};
