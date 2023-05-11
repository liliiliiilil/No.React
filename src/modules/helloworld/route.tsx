const Root = lazy(() => import("./views"));
const Detail = lazy(() => import("./views/detail/index"));

export default [
  {
    path: "/helloworld",
    title: "标题",
    element: <Root />,
    children: [
      {
        path: "/helloworld/detail/:id",
        title: "详情",
        element: <Detail />,
        children: [],
      },
    ],
  },
  {
    path: "/v1",
    element: <Root />,
    children: [],
  },
  {
    path: "/v2",
    element: <Root />,
    children: [],
  },
  {
    path: "/v3",
    element: <Root />,
    children: [],
  },
  {
    path: "/v4",
    element: <Root />,
    children: [],
  },
];
