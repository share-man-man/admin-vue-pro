import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { clearCache, getAccessToken, refreshToken } from "./tokens";
import { message, notification } from "ant-design-vue";
import { ErrorCodeMessage, HttpCodeMessage } from "./code";
import router from "@/router";

/**
 * 返回的数据类型接口
 */
export interface CustomResponseType<T = unknown> {
  success: boolean; // 是否成功
  error?: {
    code?: number; //业务状态吗
    msg?: string; // 错误提示
    extra?: object; // 错误详情
  };
  data?: T; // 成功后返回的数据
}

/**
 * 创建axios
 */
const service = axios.create({
  baseURL: "/api/",
  timeout: 5000 // 默认超时时间
});

/**
 * 请求拦截
 */
service.interceptors.request.use(
  config => {
    //   所有请求携带AuthToken
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["authorization"] = accessToken;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// /**
//  * 返回拦截
//  */
// service.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     return Promise.resolve(error);
//   }
// );

/**
 * 自定义请求方法
 * @param config 请求参数
 */
const Request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    service(config)
      .then(r => {
        const resData: CustomResponseType<T> = r.data;
        const { data, success, error: err } = resData;
        // 业务成功
        if (success) {
          resolve((data as unknown) as T);
          return;
        }
        // 业务失败
        else if (err?.code === 10008) {
          // accessToken过期，需要刷新token
          refreshToken(config, resolve);
          return;
        } else if (err?.code === 10010) {
          // refreshToken过期
          // 1、清空发送队列
          clearCache();
          // 2、跳转到登陆界面
          router.push("/user/login");
          return;
        }
        // 抛出错误
        message.error({
          content: err?.msg || ErrorCodeMessage[err?.code as number] || "错误"
        });
        reject(resData);
      })
      .catch(e => {
        const errorRes: AxiosResponse = e.response;
        if (!errorRes) {
          notification.error({
            message: config.url,
            description: e.message
          });
          return;
        }
        const { status } = errorRes;
        // axios将status>200&&<300的状态码当作错误抛出，需要自行处理
        notification.error({
          message: config.url,
          description: HttpCodeMessage[status] || `${status}：请求失败`
        });
        // 其余异常：403、404、500单独跳转页面(暂时不跳转)
        // router.push('/')
      });
  });
};

export default Request;
