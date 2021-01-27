<template>
  <a-layout-header
    style="padding: 0px;height: 48px;line-height: 48px;width: 100%;z-index: 9;"
  >
    <div class="public-global-header">
      <div class="public-global-header-collapsed-button">
        <!-- 左边，默认trigger -->
        <slot name="left">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => setCollapsed(!collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => setCollapsed(!collapsed)"
          />
        </slot>
      </div>
      <div class="public-global-header-breadcrumb">
        <!-- 中间，默认面包屑导航 -->
        <slot name="middle">
          <a-breadcrumb>
            <a-breadcrumb-item
              v-for="(item, index) in breadList"
              :key="item.path"
            >
              <span v-if="index === breadList.length - 1">
                {{ item.meta.name }}
              </span>
              <router-link v-else :to="item.path">
                {{ item.meta.name }}
              </router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </slot>
      </div>
      <div style="text-align: right;">
        <!-- 右边 -->
        <slot name="right">
          <!-- 用户栏 -->
          <a-dropdown>
            <span class="public-dropdown public-dropdown-action">
              <!-- 头像 -->
              <a-avatar
                class="public-global-header-account-avatar"
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                size="small"
              />
              <!-- 用户名 -->
              <span class="public-global-header-account-name anticon"
                >管理员
              </span>
            </span>
            <template #overlay>
              <!-- 用户操作栏 -->
              <a-menu>
                <a-menu-item>
                  <span @click="logout">退出登陆</span>
                </a-menu-item>
                <!-- <a-menu-item>
                  <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">3rd menu item</a>
                </a-menu-item> -->
              </a-menu>
            </template>
          </a-dropdown>
        </slot>
      </div>
    </div>
  </a-layout-header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";
import { RouteLocationMatched } from "vue-router";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

import { logout as reqLogout } from "@/services/oauth";
import { removeTokenObj } from "@/utils/tokens";

export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  data() {
    const breadList: RouteLocationMatched[] = [];
    return {
      breadList
    };
  },
  computed: {
    ...mapState("layout", ["collapsed"])
  },
  methods: {
    ...mapMutations("layout", ["setCollapsed"]),
    logout() {
      reqLogout();
      removeTokenObj();
      this.$router.push("/login");
    }
  },
  watch: {
    $route: {
      handler() {
        this.breadList = this.$route.matched;
      },
      immediate: true
    }
  }
});
</script>
<style lang="less"></style>
