import { defineComponent, onMounted, reactive, ref, VNode } from "vue";
import Content from "@/components/Page/Content";
import avStyle from "@/components/style.module.less";
import { MethodsType } from "@/views/form/basic";
import { ColumnProps } from "ant-design-vue/es/table/interface";
import style from "./style.module.less";

enum StateEnum {
  CLOSE = "关闭",
  RUNNING = "运行中",
  EXCEPTION = "异常",
  ONLINE = "已上线"
}

type TableDataType = {
  ruleName: string;
  desc: string;
  count: number;
  state: keyof typeof StateEnum;
  dispatchTime: Date;
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
// type ColumnType = {
//   title: string;
//   dataIndex: string;
//   filters?: {
//     text: string;
//     value: string;
//     children?: {
//       text: string;
//       value: string;
//     }[];
//   }[];
//   onFilter?: (value: string, record: TableDataType) => boolean;
//   sorter?: (a: TableDataType, b: TableDataType) => number;
//   sortDirections?: string[];
//   defaultSortOrder?: string;
//   filterMultiple?: string[] | boolean;
//   // customRender?: (r: {
//   //   text: string;
//   //   record: TableDataType;
//   //   index: number;
//   // }) => Object;
// };

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
          return <a-badge status={o.status} text={o.text} />;
        }
      },
      {
        title: "上次调度时间",
        dataIndex: "dispatchTime",
        sorter: (a: TableDataType, b: TableDataType) =>
          a.dispatchTime?.getTime() - b.dispatchTime?.getTime(),
        customRender: ({ text }) => {
          return text?.getTime();
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

    onMounted(() => {
      let stateRound: keyof typeof StateEnum = "CLOSE";
      for (let index = 0; index < 120; index++) {
        stateRound =
          index % 4 === 0
            ? "CLOSE"
            : index % 4 === 1
            ? "EXCEPTION"
            : index % 4 === 2
            ? "ONLINE"
            : "RUNNING";
        dataSource.push({
          ruleName: `规则名称-${index}`,
          desc: `描述-${index}`,
          count: Math.round(Math.random() * 100),
          state: stateRound,
          dispatchTime: new Date()
        });
      }
    });

    return () => (
      <Content>
        <a-card class={avStyle["av-card"]}>
          <a-form
            ref={formRef}
            model={searchForm}
            rules={rules}
            layout="horizontal"
          >
            <a-row>
              <a-col {...colConfig} class={style["search-item"]}>
                <a-form-item label="规则名称" wrapperCol={{ flex: "1 1" }}>
                  <a-input v-model={[searchForm.ruleName, "value"]} />
                </a-form-item>
              </a-col>
              <a-col {...colConfig} class={style["search-item"]}>
                <a-form-item label="描述" wrapperCol={{ flex: "1 1" }}>
                  <a-input v-model={[searchForm.desc, "value"]} />
                </a-form-item>
              </a-col>
              <a-col {...colConfig} class={style["search-item"]}>
                <a-form-item label="服务调用次数" wrapperCol={{ flex: "1 1" }}>
                  <a-input />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>
        <a-card class={avStyle["av-card"]}>
          <a-table
            size="middle"
            rowKey="ruleName"
            title={() => "查询表格"}
            columns={columns}
            dataSource={dataSource}
            onChange={onChange}
          />
        </a-card>
      </Content>
    );
  }
});
