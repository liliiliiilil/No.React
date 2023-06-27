import { RouteObject } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";

// #初始化路由
const routes: Array<RouteObject & { routeType: string }> = [];

// #加载静态路由
const community = require.context("../community", true, /route\.tsx$/);
// 收集静态路由
community.keys().forEach((l) => {
  const rs = community(l).default as RouteObject[];
  rs.forEach((_) => {
    routes.push(Object.assign(_, { routeType: "community" }));
  });
});

// #初始化模块按钮权限 Map
const manipulate = new Map();

export const handleMultipleWay = () => {
  const menu = rt(cloneDeep(resp), manipulate);
  return Promise.resolve([menu, manipulate, routes]);
};

const rt: HANDLEMENU = (x, manipulate) => {
  return x.filter((v) => {
    // 根据 code 来获取路由菜单
    if (v.code) {
      // 收集 模块按钮 权限
      manipulate.set(v.code, new Set(v.operate));
      // 收集 路由表
      routes.unshift({
        path: v.path,
        element: v.element,
        routeType: "module",
        children: v.children
          ? v.children.map(({ path, element }) => ({
              path,
              element,
              routeType: "module",
            }))
          : [],
      });
    }

    if (Array.isArray(v?.children)) {
      // 带 children 有可能是路由菜单 也有可能是 文本菜单
      v.children = rt(v.children, manipulate);
      // 路由菜单 肯定有 show 状态
      return v.show || v.children.length;
    }
    return v.show;
  });
};

//#####################################################################
//#####################################################################
//########################## 下面是数据 #################################
//#####################################################################
//#####################################################################

const resp = [
  {
    code: "helloworld",
    label: "菜单名称",
    path: "/helloworld",
    element: "helloworld/views/index",
    show: true,
    operate: ["edit", "export"],
    children: [
      {
        label: "菜单名称",
        path: "/helloworld/detail/:id",
        element: "helloworld/views/detail/index",
        show: false,
      },
    ],
  },
  {
    label: "纯菜单v1",
    children: [
      {
        code: "v1",
        label: "菜单名称",
        path: "/v1",
        element: "helloworld/views/index",
        show: false,
        operate: ["use"],
      },
    ],
  },
  {
    label: "纯菜单v2",
    children: [
      {
        label: "纯菜单v2",
        children: [
          {
            code: "v2",
            label: "菜单名称",
            path: "/v2",
            element: "helloworld/views/index",
            show: true,
            operate: ["view"],
          },
        ],
      },
    ],
  },
  {
    label: "纯菜单v3",
    children: [
      {
        code: "v3",
        label: "菜单名称",
        path: "/v3",
        element: "helloworld/views/index",
        show: false,
        operate: ["use"],
      },
    ],
  },
];
