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
        children: [
          {
            path: "basic",
            component: () => import("@/views/form/basic"),
            meta: {
              name: "基础表单"
            }
          },
          {
            path: "step",
            component: () => import("@/views/form/basic"),
            meta: {
              name: "步骤表单"
            }
          },
          {
            path: "advanced",
            component: () => import("@/views/form/basic"),
            meta: {
              name: "高级表单"
            }
          }
        ]
      }
      // {
      //   path: "form/basic",
      //   component: () => import("@/views/form/basic"),
      //   meta: {
      //     name: "基础表单"
      //   }
      // },
      // {
      //   path: "form/step",
      //   component: () => import("@/views/form/basic"),
      //   meta: {
      //     name: "步骤表单"
      //   }
      // },
      // {
      //   path: "form/advanced",
      //   component: () => import("@/views/form/basic"),
      //   meta: {
      //     name: "高级表单"
      //   }
      // }
    ]
  },
  { path: "/:pathMatch(.*)*", name: "not-found", redirect: "/" }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
