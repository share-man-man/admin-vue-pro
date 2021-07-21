import { defineComponent, PropType, ref } from "vue";
import { PageContent, PageHeader } from "@/components/Page";
import {
  PageHeader as AntPageHeader,
  Descriptions,
  Card,
  Button,
  Space,
  message
} from "ant-design-vue";
import { getDetail, getApiList } from "@/services/mock-server/project";
import ProTable, { ProColumnType } from "@/components/Pro/ProTable";

import { ProjectListItem } from "./index";
import { useRouter } from "vue-router";

export interface ApiListItem {
  id: number;
  name: string;
  project_id: number;
  url: string;
  json_str: string;
}

export default defineComponent({
  props: {
    code: {
      type: String as PropType<ProjectListItem["code"]>,
      required: true,
      default: () => ""
    }
  },
  setup(prop) {
    const currentProject = ref<Partial<ProjectListItem>>({});
    const router = useRouter();
    const columns: ProColumnType[] = [
      { dataIndex: "id", title: "id" },
      { dataIndex: "name", title: "api描述" },
      { dataIndex: "url", title: "请求路径" },
      { dataIndex: "json_str", title: "json字符串", ellipsis: true },
      {
        dataIndex: "option",
        title: "操作",
        customRender: ({ record }: { record: ApiListItem }) => (
          <Space>
            <Button
              type="link"
              onClick={() => {
                const inputEl = document.createElement("input");
                inputEl.setAttribute("value", record.json_str);
                document.body.appendChild(inputEl);
                inputEl.select();
                document.execCommand("copy");
                document.body.removeChild(inputEl);
                message.success("成功复制到剪切板");
                // // console.log(typeof copyRef?.value);
                // copyRef?.value?.onSelect?.();
                // copyRef.value?.value = record.json_str;
                // if (document.execCommand("copy")) {
                //   document.execCommand("copy");
                //   alert("复制成功");
                // }
              }}
            >
              复制json
            </Button>
            <Button
              type="link"
              onClick={() => {
                router.push({
                  path: "/mock-server/project/api",
                  query: {
                    id: record.id,
                    projectId: currentProject.value.id
                  }
                });
              }}
            >
              详情
            </Button>
          </Space>
        )
      }
    ];

    const loadDataList = async () => {
      const res = await getDetail({ code: prop.code });
      currentProject.value = { ...res };
      //   dataSource.splice(0);
      //   dataSource.push(...list);
    };

    // onMounted(() => {
    //   loadDataList();
    // });

    return () => (
      <>
        <PageHeader>
          <AntPageHeader>基础详情页</AntPageHeader>
        </PageHeader>
        <PageContent>
          <Space direction="vertical">
            <Card>
              <Descriptions title="项目基本信息">
                <Descriptions.Item label="项目英文名">
                  {currentProject.value.code}
                </Descriptions.Item>
                <Descriptions.Item label="项目中文名">
                  {currentProject.value.name}
                </Descriptions.Item>
              </Descriptions>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    router.push({
                      path: "/mock-server/project/api"
                    });
                  }}
                >
                  新建api
                </Button>
              </Space>
            </Card>
            <ProTable
              title={() => <h3>api列表</h3>}
              search={false}
              columns={columns}
              request={(params, sorter, filter) =>
                loadDataList().then(() =>
                  getApiList({
                    ...params,
                    sorter,
                    filter: { ...filter, code: currentProject.value.code }
                  })
                )
              }
            />
          </Space>
        </PageContent>
      </>
    );
  }
});
