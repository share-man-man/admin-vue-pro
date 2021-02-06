import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <div>
        二号:
        <input style="color:blue" />
      </div>
    );
  }
});
