import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue"; // 支持vue3的sfc组件
import vueJsx from "@vitejs/plugin-vue-jsx"; // 支持jsx组件
// import legacy from "@vitejs/plugin-legacy"; // 给不支持esm的旧版浏览器
import reactRefresh from "@vitejs/plugin-react-refresh"; // 为Vite提供React Refresh支持
// import vitePluginImp from "vite-plugin-imp"; // antd的css文件由于是按需加载的，随组件导入的样式会覆盖原有的样式,并且很多andv的样式没有规范的目录，所以这里展示弃用

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4000",
        // 去掉/api
        rewrite: path => path.replace(/^\/api/, ""),
        // target是域名的话，需要这个参数
        changeOrigin: true
        // 设置支持https协议的代理
        // secure: false
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    reactRefresh()
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: "ant-design-vue",
    //       style(name) {
    //         if (/popconfirm/.test(name)) {
    //           // support multiple style file path to import
    //           return [
    //             "ant-design-vue/es/button/style/index.css",
    //             "ant-design-vue/es/popover/style/index.css"
    //           ];
    //         } else if (["col", "row"].includes(name)) {
    //           return undefined;
    //         }
    //         return `ant-design-vue/es/${name}/style/index.css`;
    //       }
    //     }
    //   ]
    // })
    // legacy({
    //   targets: ["defaults", "not IE 11"]
    // })
  ],
  // 别名
  alias: {
    "@/": "/src/"
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});
