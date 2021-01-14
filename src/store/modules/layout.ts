interface LayoutState {
  // 折叠菜单栏
  collapsed: boolean;
}

const state = (): LayoutState => ({
  collapsed: false
});

const getters = {};

const mutations = {
  /**
   * 设置菜单栏收缩
   * @param state
   */
  setCollapsed(state: LayoutState) {
    state.collapsed = !state.collapsed;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
