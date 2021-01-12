<template>
  <h1>报表</h1>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    query: {
      type: [String, Number]
    }
  }
});
</script>
