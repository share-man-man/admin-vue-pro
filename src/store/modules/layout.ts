export interface LayoutState {
  // 折叠菜单栏
  collapsed: boolean;
  // 是否为手机
  isMobile: boolean;
}

const state = (): LayoutState => ({
  collapsed: false,
  isMobile: false
});

const getters = {};

const mutations = {
  /**
   * 设置菜单栏收缩
   * @param state
   */
  setCollapsed(state: LayoutState) {
    state.collapsed = !state.collapsed;
  },
  setIsMobile(state: LayoutState, isMobile = false) {
    state.isMobile = isMobile;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
