import { List, Tag } from "ant-design-vue";
import { defineComponent, reactive } from "vue";
import style from "./style.module.less";
import {
  AlipayCircleFilled,
  StarOutlined,
  LikeOutlined,
  MessageOutlined
} from "@ant-design/icons-vue";

interface TableListItem {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

export default defineComponent({
  setup() {
    const dataSource = reactive<TableListItem[]>([]);
    const actions = reactive([
      { id: 1, type: <StarOutlined />, text: "156" },
      { id: 2, type: <LikeOutlined />, text: "156" },
      { id: 3, type: <MessageOutlined />, text: "2" }
    ]);

    for (let i = 0; i < 23; i++) {
      dataSource.push({
        href: "https://www.antdv.com/",
        title: `ant design vue part ${i}`,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        description:
          "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
      });
    }

    return () => (
      <List itemLayout="vertical" size="large" dataSource={dataSource}>
        {{
          renderItem: ({ item }: { item: TableListItem }) => (
            <List.Item
              key={item.title}
              actions={actions.map(i => (
                <span key={i.id}>
                  {i.type}
                  {i.text}
                </span>
              ))}
            >
              <List.Item.Meta
                description={
                  <span>
                    <Tag>Ant Design</Tag>
                    <Tag>JAVA</Tag>
                    <Tag>GoLang</Tag>
                  </span>
                }
                title={item.title}
              />
              <div class={style["list-content"]}>
                <div class={style["description"]}>{item.description}</div>
                <div class={style["extra"]}>
                  <AlipayCircleFilled style="color:red;margin-right:10px" />
                  <a>小满</a>
                  的个人主页
                  <a href="http://shuxiaoman.gitee.io/grain-full-personal">
                    http://shuxiaoman.gitee.io/grain-full-personal
                  </a>
                </div>
              </div>
            </List.Item>
          )
        }}
      </List>
    );
  }
});
