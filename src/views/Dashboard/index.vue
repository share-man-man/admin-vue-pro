<template>
  <h1>报表</h1>
  <a-input v-model:value="inputVal" />
  <a-button @click="refresh">{{ query || "默认" }}</a-button>
  {{ mockRes }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { fakeReq } from "@/services/test";

export default defineComponent({
  name: "Dashboard",
  props: {
    query: {
      type: [String, Number]
    }
  },
  data() {
    return {
      inputVal: "",
      mockRes: ""
    };
  },
  methods: {
    async refresh() {
      const res = await fakeReq({});
      this.mockRes = res.data;
    }
  }
});
</script>
