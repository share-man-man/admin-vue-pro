<template>
  <a-layout class="public-basicLayout">
    <!-- 侧边菜单栏 -->
    <!-- <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      breakpoint="md"
    > -->
    <menu-list />
    <!-- </a-layout-sider> -->
    <a-layout>
      <!-- 顶部导航栏 -->
      <navigation />
      <!-- 路由缓存记录 -->
      <route-history />
      <!-- 内容展示 -->
      <main-content />
    </a-layout>
  </a-layout>
</template>
<script>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import MenuList from "./MenuList";
import Navigation from "./Navigation";
import RouteHistory from "./RouteHistory.vue";
import MainContent from "./MainContent";

export default {
  components: {
    MenuList,
    Navigation,
    RouteHistory,
    MainContent
  },
  data() {
    return {
      collapsed: false
    };
  }
};
</script>
<style lang="less"></style>
