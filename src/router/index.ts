import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import Home from "../views/Home.vue";
import Layout from "@/components/Layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "about" */ "@/views/login"),
    meta: {
      name: "登录"
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
        path: "form",
        component: () => import("@/views/form/index.vue"),
        redirect: "/form/basic",
        meta: {
          name: "表单"
        },
        children: [
          {
            path: "basic",
            component: () => import("@/views/form/basic/index"),
            meta: {
              name: "基础表单"
            }
          },
          {
            path: "step",
            component: () => import("@/views/form/step/index"),
            meta: {
              name: "步骤表单"
            }
          },
          {
            path: "advanced",
            component: () => import("@/views/form/advanced/index"),
            meta: {
              name: "高级表单"
            }
          }
        ]
      },
      {
        path: "list",
        component: () => import("@/views/list/index.vue"),
        redirect: "/list/search",
        meta: {
          name: "列表"
        },
        children: [
          {
            path: "basic",
            component: () => import("@/views/list/basic"),
            meta: {
              name: "基础列表"
            }
          },
          {
            path: "search",
            component: () => import("@/views/list/search"),
            meta: {
              name: "查询表格"
            }
          },
          {
            path: "card",
            component: () => import("@/views/list/card"),
            meta: {
              name: "卡片列表"
            }
          }
        ]
      }
    ]
  },
  { path: "/:pathMatch(.*)*", name: "not-found", redirect: "/" }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
