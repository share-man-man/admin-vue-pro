import { defineComponent } from "vue";
import Cache from "./cache.vue";

export default defineComponent({
  name: "test",
  setup() {
    return () => <Cache />;
  }
});
