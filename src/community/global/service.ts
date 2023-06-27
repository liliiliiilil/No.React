import { handleSingleWay } from "utils/static-router";
import { handleMultipleWay } from "utils/dynamic-router";
export default {
  handleRouter: (isAsynchronous: boolean) => {
    if (isAsynchronous) {
      return handleMultipleWay();
    } else {
      return handleSingleWay();
    }
  },
};
