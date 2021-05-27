import { defineComponent, onMounted } from "vue";
import { PageContent } from "@/components/Page";
import { Button } from "ant-design-vue";
import { getList } from "@/services/mock-server/project";
import { useRouter } from "vue-router";
import ProTable, { ProColumnType } from "@/components/Pro/ProTable";

export interface ProjectListItem {
  id: number;
  code: string;
  name: string;
}

export default defineComponent({
  setup() {
    // const dataSource = reactive<ProjectListItem[]>([]);
    const router = useRouter();

    // const onChange = (
    //   pagination: PaginationType,
    //   filters: ProjectListItem[],
    //   sorter: ProjectListItem
    // ) => {
    //   console.log("params", pagination, filters, sorter);
    // };

    const columns: ProColumnType[] = [
      { dataIndex: "id", title: "id", hideInForm: true },
      { dataIndex: "code", title: "项目英文名" },
      { dataIndex: "name", title: "项目中文名" },
      {
        dataIndex: "option",
        title: "操作",
        customRender: ({ record }: { record: ProjectListItem }) => (
          <Button
            type="link"
            onClick={() => {
              router.push({
                path: "/mock-server/project/detail",
                query: {
                  code: record.code
                }
              });
            }}
          >
            详情
          </Button>
        )
      }
    ];

    // const loadDataList = async () => {
    //   const { list } = await getList({ current: 1, pageSize: 10 });
    //   dataSource.splice(0);
    //   dataSource.push(...list);
    // };

    onMounted(() => {
      // loadDataList();
    });

    return () => (
      <PageContent>
        <ProTable
          rowKey="id"
          columns={columns}
          request={(params, sorter, filter) =>
            getList({ ...params, sorter, filter })
          }
        />
      </PageContent>
    );
  }
});
