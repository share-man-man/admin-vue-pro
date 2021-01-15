<template>
  <h1>基础配置</h1>
  <input />
  <a-button @click="test">测试请求</a-button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { fakeReq } from "@/services/test";

export default defineComponent({
  name: "Income",
  methods: {
    async test() {
      fakeReq({});
    }
  }
});
</script>
