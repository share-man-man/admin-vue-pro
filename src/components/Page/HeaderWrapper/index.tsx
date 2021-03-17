import { getSlots } from "@/utils/framework";
import { defineComponent } from "vue";
import "./index.less";

export default defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="av-header-wrap">
        {/* content */}
        <div class="av-header-wrap-content">{getSlots(slots, "content")}</div>
        {/* extra */}
        <div class="av-header-wrap-extra"> {getSlots(slots, "extra")}</div>
      </div>
    );
  }
});
