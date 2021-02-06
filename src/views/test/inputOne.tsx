import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const inputVal = ref("");
    return () => (
      <div>
        一号:
        <input v-model={inputVal.value} style="color:red" />
        <input />
      </div>
    );
  }
});
