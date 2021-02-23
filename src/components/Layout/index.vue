<template>
  <a-layout class="public-basicLayout">
    <!-- 侧边菜单栏 -->
    <menu-list />
    <a-layout>
      <!-- 顶部导航栏 -->
      <navigation />
      <!-- 路由缓存、内容展示 -->
      <content-cache />
      <!-- <cache-keep /> -->
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { Layout } from "ant-design-vue";
import Navigation from "./Navigation.vue";
import ContentCache from "./Content/index";
import MenuList from "./MenuList/index";

const { Footer } = Layout;

export default {
  components: {
    [Layout.name]: Layout,
    [Footer.name]: Footer,
    MenuList,
    Navigation,
    ContentCache
  }
};
</script>
<style lang="less"></style>
