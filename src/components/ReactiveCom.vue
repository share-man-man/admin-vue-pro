<template>
  <div class="reactive">
    <table border="2px">
      <tr>
        <td>属性</td>
        <td>响应式对象</td>
        <td>直接解构</td>
        <td>通过toRefs转换</td>
      </tr>
      <tr>
        <td>姓名</td>
        <td>{{ state.name }}</td>
        <td>{{ deName }}</td>
        <td>{{ refDeName }}</td>
      </tr>
      <tr>
        <td>年龄</td>
        <td>{{ state.age }}</td>
        <td>{{ deAge }}</td>
        <td>{{ refDeAge }}</td>
      </tr>
    </table>

    <input type="text" v-model="state.name" />
    <input type="number" v-model="state.age" />
    <button @click="addKPI">当前kpi：{{ userKpi }}，点击加kpi</button>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "vue";

export default defineComponent({
  setup() {
    //   通过reactive创建响应式对象
    const state = reactive({
      name: "xiaoman",
      age: 3
    });
    const { name: deName, age: deAge } = state; // 直接解构state的值失去响应式
    const { name: refDeName, age: refDeAge } = toRefs(state); //要使用解构，需要toRef或toRefs

    // 通过ref创建基础值的响应式对象，需要操作.value
    const userKpi = ref(1);
    const addKPI = () => {
      userKpi.value++; // 函数闭包里修改值
    };

    return {
      state,
      deName,
      deAge,
      refDeName,
      refDeAge,
      userKpi,
      addKPI
    };
  }
});
</script>

<style scoped>
input {
  height: 30px;
}
.reactive {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
table tr td {
  width: 100px;
}
</style>
