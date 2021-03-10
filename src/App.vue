<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { watchResize } from "@/utils/layout";
export default defineComponent({
  beforeMount() {
    // 响应式监听
    watchResize(false);
  },
  beforeUnmount() {
    // 取消监听
    watchResize(true);
  }
});
</script>

<style lang="less">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
