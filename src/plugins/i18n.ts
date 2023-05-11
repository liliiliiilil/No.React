import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useSnapshot, proxy } from "valtio";

// 默认语言
const alreadyLoadedLocale = new Set(["zh_CN"]);
// 同步加载默认语言
const defaultFiles = import.meta.glob(`/src/modules/*/locale/zh_CN.ts`, {
  eager: true,
  import: "default",
});
// 定义翻译源
const resources = {} as {
  [key: string]: {
    translation: {
      [key: string]: object;
    };
  };
};
// 读取默认语言文件
Object.keys(defaultFiles).forEach((url) => {
  const [module, locale] = url
    .replace(/src|modules|community|\.ts|\.?\/?/g, "")
    .split("locale");

  if (module && locale) {
    if (!resources[locale]) {
      resources[locale] = { translation: {} };
    }
    resources[locale]["translation"][module] = defaultFiles[url] as {
      [key: string]: object;
    };
  }
});

// 初始化
i18n.use(initReactI18next).init({
  lng: "zh_CN",
  resources,
});

// 定义支持语言包
const n = new Set(["zh_CN", "en_US"]);
// 定义动态变量, 记录当前语言
const target = proxy({ value: "zh_CN" });
// 导出翻译函数
export const t = i18n.t;
// 导出获取当前语言函数
export const useLocale = () => useSnapshot(target).value;
// 导出设置当前语言函数
export const setLocale = (k: "zh_CN" | "en_US") => {
  if (n.has(k)) {
    // 当前语言未加载
    if (!alreadyLoadedLocale.has(k)) {
      let files;
      switch (k) {
        case "en_US":
          files = import.meta.glob(["/src/modules/*/locale/en_US.ts"], {
            import: "default",
          });
          break;
      }
      loadLazy(files, k);
    } else {
      i18n.changeLanguage(k);
      target.value = k;
    }
  } else {
    throw new Error(`国际化 -${k}- 尚未定义`);
  }
};

const loadLazy = (files: any, k: string) => {
  Object.keys(files).forEach((url) => {
    const rs = files[url];
    const [module, locale] = url
      .replace(/src|modules|\.ts|\.?\/?/g, "")
      .split("locale");
    rs().then((translate: any) => {
      if (module && locale) {
        if (!resources[locale]) {
          resources[locale] = { translation: {} };
        }
        resources[locale]["translation"][module] = translate as {
          [key: string]: object;
        };

        // 存储已加载语言
        i18n.reloadResources(k);
        // 设置当前语言
        i18n.changeLanguage(k);
        target.value = k;
      }
    });
  });
};
