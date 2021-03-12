<template>
  <a-layout-content class="av-content">
    <div
      v-for="r in list"
      v-show="r.key === activeKey"
      :key="r.key"
      class="av-content-div"
    >
      <router-view>
        <keep-alive v-if="!r.reloading">
          <component :is="r.component" v-if="r.key === activeKey" />
        </keep-alive>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Layout } from "ant-design-vue";
import { RouteItem } from "./data.d";

const { Content } = Layout;

export default defineComponent({
  components: {
    [Content.name]: Content
  },
  props: {
    list: {
      type: Array as PropType<RouteItem[]>,
      default: () => []
    },
    activeKey: {
      type: [String, Number],
      default: ""
    }
  }
});
</script>
