import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";

/**
 * app名字，可在.env文件自定义
 */
const APP_NAME = import.meta.env.VITE_APP_NAME;

const routes: RouteRecordRaw[] = [
  {
    path: "/user",
    component: () => import("@/views/user"),
    meta: {
      name: "用户"
    },
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () => import("@/views/user/login"),
        meta: {
          name: "登陆"
        }
      }
    ]
  },
  {
    path: "/",
    // component: Layout,
    component: () => import("@/components/Layout"),
    meta: {
      name: "首页"
    },
    redirect: "/workspace",
    children: [
      {
        path: "workspace",
        component: () => import("@/views/workspace"),
        meta: {
          name: "工作台"
        }
      },
      {
        path: "dashboard",
        component: () => import("@/views/dashboard"),
        meta: {
          name: "报表"
        }
      },
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
      },
      {
        path: "profile",
        redirect: "profile/basic",
        meta: {
          name: "详情页"
        }
      },
      {
        path: "profile/basic",
        component: () => import("@/views/profile/basic"),
        meta: {
          name: "基础详情页"
        }
      },
      {
        path: "profile/advanced",
        component: () => import("@/views/profile/advanced"),
        meta: {
          name: "高级详情页"
        }
      },
      {
        path: "account",
        redirect: "account/center",
        meta: {
          name: "个人页"
        }
      },
      {
        path: "account/center",
        component: () => import("@/views/account/center"),
        meta: {
          name: "个人中心"
        }
      },
      {
        path: "account/settings",
        component: () => import("@/views/account/settings"),
        redirect: "/account/settings/base",
        meta: {
          name: "个人设置"
        },
        children: [
          {
            path: "base",
            component: () => import("@/views/account/settings/Basic"),
            meta: {
              name: "基础设置"
            }
          },
          {
            path: "security",
            component: () => import("@/views/account/settings/Security"),
            meta: {
              name: "安全设置"
            }
          },
          {
            path: "custom",
            component: () => import("@/views/account/settings/Custom"),
            meta: {
              name: "个性化"
            }
          }
        ]
      }
    ]
  },
  { path: "/:pathMatch(.*)*", name: "not-found", redirect: "/workspace" }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(i => {
  document.title = i.meta?.name || APP_NAME;
  NProgress.start();
  NProgress.set(0.7);
  NProgress.inc();
});

router.afterEach(() => {
  NProgress.done();
  NProgress.remove();
});

export default router;
