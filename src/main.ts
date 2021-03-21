import "nprogress/nprogress.css";
// 必须在引入路由前引用，避免此样式覆盖路由组件里的样式
import "ant-design-vue/dist/antd.min.css";
import "@/assets/public.less";

import Mock from "@/utils/mock";

import { createApp } from "vue";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import App from "./App.vue";

Mock().then(() => {
  createApp(App)
    .use(store)
    .use(router)
    // .use(Antd)
    .mount("#app");
});
