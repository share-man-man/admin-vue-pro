<template>
  <a-layout-header
    style="padding: 0px;height: 48px;line-height: 48px;width: 100%;z-index: 9;"
  >
    <div class="public-global-header">
      <div class="public-global-header-collapsed-button">
        <slot name="left">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
        </slot>
      </div>
      <div style="flex: 1 1 0%;">
        <slot name="middle" />
      </div>
      <div style="text-align: right;">
        <slot name="right">
          <a-dropdown>
            <span class="public-dropdown public-dropdown-action">
              <a-avatar
                class="public-header-account-avatar"
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                size="small"
              />
              <span class="public-header-account-name anticon">管理员 </span>
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">3rd menu item</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </slot>
      </div>
    </div>
  </a-layout-header>
</template>
<script>
import { defineComponent } from "vue";
import MenuList from "./MenuList.vue";

export default defineComponent({
  setup() {
    const { collapsed } = MenuList;
    console.log(collapsed);
  }
});
</script>
