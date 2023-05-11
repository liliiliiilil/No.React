import { createHashRouter } from "react-router-dom";
import Global from "@/global/views/index";
export const router = createHashRouter([
  {
    path: "*",
    element: <Global />,
    children: [],
  },
]);
