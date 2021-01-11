<template>
  <a-tabs
    v-model:activeKey="activeKey"
    type="editable-card"
    @edit="onEdit"
    style="background: rgb(255, 255, 255);margin: 0px;padding-top: 6px;width: 100%;"
  >
    <a-tab-pane
      v-for="pane in panes"
      :key="pane.key"
      :tab="pane.title"
      :closable="pane.closable"
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
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    onEdit(targetKey, action) {
      console.log(targetKey, action);
      this[action](targetKey);
    },
    add() {
      const panes = this.panes;
      const activeKey = `newTab${this.newTabIndex++}`;
      panes.push({
        title: "New Tab",
        content: "Content of new Tab",
        key: activeKey
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter(pane => pane.key !== targetKey);
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      }
      this.panes = panes;
      this.activeKey = activeKey;
    }
  }
});
</script>
