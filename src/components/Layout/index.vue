<template>
  <a-layout class="public-basicLayout">
    <!-- 侧边菜单栏 -->
    <menu-list />
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
    return {};
  }
};
</script>
<style lang="less"></style>
