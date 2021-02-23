import { defineComponent, onMounted, reactive, ref } from "vue";
import { PageContent } from "@/components/Page";
import avStyle from "@/components/style.module.less";
import { MethodsType } from "@/views/form/basic";
import { ColumnProps } from "ant-design-vue/es/table/interface";
import style from "./style.module.less";
import {
  PlusOutlined,
  ReloadOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from "@ant-design/icons-vue";
import {
  Badge,
  Space,
  Button,
  Switch,
  Divider,
  Tooltip,
  Dropdown,
  Menu,
  Card,
  Form,
  Row,
  Col,
  Input,
  Table
} from "ant-design-vue";
import { getList } from "@/services/list/search";
import { formatTime } from "@/utils";

enum StateEnum {
  CLOSE = "关闭",
  RUNNING = "运行中",
  EXCEPTION = "异常",
  ONLINE = "已上线"
}

export type TableDataType = {
  ruleName: string;
  desc: string;
  count: number;
  state: keyof typeof StateEnum;
  dispatchTime: number;
};

type PaginationType = {
  current: number;
  pageSize: number;
};

type FilterType = {
  name: string;
  address: string;
};

interface ColumnType extends ColumnProps {
  onFilter?: (value: string, record: TableDataType) => boolean;
}

const rules = {};
const colConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6
};

const stateObj = {
  CLOSE: {
    status: "default",
    text: StateEnum.CLOSE
  },
  EXCEPTION: {
    status: "error",
    text: StateEnum.EXCEPTION
  },
  ONLINE: {
    status: "success",
    text: StateEnum.ONLINE
  },
  RUNNING: {
    status: "processing",
    text: StateEnum.RUNNING
  }
};

export default defineComponent({
  setup() {
    const searchForm = reactive({
      ruleName: "",
      desc: "",
      count: 0,
      state: "",
      dispatchTime: undefined
    });
    const formRef = ref<MethodsType>(undefined);
    const dataSource = reactive<TableDataType[]>([]);
    const isFullScreen = ref(false);
    const tableRef = ref(undefined);

    const columns: ColumnType[] = [
      {
        title: "规则名称",
        dataIndex: "ruleName"
      },
      {
        title: "描述",
        dataIndex: "desc"
      },
      {
        title: "服务调用次数",
        dataIndex: "count",
        sorter: (a: TableDataType, b: TableDataType) => a.count - b.count
      },
      {
        title: "状态",
        dataIndex: "state",
        filters: [
          { text: StateEnum.CLOSE, value: "CLOSE", children: [] },
          { text: StateEnum.EXCEPTION, value: "EXCEPTION", children: [] },
          { text: StateEnum.ONLINE, value: "ONLINE", children: [] },
          { text: StateEnum.RUNNING, value: "RUNNING", children: [] }
        ],
        onFilter: (value: string, record: TableDataType) => {
          return record.state.indexOf(value) === 0;
        },
        customRender: ({ text }) => {
          const o = stateObj[text as keyof typeof StateEnum];
          return <Badge status={o.status} text={o.text} />;
        }
      },
      {
        title: "上次调度时间",
        dataIndex: "dispatchTime",
        sorter: (a: TableDataType, b: TableDataType) =>
          a.dispatchTime - b.dispatchTime,
        customRender: ({ text }) => {
          return formatTime(Number(text));
        }
      },
      {
        title: "操作",
        customRender: () => (
          <span>
            <a>编辑</a>
          </span>
        )
      }
    ];

    const onChange = (
      pagination: PaginationType,
      filters: FilterType[],
      sorter: ColumnType
    ) => {
      console.log("params", pagination, filters, sorter);
    };

    const setIsFullScreen = () => {
      if (!isFullScreen.value) {
        const e = (tableRef.value?.["$el"] as unknown) as HTMLElement;
        e?.requestFullscreen();
        isFullScreen.value = true;
      } else {
        document.exitFullscreen();
        isFullScreen.value = false;
      }
    };

    const loadDataList = async () => {
      const { list } = await getList();
      dataSource.splice(0);
      dataSource.push(...list);
    };

    onMounted(() => {
      loadDataList();
    });

    const ToolBar = () => (
      <div class={style["av-table-list-toolbar"]}>
        <div class={style["av-table-list-toolbar-container"]}>
          <div class={style["av-table-list-toolbar-left"]}>
            <div class={style["av-table-list-toolbar-title"]}>查询表格</div>
          </div>
          <div class={style["av-table-list-toolbar-right"]}>
            <Space>
              <Button type="primary">
                <PlusOutlined />
                新建
              </Button>
              <Switch checked-children="开" un-checked-children="关" />
            </Space>
            <div class={style["av-table-list-toolbar-divider"]}>
              <Divider type="vertical" />
            </div>
            <div class={style["av-table-list-toolbar-setting-item"]}>
              <Tooltip title="刷新">
                <ReloadOutlined />
              </Tooltip>
            </div>
            <div class={style["av-table-list-toolbar-setting-item"]}>
              <Tooltip title="密度">
                <Dropdown
                  trigger={["click"]}
                  overlay={() => (
                    <Menu>
                      <Menu.Item key="0">默认</Menu.Item>
                      <Menu.Item key="1">中等</Menu.Item>
                      <Menu.Item key="3">紧凑</Menu.Item>
                    </Menu>
                  )}
                >
                  <ColumnHeightOutlined />
                </Dropdown>
              </Tooltip>
            </div>
            <div class={style["av-table-list-toolbar-setting-item"]}>
              <Tooltip title="列设置">
                <SettingOutlined />
              </Tooltip>
            </div>
            <div
              onClick={setIsFullScreen}
              class={style["av-table-list-toolbar-setting-item"]}
            >
              <Tooltip title="全屏">
                {isFullScreen.value ? (
                  <FullscreenExitOutlined />
                ) : (
                  <FullscreenOutlined />
                )}
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );

    return () => (
      <PageContent>
        <Card class={avStyle["av-card"]}>
          <Form
            ref={formRef}
            model={searchForm}
            rules={rules}
            layout="horizontal"
          >
            <Row>
              <Col {...colConfig} class={style["search-item"]}>
                <Form.Item label="规则名称" wrapperCol={{ flex: "1 1" }}>
                  <Input v-model={[searchForm.ruleName, "value"]} />
                </Form.Item>
              </Col>
              <Col {...colConfig} class={style["search-item"]}>
                <Form.Item label="描述" wrapperCol={{ flex: "1 1" }}>
                  <Input v-model={[searchForm.desc, "value"]} />
                </Form.Item>
              </Col>
              <Col {...colConfig} class={style["search-item"]}>
                <Form.Item label="服务调用次数" wrapperCol={{ flex: "1 1" }}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card ref={tableRef} class={avStyle["av-card"]}>
          <ToolBar />
          <Table
            size="middle"
            rowKey="ruleName"
            columns={columns}
            dataSource={dataSource}
            onChange={onChange}
          />
        </Card>
      </PageContent>
    );
  }
});
