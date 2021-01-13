<template>
  <a-tabs
    v-model:activeKey="activeRouteKey"
    type="editable-card"
    hide-add
    @edit="onEdit"
    @change="onChange"
    style="background: rgb(255, 255, 255);margin: 0px;padding-top: 6px;width: 100%;"
  >
    <a-tab-pane
      v-for="v in tabsRouteCache"
      :key="v.fullPath"
      :closable="v.closable"
    >
      <template #tab>
        <a-dropdown>
          <span class="tab-span">
            {{ v.meta?.breadcrumbName }}
            <template v-if="v.fullPath === activeRouteKey">
              <ReloadOutlined
                v-if="!reloading"
                class="tabs-icon"
                @click.stop="reload"
              />
              <LoadingOutlined v-else class="tabs-icon" />
            </template>
          </span>
        </a-dropdown>
      </template>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    ReloadOutlined,
    LoadingOutlined
  },
  computed: {
    ...mapState("layout", ["activeRouteKey", "reloading"]),
    ...mapGetters("layout", ["tabsRouteCache"])
  },
  watch: {
    $route: {
      handler(to) {
        this.handleToRoute({ to });
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations("layout", [
      "handleToRoute",
      "handleRemoveRoute",
      "setReloading"
    ]),
    onChange(fullPath) {
      this.$router.push(fullPath);
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    remove(targetKey) {
      this.handleRemoveRoute({
        targetKey,
        callBack: k => {
          this.onChange(k || "/");
        }
      });
    },
    reload() {
      this.setReloading(true);
    }
  }
});
</script>

<style lang="less">
.tabs-icon {
  font-size: 12px;
  margin: 0 12px;
}
</style>
