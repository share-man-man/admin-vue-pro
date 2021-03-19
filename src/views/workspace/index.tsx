import { defineComponent, onMounted, reactive, ref } from "vue";
import { PageHeader, PageContent } from "@/components/Page";
import {
  Avatar,
  Button,
  Card,
  Col,
  List,
  PageHeader as AntPageHeader,
  Row,
  Statistic
} from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import HeaderWrapper from "@/components/Page/HeaderWrapper";
import style from "./style.module.less";
import Radar from "@/components/Charts/Radar";

interface ProjectItem {
  id: number;
  title: string;
  cover: string;
  description: string;
}
interface ActivitiesItem {
  id: number;
  avatar: string;
  nickname: string;
  project: string;
  action: string;
  event: string;
  time: string;
}

interface TeamsItem {
  id: number;
  avatar: string;
  name: string;
}

export default defineComponent({
  setup() {
    const loading = ref(false);
    const radarLoading = ref(false);
    const projects = ref<ProjectItem[]>([]);
    const activities = ref<ActivitiesItem[]>([]);
    const teams = ref<TeamsItem[]>([]);
    const currentUser = reactive({
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      name: "提交4"
    });

    const timeFix = "早安";
    const welcome = "今天又是板砖的一天";

    const Content = () => (
      <div class={style["page-header-content"]}>
        <div class={style["avatar"]}>
          <Avatar size="large" src={currentUser.avatar} />
        </div>
        <div class={style["content"]}>
          <div class={style["content-title"]}>
            {timeFix}，{currentUser.name}
            <span class={style["welcome-text"]}>，{welcome}</span>
          </div>
          <div>全栈工程师 | 板砖技术部 - 某某某事业群 - 前端平台</div>
        </div>
      </div>
    );
    const Extra = () => (
      <div class={style["extra-content"]}>
        <div class={style["stat-item"]}>
          <Statistic title="项目数" value="56" />
        </div>
        <div class={style["stat-item"]}>
          <Statistic title="团队内排名" value="8" suffix="/ 24" />
        </div>
        <div class={style["stat-item"]}>
          <Statistic title="项目访问" value="2223" />
        </div>
      </div>
    );

    onMounted(() => {
      projects.value.push(
        ...[
          {
            id: 1,
            title: `Alipay`,
            cover:
              "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
            description: "那是一种内在的东西， 他们到达不了，也无法触及的"
          },
          {
            id: 2,
            title: `Angular`,
            cover:
              "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
            description: "那是一种内在的东西， 他们到达不了，也无法触及的"
          },
          {
            id: 3,
            title: `Ant Design`,
            cover:
              "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
            description: "那是一种内在的东西， 他们到达不了，也无法触及的"
          },
          {
            id: 4,
            title: `Ant Design Pro`,
            cover:
              "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
            description: "那是一种内在的东西， 他们到达不了，也无法触及的"
          },
          {
            id: 5,
            title: `Bootstrap`,
            cover:
              "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
            description: "那是一种内在的东西， 他们到达不了，也无法触及的"
          },
          {
            id: 6,
            title: `Vue`,
            cover:
              "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
            description: "那是一种内在的东西， 他们到达不了，也无法触及的"
          }
        ]
      );
      for (let index = 0; index < 10; index++) {
        activities.value.push({
          id: index,
          avatar: "",
          nickname: `nickname-${index}`,
          project: `project-${index}`,
          action: `action-${index}`,
          event: `event-${index}`,
          time: `time-${index}`
        });
      }
      teams.value.push(
        ...[
          {
            id: 1,
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            name: "程序员"
          },
          {
            id: 2,
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
            name: "板砖大队"
          },
          {
            id: 3,
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
            name: "福报企业"
          },
          {
            id: 4,
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
            name: "技术解决方案"
          },
          {
            id: 5,
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png",
            name: "架构团队"
          }
        ]
      );
    });

    return () => (
      <>
        <PageHeader>
          <AntPageHeader title="工作台">
            <HeaderWrapper>
              {{
                content: Content,
                extra: Extra
              }}
            </HeaderWrapper>
          </AntPageHeader>
        </PageHeader>
        <PageContent>
          <div>
            <Row gutter={24}>
              <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                <Card
                  class={style["project-list"]}
                  loading={loading.value}
                  style="margin-bottom: 24px;"
                  bordered={false}
                  title="进行中的项目"
                  body-style={{ padding: 0 }}
                  extra={<a>全部项目</a>}
                >
                  <div>
                    {projects.value.map(item => (
                      <Card.Grid
                        class={style["project-card-grid"]}
                        key={item.id}
                      >
                        <Card bordered={false} body-style={{ padding: 0 }}>
                          <Card.Meta>
                            {{
                              title: () => (
                                <div class={style["card-title"]}>
                                  <Avatar size="small" src={item.cover} />
                                  <a>{item.title}</a>
                                </div>
                              ),
                              description: () => (
                                <div class={style["card-description"]}>
                                  {item.description}
                                </div>
                              )
                            }}
                          </Card.Meta>
                          <div class={style["project-item"]}>
                            <a href="/#/">科学搬砖组</a>
                            <span class={style["datetime"]}>9小时前</span>
                          </div>
                        </Card>
                      </Card.Grid>
                    ))}
                  </div>
                </Card>
                <Card loading={loading.value} title="动态" bordered={false}>
                  <List>
                    {activities.value.map(item => (
                      <List.Item key={item.id}>
                        <List.Item.Meta avatar={<Avatar src={item.avatar} />}>
                          {{
                            title: () => (
                              <div>
                                <span>{item.nickname}</span>&nbsp; 在&nbsp;
                                <a href="#">{item.project}</a>&nbsp;
                                <span>{item.action}</span>&nbsp;
                                <a href="#">{item.event}</a>
                              </div>
                            ),
                            description: () => <div>{item.time}</div>
                          }}
                        </List.Item.Meta>
                      </List.Item>
                    ))}
                  </List>
                </Card>
              </Col>

              <Col
                style="padding: 0 12px"
                xl={8}
                lg={24}
                md={24}
                sm={24}
                xs={24}
              >
                <Card
                  title="快速开始 / 便捷导航"
                  style="margin-bottom: 24px"
                  bordered={false}
                  body-style={{ padding: 0 }}
                >
                  <div class={style["item-group"]}>
                    <a>操作一</a>
                    <a>操作二</a>
                    <a>操作三</a>
                    <a>操作四</a>
                    <a>操作五</a>
                    <a>操作六</a>
                    <Button
                      size="small"
                      type="primary"
                      ghost
                      icon={<PlusOutlined />}
                    >
                      添加
                    </Button>
                  </div>
                </Card>
                <Card
                  title="XX 指数"
                  style="margin-bottom: 24px"
                  loading={radarLoading.value}
                  bordered={false}
                  body-style={{ padding: 0 }}
                >
                  <div style="min-height: 400px;">
                    {/* :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts" */}
                    {/* <radar :data="radarData"/> */}
                    <Radar />
                  </div>
                </Card>
                <Card loading={loading.value} title="团队" bordered={false}>
                  <div class={style["members"]}>
                    <Row>
                      {teams.value.map(item => (
                        <Col key={item.id} span={12}>
                          <a>
                            <Avatar size="small" src={item.avatar} />
                            <span class={style["member"]}>{item.name}</span>
                          </a>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </PageContent>
      </>
    );
  }
});
