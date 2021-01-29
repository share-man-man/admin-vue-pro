import { Request, Response } from "express";
import { OAuthTokenObj } from "../../src/utils/tokens";
import { CustomResponseType } from "../../src/utils/request";
import jwt from "jsonwebtoken";
import { ErrorCodeMessage } from "../../src/utils/code";
import { config } from "../utils/config";

export interface PayloadType {
  id: number;
  name: string;
}

/**
 * 返回true:表示拦截 false:未拦截
 * @param req 请求对象
 */
const intercepter = (req: Request, res: Response): boolean => {
  const errJSON: Required<CustomResponseType> = {
    success: false,
    error: {
      code: 10008,
      msg: ErrorCodeMessage[10008]
    },
    data: {}
  };
  // 登陆、刷新token接口不拦截
  if (config.filterPath.includes(req.url)) {
    return false;
  }
  const accessToken = req.headers["authorization"]?.toString();
  // 没有token的需要重新获取token
  if (!accessToken) {
    res.json(errJSON);
    return true;
  }

  // 验证accessToken合法性
  let isIntercepter = true;
  jwt.verify(accessToken, config.AC_SECRET, (err, decode) => {
    if (err) {
      isIntercepter = true;
      // token时间过期
      if (err.name === "TokenExpiredError") {
        res.json(errJSON);
      } else {
        errJSON.error.code = 2190002;
        errJSON.error.msg = ErrorCodeMessage[2190002];
        res.json(errJSON);
      }
    }
    if (decode) {
      // console.log(`解析成功：${JSON.stringify(decode)}`);
      isIntercepter = false;
    }
  });

  return isIntercepter;
};

/**
 * 生成accessToken
 * @param payload accessToken载荷
 */
export const createAccessToken = (payload: PayloadType) => {
  return jwt.sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + config.accessExp,
      type: "access_token"
    },
    config.AC_SECRET
  );
};

/**
 * refresh存储载荷，在重新生成accessToken时，传入载荷
 * @param payload refreshToken载荷
 */
export const createRefreshToken = (payload: PayloadType) => {
  return jwt.sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + config.refreshExp,
      type: "refresh_token"
    },
    config.RF_SECRET
  );
};

/**
 * 生成accessToken和refreshToken
 * @param payload token的载荷
 */
export const createOAuthToken = (payload: PayloadType): OAuthTokenObj => {
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);
  const obj: OAuthTokenObj = {
    accessToken,
    refreshToken
  };

  return obj;
};

export default intercepter;
