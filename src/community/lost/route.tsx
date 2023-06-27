import React from "react";
import { Navigate } from "react-router-dom";
const Element = lazy(() => import("./views"));

export default [
  {
    path: "/404",
    element: <Element />,
    children: [],
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
    // element: <Element />,
  },
];
