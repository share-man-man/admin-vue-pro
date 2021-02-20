import { defineComponent, reactive, ref } from "vue";
import HeaderContent from "@/components/Page/Header";
import Content from "@/components/Page/Content";
import { ValidateErrorEntity } from "ant-design-vue/lib/form/interface";
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import { Form } from "ant-design-vue";

export declare type MethodsType = typeof Form.methods;

const labelCol = { sm: { span: 7 }, lg: { span: 7 } };
const wrapperCol = { sm: { span: 17 }, lg: 10 };
const rules = {
  name: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "blur"
    },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change"
    }
  ],
  date1: [
    {
      required: true,
      message: "Please pick a date",
      trigger: "change",
      type: "object"
    }
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change"
    }
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change"
    }
  ],
  desc: [
    {
      required: true,
      message: "Please input activity form",
      trigger: "blur"
    }
  ]
};

const CustomLabel = () => (
  <label>
    Activity name
    <a-tooltip>
      {{
        title: () => "this is required",
        default: () => (
          <InfoCircleOutlined style="vertical-align: middle;margin-left:5px" />
        )
      }}
    </a-tooltip>
  </label>
);

export default defineComponent({
  name: "Basic",
  setup() {
    const form = reactive({
      name: "",
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });
    const formRef = ref<MethodsType>(undefined);

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

    const resetForm = () => {
      formRef.value?.resetFields?.("");
    };

    return () => (
      <>
        <HeaderContent>
          <a-page-header title="基础表单">
            表单页面用于收集或验证给用户的信息，基本表单在数据项较少的情况下很常见。
          </a-page-header>
        </HeaderContent>
        <Content>
          <a-card>
            <a-form
              ref={formRef}
              model={form}
              rules={rules}
              label-col={labelCol}
              wrapper-col={wrapperCol}
            >
              <a-form-item label={() => <CustomLabel />} name="name">
                <a-input v-model={[form.name, "value"]} />
              </a-form-item>
              <a-form-item label="Activity zone" name="region">
                <a-select
                  v-model={[form.region, "value"]}
                  placeholder="please select your zone"
                >
                  <a-select-option value="shanghai">Zone one</a-select-option>
                  <a-select-option value="beijing">Zone two</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Activity time" name="date1">
                <a-date-picker
                  v-model={[form.date1, "value"]}
                  show-time
                  type="date"
                  placeholder="Pick a date"
                  style={{ width: "100%" }}
                />
              </a-form-item>
              <a-form-item label="Instant delivery" name="delivery">
                <a-switch v-model={[form.delivery, "checked"]} />
              </a-form-item>
              <a-form-item label="Activity type" name="type">
                <a-checkbox-group v-model={[form.type, "value"]}>
                  <a-checkbox value="1" name="type">
                    Online
                  </a-checkbox>
                  <a-checkbox value="2" name="type">
                    Promotion
                  </a-checkbox>
                  <a-checkbox value="3" name="type">
                    Offline
                  </a-checkbox>
                </a-checkbox-group>
              </a-form-item>
              <a-form-item label="Resources" name="resource">
                <a-radio-group v-model={[form.resource, "value"]}>
                  <a-radio value="1">Sponsor</a-radio>
                  <a-radio value="2">Venue</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="Activity form" name="desc">
                <a-textarea
                  v-model={[form.desc, "value"]}
                  auto-size={{ minRows: 2, maxRows: 5 }}
                />
              </a-form-item>
              <a-form-item label=" " colon={false}>
                <a-button type="primary" onClick={onSubmit}>
                  Create
                </a-button>
                <a-button onClick={resetForm} style={{ "margin-left": "10px" }}>
                  ResetForm
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </Content>
      </>
    );
  }
});
