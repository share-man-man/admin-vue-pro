import { defineComponent, reactive, ref } from "vue";
import Content from "@/components/Page/Content";
import avStyle from "@/components/style.module.less";
import { MethodsType } from "@/views/form/basic";

const rules = {};

export default defineComponent({
  setup() {
    const searchForm = reactive({
      ruleName: "",
      desc: "",
      count: 0
    });
    const formRef = ref<MethodsType>(undefined);

    return () => (
      <>
        <Content>
          <a-card class={avStyle["av-card"]}>
            <a-form
              ref={formRef}
              model={searchForm}
              rules={rules}
              layout="horizontal"
            >
              <a-form-item label="规则名称">
                <a-input v-model={[searchForm.ruleName, "value"]} />
              </a-form-item>
              <a-form-item label="描述">
                <a-input v-model={[searchForm.desc, "value"]} />
              </a-form-item>
              <a-form-item label="服务调用次数">
                <a-input />
              </a-form-item>
            </a-form>
          </a-card>
          <a-card></a-card>
        </Content>
      </>
    );
  }
});
