import "./style.scss";
import {} from "@/lost/service";
export default function Lost() {
  const store = useLostStore();
  return <div className="lost-wrap">{store.text}</div>;
}
