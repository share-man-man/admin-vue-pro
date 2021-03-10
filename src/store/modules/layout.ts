export interface LayoutState {
  // 折叠菜单栏
  collapsed: boolean;
  // 是否为手机
  isMobile: boolean;
  // 隐藏菜单栏
  hide: boolean;
}

const state = (): LayoutState => ({
  collapsed: false,
  isMobile: false,
  hide: false
});

const getters = {};

const mutations = {
  /**
   * 设置菜单栏收缩
   * @param state
   */
  setCollapsed(state: LayoutState) {
    if (state.isMobile) {
      state.hide = !state.hide;
      state.collapsed = false;
      return;
    }
    state.collapsed = !state.collapsed;
  },
  setIsMobile(state: LayoutState, isMobile = false) {
    // 窗口改变
    if (isMobile) {
      if (isMobile !== state.isMobile) {
        // 变为移动端，设置初始值 根据collapsed设置 collapsed:false hide:store.state.layout.collapsed
        state.hide = state.collapsed;
      }
      state.collapsed = false;
    } else {
      if (isMobile !== state.isMobile) {
        // 变为pc端，设置初始值 根据hide设置 collpased:store.state.layout.hide hide:false
        state.collapsed = state.hide;
      }
      state.hide = false;
    }

    state.isMobile = isMobile;
  },
  setHide(state: LayoutState) {
    state.hide = !state.hide;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
