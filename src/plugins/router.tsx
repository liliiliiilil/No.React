import React from "react";
import { createHashRouter } from "react-router-dom";

import Global from "../community/global/views/index";
export default createHashRouter([
  {
    path: "*",
    element: <Global />,
    children: [],
  },
]);
