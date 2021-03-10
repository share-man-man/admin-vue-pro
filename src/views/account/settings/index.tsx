import { PageContent } from "@/components/Page";
import { LayoutState } from "@/store/modules/layout";
import { Card, Menu } from "ant-design-vue";
import { computed, defineComponent, KeepAlive, ref, VNode } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useStore } from "vuex";
import style from "./style.module.less";

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore<{ layout: LayoutState }>();
    // 路由改变时，重新加载选中项
    const routePath = computed(() => route.path);
    const mobileClass = computed(() =>
      store.state.layout.isMobile ? style["mobile"] : undefined
    );
    const menuList = ref([
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
          <div class={[style["main"], mobileClass.value]}>
            <div class={[style["left"], mobileClass.value]}>
              <Menu
                mode={mobileClass.value ? "horizontal" : "inline"}
                selectedKeys={[routePath.value]}
              >
                {menuList.value.map(i => (
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
