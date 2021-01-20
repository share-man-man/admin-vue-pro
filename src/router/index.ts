import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import Home from "../views/Home.vue";
import Layout from "@/components/Layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      name: "关于"
    }
  },
  {
    path: "/",
    component: Layout,
    meta: {
      name: "首页"
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/index.vue"),
        props: route => ({ query: route.query.content }),
        meta: {
          name: "报表"
        }
      },
      {
        path: "basic",
        name: "Basic",
        component: () => import("@/views/Basic/index.vue"),
        meta: {
          name: "基础管理"
        }
      },
      {
        path: "income",
        name: "Income",
        component: () => import("@/views/Income/index.vue"),
        meta: {
          name: "入库管理"
        }
      },
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/Test.vue"),
        meta: {
          name: "测试"
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
