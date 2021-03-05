import { defineComponent, reactive } from "vue";
import { List, Card, Avatar } from "ant-design-vue";
import {
  DownloadOutlined,
  EditOutlined,
  LinkOutlined,
  EllipsisOutlined
} from "@ant-design/icons-vue";
import style from "./style.module.less";

interface TableListItem {
  title: string;
  activeUser: number;
  newUser: number;
}

export default defineComponent({
  setup() {
    const cardList = reactive<TableListItem[]>([]);
    for (let index = 0; index < 10; index++) {
      cardList.push({
        title: "ant design",
        activeUser: 11,
        newUser: 3123
      });
    }
    const CardActions = [
      <DownloadOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <LinkOutlined key="link" />,
      <EllipsisOutlined key="ellips" />
    ];
    return () => (
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
          renderItem: ({ item }: { item: TableListItem }) => (
            <List.Item style="padding:0 8px">
              <Card hoverable actions={CardActions}>
                <List.Item.Meta
                  title={item.title}
                  avatar={[
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"></Avatar>
                  ]}
                />
                <div class={style["card-info"]}>
                  <div>
                    <p>活跃用户</p>
                    <p>{item.activeUser}万</p>
                  </div>
                  <div>
                    <p>新增用户</p>
                    <p>{item.newUser}</p>
                  </div>
                </div>
              </Card>
            </List.Item>
          )
        }}
      </List>
    );
  }
});
