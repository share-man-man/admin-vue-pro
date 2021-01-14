<template>
  <input :value="title" @input="onInput" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  naem: "ClickButton",
  props: {
    title: {
      type: [String],
      default: () => ""
    },
    message: {
      type: [String],
      default: () => ""
    },
    titleModifiers: {
      default: () => ({
        daxie: false
      })
    }
  },
  emits: ["update:title"],
  data() {
    return {
      total: 0
    };
  },
  methods: {
    onInput(e: KeyboardEvent) {
      let value = (e.target as HTMLInputElement)?.value;

      if (this.titleModifiers?.daxie) {
        value = `${value[0].toUpperCase()}${value.slice(1)}`;
      }
      this.$emit("update:title", value);
    }
  }
});
</script>
