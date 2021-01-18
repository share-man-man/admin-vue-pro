import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import Home from "../views/Home.vue";
import Layout from "@/components/Layout/index.vue";

const routes: RouteRecordRaw[] = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      breadcrumbName: "关于"
    }
  },
  {
    path: "/",
    component: Layout,
    meta: {
      breadcrumbName: "首页"
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/index.vue"),
        props: route => ({ query: route.query.content }),
        meta: {
          breadcrumbName: "报表"
        }
      },
      {
        path: "basic",
        name: "Basic",
        component: () => import("@/views/Basic/index.vue"),
        meta: {
          breadcrumbName: "基础管理"
        }
      },
      {
        path: "income",
        name: "Income",
        component: () => import("@/views/Income/index.vue"),
        meta: {
          breadcrumbName: "入库管理"
        }
      },
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/Test.vue"),
        meta: {
          breadcrumbName: "测试"
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
