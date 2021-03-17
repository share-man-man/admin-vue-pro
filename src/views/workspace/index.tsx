import { defineComponent, reactive } from "vue";
import { PageHeader, PageContent } from "@/components/Page";
import { Avatar, PageHeader as AntPageHeader, Statistic } from "ant-design-vue";
import HeaderWrapper from "@/components/Page/HeaderWrapper";
import style from "./style.module.less";

export default defineComponent({
  setup() {
    const currentUser = reactive({
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      name: "小满满"
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
        <PageContent></PageContent>
      </>
    );
  }
});
