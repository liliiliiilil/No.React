import { handleSingleWay } from "utils/static-router";
import { handleMultipleWay } from "utils/dynamic-router";
export const handleRouter = (isAsynchronous: boolean): any => {
  if (isAsynchronous) {
    return handleMultipleWay();
  } else {
    return handleSingleWay();
  }
};
