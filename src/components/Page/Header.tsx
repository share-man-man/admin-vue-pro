import { getSlots } from "@/utils/framework";
import { defineComponent } from "vue";

export default defineComponent({
  setup(_, { slots }) {
    return () => <div class="av-page-header">{getSlots(slots) || ""}</div>;
  }
});
