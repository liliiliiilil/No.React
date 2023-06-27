interface MENU {
  children?: Array<MENU>;
  code?: string;
  label?: string;

  show?: boolean;
  enable?: boolean;
  operate?: Array<string>;
  element?: string;
  routeType?: string;
  path?: string;
}

interface HANDLEMENU {
  (v: Array<MENU>, y: Map<string, Set<string>>): Array<MENU>;
}
