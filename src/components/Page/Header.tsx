import { getSlots } from "@/utils/framework";
import { defineComponent } from "vue";

export default defineComponent({
  setup(_, { slots }) {
    return () => <div class="public-page-header">{getSlots(slots) || ""}</div>;
  }
});
