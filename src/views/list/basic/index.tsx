import { defineComponent, onMounted, reactive } from "vue";
import Content from "@/components/Page/Content";
import { PlusOutlined } from "@ant-design/icons-vue";
import avStyle from "@/components/style.module.less";
import style from "./style.module.less";

const colConfig = {
  xs: 24,
  sm: 8
};

interface ListItemType {
  avatar: string;
  metaTitle: string;
  metaDesc: string;
  owner: string;
  startTime: Date;
  process: number;
  status: string;
}

interface HeaderInfoProp {
  lable: string;
  text: string;
  noDivider?: boolean;
}

const HeaderInfo: (p: HeaderInfoProp) => JSX.Element = ({
  lable,
  text,
  noDivider = false
}) => (
  <div class={style["basic-list-header-info"]}>
    <span>{lable}</span>
    <p>{text}</p>
    {!noDivider && <em />}
  </div>
);

const ExtraContent = () => (
  <div class={style["extra-content"]}>
    <a-radio-group defaultValue="a">
      <a-radio-button value="a">全部</a-radio-button>
      <a-radio-button value="b">进行中</a-radio-button>
      <a-radio-button value="c">等待中</a-radio-button>
    </a-radio-group>
    <a-input-search
      placeholder="请输入"
      style="width: 272px;margin-left:16px"
    />
  </div>
);

const ListContent: (p: { item: ListItemType }) => JSX.Element = ({ item }) => (
  <div class={style["list-content"]}>
    <div class={style["list-content-item"]}>
      <span>Owner</span>
      <p>{item.owner}</p>
    </div>
    <div class={style["list-content-item"]}>
      <span>开始时间</span>
      <p>{item.startTime?.getTime()}</p>
    </div>
    <div class={style["list-content-item"]}>
      <a-progress
        percent={item.process}
        status={item.status}
        style="width:180px"
      />
    </div>
  </div>
);

// const dataSource: ListItemType[] = ;

export default defineComponent({
  setup() {
    const dataList = reactive<ListItemType[]>([]);
    onMounted(() => {
      [
        {
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
          metaTitle: "Alipay",
          metaDesc:
            "全部新生代英雄（银河、维克特利、艾克斯、欧布、捷德、罗索、布鲁、格丽乔、泰迦、泰塔斯、风马）的力量与工藤优幸一起诞生的新奥特曼。",
          owner: "令迦奥特曼",
          startTime: new Date(),
          process: Math.round(Math.random() * 100),
          status: "active"
        },
        {
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
          metaTitle: "Angular",
          metaDesc:
            "曾经守护地球过的泰罗奥特曼（初登场作品『泰罗奥特曼』(1973)）的儿子。真心想得到父亲泰罗的认可却不能坦率表达。",
          owner: "泰迦奥特曼",
          startTime: new Date(),
          process: Math.round(Math.random() * 100),
          status: "exception"
        },
        {
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
          metaTitle: "Ant Design",
          metaDesc:
            "在优幸体内寄宿着的第二位奥特曼。乔尼亚斯奥特曼（初登场作品『乔尼亚斯奥特曼』(1979)）的后辈，身为与光之国不同的奥特之星·U40战士的贤者。",
          owner: "泰塔斯奥特曼",
          startTime: new Date(),
          process: Math.round(Math.random() * 100),
          status: "active"
        },
        {
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
          metaTitle: "Ant Design Pro",
          metaDesc:
            "优幸体内寄宿着的第三位奥特曼。在欧布奥特曼（初登场作品『欧布奥特曼』(2016)），和罗索、布鲁（初登场作品『奥特曼Ｒ／Ｂ』(2018)）授予光之战士力量的行星O-50出身。",
          owner: "风马奥特曼",
          startTime: new Date(),
          process: Math.round(Math.random() * 100),
          status: "active"
        },
        {
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
          metaTitle: "Bootstrap",
          metaDesc:
            "凑家兄妹的感情以及真谛水晶的力量，罗索奥特曼、布鲁、以及格丽乔奥特嫚融合·变身呈现出超进化战斗形态。",
          owner: "格罗布奥特曼",
          startTime: new Date(),
          process: Math.round(Math.random() * 100),
          status: "exception"
        }
      ].forEach(item => {
        dataList.push(item);
      });
    });
    return () => (
      <>
        <Content>
          <a-card class={avStyle["av-card"]}>
            <a-row>
              <a-col {...colConfig}>
                <HeaderInfo lable="我的待办" text="8个任务" />
              </a-col>
              <a-col {...colConfig}>
                <HeaderInfo lable="本周任务平均处理时间" text="32分钟" />
              </a-col>
              <a-col {...colConfig}>
                <HeaderInfo lable="本周完成任务数" text="24个任务" noDivider />
              </a-col>
            </a-row>
          </a-card>

          <a-card title="基础列表" class={avStyle["av-card"]}>
            {{
              extra: () => <ExtraContent />,
              default: () => (
                <>
                  <a-button type="dashed" style="width: 100%;margin-top:10px">
                    <PlusOutlined />
                    添加
                  </a-button>
                  <a-list dataSource={dataList}>
                    {{
                      renderItem: ({ item }: { item: ListItemType }) => (
                        <a-list-item>
                          {{
                            actions: () => (
                              <>
                                <a>编辑</a>
                                <a-dropdown>
                                  {{
                                    default: () => <a>更多</a>,
                                    overlay: () => (
                                      <a-menu>
                                        <a-menu-item>
                                          <a>编辑</a>
                                        </a-menu-item>
                                        <a-menu-item>
                                          <a>删除</a>
                                        </a-menu-item>
                                      </a-menu>
                                    )
                                  }}
                                </a-dropdown>
                              </>
                            ),
                            default: () => (
                              <>
                                <a-list-item-meta description={item.metaDesc}>
                                  {{
                                    title: () => <a>{item.metaTitle}</a>,
                                    avatar: () => <a-avatar src={item.avatar} />
                                  }}
                                </a-list-item-meta>
                                <ListContent item={item} />
                              </>
                            )
                          }}
                        </a-list-item>
                      )
                    }}
                  </a-list>
                </>
              )
            }}
          </a-card>
        </Content>
      </>
    );
  }
});
