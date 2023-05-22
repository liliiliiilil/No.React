import { proxy } from "valtio";
import { useProxy } from "valtio/utils";
interface T {
  text: string;
}
const data: T = {
  text: "login.text",
};

export const useLoginStore = (): T => useProxy(proxy(data));
