import axios, { Axios, AxiosResponse } from "axios";
const request: Axios = axios.create({
  timeout: 6000,
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("code");
    if (!token) {
      throw new Error("请设置 code 字段!");
    }
    config.headers.token = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse & { code?: number }) => {
    if (response.code === 400) {
      throw new Error("即将登出 code 失效!");
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default request;
