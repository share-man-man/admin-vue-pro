interface LayoutState {
  collapsed: boolean;
}

const state = (): LayoutState => ({
  collapsed: false
});

const mutations = {
  setCollapsed(state: LayoutState) {
    state.collapsed = !state.collapsed;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
