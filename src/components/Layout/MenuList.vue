<template>
  <a-layout-sider
    :collapsed="collapsed"
    @update:collapsed="setCollapsed"
    :trigger="null"
    collapsible
    breakpoint="md"
  >
    <!-- <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in list" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <PieChartOutlined />
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </a-menu> -->

    <a-menu
      v-if="false"
      theme="dark"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
    >
      <a-menu-item key="1">
        <user-outlined />
        <span> 报表 </span>
        <router-link to="/dashboard" />
      </a-menu-item>
      <a-menu-item key="2">
        <video-camera-outlined />
        <span> 基础 </span>
        <router-link to="/basic" />
      </a-menu-item>
      <a-menu-item key="3">
        <upload-outlined />
        <span> 入库 </span>
        <router-link to="/income" />
      </a-menu-item>
      <a-menu-item key="4">
        <user-outlined />
        <span> 报表带参数 </span>
        <router-link to="/dashboard?content=123" />
      </a-menu-item>
      <a-menu-item key="5">
        <user-outlined />
        <span> 测试 </span>
        <router-link to="/test" />
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
  // PieChartOutlined
} from "@ant-design/icons-vue";

import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";

declare type MenuItemType = {
  key: string | number;
  name: string;
  path: string;
  children: MenuItemType[];
};

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined
    // PieChartOutlined
  },
  data() {
    const menuList: MenuItemType[] = [];
    return {
      selectedKeys: ["1"],
      menuList
    };
  },
  computed: {
    ...mapState("layout", ["collapsed"])
  },
  methods: {
    ...mapMutations("layout", ["setCollapsed"])
  },
  created() {
    this.menuList = [
      {
        key: 1,
        name: "一级菜单-1",
        path: "",
        children: [
          {
            key: 3,
            name: "二级菜单-1",
            path: "",
            children: [
              {
                key: 5,
                name: "三级菜单-1",
                path: "",
                children: []
              },
              {
                key: 6,
                name: "三级菜单-2",
                path: "",
                children: []
              }
            ]
          },
          {
            key: 4,
            name: "二级菜单-2",
            path: "",
            children: []
          }
        ]
      },
      {
        key: 2,
        name: "一级菜单-2",
        path: "",
        children: []
      }
    ];
  }
});
</script>
