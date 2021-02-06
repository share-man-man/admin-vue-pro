import { defineComponent, PropType, reactive, ref, toRefs } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { FormType } from ".";
import { message } from "ant-design-vue";
import { ValidateErrorEntity } from "ant-design-vue/lib/form/interface";
import Desc from "./descrip";
import { MethodsType } from "../basic";

const labelCol = { sm: { span: 7 }, lg: { span: 7 } };
const wrapperCol = { sm: { span: 17 }, lg: 10 };
const rules = {
  payPassword: [{ required: true, message: "需要支付密码才能进行支付" }]
};

export default defineComponent({
  props: {
    form: {
      required: true,
      type: Object as PropType<FormType>
    },
    onSubmit: Function as PropType<() => void>,
    onPrevious: Function as PropType<() => void>
  },
  setup(props) {
    const { form: f } = toRefs(props);
    const form = reactive(f.value);

    const formRef = ref<MethodsType>(undefined);
    const payForm = reactive({
      payPassword: ""
    });
    const loading = ref(false);

    const submit = () => {
      formRef.value
        ?.validate?.()
        .then(() => {
          loading.value = true;
          setTimeout(() => {
            loading.value = false;
            payForm.payPassword = "";
            if (form) {
              props.onSubmit?.();
            }
          }, 1000);
        })
        .catch((error: ValidateErrorEntity) => {
          error.errorFields.forEach(i => {
            i.errors.forEach(j => {
              message.error(j);
            });
          });
        });
    };

    return () => (
      <>
        <a-alert
          message="确认转账后，资金将直接打入对方账户，无法退回。"
          type="info"
          closable
          showIcon
        >
          {{
            icon: () => <InfoCircleFilled />
          }}
        </a-alert>
        <a-form
          ref={formRef}
          model={payForm}
          rules={rules}
          label-col={labelCol}
          wrapper-col={wrapperCol}
          style="max-width: 500px;margin: 40px auto 0;"
        >
          <Desc form={form} />
          <a-divider />
          <a-form-item label="支付密码" name="payPassword">
            <a-input v-model={[payForm.payPassword, "value"]} type="password" />
          </a-form-item>
          <a-form-item label=" " colon={false}>
            <a-button type="primary" onClick={submit} loading={loading.value}>
              提交
            </a-button>
            <a-button
              onClick={() => {
                props.onPrevious?.();
              }}
              style={{ "margin-left": "10px" }}
            >
              上一步
            </a-button>
          </a-form-item>
        </a-form>
      </>
    );
  }
});
