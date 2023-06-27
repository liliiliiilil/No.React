import { RouteObject } from "react-router-dom";

// #初始化路由
const routes: Array<RouteObject & { routeType: string }> = [];

// #加载静态路由
const staticRoutes = require.context("../community", true, /route\.tsx$/);
// 收集静态路由
staticRoutes.keys().forEach((url) => {
  const rs = staticRoutes(url).default as RouteObject[];
  rs.forEach((_) => {
    routes.push(Object.assign(_, { routeType: "community" }));
  });
});

// #加载模块路由
const modulesRoutes = require.context("../modules", true, /route\.tsx$/);
// 模块路由 Map 化
const modulesMap = new Map();
modulesRoutes.keys().forEach((url) => {
  const rs = modulesRoutes(url).default as RouteObject[];
  rs.forEach((_) => {
    modulesMap.set(
      _.path?.substring(1),
      Object.assign(_, { routeType: "modules" })
    );
  });
});

// #初始化模块按钮权限 Map
const manipulate = new Map();

export const handleSingleWay = () => {
  // 收集模块按钮权限
  resp.forEach(({ code, operate }) => {
    manipulate.set(code, new Set(operate));
  });

  return Promise.resolve<[Array<MENU>, Map<string, Set<string>>, Array<any>]>([
    rt(menu, manipulate),
    manipulate,
    routes,
  ]);
};

const rt: HANDLEMENU = (x, manipulate) => {
  return x.filter((v) => {
    if (Array.isArray(v.children)) {
      v.children = rt(v.children, manipulate);
      return v.children.length;
    } else {
      if (v.code && manipulate.has(v.code)) {
        // 整条模块的路由权限加入
        // # 如果需要做到子路由也继续鉴权
        // 则需要在 get 后进行一个 filter,
        // 前提是定义路由时 设置 子路由依赖的按钮权限如 none view 等
        routes.unshift(modulesMap.get(v.code));
        return true;
      }
      return false;
    }
  });
};

//#####################################################################
//#####################################################################
//########################## 下面是数据 #################################
//#####################################################################
//#####################################################################

const menu = [
  {
    code: "helloworld",
    label: "目录名称",
  },
  {
    label: "菜单名称",
    children: [{ code: "v1", label: "菜单名称" }],
  },
  {
    label: "菜单名称",
    children: [{ code: "v2", label: "菜单名称" }],
  },
  {
    label: "菜单名称",
    children: [
      {
        label: "菜单名称",
        children: [{ code: "v3", label: "菜单名称" }],
      },
      {
        label: "菜单名称",
        children: [{ code: "v4", label: "菜单名称" }],
      },
    ],
  },
  {
    code: "v4",
    label: "菜单名称",
  },
];

const resp = [
  {
    code: "helloworld",
    operate: ["use", "export"],
  },
  {
    code: "v2",
    operate: ["view", "export"],
  },
  {
    code: "v3",
    operate: ["edit"],
  },
];
