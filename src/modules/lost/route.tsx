const Element = lazy(() => import("./views"));

export default [
  {
    title: "404",
    path: "/lost",
    element: <Element />,
    children: [],
  },
  {
    path: "*",
    element: <Navigate to="/lost" />,
  },
];
