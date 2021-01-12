<template>
  <a-tabs
    v-model:activeKey="activeKey"
    type="editable-card"
    @edit="onEdit"
    @change="onChange"
    style="background: rgb(255, 255, 255);margin: 0px;padding-top: 6px;width: 100%;"
  >
    <a-tab-pane
      v-for="v in tabsRouteHistory"
      :key="v.fullPath"
      :tab="v.meta?.breadcrumbName || r.fullPath"
      :closable="v.closable"
    />
  </a-tabs>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const panes = [
      { title: "Tab 1", content: "Content of Tab 1", key: "1" },
      { title: "Tab 2", content: "Content of Tab 2", key: "2" },
      { title: "Tab 3", content: "Content of Tab 3", key: "3", closable: false }
    ];
    return {
      panes,
      newTabIndex: 0,

      // 当前路径
      activeKey: "",
      // 路由历史
      routeHistory: []
    };
  },
  computed: {
    tabsRouteHistory() {
      const list = this.routeHistory.map(i => ({ ...i })) || [];
      if (list.length === 1) {
        list[0].closable = false;
      }
      return list;
    }
  },
  watch: {
    $route: {
      handler() {
        const { fullPath, meta } = this.$route;
        if (
          this.$route &&
          this.routeHistory.findIndex(i => i.fullPath === fullPath) === -1
        ) {
          // 如果没有，那么tab新增选项
          this.routeHistory.push({ fullPath, meta, closable: true });
        }
        this.activeKey = fullPath;
      },
      immediate: true
    }
  },
  methods: {
    onChange(fullPath) {
      this.$router.push(fullPath);
    },
    print(v) {
      // console.log(v);
    },
    callback(key) {
      // console.log(key);
    },
    onEdit(targetKey, action) {
      // console.log(targetKey, action);
      this[action](targetKey);
    },
    // add() {
    //   const panes = this.panes;
    //   const activeKey = `newTab${this.newTabIndex++}`;
    //   panes.push({
    //     title: "New Tab",
    //     content: "Content of new Tab",
    //     key: activeKey
    //   });
    //   this.panes = panes;
    //   this.activeKey = activeKey;
    // },
    remove(targetKey) {
      // const history = this.routeHistory;
      // history.delete(targetKey);
      // this.routeHistory = history;

      const index = this.routeHistory.findIndex(i => i.fullPath === targetKey);
      this.routeHistory.splice(index, 1);

      // 关闭的是否当前tab
      // if (targetKey === this.activeKey) {
      //   history.forEach((_, key) => {
      //     this.activeKey = key;
      //   });
      //   this.onChange(history.get(this.activeKey)?.fullPath);
      // }
      if (targetKey === this.activeKey) {
        this.activeKey = this.routeHistory[0]?.fullPath;
        this.onChange(this.activeKey || "/");
      }

      // // 是否是最后一个

      // let activeKey = this.activeKey;
      // let lastIndex;
      // this.panes.forEach((pane, i) => {
      //   if (pane.key === targetKey) {
      //     lastIndex = i - 1;
      //   }
      // });
      // const panes = this.panes.filter(pane => pane.key !== targetKey);
      // if (panes.length && activeKey === targetKey) {
      //   if (lastIndex >= 0) {
      //     activeKey = panes[lastIndex].key;
      //   } else {
      //     activeKey = panes[0].key;
      //   }
      // }
      // this.panes = panes;
      // this.activeKey = activeKey;
    }
  }
});
</script>
