import { defineComponent, onMounted, reactive } from "vue";
import {
  SendOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined
} from "@ant-design/icons-vue";
import {
  Avatar,
  PageHeader as AntPageHeader,
  Button,
  Card,
  List
} from "ant-design-vue";
import { PageHeader, PageContent } from "@/components/Page";
import { getCardList } from "@/services/list/card";
import style from "./style.module.less";

export interface TableListItem {
  avatar: string;
  metaTitle: string;
  metaDesc: string;
}

const { Meta } = Card;
const { Item: ListItem } = List;

export default defineComponent({
  setup() {
    const cardList = reactive<(TableListItem | {})[]>([]);

    const loadDataList = async () => {
      const { list } = await getCardList();
      cardList.splice(0);
      // cardList.push({ avatar: "", metaDesc: "", metaTitle: "" });
      cardList.push({});
      cardList.push(...list);
      console.log(cardList);
    };

    onMounted(async () => {
      loadDataList();
    });

    const CardActions = [
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />
    ];

    return () => (
      <>
        <PageHeader>
          <AntPageHeader title="卡片列表">
            段落示意：蚂蚁金服务设计平台
            ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
            提供跨越设计与开发的体验解决方案。
            <div>
              <Button type="link" size="large">
                {{
                  icon: () => <SendOutlined />,
                  default: () => "快速开始"
                }}
              </Button>
              <Button type="link" size="large">
                {{
                  icon: () => <InfoCircleOutlined />,
                  default: () => "产品简介"
                }}
              </Button>
              <Button type="link" size="large">
                {{
                  icon: () => <FileTextOutlined />,
                  default: () => "产品文档"
                }}
              </Button>
            </div>
          </AntPageHeader>
        </PageHeader>
        <PageContent>
          <List
            grid={{
              column: 24,
              gutter: 0,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4
            }}
            dataSource={cardList}
          >
            {{
              renderItem: ({
                item,
                index
              }: {
                item: TableListItem;
                index: number;
              }) => (
                <ListItem style="padding:0 8px">
                  {index === 0 ? (
                    <Button class={style["new-btn"]} type="dashed">
                      <PlusOutlined />
                      新增产品
                    </Button>
                  ) : (
                    <Card hoverable actions={CardActions}>
                      <Meta
                        title={item.metaTitle}
                        avatar={[<Avatar src={item.avatar}></Avatar>]}
                        description={
                          <div class={style["card-description"]}>
                            {item.metaDesc}
                          </div>
                        }
                      />
                    </Card>
                  )}
                </ListItem>
              )
            }}
          </List>
        </PageContent>
      </>
    );
  }
});
