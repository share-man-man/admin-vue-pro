import { getSlots } from "@/utils/framework";
import { defineComponent } from "vue";

export default defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="av-page-content">
        <div class="av-page-content-children">
          <div class="av-page-content-children-container">
            {getSlots(slots)}
          </div>
        </div>
      </div>
    );
  }
});
