<template>
  <a-button>{{ query || "default" }}</a-button>
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
