import { getMenuInfo } from "@/services/user";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Layout } from "ant-design-vue";
import { useStore } from "vuex";
import MenuRender from "../MenuList/MenuRender";
import { MenuItemType } from "./data";

export default defineComponent({
  setup() {
    const store = useStore();
    /**
     * 是否展开菜单
     */
    const collapsed = computed(() => store.state.layout.collapsed);
    /**
     * 设置是否展开菜单
     * @param e 展开状态
     */
    const onCollapse = (e: boolean) => {
      store.commit("layout/setCollapsed", e);
    };
    /**
     * 菜单列表
     */
    const menuInfo = ref<MenuItemType[]>([]);

    onMounted(async () => {
      const data = await getMenuInfo();
      menuInfo.value.splice(0);
      menuInfo.value.push(...data);
    });

    return {
      menuInfo,
      collapsed,
      onCollapse
    };
  },
  render() {
    return (
      <Layout.Sider
        collapsed={this.collapsed}
        onCollapse={this.onCollapse}
        trigger={null}
        collapsible
        breakpoint="md"
      >
        <MenuRender collapsed={this.collapsed} menuInfo={this.menuInfo} />
      </Layout.Sider>
    );
  }
});
