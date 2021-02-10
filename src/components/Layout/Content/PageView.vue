<template>
  <a-layout-content class="public-content">
    <div
      v-for="r in list"
      v-show="r.key === activeKey"
      :key="r.key"
      class="public-content-div"
    >
      <keep-alive v-if="!r.reloading">
        <component v-if="r.key === activeKey" :is="r.component" />
      </keep-alive>
    </div>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteItem } from "./data.d";
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<RouteItem[]>
    },
    activeKey: [String, Number]
  }
});
</script>
