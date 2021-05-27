import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import { PageContent, PageHeader } from "@/components/Page";
import {
  PageHeader as AntPageHeader,
  Descriptions,
  Table
} from "ant-design-vue";
import { Card } from "ant-design-vue";
import { ColumnProps } from "ant-design-vue/es/table/interface";
import { getDetail } from "@/services/mock-server/project";

import { ProjectListItem } from "./index";

interface ApiListItem {
  id: number;
  name: string;
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
    const columns: ColumnProps[] = [
      { dataIndex: "id", title: "id" },
      { dataIndex: "name", title: "API名字" }
    ];

    const currentProject = ref<Partial<ProjectListItem>>({});

    const dataSource = reactive<ApiListItem[]>([]);

    const loadDataList = async () => {
      const res = await getDetail({ code: prop.code });
      currentProject.value = { ...res };
      //   dataSource.splice(0);
      //   dataSource.push(...list);
    };

    onMounted(() => {
      loadDataList();
    });

    return () => (
      <>
        <PageHeader>
          <AntPageHeader>基础详情页</AntPageHeader>
        </PageHeader>
        <PageContent>
          <Card>
            <Descriptions title="项目基本信息">
              <Descriptions.Item label="项目英文名">
                {currentProject.value.code}
              </Descriptions.Item>
              <Descriptions.Item label="项目中文名">
                {currentProject.value.name}
              </Descriptions.Item>
            </Descriptions>
            {/* <Descriptions title="退款申请">
              {refund.map(i => (
                <Descriptions.Item label={i.label}>{i.value}</Descriptions.Item>
              ))}
            </Descriptions>
            <Divider />
            <Descriptions title="用户信息">
              {userInfo.map(i => (
                <Descriptions.Item label={i.label}>{i.value}</Descriptions.Item>
              ))}
            </Descriptions>
            <Divider /> */}
            {/* <Table
              rowKey="id"
              style={{
                "margin-bottom": "24px"
              }}
              scroll={{ x: "100%" }}
              title={() => "退货商品"}
              columns={returnGoodsColumns}
              dataSource={returnGoods}
              pagination={false}
            /> */}
            <Table
              rowKey="id"
              style={{
                "margin-bottom": "24px"
              }}
              scroll={{ x: "100%" }}
              title={() => "API列表"}
              columns={columns}
              dataSource={dataSource}
              pagination={false}
            />
          </Card>
        </PageContent>
      </>
    );
  }
});
