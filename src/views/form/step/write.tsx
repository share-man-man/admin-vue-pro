import { message } from "ant-design-vue";
import { ValidateErrorEntity } from "ant-design-vue/lib/form/interface";
import { defineComponent, PropType, reactive, ref, toRefs } from "vue";
import { FormType } from ".";
import { MethodsType } from "../basic";
const labelCol = { sm: { span: 7 }, lg: { span: 7 } };
const wrapperCol = { sm: { span: 17 }, lg: 10 };
const rules = {
  payAccount: [
    {
      required: true,
      message: "轻选择付款账户",
      trigger: "blur"
    }
  ],
  receptAccount: [
    {
      required: true,
      message: "请输入收款账户",
      trigger: "blur"
    }
  ],
  receptName: [
    {
      required: true,
      message: "请输入收款人姓名",
      trigger: "blur"
    }
  ],
  amount: [
    {
      required: true,
      message: "请输入转账金额",
      trigger: "blur"
    },
    {
      validator: async (_: unknown, v: unknown) => {
        if (isNaN(Number(v))) {
          return Promise.reject("请输入正确的数字");
        }
        return Promise.resolve();
      },
      trigger: "blur"
    }
  ]
};
export default defineComponent({
  props: {
    onSubmit: Function as PropType<(val: FormType) => void>,
    form: {
      required: true,
      type: Object as PropType<FormType>
    }
  },
  setup(props) {
    const { form: f } = toRefs(props);
    const form = reactive(f.value);

    const formRef = ref<MethodsType>(undefined);
    const submit = () => {
      formRef.value
        ?.validate?.()
        .then(() => {
          if (form) {
            props.onSubmit?.(form);
          }
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
        <a-form
          ref={formRef}
          model={form}
          rules={rules}
          label-col={labelCol}
          wrapper-col={wrapperCol}
        >
          <a-form-item label="付款账户" name="payAccount">
            <a-select
              v-model={[form.payAccount, "value"]}
              placeholder="ant-design@alipay.com"
            >
              <a-select-option value="zhifubao">
                zhifu@alipay.com
              </a-select-option>
              <a-select-option value="weixin">
                weixin@tencent.com
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="收款账户" name="receptAccount">
            <a-input-group compact>
              <a-select v-model={[form.receptOrg, "value"]} style="width:100px">
                <a-select-option value="bank">银行账户</a-select-option>
                <a-select-option value="alipay">支付宝</a-select-option>
                <a-select-option value="wechat">微信</a-select-option>
              </a-select>
              <a-input
                style="width: calc(100% - 100px)"
                v-model={[form.receptAccount, "value"]}
              />
            </a-input-group>
          </a-form-item>
          <a-form-item label="收款人姓名" name="receptName">
            <a-input v-model={[form.receptName, "value"]} />
          </a-form-item>
          <a-form-item label="转账金额" name="amount">
            <a-input
              v-model={[form.amount, "value"]}
              prefix="￥"
              suffix="RMB"
            />
          </a-form-item>
          <a-form-item label=" " colon={false}>
            <a-button type="primary" onClick={submit}>
              下一步
            </a-button>
          </a-form-item>
        </a-form>
        <a-divider />
        <div style="padding: 0 56px;color: rgba(0,0,0,.45);">
          <h3 style="margin:10px 0;color:rgba(0,0,0,.45);">说明</h3>
          <h4 style="margin:10px 0 0 0;;color:rgba(0,0,0,.45);">
            转账到支付宝账户
          </h4>
          <span style="color:rgba(0,0,0,.45);">
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </span>
          <h4 style="margin:10px 0 0 0;color:rgba(0,0,0,.45);">转账到银行卡</h4>
          <span style="color:rgba(0,0,0,.45);">
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </span>
        </div>
      </>
    );
  }
});
