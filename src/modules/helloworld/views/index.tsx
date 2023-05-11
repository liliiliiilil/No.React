import { Outlet } from "react-router-dom";
import "./index.scss";
export default function Helloworld() {
  return (
    <div className="helloworld-wrap module">
      hello world
      <Outlet />
    </div>
  );
}
