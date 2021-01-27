export const config = {
  /**
   * accessToken加密密钥
   */
  AC_SECRET: "ac",
  /**
   * refreshToken加密密钥
   */
  RF_SECRET: "rf",
  /**
   * accessToken过期时间
   */
  accessExp: 2,
  /**
   * refreshToken过期时间
   */
  refreshExp: 5,
  /**
   * 过滤拦截
   */
  filterPath: ["/oauth/login", "/oauth/refresh_token"]
};
