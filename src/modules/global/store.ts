import { proxy } from "valtio";
import { useProxy } from "valtio/utils";
interface T {
  authority: Map<string, Set<string>>;
}
const data: T = {
  authority: new Map() as Map<string, Set<string>>,
};

export const useGlobalStore = (): T => useProxy(proxy(data));
