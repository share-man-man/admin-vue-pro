import {
  computed,
  defineComponent,
  nextTick,
  ref,
  watch,
  withModifiers
} from "vue";
import {
  ReloadOutlined,
  LoadingOutlined,
  EllipsisOutlined,
  CloseCircleOutlined,
  VerticalAlignTopOutlined
} from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import CacheContent from "./CacheContent.vue";

interface RouteItem {
  /**
   * 主键
   */
  key: string;
  /**
   * 路径
   */
  path: string;
  /**
   * 标签页名字
   */
  tabName: string;
  /**
   * 重载时间，用于组件的动态key
   */
  reloadTime: number;
}

export default defineComponent({
  components: {
    CacheContent
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const activeKey = ref("");
    const cacheRoute = ref<RouteItem[]>([]);
    const reloading = ref(false);
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
    const onEdit = (editKey: string, action: string) => {
      if (action === "remove") remove(editKey);
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
      if (activeItem) {
        activeItem.reloadTime = new Date().getTime();
      }
      reloading.value = true;
      reloadingIcon.value = true;
      nextTick(() => {
        reloading.value = false;
        setTimeout(() => {
          reloadingIcon.value = false;
        }, 500);
      });
    };

    /**
     * 当routePath改变时，添加/加载缓存
     */
    const routePath = computed(() => {
      return route.path;
    });
    watch(
      routePath,
      () => {
        const r = route;
        const findItem = cacheRoute.value.find(i => i.key === r.path);
        if (!findItem) {
          cacheRoute.value.push({
            key: r.path,
            path: r.path,
            tabName: r.meta.name,
            reloadTime: new Date().getTime()
          });
        }
        activeKey.value = r.path;
      },
      { immediate: true, deep: true }
    );

    return () => (
      <>
        <a-tabs
          activeKey={activeKey.value}
          type="editable-card"
          hide-add
          onEdit={onEdit}
          onChange={onChangeTab}
          class="public-tabs"
        >
          {{
            tabBarExtraContent: () => (
              <a-dropdown>
                {{
                  overlay: () => (
                    <a-menu>
                      <a-menu-item key="reloadNow" onClick={reload}>
                        <ReloadOutlined />
                        刷新当前页
                      </a-menu-item>
                      <a-menu-item key="topNow" onClick={topNow}>
                        <VerticalAlignTopOutlined />
                        置顶当前页
                      </a-menu-item>
                      <a-menu-item
                        key="closeElse"
                        disabled={!closable.value}
                        onClick={removeElse}
                      >
                        <CloseCircleOutlined />
                        关闭其它页面
                      </a-menu-item>
                    </a-menu>
                  ),
                  default: () => (
                    <EllipsisOutlined
                      rotate={90}
                      style="margin-right:8px;font-size:16px"
                    />
                  )
                }}
              </a-dropdown>
            ),
            default: () =>
              cacheRoute.value.map(r => (
                <a-tab-pane key={r.key} closable={closable.value}>
                  {{
                    tab: () => (
                      <span>
                        {r.tabName}
                        {r.key === activeKey.value && (
                          <>
                            {!reloadingIcon.value ? (
                              <ReloadOutlined
                                class="public-tabs-icon"
                                onClick={withModifiers(reload, ["stop"])}
                              />
                            ) : (
                              <LoadingOutlined class="public-tabs-icon" />
                            )}
                          </>
                        )}
                      </span>
                    )
                  }}
                </a-tab-pane>
              ))
          }}
        </a-tabs>
        <a-layout-content class="public-content">
          {/* 此方法不能添加key以实现动态缓存 */}
          {/* <RouterView>
            {{
              default: (prop: unknown) => {
                return <KeepAlive>{(prop as unknown).Component}</KeepAlive>;
              }
            }}
          </RouterView> */}
          <CacheContent
            k={
              reloading.value
                ? 0
                : cacheRoute.value.find(i => i.key === activeKey.value)
                    ?.reloadTime
            }
            reloading={reloading.value}
          />
        </a-layout-content>
      </>
    );
  }
});
