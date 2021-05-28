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
        // component: () => import("@/views/list/index.vue"),
        component: () => import("@/components/Page/EmptyContainer.vue"),
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
        // component: () => import("@/views/list/index.vue"),
        component: () => import("@/components/Page/EmptyContainer.vue"),
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
      },
      {
        path: "mock-server",
        redirect: "/mock-server/project/list",
        meta: {
          name: "Mock服务"
        },
        component: () => import("@/components/Page/EmptyContainer.vue"),
        children: [
          {
            path: "project",
            meta: {
              name: "项目管理"
            },
            component: () => import("@/components/Page/EmptyContainer.vue"),
            redirect: "/mock-server/project/list",
            children: [
              {
                path: "list",
                meta: { name: "列表" },
                component: () => import("@/views/mock-server/project/index")
              },
              {
                path: "detail",
                meta: { name: "详情" },
                component: () => import("@/views/mock-server/project/detail"),
                props: r => ({ code: r.query?.code || "" })
              },
              // {
              //   path: "api",
              //   meta: { name: "api" },
              //   component: () => import("@/views/mock-server/project/ApiDetail")
              // },
              {
                path: "api",
                meta: { name: "api" },
                component: () =>
                  import("@/views/mock-server/project/ApiDetail"),
                props: r => ({
                  id: Number(r.query.id || "0"),
                  projectId: Number(r.query.projectId || "0")
                })
              }
            ]
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
  document.title = (i.meta?.name || APP_NAME) as string;
  NProgress.start();
  NProgress.set(0.7);
  NProgress.inc();
});

router.afterEach(() => {
  NProgress.done();
  NProgress.remove();
});

export default router;
