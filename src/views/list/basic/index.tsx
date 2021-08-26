import { defineComponent, onMounted, reactive } from "vue";
import { PageContent } from "@/components/Page";
import { PlusOutlined } from "@ant-design/icons-vue";
import {
  RadioGroup,
  RadioButton,
  InputSearch,
  Progress,
  Card,
  Row,
  Col,
  Button,
  List,
  Dropdown,
  Menu,
  Avatar
} from "ant-design-vue";
import avStyle from "@/components/style.module.less";
import style from "./style.module.less";
import { getList } from "@/services/list/basic";
import { formatTime } from "@/utils";

import { ProgressStatuses } from "ant-design-vue/es/progress/props";

const colConfig = {
  xs: 24,
  sm: 8
};

type StatusType = typeof ProgressStatuses[number];

export interface ListItemType {
  avatar: string;
  metaTitle: string;
  metaDesc: string;
  owner: string;
  startTime: number;
  process: number;
  status: StatusType;
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
    <RadioGroup defaultValue="a">
      <RadioButton value="a">所有</RadioButton>
      <RadioButton value="b">进行中</RadioButton>
      <RadioButton value="c">等待中</RadioButton>
    </RadioGroup>
    <InputSearch placeholder="请输入值" style="width: 272px;margin-left:16px" />
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
      <Progress
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
        <PageContent>
          <Card class={avStyle["av-card"]}>
            <Row>
              <Col {...colConfig}>
                <HeaderInfo lable="我的待办" text="8个任务" />
              </Col>
              <Col {...colConfig}>
                <HeaderInfo lable="本周任务平均处理时间" text="32分钟" />
              </Col>
              <Col {...colConfig}>
                <HeaderInfo lable="本周完成任务数" text="24个任务" noDivider />
              </Col>
            </Row>
          </Card>

          <Card title="基础列表" class={avStyle["av-card"]}>
            {{
              extra: () => <ExtraContent />,
              default: () => (
                <>
                  <Button type="dashed" style="width: 100%;margin-top:10px">
                    <PlusOutlined />
                    新增
                  </Button>
                  <List dataSource={dataList}>
                    {{
                      renderItem: ({ item }: { item: ListItemType }) => (
                        <List.Item>
                          {{
                            actions: () => (
                              <>
                                <a>编辑</a>
                                <Dropdown>
                                  {{
                                    default: () => <a>更多</a>,
                                    overlay: () => (
                                      <Menu>
                                        <Menu.Item>
                                          <a>编辑</a>
                                        </Menu.Item>
                                        <Menu.Item>
                                          <a>删除</a>
                                        </Menu.Item>
                                      </Menu>
                                    )
                                  }}
                                </Dropdown>
                              </>
                            ),
                            default: () => (
                              <>
                                <List.Item.Meta description={item.metaDesc}>
                                  {{
                                    title: () => <a>{item.metaTitle}</a>,
                                    avatar: () => <Avatar src={item.avatar} />
                                  }}
                                </List.Item.Meta>
                                <ListContent item={item} />
                              </>
                            )
                          }}
                        </List.Item>
                      )
                    }}
                  </List>
                </>
              )
            }}
          </Card>
        </PageContent>
      </>
    );
  }
});
