<template>
  <a-layout class="public-basicLayout">
    <!-- 侧边菜单栏 -->
    <menu-list />
    <a-layout>
      <!-- 顶部导航栏 -->
      <navigation />
      <!-- 路由缓存、内容展示 -->
      <content-cache />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import Navigation from "./Navigation.vue";
import ContentCache from "./Content/index";
import MenuList from "./MenuList/index";

export default {
  components: {
    MenuList,
    Navigation,
    ContentCache
  }
};
</script>
<style lang="less"></style>
