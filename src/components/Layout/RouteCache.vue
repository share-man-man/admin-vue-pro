<template>
  <!-- 每次路由进入界面的时候，执行addCache函数，放入缓存 -->
  <router-view v-slot="{ Component, route }">
    <component :is="addCache(Component, route)" />
  </router-view>
  <!-- tab可切换导航、重载组件 -->
  <a-tabs
    v-model:activeKey="activeKey"
    type="editable-card"
    hide-add
    @edit="onEdit"
    @change="onChangeTab"
    class="public-tabs"
  >
    <template #tabBarExtraContent>
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item key="reloadNow" @click="reload"
              ><ReloadOutlined />刷新当前页</a-menu-item
            >
            <a-menu-item key="topNow" @click="topNow"
              ><VerticalAlignTopOutlined />置顶当前页</a-menu-item
            >
            <a-menu-item
              key="closeElse"
              :disabled="!closable"
              @click="removeElse"
              ><CloseCircleOutlined />关闭其它页面</a-menu-item
            >
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
        <a-dropdown>
          <span class="public-tabs-span">
            {{ r.tabName }}
            <template v-if="r.key === activeKey">
              <ReloadOutlined
                v-if="!r.reloading"
                class="public-tabs-icon"
                @click.stop="reload"
              />
              <LoadingOutlined v-else class="public-tabs-icon" />
            </template>
          </span>
        </a-dropdown>
      </template>
    </a-tab-pane>
  </a-tabs>
  <!-- 展示缓存的路由内容 -->
  <a-layout-content class="public-content">
    <div
      v-for="r in cacheRoute"
      v-show="r.key === activeKey"
      :key="r.key"
      class="public-content-div"
    >
      <component v-if="!r.reloading" :is="r.component" />
    </div>
  </a-layout-content>
</template>
<script lang="ts">
import { defineComponent, VNode, nextTick } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";
import {
  ReloadOutlined,
  LoadingOutlined,
  EllipsisOutlined,
  CloseCircleOutlined,
  VerticalAlignTopOutlined
} from "@ant-design/icons-vue";

interface RouteItem {
  /**
   * 键值
   */
  key: string;
  /**
   * 路径
   */
  fullPath: string;
  /**
   * 标签页名字
   */
  tabName: string;
  /**
   * 组件
   */
  component: VNode;
  /**
   * 重载状态
   */
  reloading: boolean;
}

export default defineComponent({
  components: {
    ReloadOutlined,
    LoadingOutlined,
    EllipsisOutlined,
    CloseCircleOutlined,
    VerticalAlignTopOutlined
  },
  data() {
    const cacheRoute: RouteItem[] = [];
    return {
      /**
       * 路由缓存
       */
      cacheRoute,
      /**
       * 当前路由key
       */
      activeKey: ""
    };
  },
  computed: {
    closable: vm => {
      // this.data的时候，ide会报错，应该是vetur的问题
      // return this.cacheRoute.length !== 1;
      return vm.cacheRoute.length !== 1;
    }
  },
  methods: {
    /**
     * 新增、移除
     */
    onEdit(editKey: string, action: string) {
      if (action === "remove") this.remove(editKey);
    },

    /**
     * 置顶当前页
     */
    topNow() {
      const index = this.cacheRoute.findIndex(i => i.key === this.activeKey);
      if (index !== 0) {
        const now = this.cacheRoute.splice(index, 1);
        this.cacheRoute.unshift(now[0]);
      }
    },

    /**
     * 关闭其它页面
     */
    removeElse() {
      this.cacheRoute
        .map(i => i.key)
        .filter(i => i !== this.activeKey)
        .forEach(i => this.remove(i));
    },

    /**
     * 关闭页面
     */
    remove(k: string) {
      const index = this.cacheRoute.findIndex(i => i.key === k);
      if (index > -1) {
        this.cacheRoute.splice(index, 1);
      }
      // 如果移除的是当前页面，自动跳转到第一个页面
      if (k === this.activeKey) {
        this.onChangeTab(this.cacheRoute[0]?.key);
      }
    },

    /**
     * 点击tab页，跳转路由
     */
    onChangeTab(k: string) {
      const findItem = this.cacheRoute.find(i => i.key === k);
      if (findItem) this.$router.push(findItem.fullPath);
    },

    /**
     * 重载组件（基于 v-if 实现）
     */
    reload() {
      const activeItem = this.cacheRoute.find(i => i.key === this.activeKey);
      if (activeItem) {
        activeItem.reloading = true;
        nextTick(() => {
          setTimeout(() => {
            activeItem.reloading = false;
          }, 500);
        });
      }
    },

    /**
     * 路由加载时，将组件放到缓存
     */
    addCache(c: VNode, r: RouteLocationNormalizedLoaded) {
      // 必须放到异步函数里，防止产生依赖
      setTimeout(() => {
        // 将fullPath作为唯一标识，如果缓存数组没有，加入缓存
        const findItem = this.cacheRoute.find(i => i.key === r.fullPath);
        if (!findItem) {
          this.cacheRoute.push({
            key: r.fullPath,
            fullPath: r.fullPath,
            tabName: r.meta.name,
            component: c,
            reloading: false
          });
        }
        this.activeKey = r.fullPath;
      });
      // 返回空，避免router-view进行不必要的渲染开销
      return undefined;
    }
  }
});
</script>

<style lang="less">
.public-tabs {
  background: rgb(255, 255, 255);
  margin: 0px;
  padding-top: 6px;
  width: 100%;
  &-icon {
    font-size: 12px;
    margin-left: 8px;
  }
  &-span {
    text-align: center;
    // font-size: 14px;
  }
}

.public-content {
  margin: 0;
  min-height: "280px";
  &-div {
    min-height: 100%;
  }
}
</style>
