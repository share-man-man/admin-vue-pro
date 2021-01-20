<template>
  <component :is="type || null" />
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  DashboardOutlined,
  SettingOutlined,
  LoginOutlined,
  FallOutlined,
  RiseOutlined
} from "@ant-design/icons-vue";
import { IconType } from "./data.d";

export default defineComponent({
  components: {
    DashboardOutlined,
    SettingOutlined,
    LoginOutlined,
    FallOutlined,
    RiseOutlined
  },
  props: {
    type: {
      type: String as PropType<IconType>
    }
  }
});
</script>
