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
   * accessToken过期时间（秒）
   */
  accessExp: 3600,
  /**
   * refreshToken过期时间（秒）
   */
  refreshExp: 43200,
  /**
   * 过滤拦截
   */
  filterPath: ["/oauth/login", "/oauth/refresh_token"]
};
