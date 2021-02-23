import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
  UnwrapRef
} from "vue";
import { PageHeader, PageContent } from "@/components/Page";
import { MethodsType } from "../basic";
import { PlusOutlined } from "@ant-design/icons-vue";
import {
  Input,
  Popconfirm,
  PageHeader as AntPageHeader,
  Card,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Table,
  Button
} from "ant-design-vue";
import style from "./style.module.less";
import avStyle from "@/components/style.module.less";

const { Item: FormItem } = Form;
const { Option: SelectOption } = Select;
const { RangePicker } = DatePicker;

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
            <Input
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
                  <Popconfirm
                    title="确定要删除码？"
                    onConfirm={() => {
                      deleteFn(record.key);
                    }}
                  >
                    <a>删除</a>
                  </Popconfirm>
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
        <PageHeader>
          <AntPageHeader title="高级表单">
            高级表单常见于一次性输入和提交大批量数据的场景。
          </AntPageHeader>
        </PageHeader>
        <PageContent>
          <Card title="仓库管理" class={avStyle["av-card"]}>
            <Form
              ref={warehouseRef}
              model={warehouseForm}
              rules={warehouseRules}
              layout="horizontal"
            >
              <Row>
                <Col sm={24} md={12} lg={6}>
                  <FormItem
                    label="仓库名"
                    name="wareName"
                    class={style["advanced-form"]}
                  >
                    <Input
                      v-model={[warehouseForm.wareName, "value"]}
                      placeholder="请输入仓库名称"
                    />
                  </FormItem>
                </Col>
                <Col sm={24} md={12} lg={8}>
                  <FormItem
                    label="仓库域名"
                    name="wareUrl"
                    class={style["advanced-form"]}
                  >
                    <Input
                      v-model={[warehouseForm.wareUrl, "value"]}
                      placeholder="请输入"
                      addon-before="Http://"
                      addon-after=".com"
                    />
                  </FormItem>
                </Col>
                <Col sm={24} md={24} lg={10} xl={{ span: 9, offset: 1 }}>
                  <FormItem
                    label="仓库管理员"
                    name="wareManager"
                    class={style["advanced-form"]}
                  >
                    <Select
                      v-model={[warehouseForm.wareManager, "value"]}
                      placeholder="请选择管理员"
                    >
                      <SelectOption value="dijia">迪迦</SelectOption>
                      <SelectOption value="tailuo">泰罗</SelectOption>
                      <SelectOption value="aidi">艾迪</SelectOption>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={24} md={12} lg={6}>
                  <FormItem
                    label="审批人"
                    name="wareApprover"
                    class={style["advanced-form"]}
                  >
                    <Select
                      v-model={[warehouseForm.wareApprover, "value"]}
                      placeholder="请选择审批员"
                    >
                      <SelectOption value="dijia">左菲</SelectOption>
                      <SelectOption value="aisi">艾斯</SelectOption>
                      <SelectOption value="aidi">赛文</SelectOption>
                    </Select>
                  </FormItem>
                </Col>
                <Col sm={24} md={12} lg={8}>
                  <FormItem
                    label="生效日期"
                    name="wareEffectDate"
                    class={style["advanced-form"]}
                  >
                    <RangePicker
                      v-model={[warehouseForm.wareEffectDate, "value"]}
                      style={{ width: "100%" }}
                    />
                  </FormItem>
                </Col>
                <Col sm={24} md={24} lg={10} xl={{ span: 9, offset: 1 }}>
                  <FormItem
                    label="仓库类型"
                    name="wareType"
                    class={style["advanced-form"]}
                  >
                    <Select
                      v-model={[warehouseForm.wareType, "value"]}
                      placeholder="请选择仓库类型"
                    >
                      <SelectOption value="public">公开</SelectOption>
                      <SelectOption value="private">私密</SelectOption>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card title="任务管理" class={avStyle["av-card"]}>
            <Form
              ref={taskRef}
              model={taskForm}
              rules={taskRules}
              layout="horizontal"
            >
              <Row>
                <Col sm={24} md={12} lg={6}>
                  <FormItem
                    label="任务名"
                    name="taskName"
                    class={style["advanced-form"]}
                  >
                    <Input
                      v-model={[taskForm.taskName, "value"]}
                      placeholder="请输入任务名称"
                    />
                  </FormItem>
                </Col>
                <Col sm={24} md={12} lg={8}>
                  <FormItem
                    label="任务描述"
                    name="taskDesc"
                    class={style["advanced-form"]}
                  >
                    <Input
                      v-model={[taskForm.taskDesc, "value"]}
                      placeholder="请输入任务描述"
                    />
                  </FormItem>
                </Col>
                <Col sm={24} md={24} lg={10} xl={{ span: 9, offset: 1 }}>
                  <FormItem
                    label="执行人"
                    name="taskExecutor"
                    class={style["advanced-form"]}
                  >
                    <Select
                      v-model={[taskForm.taskExecutor, "value"]}
                      placeholder="请选择执行人"
                    >
                      <SelectOption value="dijia">迪迦</SelectOption>
                      <SelectOption value="tailuo">泰罗</SelectOption>
                      <SelectOption value="aidi">艾迪</SelectOption>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={24} md={12} lg={6}>
                  <FormItem
                    label="责任人"
                    name="taskResponser"
                    class={style["advanced-form"]}
                  >
                    <Select
                      v-model={[taskForm.taskResponser, "value"]}
                      placeholder="请选择责任人"
                    >
                      <SelectOption value="dijia">左菲</SelectOption>
                      <SelectOption value="aisi">艾斯</SelectOption>
                      <SelectOption value="aidi">赛文</SelectOption>
                    </Select>
                  </FormItem>
                </Col>
                <Col sm={24} md={12} lg={8}>
                  <FormItem
                    label="提醒时间"
                    name="taskNotifactionDate"
                    class={style["advanced-form"]}
                  >
                    <DatePicker
                      v-model={[taskForm.taskNotifactionDate, "value"]}
                      style={{ width: "100%" }}
                    />
                  </FormItem>
                </Col>
                <Col sm={24} md={24} lg={10} xl={{ span: 9, offset: 1 }}>
                  <FormItem
                    label="任务类型"
                    name="taskType"
                    class={style["advanced-form"]}
                  >
                    <Select
                      v-model={[taskForm.taskType, "value"]}
                      placeholder="请选择任务类型"
                    >
                      <SelectOption value="regular">定期执行</SelectOption>
                      <SelectOption value="cycle">周期执行</SelectOption>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card
            title="成员管理"
            class={avStyle["av-card"]}
            style="margin-bottom:45px"
          >
            <Table
              rowKey="no"
              columns={columns}
              data-source={dataSource.value}
              pagination={false}
            >
              {tableSlots()}
            </Table>
            <Button
              type="dashed"
              style="width: 100%;margin-top:10px"
              onClick={addNew}
            >
              <PlusOutlined />
              新增成员
            </Button>
          </Card>
          <div class={style["footer-bar"]}>
            <div class={style["footer-bar-left"]}></div>
            <div>
              <Button type="primary">提交</Button>
            </div>
          </div>
        </PageContent>
      </>
    );
  }
});
