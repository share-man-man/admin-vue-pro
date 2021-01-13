<template>
  <a-layout-sider
    :collapsed="collapsed"
    @update:collapsed="setCollapsed"
    :trigger="null"
    collapsible
    breakpoint="md"
  >
    <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
      <a-menu-item key="1">
        <user-outlined />
        <span> 报表 </span>
        <router-link to="/dashboard" />
      </a-menu-item>
      <a-menu-item key="2">
        <video-camera-outlined />
        <span> 基础 </span>
        <router-link to="/basic" />
      </a-menu-item>
      <a-menu-item key="3">
        <upload-outlined />
        <span> 入库 </span>
        <router-link to="/income" />
      </a-menu-item>
      <a-menu-item key="4">
        <user-outlined />
        <span> 报表带参数 </span>
        <router-link to="/dashboard?content=123" />
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from "@ant-design/icons-vue";

import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";

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
  computed: {
    ...mapState("layout", ["collapsed"])
  },
  methods: {
    ...mapMutations("layout", ["setCollapsed"])
  }
});
</script>
