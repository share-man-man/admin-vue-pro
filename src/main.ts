import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// 全局引入ant-design-vue组件
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .mount("#app");
