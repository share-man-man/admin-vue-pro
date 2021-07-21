import { defineComponent, PropType, ref, computed, onMounted } from "vue";
import {
  Space,
  Button,
  Card,
  Form,
  Row,
  Col,
  Input,
  Table
} from "ant-design-vue";
import "../style.less";
import {
  ColumnProps,
  TableProps,
  SortOrder
} from "ant-design-vue/lib/table/interface";
import { defaultTableProps } from "ant-design-vue/lib/table/Table";
import { formColProps } from "./config";
import { deleteEmptyKey } from "@/utils";

export type RequestData<T = unknown> = {
  list: T[] | undefined;
  //   success?: boolean;
  total?: number;
} & Record<string, any>;

export type ProColumnType = ColumnProps & {
  index?: number;
  /**
   * 每个表单占据的格子大小
   *
   * @param 总宽度 = span* colSize
   * @param 默认为 1
   */
  colSize?: number;

  /** 搜索表单的默认值 */
  initialValue?: any;

  /** 是否缩略 */
  ellipsis?: boolean;
  /** 是否拷贝 */
  copyable?: boolean;

  /** @deprecated Use `search=false` instead 在查询表单中隐藏 */
  hideInSearch?: boolean;

  /** 在查询表单中隐藏 */
  // search?:
  //   | false
  //   | {
  //       /**
  //        * Transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
  //        *
  //        * @name 转化值的key, 一般用于事件区间的转化
  //        */
  //       transform: SearchTransformKeyFn;
  //     };

  /** 在 table 中隐藏 */
  hideInTable?: boolean;

  /** 在新建表单中删除 */
  hideInForm?: boolean;

  /** 不在配置工具中显示 */
  hideInSetting?: boolean;

  /** 表头的筛选菜单项 */
  // filters?: boolean | ColumnFilterItem[];

  /** 筛选的函数，设置为 false 会关闭自带的本地筛选 */
  // onFilter?: boolean | ColumnType<T>['onFilter'];

  /** Form 的排序 */
  order?: number;
  /** 可编辑表格是否可编辑 */
  editable?: boolean;

  /** @private */
  listKey?: string;
};

export interface ProTableProps
  extends Omit<TableProps, "columns" | "rowSelection"> {
  //   rowKey?: string;
  columns: ProColumnType[];
  /** @name 一个获得 dataSource 的方法 */
  request?: (
    params: {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, (string | number)[]>
  ) => Promise<Partial<RequestData>>;
  search?: boolean;
}

/* 封装table组件原始参数类型 */
const originProps = {} as typeof defaultTableProps;

const ProTable = defineComponent({
  props: {
    ...originProps,
    columns: {
      type: Object as PropType<ProTableProps["columns"]>
    },
    request: {
      type: (Function as unknown) as PropType<ProTableProps["request"]>
    },
    rowKey: {
      type: String as PropType<ProTableProps["rowKey"]>,
      default: () => "id"
    },
    search: {
      type: Boolean as PropType<ProTableProps["search"]>,
      default: () => true
    }
  },
  setup(props, { attrs }) {
    const form = ref<{
      [key: string]: (string | number)[];
    }>({});
    const formRef = ref<typeof Form.methods>(undefined);
    const dataSource = ref<unknown[]>([]);
    const formList = computed(
      () => props.columns?.filter(i => !i.hideInForm && !i.customRender) || []
    );
    const tableComuns = computed(() =>
      props.columns?.filter(i => !i.hideInTable)
    );

    const pagination = ref({
      total: 0,
      current: 1,
      pageSize: 10
    });

    const onSearch = async () => {
      const res = await props.request?.(
        {
          current: pagination.value.current,
          pageSize: pagination.value.pageSize
        },
        {},
        deleteEmptyKey(form.value)
      );
      dataSource.value = res?.list || [];
      pagination.value.total = res?.total || 0;
    };

    const onReset = () => {
      Object.keys(form.value).forEach(
        k => (form.value[k] = (undefined as unknown) as string[])
      );
    };

    const onPaginationChange = (current: number, pageSize: number) => {
      pagination.value.current = current;
      pagination.value.pageSize = pageSize;
      onSearch();
    };

    onMounted(() => {
      onSearch();
    });

    return () => (
      <div class="av-pro-table">
        {props.search && (
          <Card>
            <Form
              layout="horizontal"
              model={form.value}
              ref={formRef}
              label-col={{ span: 10 }}
              wrapper-col={{ span: 14 }}
            >
              <Row type="flex" justify="start">
                {formList.value.map(i => (
                  <Col {...formColProps}>
                    <Form.Item label={i.title} name={i.dataIndex}>
                      <Input
                        v-model={[form.value[i.dataIndex || ""], "value"]}
                      />
                    </Form.Item>
                  </Col>
                ))}
                {formList.value.length % 2 === 0 && <Col {...formColProps} />}
                <Col
                  {...formColProps}
                  style={{ textAlign: "right", marginBottom: "24px" }}
                >
                  <Space>
                    <Button onClick={onReset}>重置</Button>
                    <Button type="primary" onClick={onSearch}>
                      查询
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form>
          </Card>
        )}
        <Card>
          <Table
            {...attrs}
            rowKey={props.rowKey}
            columns={tableComuns.value}
            dataSource={dataSource.value}
            pagination={{ ...pagination.value, onChange: onPaginationChange }}
          />
        </Card>
      </div>
    );
  }
});

export default ProTable;
