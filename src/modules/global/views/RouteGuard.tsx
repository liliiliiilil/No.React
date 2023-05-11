import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { handleRouter } from "@/global/service";

/** @采用异步加载路由还是静态比对路由 */
const isAsynchronous = false;
export default function RouteGuard() {
  const store = useGlobalStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // 是否获取权限表
    if (store.authority.size) {
      // 除登录页外校验标识
      // if (location.pathname !== "/login") {
      //   const uniquely = sessionStorage.getItem("uniquely");
      //   if (!uniquely) {
      //     navigate("/login");
      //   }
      // }
    } else {
      handleRouter(isAsynchronous).then(
        ([menu, authority, _routes]: [
          Array<MENU>,
          Map<string, Set<string>>,
          any
        ]) => {
          console.log(menu, "menu?");
          setRoutes(_routes);
          store.authority = authority;
          navigate(location.pathname);
        }
      );
    }
  }, [location.pathname]);

  return <Suspense>{useRoutes(rt(routes))}</Suspense>;
}

const rt = (ry: Array<RY>): Array<RT> => {
  return ry.map(({ path, element, children = [] }) => {
    return {
      path,
      element,
      children: children.length ? rt(children) : [],
    };
  });
};

interface RY {
  path: string;
  element?: string;
  routeType: string;
  children?: Array<RY>;
}

interface RT {
  [key: string]: any;
  children?: Array<RT>;
}
