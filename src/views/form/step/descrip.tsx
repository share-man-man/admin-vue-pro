import { defineComponent, PropType, reactive, toRefs } from "vue";
import { FormType } from ".";

export default defineComponent({
  props: {
    form: {
      required: true,
      type: Object as PropType<FormType>
    }
  },
  setup(props) {
    const { form: f } = toRefs(props);
    const form = reactive(f.value);
    return () => (
      <a-descriptions column={1}>
        <a-descriptions-item label="转账账号">
          {form.payAccount}
        </a-descriptions-item>
        <a-descriptions-item label="收款账户">
          {form.receptAccount}
        </a-descriptions-item>
        <a-descriptions-item label="收款人姓名">
          {form.receptName}
        </a-descriptions-item>
        <a-descriptions-item label="转账金额">
          <a-statistic value={form.amount}>
            {{
              suffix: () => "元"
            }}
          </a-statistic>
        </a-descriptions-item>
      </a-descriptions>
    );
  }
});
