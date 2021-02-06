<template>
  <button @click="test">切换</button>
  <button @click="hadRemove = true">移除</button>
  <button @click="loadCache = true">加载缓存</button>
  <!-- <one ref="kep" v-if="!hadRemove" v-model="inputVal" /> -->
  <keep-alive>
    <component :is="flag ? 'one' : 'two'" />
  </keep-alive>
  <component v-if="loadCache" :is="myVnode" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import One from "./inputOne";
import Two from "./inputTwo";
export default defineComponent({
  components: {
    One,
    Two
  },
  data() {
    return {
      inputVal: "",
      loadCache: false,
      hadRemove: false,
      flag: true,
      myVnode: undefined,
      reloading: false
    };
  },
  methods: {
    test() {
      this.flag = !this.flag;
    }
  }
});
</script>
