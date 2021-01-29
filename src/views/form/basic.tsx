import { defineComponent, reactive } from "vue";
import PageHeader from "@/components/Page/Header";
import PageContent from "@/components/Page/Content";

export default defineComponent({
  setup() {
    const labelCol = { sm: { span: 7 }, lg: { span: 7 } };
    const wrapperCol = { sm: { span: 17 }, lg: 10 };
    const form = reactive({
      name: "",
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });
    const onSubmit = () => {
      console.log(form);
    };
    return () => (
      <>
        <PageHeader>
          <a-page-header title="基础表单">
            表单页面用于收集或验证给用户的信息，基本表单在数据项较少的情况下很常见。
          </a-page-header>
        </PageHeader>
        <PageContent>
          <a-card>
            <a-form model={form} label-col={labelCol} wrapper-col={wrapperCol}>
              <a-form-item label="Activity name">
                <a-input v-model={[form.name, "value"]} />
              </a-form-item>
              <a-form-item label="Activity zone">
                <a-select
                  v-model={[form.region, "value"]}
                  placeholder="please select your zone"
                >
                  <a-select-option value="shanghai">Zone one</a-select-option>
                  <a-select-option value="beijing">Zone two</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Activity time">
                <a-date-picker
                  v-model={[form.date1, "value"]}
                  show-time
                  type="date"
                  placeholder="Pick a date"
                  style={{ width: "100%" }}
                />
              </a-form-item>
              <a-form-item label="Instant delivery">
                <a-switch v-model={[form.delivery, "checked"]} />
              </a-form-item>
              <a-form-item label="Activity type">
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
              <a-form-item label="Resources">
                <a-radio-group v-model={[form.resource, "value"]}>
                  <a-radio value="1">Sponsor</a-radio>
                  <a-radio value="2">Venue</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="Activity form">
                <a-textarea
                  v-model={[form.desc, "value"]}
                  auto-size={{ minRows: 2, maxRows: 5 }}
                />
              </a-form-item>
              <a-form-item wrapper-col={{ span: 14, offset: 4 }}>
                <a-button type="primary" onClick={onSubmit}>
                  Create
                </a-button>
                <a-button style={{ "margin-left": "10px" }}>Cancel</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </PageContent>
      </>
    );
  }
});
