import { proxy } from "valtio";
import { useProxy } from "valtio/utils";
interface T {
  text: string;
}
const data: T = {
  text: "404",
};

export const useLostStore = (): T => useProxy(proxy(data));
