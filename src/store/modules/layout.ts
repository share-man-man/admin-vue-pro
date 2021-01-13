import { RouteLocationNormalizedLoaded } from "vue-router";

interface RouteItem extends RouteLocationNormalizedLoaded {
  closable: boolean;
}

interface LayoutState {
  // 折叠菜单栏
  collapsed: boolean;
  // 路由缓存
  routeCache: RouteItem[];
  // 当前路由key
  activeRouteKey: string;
  // 重载状态
  reloading: boolean;
}

const state = (): LayoutState => ({
  collapsed: false,
  routeCache: [],
  activeRouteKey: "",
  reloading: false
});

const mutations = {
  /**
   * 设置菜单栏收缩
   * @param state
   */
  setCollapsed(state: LayoutState) {
    state.collapsed = !state.collapsed;
  },

  /**
   * 进入路由时添加缓存
   * @param state
   * @param param1
   */
  handleToRoute(
    state: LayoutState,
    { to }: { to: RouteLocationNormalizedLoaded }
  ) {
    const { cache = true } = to.meta;
    if (!cache) return;

    const { fullPath } = to;
    // 如果没有缓存，那么tab新增选项
    if (!state.routeCache.find(i => i.fullPath === fullPath)) {
      state.routeCache.push({ ...to, closable: true });
    }
    state.activeRouteKey = fullPath;
  },

  /**
   * 移除缓存
   * @param state
   * @param param1
   */
  handleRemoveRoute(
    state: LayoutState,
    { targetKey, callBack }: { targetKey: string; callBack?: Function }
  ) {
    const index = state.routeCache.findIndex(i => i.fullPath === targetKey);
    state.routeCache.splice(index, 1);
    // 关闭的是否当前tab
    if (targetKey === state.activeRouteKey) {
      state.activeRouteKey = state.routeCache[0]?.fullPath;
      if (callBack) {
        callBack(state.activeRouteKey);
      }
    }
  },

  /**
   * 设置重载状态
   * @param state
   * @param v
   */
  setReloading(state: LayoutState, v: boolean) {
    state.reloading = v;
  }
  // handleRemoveCache({ routeCache }: LayoutState, index: number) {
  //   routeCache.splice(index, 1);
  // }
};

const getters = {
  tabsRouteCache(state: LayoutState) {
    const list = state.routeCache.map(i => ({ ...i })) || [];
    // 只剩一个tab页时不能关闭
    if (list.length === 1) {
      list[0].closable = false;
    }
    return list;
  },
  keepAliveRouteCache({ routeCache }: LayoutState) {
    const list = routeCache.map(i => i.fullPath);
    return list;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
