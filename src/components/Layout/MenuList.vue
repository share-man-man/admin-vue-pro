<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    breakpoint="md"
  >
    <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
      <a-menu-item key="1">
        <user-outlined />
        <span>nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <video-camera-outlined />
        <span>nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <upload-outlined />
        <span>nav 3</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from "@ant-design/icons-vue";

import { defineComponent, reactive } from "vue";

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined
  },
  data() {
    return {
      selectedKeys: ["1"]
    };
  },
  setup() {
    const state = reactive({
      collapsed: false
    });
    return state;
  }
});
</script>
