import { useRoutes } from "react-router-dom";
import React, { Suspense } from "react";

/** @采用异步加载路由还是静态比对路由 */
const isAsynchronous = false;
export default function RouteGuard() {
  const [readonlyGlobal, updatedGlobal] = useStore("global");
  const navigate = useNavigate();
  const location = useLocation();
  const { handleRouter } = useServicer("global");
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // 是否获取权限表
    if (readonlyGlobal.authority.size) {
      // 除登录页外校验标识
      if (location.pathname !== "/login") {
        const uniquely = sessionStorage.getItem("uniquely");
        // if (!uniquely) {
        //   navigate("/login");
        // }
      }
    } else {
      handleRouter(isAsynchronous).then(
        ([menu, authority, _routes]: [
          Array<MENU>,
          Map<string, Set<string>>,
          any
        ]) => {
          setRoutes(_routes);
          updatedGlobal.authority = authority;
          navigate(location.pathname);
        }
      );
    }
  }, [location.pathname]);

  return <Suspense>{useRoutes(rt(routes))}</Suspense>;
}

const rt = (ry: Array<RY>): Array<RT> => {
  return ry.map(({ path, element, children = [], routeType }) => {
    // 静态路由
    if (routeType === "community") {
      return {
        path,
        element,
        children: children.length ? rt(children) : [],
      };
    }

    // 后端动态路由
    if (isAsynchronous) {
      const Root = lazy(() => import(`../../../modules/${element}`));
      return {
        path,
        element: <Root />,
        children: children.length ? rt(children) : [],
      };
    }

    // 前端动态权限
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
