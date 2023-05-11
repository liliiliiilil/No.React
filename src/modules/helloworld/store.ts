import { proxy } from "valtio";
import { useProxy } from "valtio/utils";
interface T {
  text: string;
}
const data: T = {
  text: "你好",
};

export const useHelloworldStore = (): T => useProxy(proxy(data));
