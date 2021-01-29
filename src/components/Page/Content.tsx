import { getSlots } from "@/utils/framework";
import { defineComponent } from "vue";

export default defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="public-page-content">
        <div class="public-page-content-children">
          <div class="public-page-content-children-container">
            {getSlots(slots)}
          </div>
        </div>
      </div>
    );
  }
});
