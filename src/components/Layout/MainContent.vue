<template>
  <a-layout-content
    :style="{
      margin: 0,
      minHeight: '280px'
    }"
  >
    <a-button @click="test">刷新组件</a-button>
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="keepAliveRouteCache">
        <component :is="getCacheCom(Component, route)" :key="route.fullPath" />
      </keep-alive>
    </router-view>
  </a-layout-content>
</template>

<script lang="ts">
import { Component, defineComponent, VNode } from "vue";
import { mapGetters } from "vuex";
import { RouteLocationNormalized } from "vue-router";

export default defineComponent({
  data() {
    return {
      // cache: ["/dashboard?content=123", "/basic", "/income", "/dashboard"],
    };
  },
  computed: {
    ...mapGetters("layout", ["keepAliveRouteCache"])
  },
  methods: {
    getCacheCom(com: VNode, r: RouteLocationNormalized) {
      const c = { ...com };
      // 匿名组件的name设置为fullPath，keep-alive的include根据name匹配
      ((c.type as Component).name as string) = r.fullPath;
      return c;
    },
    test() {
      // this.$router.push("/reloadCache");
      // setTimeout(() => {
      //   this.$router.replace("/dashboard");
      // });
    }
  }
});
</script>
