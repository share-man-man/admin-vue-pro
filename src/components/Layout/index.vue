<template>
  <a-layout class="public-basicLayout">
    <!-- 侧边菜单栏 -->
    <menu-list />
    <a-layout>
      <!-- 顶部导航栏 -->
      <navigation />
      <!-- 路由缓存、内容展示 -->
      <route-cache />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import MenuList from "./MenuList.vue";
import Navigation from "./Navigation.vue";
import RouteCache from "./RouteCache.vue";

export default {
  components: {
    MenuList,
    Navigation,
    RouteCache
  }
};
</script>
<style lang="less"></style>
