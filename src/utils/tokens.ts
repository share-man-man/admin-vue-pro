import { getNewAccessToken } from "@/services/oauth";
import { notification } from "ant-design-vue";
import { AxiosRequestConfig } from "axios";
import request, { CustomResponseType } from "./request";

/**
 * token类型接口
 */
export interface OAuthTokenObj {
  accessToken?: string;
  refreshToken?: string;
}

/**
 * 请求凭证
 */
const accessTokenKey = "access_token_key";
/**
 * 刷新请求的凭证
 */
const refreshTokenKey = "refresh_token_key";
/**
 * 并发刷新token锁
 */
let lock = false;
/**
 * 待刷新请求的缓存
 */
const reqCache = new Map<AxiosRequestConfig, unknown>();

/**
 * 存储刷新token后的数据
 * @param obj 从后端请求的token对象
 */
const setAccessToken = (obj: OAuthTokenObj) => {
  try {
    localStorage.setItem(accessTokenKey, obj.accessToken || "");
    return true;
  } catch (error) {
    alert("设置token失败");
    return false;
  }
};

/**
 * 获取存储的token对象
 */
const getTokenObj = (): OAuthTokenObj => ({
  accessToken: localStorage.getItem(accessTokenKey) || undefined,
  refreshToken: localStorage.getItem(refreshTokenKey) || undefined
});

/**
 * 设置所有的token对象
 * @param obj token对象
 */
const setTokenObj = (obj: OAuthTokenObj) => {
  try {
    localStorage.setItem(accessTokenKey, obj.accessToken || "");
    localStorage.setItem(refreshTokenKey, obj.refreshToken || "");
    return true;
  } catch (error) {
    alert("设置token失败");
    return false;
  }
};

const removeTokenObj = () => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(refreshTokenKey);
};

/**
 * 获取accessToken
 */
const getAccessToken = () => getTokenObj().accessToken;

/**
 * 清空缓存
 */
const clearCache = () => {
  lock = false;
  reqCache.clear();
};

/**
 *
 * @param config 请求参数
 * @param resolve Promise回调
 */
const refreshToken = (config: AxiosRequestConfig, resolve: unknown) => {
  reqCache.set(config, resolve);
  // 并发刷新锁
  if (lock) {
    return;
  }
  lock = true;
  getNewAccessToken(getTokenObj())
    .then(tokenObj => {
      // 存储token
      setAccessToken(tokenObj);
      // 重新发送缓存的请求，并清空缓存
      reqCache.forEach((r, c) => {
        request(c).then(d => (r as Function)(d));
      });
      clearCache();
    })
    .catch((e: CustomResponseType<OAuthTokenObj>) => {
      notification.error({
        message: "刷新令牌",
        content: e.error?.msg
      });
      clearCache();
      // console.log(e);
    });
};

export {
  refreshToken,
  clearCache,
  getAccessToken,
  getTokenObj,
  setTokenObj,
  removeTokenObj
};
