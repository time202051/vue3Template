import axios from 'axios';
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios';
const config = {
  baseURL: import.meta.env.MODE === 'development' ? '' : 'http://127.0.0.1:5174',
  timeout: 1000
};
export const instance = axios.create(config);
instance.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error: AxiosError) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);
