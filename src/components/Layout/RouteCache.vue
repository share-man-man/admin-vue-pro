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
      :key="r.key"
      v-show="r.key === activeKey"
      class="public-content-div"
    >
      <component v-if="!r.reloading" :is="r.component" />
    </div>
  </a-layout-content>
</template>
<script lang="ts">
import { defineComponent, VNode } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons-vue";

interface RouteItem {
  key: string;
  fullPath: string;
  tabName: string;
  component: VNode;
  reloading: boolean;
}

export default defineComponent({
  components: {
    ReloadOutlined,
    LoadingOutlined
  },
  data() {
    const cacheRoute: RouteItem[] = [];
    return {
      cacheRoute,
      activeKey: ""
    };
  },
  computed: {
    closable: vm => {
      // this.data的时候，编译会报错，应该vetur的问题
      // return this.cacheRoute.length !== 1;
      return vm.cacheRoute.length !== 1;
    }
  },
  methods: {
    /**
     * 新增、移除
     */
    onEdit(editKey: string, action: string) {
      if (action === "remove") {
        this.remove(editKey);
      }
    },

    /**
     * 点击tab页，跳转路由
     */
    onChangeTab(k: string) {
      const findItem = this.cacheRoute.find(i => i.key === k);
      if (findItem) {
        this.$router.push(findItem.fullPath);
      }
    },

    /**
     * 重载组件（基于 v-if 实现）
     */
    reload() {
      const activeItem = this.cacheRoute.find(i => i.key === this.activeKey);
      if (activeItem) {
        activeItem.reloading = true;
        setTimeout(() => {
          activeItem.reloading = false;
        }, 500);
      }
    },

    /**
     * 移除组件
     */
    remove(k: string) {
      const index = this.cacheRoute.findIndex(i => i.key === k);
      this.cacheRoute.splice(index, 1);
      if (k === this.activeKey) {
        this.onChangeTab(this.cacheRoute[0]?.key);
      }
    },

    /**
     * 路由加载时，将组件放到缓存
     */
    addCache(c: VNode, r: RouteLocationNormalizedLoaded) {
      // 必须放到异步函数里，防止产生依赖
      setTimeout(() => {
        // 将fullPath作为唯一标识，如果没找到，加入缓存
        const findItem = this.cacheRoute.find(i => i.key === r.fullPath);
        if (!findItem) {
          this.cacheRoute.push({
            key: r.fullPath,
            fullPath: r.fullPath,
            tabName: r.meta.breadcrumbName,
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
