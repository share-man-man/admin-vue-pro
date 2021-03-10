import { defineComponent, nextTick, reactive, ref } from "vue";
import { Col, Row, Card, Divider, Tag, Input, Tabs } from "ant-design-vue";
import {
  FormatPainterOutlined,
  ApartmentOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  AlipayCircleFilled,
  WechatFilled,
  QqOutlined,
  TaobaoCircleOutlined,
  AppleOutlined
} from "@ant-design/icons-vue";
import style from "./style.module.less";
import Article from "./Article";
import Applications from "./Applications";

const colConfig = {
  md: 24,
  lg: 7,
  style: "padding:0 12px"
};

export default defineComponent({
  setup() {
    const inputVisible = ref(false);
    const addTagName = ref("");
    const addTagList = reactive<Set<string>>(new Set());
    const inputRef = ref<HTMLElement | undefined>(undefined);
    const showInput = () => {
      inputVisible.value = !inputVisible.value;
      nextTick(() => {
        inputRef.value?.focus();
      });
    };
    const handleInputConfirm = () => {
      addTagList.add(String(addTagName.value));
      addTagName.value = "";
      showInput();
    };
    const handleClose = (tag: string) => {
      addTagList.delete(tag);
    };
    return () => (
      <Row style="margin:24px">
        <Col {...colConfig}>
          <Card>
            <div class={style["avatarHolder"]}>
              <div class={style["avatar"]}>
                <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
              </div>
              <div class={style["username"]}>GrainFull</div>
              <div>Talk is cheap, show me the code (少逼逼，上码)</div>
            </div>
            <div class={style["detail"]}>
              <p>
                <FormatPainterOutlined class={style["icon"]} />
                交互专家
              </p>
              <p>
                <ApartmentOutlined class={style["icon"]} />
                电信四区-班德尔城-下路射手-倔强青铜-最强王者
              </p>
              <p>
                <EnvironmentOutlined class={style["icon"]} />
                四川省成都市
              </p>
            </div>
            <Divider />
            <div class={style["tags"]}>
              <div class={style["title"]}>标签</div>
              <div>
                <Tag>SQL</Tag>
                <Tag>微服务</Tag>
                <Tag>TS</Tag>
                <Tag>JS</Tag>
                <Tag>JAVA</Tag>
                <Tag>VUE</Tag>
                <Tag>REACR</Tag>
                {Array.from(addTagList).map(i => (
                  <Tag
                    key={i}
                    closable
                    onClose={() => {
                      handleClose(i);
                    }}
                  >
                    {i}
                  </Tag>
                ))}
                {inputVisible.value ? (
                  <Input
                    ref={inputRef}
                    v-model={[addTagName.value, "value"]}
                    onPressEnter={handleInputConfirm}
                    onBlur={() => {
                      showInput();
                    }}
                    size="small"
                    style="width:78px"
                  />
                ) : (
                  <Tag
                    onClick={showInput}
                    style="background: #fff; border-style: dashed"
                  >
                    <PlusOutlined /> New Tag
                  </Tag>
                )}
              </div>
            </div>
            <Divider />
            <div class={style["team"]}>
              <div class={style["title"]}>作案团伙</div>
              <Row>
                <Col lg={24} xl={12} style="padding:0 18px">
                  <a>
                    <AlipayCircleFilled style="color:blue;margin-right:10px" />
                    从没碰过钱
                  </a>
                </Col>
                <Col lg={24} xl={12} style="padding:0 18px">
                  <a>
                    <WechatFilled style="color:green;margin-right:10px" />
                    相亲相爱一家人
                  </a>
                </Col>
                <Col lg={24} xl={12} style="padding:0 18px">
                  <a>
                    <QqOutlined style="color:black;margin-right:10px" />
                    普通家庭
                  </a>
                </Col>
                <Col lg={24} xl={12} style="padding:0 18px">
                  <a>
                    <TaobaoCircleOutlined style="color:orange;margin-right:10px" />
                    剁手协会
                  </a>
                </Col>
                <Col lg={24} xl={12} style="padding:0 18px">
                  <a>
                    <AppleOutlined style="margin-right:10px" />
                    星巴克会员
                  </a>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col {...colConfig} lg={17}>
          <Card>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane key="1" tab="文章(3)">
                <Article />
              </Tabs.TabPane>
              <Tabs.TabPane key="2" tab="应用(1)">
                <Applications />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    );
  }
});
