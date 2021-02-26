import { PageContent, PageHeader } from "@/components/Page";
import { PageHeader as AntPageHeader, Descriptions } from "ant-design-vue";
import { Card, Divider } from "ant-design-vue";
import { defineComponent, onMounted, reactive } from "vue";
import { getInfo } from "@/services/profile/basic";
import { RefundType, UserInfoType } from "./data";

type DescPropType<T> = {
  id: keyof T;
  label: string;
  value: string;
};

export default defineComponent({
  setup() {
    const refund = reactive<DescPropType<RefundType>[]>([
      { id: "pickUpNo", label: "取货单号", value: "" },
      { id: "state", label: "状态", value: "" },
      { id: "saleNo", label: "销售单号", value: "" },
      { id: "childNo", label: "子订单", value: "" }
    ]);

    const userInfo = reactive<DescPropType<UserInfoType>[]>([
      { id: "name", label: "用户姓名", value: "" },
      { id: "tel", label: "联系电话", value: "" },
      { id: "express", label: "常用快递", value: "" },
      { id: "address", label: "取货地址", value: "" },
      { id: "mark", label: "备注", value: "" }
    ]);

    onMounted(async () => {
      const { refund: r, userInfo: u } = await getInfo();

      refund.splice(
        0,
        refund.length,
        ...refund.map(i => {
          const ret = i;
          ret.value = r[i.id] as string;
          return ret;
        })
      );

      userInfo.splice(
        0,
        userInfo.length,
        ...userInfo.map(i => {
          const ret = i;
          ret.value = u[i.id] as string;
          return ret;
        })
      );
    });

    return () => (
      <>
        <PageHeader>
          <AntPageHeader>基础详情页</AntPageHeader>
        </PageHeader>
        <PageContent>
          <Card>
            <Descriptions title="退款申请">
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
          </Card>
        </PageContent>
      </>
    );
  }
});
