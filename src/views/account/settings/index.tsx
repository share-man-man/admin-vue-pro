import { PageContent } from "@/components/Page";
import { Card, Menu } from "ant-design-vue";
import { computed, defineComponent, KeepAlive, reactive, VNode } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import style from "./style.module.less";

export default defineComponent({
  setup() {
    const route = useRoute();
    // 路由改变时，重新加载选中项
    const routePath = computed(() => route.path);
    const menuList = reactive([
      {
        key: "/account/settings/base",
        text: "基础设置"
      },
      {
        key: "/account/settings/security",
        text: "安全设置"
      },
      {
        key: "/account/settings/custom",
        text: "个性化"
      }
    ]);
    return () => (
      <PageContent>
        <Card>
          <div class={style["main"]}>
            <div class={style["left"]}>
              <Menu selectedKeys={[routePath.value]}>
                {menuList.map(i => (
                  <Menu.Item key={i.key}>
                    <RouterLink to={i.key}>{i.text}</RouterLink>
                  </Menu.Item>
                ))}
              </Menu>
            </div>
            <div class={style["right"]}>
              <RouterView>
                {{
                  default: ({ Component }: { Component: VNode }) => (
                    <KeepAlive>{Component}</KeepAlive>
                  )
                }}
              </RouterView>
            </div>
          </div>
        </Card>
      </PageContent>
    );
  }
});
