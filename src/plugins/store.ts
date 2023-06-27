import { useSnapshot, INTERNAL_Snapshot } from "valtio";
type RT<T> = [INTERNAL_Snapshot<T>, T];

const files = [] as Array<FILES<NonNullable<any>>>;
files.push(require.context("../community", true, /store\.ts$/));
files.push(require.context("../modules", true, /store\.ts$/));

const store = {} as ST;
files.forEach((file) => {
  file.keys().forEach((url) => {
    const k = url.replace(/store\.ts|\.?\/?/g, "");
    store[k as keyof ST] = file(url).default;
  });
});

export function useStore(key: "global"): RT<ST["global"]>;
export function useStore(key: "login"): RT<ST["login"]>;
export function useStore(key: "lost"): RT<ST["lost"]>;
export function useStore(key: "helloworld"): RT<ST["helloworld"]>;

export function useStore(key: keyof ST): RT<ST[keyof ST]> {
  if (key in store) {
    const _store = store[key];
    return [useSnapshot(_store), _store];
  }
  throw new Error(`状态管理 -${key}- 尚未定义`);
}
