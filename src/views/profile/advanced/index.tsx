import { PageContent, PageHeader } from "@/components/Page";
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import {
  PageHeader as AntPageHeader,
  Descriptions,
  Button,
  Tabs,
  Card,
  Steps,
  Divider,
  Empty
} from "ant-design-vue";
import { EllipsisOutlined, DingdingOutlined } from "@ant-design/icons-vue";
import { DescPropType } from "../basic";
import { OrderInfoType, UserInfoType } from "./data";
import { LayoutState } from "@/store/modules/layout";

export default defineComponent({
  setup() {
    const store = useStore<{ layout: LayoutState }>();

    const orderInfo = reactive<DescPropType<OrderInfoType>[]>([
      { id: "creator", label: "创建人", value: "高斯奥特曼" },
      { id: "product", label: "订购产品", value: "打怪兽业务" },
      { id: "creatTime", label: "创建时间", value: "1962-03-02" },
      { id: "relateDoc", label: "关联单据", value: "12421" },
      { id: "effectDate", label: "生效日期", value: "1832-01-01 ~ 2012-11-11" },
      { id: "remark", label: "备注", value: "请尽快确认" },
      { id: "state", label: "状态", value: "待审批" },
      { id: "orderAmount", label: "订单金额", value: "210.21¥" }
    ]);

    const userInfo = reactive<DescPropType<UserInfoType>[]>([
      { id: "userName", label: "用户姓名", value: "奥特之王" },
      { id: "vipId", label: "会员卡号", value: "79872938479129239" },
      { id: "idCard", label: "身份证", value: "3213123913919312" },
      { id: "tel", label: "联系方式", value: "13112312312" },
      { id: "address", label: "联系地址", value: "M78星云-红色巨星" }
    ]);

    const TitleOperation = (
      <>
        <Button.Group style="margin-right:4px">
          <Button>操作</Button>
          <Button>操作</Button>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Button.Group>
        <Button type="primary">主操作</Button>
      </>
    );
    const TitleFooter = (
      <Tabs activeKey="1">
        <Tabs.TabPane key="1" tab="详情" />
        <Tabs.TabPane key="2" tab="规则" />
      </Tabs>
    );

    return () => (
      <>
        <PageHeader>
          <AntPageHeader
            title="单号：21313221"
            extra={TitleOperation}
            footer={TitleFooter}
          >
            <Descriptions title="退款申请">
              {orderInfo.map(i => (
                <Descriptions.Item label={i.label}>
                  {i.id === "relateDoc" ? <a>{i.value}</a> : i.value}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </AntPageHeader>
        </PageHeader>

        <PageContent>
          <Card title="流程进度">
            <Steps
              progressDot
              direction={
                store.state.layout.isMobile ? "vertical" : "horizontal"
              }
              current={1}
            >
              <Steps.Step
                title="创建项目"
                description={() => (
                  <>
                    梦比优斯奥特曼
                    <DingdingOutlined style="margin-left:8px" />
                    <div>2016-12-12 12:32</div>
                  </>
                )}
              />
              <Steps.Step
                title="部门初审"
                description={() => (
                  <>
                    雷欧奥特曼
                    <DingdingOutlined style="color: rgb(0, 160, 233); margin-left: 8px;" />
                    <div>
                      <a>催一下</a>
                    </div>
                  </>
                )}
              />
              <Steps.Step title="财务复核" />
              <Steps.Step title="完成" />
            </Steps>
          </Card>
          <Card title="用户信息" style="margin-top:24px">
            <Descriptions>
              {userInfo.map(i => (
                <Descriptions.Item label={i.label}>{i.value}</Descriptions.Item>
              ))}
            </Descriptions>
            <Descriptions title="信息组">
              <Descriptions.Item label="某数据">312</Descriptions.Item>
              <Descriptions.Item label="更新时间">2020-01-01</Descriptions.Item>
              <Descriptions.Item label="更新人">察克奥特曼</Descriptions.Item>
              <Descriptions.Item label="位置">尖沙咀</Descriptions.Item>
            </Descriptions>
            <Card bordered title="多层信息组" type="inner">
              <Descriptions title="组名称">
                <Descriptions.Item label="负责人">尤莉安</Descriptions.Item>
                <Descriptions.Item label="角色码">1236543</Descriptions.Item>
                <Descriptions.Item label="部门">
                  xx公司-yy部门
                </Descriptions.Item>
                <Descriptions.Item label="过期时间">
                  2010-01-10
                </Descriptions.Item>
                <Descriptions.Item label="描述">
                  奥特之星的公主，爱迪奥特曼的青梅竹马。被加尔坦大王追赶而来到了地球。
                </Descriptions.Item>
              </Descriptions>
              <Divider />
              <Descriptions title="组名称">
                <Descriptions.Item label="经历">
                  奥特之星的公主，爱迪奥特曼的青梅竹马。被加尔坦大王追赶而来到了地球。以轻盈的动作玩弄敌人，与爱迪共同作战，但本来不是战士。在地球上的身姿是ＵＧＭ的星凉子准队员
                </Descriptions.Item>
              </Descriptions>
              <Divider />
              <Descriptions title="组名称">
                <Descriptions.Item label="负责人">基托奥特曼</Descriptions.Item>
                <Descriptions.Item label="出生地">
                  Z95星云·闪光之国
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Card>
          <Card title="半年消灭怪兽记录" style="margin-top:24px">
            <Empty />
          </Card>
          <Card title="日志记录" style="margin-top:24px">
            <Empty />
          </Card>
        </PageContent>
      </>
    );
  }
});
