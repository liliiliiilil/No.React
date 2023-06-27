import { proxy } from "valtio";
export default proxy({
  authority: new Map() as Map<string, Set<string>>,
});
