import { defineComponent, onMounted, reactive } from "vue";
import Content from "@/components/Page/Content";
import { PlusOutlined } from "@ant-design/icons-vue";
import avStyle from "@/components/style.module.less";
import style from "./style.module.less";
import { getList } from "@/services/list/basic";
import { formatTime } from "@/utils";

const colConfig = {
  xs: 24,
  sm: 8
};

export interface ListItemType {
  avatar: string;
  metaTitle: string;
  metaDesc: string;
  owner: string;
  startTime: number;
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
      <p>{formatTime(item.startTime)}</p>
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

export default defineComponent({
  setup() {
    const dataList = reactive<ListItemType[]>([]);

    const loadDataList = async () => {
      const { list } = await getList();
      dataList.splice(0);
      dataList.push(...list);
    };

    onMounted(() => {
      loadDataList();
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
