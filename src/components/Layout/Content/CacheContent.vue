<template>
  <router-view v-slot="{ Component }">
    <keep-alive max="50">
      <component :is="Component" :key="k" v-if="!reloading" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    k: Number,
    reloading: Boolean
  }
});
</script>
