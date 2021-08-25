<template>
  <a-tabs
    :activeKey="activeKey"
    type="editable-card"
    hide-add
    @edit="onEdit"
    @change="onChangeTab"
    class="av-tabs"
  >
    <template #tabBarExtraContent>
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item key="reloadNow">
              <span @click="onReload">
                <ReloadOutlined />
                刷新当前页
              </span>
            </a-menu-item>
            <a-menu-item key="topNow">
              <span @click="onTopNow">
                <VerticalAlignTopOutlined />
                置顶当前页
              </span>
            </a-menu-item>
            <a-menu-item key="closeElse" :disabled="!closable.value">
              <span @click="removeElse">
                <CloseCircleOutlined />
                关闭其它页面
              </span>
            </a-menu-item>
          </a-menu>
        </template>
        <EllipsisOutlined
          :rotate="90"
          style="margin-right:8px;font-size:16px"
        />
      </a-dropdown>
    </template>
    <a-tab-pane v-for="r in cacheRoute" :key="r.key" :closable="closable">
      <template #tab>
        <span>
          {{ r.tabName }}
          <template v-if="r.key === activeKey">
            <ReloadOutlined
              v-if="!reloadingIcon"
              class="av-tabs-icon"
              @click.stop="onReload"
            />
            <LoadingOutlined v-else class="av-tabs-icon" />
          </template>
        </span>
      </template>
    </a-tab-pane>
  </a-tabs>
  <a-layout-content class="av-content">
    <div class="av-content-div">
      <router-view v-slot="{ Component: c, route: r }">
        <keep-alive :include="includeKeys">
          <component
            v-if="!reloadingIcon"
            :is="onAddCache(c, r)"
            :key="c.type.__hmrId"
          />
        </keep-alive>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script lang="ts">
import {
  cloneVNode,
  computed,
  defineComponent,
  nextTick,
  ref,
  VNode,
  watchEffect
} from "vue";
import { RouteLocationNormalizedLoaded, useRouter } from "vue-router";
import { Layout, Tabs, Dropdown, Menu } from "ant-design-vue";
import {
  ReloadOutlined,
  LoadingOutlined,
  EllipsisOutlined,
  CloseCircleOutlined,
  VerticalAlignTopOutlined
} from "@ant-design/icons-vue";
import { RouteItem } from "./data";
const { Content } = Layout;

export default defineComponent({
  components: {
    [Content.name]: Content,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane,
    [Dropdown.name]: Dropdown,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    ReloadOutlined,
    LoadingOutlined,
    EllipsisOutlined,
    CloseCircleOutlined,
    VerticalAlignTopOutlined
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
    const includeKeys = ref<string[]>([]);
    watchEffect(() => {
      includeKeys.value = cacheRoute.value.map(i => i.key);
    });

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
      // 如果移除的是当前页面，自动跳转到第一个页面
      if (k === activeKey.value) {
        const toItem = cacheRoute.value.find(i => i.key !== k);
        if (!toItem) return;
        onChangeTab(toItem.key);
        // onChangeTab(cacheRoute.value[0]?.key);
      }

      setTimeout(() => {
        const index = cacheRoute.value.findIndex(i => i.key === k);
        if (index > -1) {
          cacheRoute.value.splice(index, 1);
        }
      });
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
    const onTopNow = () => {
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
    const onReload = () => {
      const activeItem = cacheRoute.value[activeIndex.value];
      activeItem.reloading = true;
      reloadingIcon.value = true;
      const index = includeKeys.value.findIndex(i => i === activeItem.key);
      const [reloadKey] = includeKeys.value.splice(index, 1);

      nextTick(() => {
        activeItem.reloading = false;
        setTimeout(() => {
          reloadingIcon.value = false;
          includeKeys.value.splice(index, 0, reloadKey);
        }, 500);
      });
    };

    /**
     * 动态路由缓存
     * @param c 虚拟dom
     * @param r 路由
     */
    const onAddCache = (comp: VNode, r: RouteLocationNormalizedLoaded) => {
      // const key = (c.type as any).name || "_noCache";
      const key = r.fullPath;
      activeKey.value = key;

      const index = cacheRoute.value.findIndex(i => i.key === key);
      const pushItem = {
        key: key,
        path: r.path,
        fullPath: r.fullPath,
        tabName: String(r.meta.name),
        // component: c,
        reloadTime: new Date().getTime(),
        reloading: false
      };
      if (index === -1) {
        cacheRoute.value.push(pushItem);
        return;
      }

      // 基于name缓存
      const c = cloneVNode(comp);
      (c.type as any).name = key;

      return c;
    };

    return {
      activeKey,
      cacheRoute,
      onAddCache,
      onEdit,
      onChangeTab,
      onReload,
      onTopNow,
      removeElse,
      closable,
      reloadingIcon,
      includeKeys
    };
  }
});
</script>
