import { Outlet } from "react-router-dom";
import RouteGuard from "./RouteGuard";
import "./index.scss";
export default function Global() {
  const location = useLocation();
  const [isSingle, setSingle] = useState(false);
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/404") {
      setSingle(true);
    } else {
      setSingle(false);
    }
  }, [location.pathname]);

  return (
    <div className={["global-wrap", isSingle ? "single" : null].join(" ")}>
      <RouteGuard />
      <Outlet></Outlet>
    </div>
  );
}
