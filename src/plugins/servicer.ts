const files = [] as Array<FILES<NonNullable<any>>>;
files.push(require.context("../community", true, /service\.ts$/));
files.push(require.context("../modules", true, /service\.ts$/));

const servicer = {} as SV;
files.forEach((file) => {
  file.keys().forEach((url) => {
    const k = url.replace(/service\.ts|\.?\/?/g, "");
    servicer[k as keyof SV] = file(url).default;
  });
});

export function useServicer(key: "global"): SV["global"];
export function useServicer(key: "login"): SV["login"];
export function useServicer(key: "lost"): SV["lost"];
export function useServicer(key: "helloworld"): SV["helloworld"];
export function useServicer(key: keyof SV): SV[keyof SV] {
  if (key in servicer) {
    return servicer[key];
  }
  throw new Error(`服务 -${key}- 尚未定义`);
}
