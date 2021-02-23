import { defineComponent, PropType, reactive, toRefs } from "vue";
import { FormType } from ".";
import { Descriptions, Statistic } from "ant-design-vue";

const { Item: DescriptionsItem } = Descriptions;

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
      <Descriptions column={1}>
        <DescriptionsItem label="转账账号">{form.payAccount}</DescriptionsItem>
        <DescriptionsItem label="收款账户">
          {form.receptAccount}
        </DescriptionsItem>
        <DescriptionsItem label="收款人姓名">
          {form.receptName}
        </DescriptionsItem>
        <DescriptionsItem label="转账金额">
          <Statistic value={form.amount}>
            {{
              suffix: () => "元"
            }}
          </Statistic>
        </DescriptionsItem>
      </Descriptions>
    );
  }
});
