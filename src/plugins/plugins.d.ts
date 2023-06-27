export {};
declare global {
  interface FILES<T> {
    (url: string): {
      default: T;
    };
    keys: {
      (): Array<string>;
    };
    routeType?: string;
  }
}
