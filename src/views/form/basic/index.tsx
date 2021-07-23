import { defineComponent, reactive, ref } from "vue";
import { PageHeader, PageContent } from "@/components/Page";
import { ValidateErrorEntity } from "ant-design-vue/lib/form/interface";
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import {
  PageHeader as AntPageHeader,
  Card,
  Form,
  Select,
  Input,
  DatePicker,
  Switch,
  Checkbox,
  Radio,
  Button,
  Tooltip
} from "ant-design-vue";

const { Item: FormItem } = Form;
const { Option: SelectOption } = Select;
const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup } = Radio;
const { TextArea } = Input;

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
    <Tooltip>
      {{
        title: () => "this is required",
        default: () => (
          <InfoCircleOutlined style="vertical-align: middle;margin-left:5px" />
        )
      }}
    </Tooltip>
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
        <PageHeader>
          <AntPageHeader title="基础表单">
            表单页面用于收集或验证给用户的信息，基本表单在数据项较少的情况下很常见。
          </AntPageHeader>
        </PageHeader>
        <PageContent>
          <Card>
            <Form
              ref={formRef}
              model={form}
              rules={rules}
              label-col={labelCol}
              wrapper-col={wrapperCol}
            >
              <FormItem label={<CustomLabel />} name="name">
                <Input v-model={[form.name, "value"]} />
              </FormItem>
              <FormItem label="Activity zone" name="region">
                <Select
                  v-model={[form.region, "value"]}
                  placeholder="please select your zone"
                >
                  <SelectOption value="shanghai">Zone one</SelectOption>
                  <SelectOption value="beijing">Zone two</SelectOption>
                </Select>
              </FormItem>
              <FormItem label="Activity time" name="date1">
                <DatePicker
                  v-model={[form.date1, "value"]}
                  placeholder="Pick a date"
                  style={{ width: "100%" }}
                />
              </FormItem>
              <FormItem label="Instant delivery" name="delivery">
                <Switch v-model={[form.delivery, "checked"]} />
              </FormItem>
              <FormItem label="Activity type" name="type">
                <CheckboxGroup v-model={[form.type, "value"]}>
                  <Checkbox value="1" name="type">
                    Online
                  </Checkbox>
                  <Checkbox value="2" name="type">
                    Promotion
                  </Checkbox>
                  <Checkbox value="3" name="type">
                    Offline
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem label="Resources" name="resource">
                <RadioGroup v-model={[form.resource, "value"]}>
                  <Radio value="1">Sponsor</Radio>
                  <Radio value="2">Venue</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="Activity form" name="desc">
                <TextArea
                  v-model={[form.desc, "value"]}
                  auto-size={{ minRows: 2, maxRows: 5 }}
                />
              </FormItem>
              <FormItem label=" " colon={false}>
                <Button type="primary" onClick={onSubmit}>
                  Create
                </Button>
                <Button onClick={resetForm} style={{ "margin-left": "10px" }}>
                  ResetForm
                </Button>
              </FormItem>
            </Form>
          </Card>
        </PageContent>
      </>
    );
  }
});
