// 必须在引入路由前引用，避免此样式覆盖路由组件里的样式
import "ant-design-vue/dist/antd.min.css";
import "@/assets/public.less";
// 全局引入ant-design-vue组件
// import Antd from "ant-design-vue";

import { createApp } from "vue";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import App from "./App.vue";

import Mock from "@/utils/mock";

Mock().then(() => {
  createApp(App)
    .use(store)
    .use(router)
    // .use(Antd)
    .mount("#app");
});
