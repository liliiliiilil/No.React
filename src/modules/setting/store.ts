import { proxy } from "valtio";
import { useProxy } from "valtio/utils";
interface T {
  text: string;
}
const data: T = {
  text: "系统设置",
};

export const useSettingStore = (): T => useProxy(proxy(data));
