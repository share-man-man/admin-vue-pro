<template>
  <div class="hello">
    <click-button v-model:title.daxie="title" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClickButton from "./ClickButton.vue";

export default defineComponent({
  name: "HelloWorld",
  components: { ClickButton },
  props: {
    msg: String
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    oneDown(val: string) {
      console.log(val);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
