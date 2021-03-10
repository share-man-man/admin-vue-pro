import { getMenuInfo } from "@/services/user";
import { defineComponent, onMounted, ref } from "vue";
import { Layout, Drawer } from "ant-design-vue";
import { useStore } from "vuex";
import MenuRender from "../MenuList/MenuRender";
import { MenuItemType } from "./data";

export default defineComponent({
  setup() {
    const store = useStore();
    /**
     * 菜单列表
     */
    const menuInfo = ref<MenuItemType[]>([]);
    /**
     * 加载菜单
     */
    const loadMenu = async () => {
      const data = await getMenuInfo();
      menuInfo.value.splice(0);
      menuInfo.value.push(...data);
    };

    onMounted(async () => {
      loadMenu();
    });

    return () => (
      <>
        {!store.state.layout.isMobile && (
          <Layout.Sider
            collapsed={store.state.layout.collapsed}
            trigger={null}
            breakpoint="md"
            // style={store.state.layout.isMobile && { height: "100%" }}
          >
            <MenuRender
              collapsed={store.state.layout.collapsed}
              menuInfo={menuInfo.value}
            />
          </Layout.Sider>
        )}
        {store.state.layout.isMobile && (
          <Drawer
            visible={!store.state.layout.hide}
            onClose={() => {
              store.commit("layout/setHide");
            }}
            width={200}
            bodyStyle={{ padding: "0px", height: "100%" }}
            closable={false}
            placement="left"
          >
            <MenuRender
              collapsed={store.state.layout.collapsed}
              menuInfo={menuInfo.value}
            />
          </Drawer>
        )}
      </>
    );
  }
});
