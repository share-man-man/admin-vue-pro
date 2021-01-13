<template>
  <h1>报表</h1>
  <a-input v-model:value="inputVal" />
  <a-button @click="refresh">{{ query || "默认" }}</a-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    query: {
      type: [String, Number]
    }
  },
  data() {
    return {
      inputVal: ""
    };
  }
});
</script>
