// 使用tsx实现，避免模版组建渲染警告

import {
  computed,
  defineComponent,
  PropType,
  ref,
  toRaw,
  toRefs,
  watch
} from "vue";
import { useRoute } from "vue-router";
import { Menu } from "ant-design-vue";
import { MenuItemType } from "./data";
import IconRender from "./IconRender";

const { Item: MenuItem, SubMenu: AntSubMenu } = Menu;

/**
 * 判断是否有子菜单
 * @param i 菜单项
 */
const isSub = (i: MenuItemType) => {
  if (i.children && i.children.length > 0) {
    return true;
  }
  return false;
};

/**
 * 递归渲染菜单
 * @param subList 子菜单列表
 */
const SubMenu = ({ subList = [] }: { subList: MenuItemType[] }) => {
  return subList.map(item => {
    // 没有子菜单的渲染
    if (!isSub(item)) {
      return (
        <MenuItem key={item.key}>
          <IconRender type={item.icon} />
          <span>{item.name}</span>
          {item.path && <router-link to={item.path} />}
        </MenuItem>
      );
    } else {
      // 有子菜单的递归渲染
      return (
        <AntSubMenu
          key={item.key}
          title={() => (
            <span>
              <IconRender type={item.icon} />
              <span>{item.name}</span>
            </span>
          )}
        >
          {SubMenu({ subList: item.children || [] })}
        </AntSubMenu>
      );
    }
  });
};

const MenuRender = defineComponent({
  props: {
    /**
     * 是否关闭
     */
    collapsed: {
      type: Boolean,
      default: false
    },
    /**
     * 菜单列表
     */
    menuInfo: {
      type: Array as PropType<MenuItemType[]>,
      default: () => []
    }
  },
  setup(props) {
    const route = useRoute();
    // 不能直接使用解构，会消除props的响应性
    const { menuInfo } = toRefs(props);

    /**
     * 选择的菜单key
     */
    const selectedKeys = ref<MenuItemType["key"][]>([]);
    /**
     * 展开keys
     */
    const openKeys = ref<MenuItemType["key"][]>([]);

    // 递归获取默认需要展开的列表的key，在页面刷新后，也能根据路由展开菜单
    const menuEffect = (m: MenuItemType[]) => {
      m.forEach(i => {
        // 默认展开的菜单项
        if (
          route.matched.find(r => r.path === i.path) &&
          !openKeys.value.includes(i.key)
        ) {
          openKeys.value.push(i.key);
        }
        // 默认选中的菜单项
        if (route.path === i.path && !selectedKeys.value.includes(i.key)) {
          selectedKeys.value.push(i.key);
        }
        // 如果有子属性，递归调用
        if (i.children) {
          menuEffect(i.children);
        }
      });
    };

    const reloadMenu = (info: MenuItemType[]) => {
      selectedKeys.value.splice(0);
      const temp = info;
      menuEffect(temp);
    };

    // 菜单栏改变时，重新加载展开和选中项
    watch(menuInfo.value, newMenuInfo => {
      openKeys.value.splice(0);
      reloadMenu(toRaw(newMenuInfo) as MenuItemType[]);
    });

    // 路由改变时，重新加载选中项
    const routePath = computed(() => route.path);
    watch(routePath, () => reloadMenu(toRaw(menuInfo.value)), {
      immediate: true
    });

    return () => {
      const sub = SubMenu({ subList: menuInfo.value });
      return (
        <Menu
          style="height:100%"
          mode="inline"
          theme="dark"
          inlineCollapsed={props.collapsed}
          v-models={[
            [selectedKeys.value, "selectedKeys"],
            [openKeys.value, "openKeys"]
          ]}
        >
          {sub}
        </Menu>
      );
    };
  }
});

export default MenuRender;
