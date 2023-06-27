export {};
// 定义 Store 数据
declare global {
  interface ST {
    helloworld: {
      text: string;
    };
  }
  interface SV {
    helloworld: {
      showhelloworld: () => Promise<any>;
    };
  }
}
