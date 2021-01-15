module.exports = {
  // 生产环境不生成sourceMap
  productionSourceMap: false,
  devServer: {
    // 开发代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4000",
        pathRewrite: { "^/api": "" },
        // target是域名的话，需要这个参数
        changeOrigin: true,
        // 设置支持https协议的代理
        secure: false
      }
    }
    // after: require("./mock/index.ts")
  }
};
