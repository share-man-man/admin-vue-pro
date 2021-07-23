import { MethodsType } from "@/views/form/basic";
import { Form, Input, Select, Button } from "ant-design-vue";
import { ValidateErrorEntity } from "ant-design-vue/lib/form/interface";
import { defineComponent, reactive, ref } from "vue";

const labelCol = { sm: { span: 7 }, lg: { span: 7 } };
const wrapperCol = { sm: { span: 17 }, lg: 10 };

export default defineComponent({
  setup() {
    const formRef = ref<MethodsType>(undefined);
    const form = reactive({
      email: "651487447@qq.com",
      nickname: "GrainFull",
      profile: "",
      country: "zh",
      address: ""
    });
    const rules = {
      email: [
        {
          required: true,
          validator(_: Record<string, any>[], value: string) {
            return new Promise((resolve, reject) => {
              if (!value) {
                reject("email is required");
                return;
              }
              const regex = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
              const valdit = regex.test(value);
              if (!valdit) {
                reject("邮箱格式不正确");
                return;
              }
              resolve(true);
            });
          }
        }
      ],
      // nickname: [
      //   {
      //     required: true,
      //     validator() {
      //       return new Promise(resolve => {
      //         resolve(true);
      //       });
      //     }
      //   }
      // ],
      address: [
        {
          required: true,
          validator() {
            return new Promise(resolve => {
              resolve(true);
            });
          }
        }
      ]
    };
    const onSubmit = () => {
      formRef.value
        ?.validate?.()
        .then(() => {
          console.log("values", form);
        })
        .catch((error: ValidateErrorEntity) => {
          console.log("error", error);
        });
    };
    return () => (
      <div>
        <Form
          ref={formRef}
          model={form}
          rules={rules}
          label-col={labelCol}
          wrapper-col={wrapperCol}
        >
          <Form.Item label="Email" name="email">
            <Input v-model={[form.email, "value"]} />
          </Form.Item>
          <Form.Item label="Nickname" name="nickname" required>
            <Input v-model={[form.nickname, "value"]} />
          </Form.Item>
          <Form.Item label="Personal profile" name="profile">
            <Input.TextArea
              v-model={[form.profile, "value"]}
              placeholder="descrip yourself in some words"
            />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Select v-model={[form.country, "value"]}>
              <Select.Option value="zh">中国</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="address" name="address">
            <Input v-model={[form.address, "value"]} />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" onClick={onSubmit}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
});
