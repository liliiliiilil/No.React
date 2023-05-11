import "./style.scss";
import {} from "@/setting/service";
export default function Setting() {
  const store = useSettingStore();
  return <div className="setting-wrap">{store.text}</div>;
}
