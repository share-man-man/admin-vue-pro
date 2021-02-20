import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
  UnwrapRef
} from "vue";
import HeaderContent from "@/components/Page/Header";
import Content from "@/components/Page/Content";
import { MethodsType } from "../basic";
import { PlusOutlined } from "@ant-design/icons-vue";
import style from "./style.module.less";
import avStyle from "@/components/style.module.less";

const warehouseRules = {};
const taskRules = {};
const columns = [
  {
    title: "name",
    dataIndex: "name",
    width: "25%",
    slots: { customRender: "name" }
  },
  {
    title: "工号",
    dataIndex: "no",
    width: "15%",
    slots: { customRender: "no" }
  },
  {
    title: "所属部门",
    dataIndex: "org",
    width: "15%",
    slots: { customRender: "org" }
  },
  {
    title: "operation",
    dataIndex: "operation",
    slots: { customRender: "operation" }
  }
];

interface DataItem {
  key: string;
  name: string;
  no: string;
  org: string;
}

export default defineComponent({
  setup() {
    const warehouseForm = reactive({
      wareName: undefined,
      wareUrl: undefined,
      wareManager: undefined,
      wareApprover: undefined,
      wareEffectDate: undefined,
      wareType: undefined
    });
    const taskForm = reactive({
      taskName: undefined,
      taskDesc: undefined,
      taskExecutor: undefined,
      taskResponser: undefined,
      taskNotifactionDate: undefined,
      taskType: undefined
    });
    const warehouseRef = ref<MethodsType>(undefined);
    const taskRef = ref<MethodsType>(undefined);

    const dataSource = ref<DataItem[]>([]);
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
    const memberIndex = ref(0);

    const edit = (key: string) => {
      editableData[key] = toRaw(
        dataSource.value.filter(item => key === item.key)[0]
      );
    };
    const save = (key: string) => {
      const findItem = dataSource.value.find(i => key === i.key);
      if (findItem) {
        const itemKeys = Object.keys(findItem);
        itemKeys.forEach(k => {
          findItem[k as keyof DataItem] =
            editableData[key][k as keyof DataItem];
        });
        delete editableData[key];
      }
    };
    const cancel = (key: string) => {
      delete editableData[key];
    };
    const deleteFn = (key: string) => {
      const index = dataSource.value.findIndex(i => key === i.key);
      if (index > -1) {
        dataSource.value.splice(index, 1);
      }
    };
    const addNew = () => {
      dataSource.value.push({
        key: `key-${memberIndex.value}`,
        name: `name-${memberIndex.value}`,
        no: `${memberIndex.value}号`,
        org: `部门${memberIndex.value}号`
      });
      memberIndex.value += 1;
    };

    const columnSlots: { [key: string]: Function } = {};
    ["name", "no", "org"].forEach(col => {
      columnSlots[col] = ({
        text,
        record
      }: {
        text: string;
        record: DataItem;
      }) => (
        <div>
          {editableData[record.key] ? (
            <a-input
              v-model={[
                editableData[record.key][col as keyof DataItem],
                "value"
              ]}
              style="margin: -5px 0"
            />
          ) : (
            <span>{text}</span>
          )}
        </div>
      );
    });

    const tableSlots = () => {
      return {
        ...columnSlots,
        operation({ record }: { record: DataItem }) {
          return (
            <div class={style["editable-row-operations"]}>
              {editableData[record.key] ? (
                <span>
                  <a
                    onClick={() => {
                      save(record.key);
                    }}
                  >
                    保存
                  </a>
                  <a
                    onClick={() => {
                      cancel(record.key);
                    }}
                  >
                    取消
                  </a>
                </span>
              ) : (
                <span>
                  <a
                    onClick={() => {
                      edit(record.key);
                    }}
                  >
                    编辑
                  </a>
                  <a-popconfirm
                    title="确定要删除码？"
                    onConfirm={() => {
                      deleteFn(record.key);
                    }}
                  >
                    <a>删除</a>
                  </a-popconfirm>
                </span>
              )}
            </div>
          );
        }
      };
    };

    onMounted(() => {
      for (let index = 1; index < 4; index++) {
        addNew();
      }
    });

    return () => (
      <>
        <HeaderContent>
          <a-page-header title="高级表单">
            高级表单常见于一次性输入和提交大批量数据的场景。
          </a-page-header>
        </HeaderContent>
        <Content>
          <a-card title="仓库管理" class={avStyle["av-card"]}>
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
                    name="wareName"
                    class={style["advanced-form"]}
                  >
                    <a-input
                      v-model={[warehouseForm.wareName, "value"]}
                      placeholder="请输入仓库名称"
                    />
                  </a-form-item>
                </a-col>
                <a-col sm={24} md={12} lg={8}>
                  <a-form-item
                    label="仓库域名"
                    name="wareUrl"
                    class={style["advanced-form"]}
                  >
                    <a-input
                      v-model={[warehouseForm.wareUrl, "value"]}
                      placeholder="请输入"
                      addon-before="Http://"
                      addon-after=".com"
                    />
                  </a-form-item>
                </a-col>
                <a-col sm={24} md={24} lg={10} xl={{ span: 9, offset: 1 }}>
                  <a-form-item
                    label="仓库管理员"
                    name="wareManager"
                    class={style["advanced-form"]}
                  >
                    <a-select
                      v-model={[warehouseForm.wareManager, "value"]}
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
                    name="wareApprover"
                    class={style["advanced-form"]}
                  >
                    <a-select
                      v-model={[warehouseForm.wareApprover, "value"]}
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
                    name="wareEffectDate"
                    class={style["advanced-form"]}
                  >
                    <a-range-picker
                      v-model={[warehouseForm.wareEffectDate, "value"]}
                      style={{ width: "100%" }}
                    />
                  </a-form-item>
                </a-col>
                <a-col sm={24} md={24} lg={10} xl={{ span: 9, offset: 1 }}>
                  <a-form-item
                    label="仓库类型"
                    name="wareType"
                    class={style["advanced-form"]}
                  >
                    <a-select
                      v-model={[warehouseForm.wareType, "value"]}
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

          <a-card title="任务管理" class={avStyle["av-card"]}>
            <a-form
              ref={taskRef}
              model={taskForm}
              rules={taskRules}
              layout="horizontal"
            >
              <a-row>
                <a-col sm={24} md={12} lg={6}>
                  <a-form-item
                    label="任务名"
                    name="taskName"
                    class={style["advanced-form"]}
                  >
                    <a-input
                      v-model={[taskForm.taskName, "value"]}
                      placeholder="请输入任务名称"
                    />
                  </a-form-item>
                </a-col>
                <a-col sm={24} md={12} lg={8}>
                  <a-form-item
                    label="任务描述"
                    name="taskDesc"
                    class={style["advanced-form"]}
                  >
                    <a-input
                      v-model={[taskForm.taskDesc, "value"]}
                      placeholder="请输入任务描述"
                    />
                  </a-form-item>
                </a-col>
                <a-col sm={24} md={24} lg={10} xl={{ span: 9, offset: 1 }}>
                  <a-form-item
                    label="执行人"
                    name="taskExecutor"
                    class={style["advanced-form"]}
                  >
                    <a-select
                      v-model={[taskForm.taskExecutor, "value"]}
                      placeholder="请选择执行人"
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
                    label="责任人"
                    name="taskResponser"
                    class={style["advanced-form"]}
                  >
                    <a-select
                      v-model={[taskForm.taskResponser, "value"]}
                      placeholder="请选择责任人"
                    >
                      <a-select-option value="dijia">左菲</a-select-option>
                      <a-select-option value="aisi">艾斯</a-select-option>
                      <a-select-option value="aidi">赛文</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col sm={24} md={12} lg={8}>
                  <a-form-item
                    label="提醒时间"
                    name="taskNotifactionDate"
                    class={style["advanced-form"]}
                  >
                    <a-date-picker
                      v-model={[taskForm.taskNotifactionDate, "value"]}
                      style={{ width: "100%" }}
                    />
                  </a-form-item>
                </a-col>
                <a-col sm={24} md={24} lg={10} xl={{ span: 9, offset: 1 }}>
                  <a-form-item
                    label="任务类型"
                    name="taskType"
                    class={style["advanced-form"]}
                  >
                    <a-select
                      v-model={[taskForm.taskType, "value"]}
                      placeholder="请选择任务类型"
                    >
                      <a-select-option value="regular">
                        定期执行
                      </a-select-option>
                      <a-select-option value="cycle">周期执行</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-card>

          <a-card
            title="成员管理"
            class={avStyle["av-card"]}
            style="margin-bottom:45px"
          >
            <a-table
              rowKey="no"
              columns={columns}
              data-source={dataSource.value}
              pagination={false}
            >
              {tableSlots()}
            </a-table>
            <a-button
              type="dashed"
              style="width: 100%;margin-top:10px"
              onClick={addNew}
            >
              <PlusOutlined />
              新增成员
            </a-button>
          </a-card>
          <div class={style["footer-bar"]}>
            <div class={style["footer-bar-left"]}></div>
            <div>
              <a-button type="primary">提交</a-button>
            </div>
          </div>
        </Content>
      </>
    );
  }
});
