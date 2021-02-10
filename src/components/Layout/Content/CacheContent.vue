<template>
  <router-view v-slot="{ Component }">
    <keep-alive max="50">
      <component :is="Component" :key="k" v-if="!reloading" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NullComp from "./NullComp.vue";
export default defineComponent({
  components: { NullComp },
  props: {
    k: Number,
    reloading: Boolean
  }
});
</script>
