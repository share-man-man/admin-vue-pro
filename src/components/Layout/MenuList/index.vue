<template>
  <a-layout-sider
    :collapsed="collapsed"
    @update:collapsed="setCollapsed"
    :trigger="null"
    collapsible
    breakpoint="md"
  >
    <menu-render :collapsed="collapsed" :menuInfo="menuInfo" />
  </a-layout-sider>
</template>

<script lang="ts">
import MenuRender from "./MenuRender";
import { MenuItemType } from "./data.d";

import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";

export default defineComponent({
  components: {
    MenuRender
  },
  data() {
    const menuInfo: MenuItemType[] = [];
    return {
      selectedKeys: [],
      menuInfo
    };
  },
  computed: {
    ...mapState("layout", ["collapsed"])
  },
  methods: {
    ...mapMutations("layout", ["setCollapsed"])
  },
  created() {
    this.menuInfo = [
      {
        key: "1",
        name: "报表",
        path: "/dashboard",
        icon: "DashboardOutlined",
        children: [
          {
            key: "5",
            name: "带参数报表",
            path: "/dashboard?content=123",
            children: [],
            icon: "FallOutlined"
          },
          {
            key: "6",
            name: "无参报表",
            path: "/dashboard",
            children: [],
            icon: "RiseOutlined"
          }
        ]
      },
      {
        key: "2",
        name: "基础",
        path: "/basic",
        children: [],
        icon: "SettingOutlined"
      },
      {
        key: "3",
        name: "入库",
        path: "/income",
        children: [],
        icon: "LoginOutlined"
      },
      {
        key: "4",
        name: "测试",
        path: "/test",
        children: [],
        icon: "DashboardOutlined"
      }
    ];
  }
});
</script>
