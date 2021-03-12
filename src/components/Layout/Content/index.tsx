import {
  computed,
  defineComponent,
  nextTick,
  ref,
  withModifiers,
  VNode,
  KeepAlive
} from "vue";
import {
  ReloadOutlined,
  LoadingOutlined,
  EllipsisOutlined,
  CloseCircleOutlined,
  VerticalAlignTopOutlined
} from "@ant-design/icons-vue";
import { Tabs, Dropdown, Menu } from "ant-design-vue";
import {
  useRouter,
  RouterView,
  RouteLocationNormalizedLoaded
} from "vue-router";
import { RouteItem } from "./data.d";
import PageView from "./Pageview.vue";

export default defineComponent({
  components: {
    KeepAlive
  },
  setup() {
    const router = useRouter();
    const activeKey = ref("");
    const cacheRoute = ref<RouteItem[]>([]);
    const reloadingIcon = ref(false);
    const closable = computed(() => cacheRoute.value.length !== 1);
    const activeIndex = computed(() =>
      cacheRoute.value.findIndex(i => i.key === activeKey.value)
    );

    /**
     * 点击tab页，跳转路由
     */
    const onChangeTab = (k: string) => {
      const findItem = cacheRoute.value.find(i => i.key === k);
      if (findItem) router.push(findItem.path);
    };

    /**
     * 关闭页面
     */
    const remove = (k: string) => {
      const index = cacheRoute.value.findIndex(i => i.key === k);
      if (index > -1) {
        cacheRoute.value.splice(index, 1);
      }
      // 如果移除的是当前页面，自动跳转到第一个页面
      if (k === activeKey.value) {
        onChangeTab(cacheRoute.value[0]?.key);
      }
    };

    /**
     * 新增、移除
     */
    const onEdit = (editKey: string | MouseEvent, action: "add" | "remove") => {
      if (action === "remove") remove(editKey as string);
    };

    /**
     * 置顶当前页
     */
    const topNow = () => {
      const index = activeIndex.value;
      if (index !== 0) {
        const now = cacheRoute.value.splice(index, 1);
        cacheRoute.value.unshift(now[0]);
      }
    };

    /**
     * 关闭其它页面
     */
    const removeElse = () => {
      cacheRoute.value
        .map(i => i.key)
        .filter(i => i !== activeKey.value)
        .forEach(i => remove(i));
    };

    /**
     * 重载组件（基于 v-if 实现）
     */
    const reload = () => {
      const activeItem = cacheRoute.value[activeIndex.value];
      activeItem.reloading = true;
      reloadingIcon.value = true;
      nextTick(() => {
        activeItem.reloading = false;
        setTimeout(() => {
          reloadingIcon.value = false;
        }, 500);
      });
    };

    /**
     * 动态路由缓存
     * @param c 虚拟dom
     * @param r 路由
     */
    const addCache = (c: VNode, r: RouteLocationNormalizedLoaded) => {
      setTimeout(() => {
        const findItem = cacheRoute.value.find(i => i.key === r.path);
        if (!findItem) {
          cacheRoute.value.push({
            key: r.fullPath,
            path: r.path,
            fullPath: r.fullPath,
            tabName: r.meta.name,
            component: c,
            reloadTime: new Date().getTime(),
            reloading: false
          });
        }
        activeKey.value = r.path;
      });
    };

    return () => (
      <>
        <Tabs
          activeKey={activeKey.value}
          type="editable-card"
          hide-add
          onEdit={onEdit}
          onChange={onChangeTab}
          class="av-tabs"
        >
          {{
            tabBarExtraContent: () => (
              <Dropdown>
                {{
                  overlay: () => (
                    <Menu>
                      <Menu.Item key="reloadNow">
                        <span onClick={reload}>
                          <ReloadOutlined />
                          刷新当前页
                        </span>
                      </Menu.Item>
                      <Menu.Item key="topNow">
                        <span onClick={topNow}>
                          <VerticalAlignTopOutlined />
                          置顶当前页
                        </span>
                      </Menu.Item>
                      <Menu.Item key="closeElse" disabled={!closable.value}>
                        <span onClick={removeElse}>
                          <CloseCircleOutlined />
                          关闭其它页面
                        </span>
                      </Menu.Item>
                    </Menu>
                  ),
                  default: () => (
                    <EllipsisOutlined
                      rotate={90}
                      style="margin-right:8px;font-size:16px"
                    />
                  )
                }}
              </Dropdown>
            ),
            default: () =>
              cacheRoute.value.map(r => (
                <Tabs.TabPane key={r.key} closable={closable.value}>
                  {{
                    tab: () => (
                      <span>
                        {r.tabName}
                        {r.key === activeKey.value && (
                          <>
                            {!reloadingIcon.value ? (
                              <ReloadOutlined
                                class="av-tabs-icon"
                                onClick={withModifiers(reload, ["stop"])}
                              />
                            ) : (
                              <LoadingOutlined class="av-tabs-icon" />
                            )}
                          </>
                        )}
                      </span>
                    )
                  }}
                </Tabs.TabPane>
              ))
          }}
        </Tabs>
        {/* 缓存路由 */}
        <RouterView>
          {{
            default: (prop: {
              Component: VNode;
              route: RouteLocationNormalizedLoaded;
            }) => addCache(prop.Component, prop.route)
          }}
        </RouterView>
        {/* 此vue组件的代码的热加载不能生效 */}
        <PageView list={cacheRoute.value} activeKey={activeKey.value} />
        {/* 下面的代码不能实现缓存 */}
        {/* <Layout.Content>
          {cacheRoute.value.map(i => (
            <div
              key={i.key}
              class="av-content-div"
              style={{ display: activeKey.value === i.key ? "" : "none" }}
            >
              <RouterView>
                {!i.reloading && (
                  <KeepAlive>
                    {i.key === activeKey.value && i.component}
                  </KeepAlive>
                )}
              </RouterView>
            </div>
          ))}
        </Layout.Content> */}
      </>
    );
  }
});
