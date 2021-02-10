import { defineComponent, reactive, ref } from "vue";
import HeaderContent from "@/components/Page/Header";
import Content from "@/components/Page/Content";
import { MethodsType } from "../basic";
import style from "./style.module.less";

const warehouseRules = {};

export default defineComponent({
  setup() {
    const warehouseForm = reactive({
      name: undefined,
      url: undefined,
      manager: undefined,
      approver: undefined,
      effectDate: undefined,
      type: undefined
    });
    const warehouseRef = ref<MethodsType>(undefined);

    return () => (
      <>
        <HeaderContent>
          <a-page-header title="高级表单">
            高级表单常见于一次性输入和提交大批量数据的场景。
          </a-page-header>
        </HeaderContent>
        <Content>
          <a-card title="仓库管理">
            <a-form
              ref={warehouseRef}
              model={warehouseForm}
              rules={warehouseRules}
              layout="horizontal"
            >
              <a-row>
                <a-col sm={24} md={12} lg={6}>
                  <a-form-item
                    label="仓库名"
                    name="name"
                    class={style["advanced-form"]}
                  >
                    <a-input
                      v-model={[warehouseForm.name, "value"]}
                      placeholder="请输入仓库名称"
                    />
                  </a-form-item>
                </a-col>
                <a-col sm={24} md={12} lg={8}>
                  <a-form-item
                    label="仓库域名"
                    name="url"
                    class={style["advanced-form"]}
                  >
                    <a-input
                      v-model={[warehouseForm.url, "value"]}
                      placeholder="请输入"
                      addon-before="Http://"
                      addon-after=".com"
                    />
                  </a-form-item>
                </a-col>
                <a-col sm={24} md={24} lg={10} xl={{ span: 9, offset: 1 }}>
                  <a-form-item
                    label="仓库管理员"
                    name="manager"
                    class={style["advanced-form"]}
                  >
                    <a-select
                      v-model={[warehouseForm.manager, "value"]}
                      placeholder="请选择管理员"
                    >
                      <a-select-option value="dijia">迪迦</a-select-option>
                      <a-select-option value="tailuo">泰罗</a-select-option>
                      <a-select-option value="aidi">艾迪</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col sm={24} md={12} lg={6}>
                  <a-form-item
                    label="审批人"
                    name="approver"
                    class={style["advanced-form"]}
                  >
                    <a-select
                      v-model={[warehouseForm.approver, "value"]}
                      placeholder="请选择审批员"
                    >
                      <a-select-option value="dijia">左菲</a-select-option>
                      <a-select-option value="aisi">艾斯</a-select-option>
                      <a-select-option value="aidi">赛文</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col sm={24} md={12} lg={8}>
                  <a-form-item
                    label="生效日期"
                    name="effectDate"
                    class={style["advanced-form"]}
                  >
                    <a-range-picker
                      v-model={[warehouseForm.effectDate, "value"]}
                      style={{ width: "100%" }}
                    />
                  </a-form-item>
                </a-col>
                <a-col sm={24} md={24} lg={10} xl={{ span: 9, offset: 1 }}>
                  <a-form-item
                    label="仓库类型"
                    name="type"
                    class={style["advanced-form"]}
                  >
                    <a-select
                      v-model={[warehouseForm.type, "value"]}
                      placeholder="请选择仓库类型"
                    >
                      <a-select-option value="public">公开</a-select-option>
                      <a-select-option value="private">私密</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-card>
        </Content>
      </>
    );
  }
});
