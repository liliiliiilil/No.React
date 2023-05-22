import "./index.scss";
export default function Login() {
  let timer: any;
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight * 2;
  const [items, setItems] = useState(
    Array(300)
      .fill(1)
      .map(() => {
        const size = randomInteger(60, 10);
        const left = randomInteger(innerWidth, 0);
        const bottom = randomInteger(innerHeight, 10);
        return {
          size,
          left,
          bottom,
          background: randomRgba(),
          zIndex: randomInteger(9, 1),
          opacity: 1,
          y: 0,
        };
      }) as Array<any>
  );
  const [topic, setTopic] = useTopic();
  const store = useLoginStore();
  const locale = useLocale();

  useEffect(() => {
    sessionStorage.clear();
    animation();
  }, []);

  const animation = (interval = 100, skip = 50) => {
    if (timer) {
      clearInterval(timer);
    }
    window.requestAnimationFrame(() => {
      timer = setInterval(() => {
        const innerHeight = window.innerHeight;
        setItems(
          items.map((el) => {
            el.y += skip;
            const h = (el.y / 100) * el.size;
            if (el.y > 0) {
              el.opacity = 1;
            }
            if (h - el.bottom > el.size * 6) {
              el.y = -300;
              el.bottom = innerHeight * 2;
              el.opacity = 0;
            }
            return el;
          })
        );
      }, interval);
    });
  };

  const onSubmit = () => {
    setTopic(topic === "night" ? "sunny" : "night");
    setLocale(locale === "en_US" ? "zh_CN" : "en_US");
  };

  return (
    <div className="login-wrap module">
      {items.map(
        ({ size, left, bottom, background, opacity, zIndex, y }, index) => {
          return (
            <div
              className="item"
              key={index}
              style={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}px`,
                bottom: `${bottom}px`,
                backgroundColor: background,
                zIndex: zIndex,
                boxShadow: `0px 0px 20px ${background}`,
                opacity: opacity,
                transform: `translate(0, ${y}%)`,
              }}
            ></div>
          );
        }
      )}

      <div className="login" onClick={onSubmit}>
        {t(store.text)}
      </div>
    </div>
  );
}

const randomInteger = (max: number, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomRgba = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r},${g},${b},0.8)`;
};
