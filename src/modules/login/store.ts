import { proxy } from "valtio";
import { useProxy } from "valtio/utils";
interface T {
  text: string;
}
const data: T = {
  text: "监管执法-企业端",
};

export const useLoginStore = (): T => useProxy(proxy(data));
