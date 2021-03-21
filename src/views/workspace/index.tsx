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
import { getData, getRadarData } from "@/services/dashboard/workspace";

export default defineComponent({
  setup() {
    const loading = ref(false);
    const radarLoading = ref(false);
    const projects = ref<ProjectItem[]>([]);
    const activities = ref<ActivitiesItem[]>([]);
    const teams = ref<TeamsItem[]>([]);
    const currentUser = reactive({
      avatar: "",
      name: ""
    });
    const radarData = ref<RadarItem[]>([]);
    const statisticData = ref<StatisticItem>({
      projectNum: 0,
      teamRank: 0,
      visitNum: 0
    });

    const Content = () => (
      <div class={style["page-header-content"]}>
        <div class={style["avatar"]}>
          <Avatar size="large" src={currentUser.avatar} />
        </div>
        <div class={style["content"]}>
          <div class={style["content-title"]}>
            早安，{currentUser.name}
            <span class={style["welcome-text"]}>，今天又是搬砖的一天</span>
          </div>
          <div>全栈工程师 | 板砖技术部 - 某某某事业群 - 前端平台</div>
        </div>
      </div>
    );
    const Extra = () => (
      <div class={style["extra-content"]}>
        <div class={style["stat-item"]}>
          <Statistic title="项目数" value={statisticData.value.projectNum} />
        </div>
        <div class={style["stat-item"]}>
          <Statistic
            title="团队内排名"
            value={statisticData.value.teamRank}
            suffix="/ 24"
          />
        </div>
        <div class={style["stat-item"]}>
          <Statistic title="项目访问" value={statisticData.value.visitNum} />
        </div>
      </div>
    );

    const loadData = async () => {
      const {
        currentUser: user,
        projects: pro,
        activities: act,
        teams: t,
        statistic: s
      } = await getData();
      currentUser.avatar = user.avatar;
      currentUser.name = user.name;
      projects.value.push(...pro);
      activities.value.push(...act);
      teams.value.push(...t);
      statisticData.value = s;
      const resRadarData = await getRadarData();
      radarData.value.splice(0, radarData.value.length, ...resRadarData);
    };

    onMounted(() => {
      loadData();
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
                    <Card.Grid class={style["project-card-grid"]} key={item.id}>
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

            <Col style="padding: 0 12px" xl={8} lg={24} md={24} sm={24} xs={24}>
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
                  <Radar data={radarData.value} />
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
        </PageContent>
      </>
    );
  }
});
