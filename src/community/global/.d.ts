export {};
// 定义 Store 数据
declare global {
  interface ST {
    global: {
      authority: Map<string, Set<string>>;
    };
  }
  interface SV {
    global: {
      handleRouter: (mode: boolean) => any;
    };
  }
}
