// 使用tsx实现，避免模版组建渲染警告

import { defineComponent, PropType, ref, toRaw, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import { MenuItemType } from "./data";
import IconRender from "./IconRender";

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
        <a-menu-item key={item.key}>
          <IconRender type={item.icon} />
          <span>{item.name}</span>
          {item.path && <router-link to={item.path} />}
        </a-menu-item>
      );
    } else {
      // 有子菜单的递归渲染
      return (
        <a-sub-menu
          key={item.key}
          title={() => (
            <span>
              <IconRender type={item.icon} />
              <span>{item.name}</span>
            </span>
          )}
        >
          {SubMenu({ subList: item.children || [] })}
        </a-sub-menu>
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
      type: Object as PropType<MenuItemType[]>,
      default: []
    }
  },
  setup(props) {
    const route = useRoute();
    // 不能直接使用解构，会消除props的响应性
    const { menuInfo } = toRefs(props);

    /**
     * 选择的菜单key
     */
    const selectedKeys = ref<string[] | number[]>([]);
    /**
     * 展开keys
     */
    const defaultOpenKeys = ref<MenuItemType["key"][]>([]);
    /**
     * 选中keys
     */
    const defaultSelectedKeys = ref<MenuItemType["key"][]>([]);

    // 递归获取默认需要展开的列表的key，在页面刷新后，也能根据路由展开菜单
    const menuEffect = (m: MenuItemType[]) => {
      m.forEach(i => {
        // 默认展开的菜单项
        if (route.matched.find(r => r.path === i.path)) {
          defaultOpenKeys.value.push(i.key);
        }
        // 默认选中的菜单项
        if (route.path === i.path) {
          defaultSelectedKeys.value.push(i.key);
        }
        // 如果有子属性，递归调用
        if (i.children) {
          menuEffect(i.children);
        }
      });
    };

    // 菜单栏改变时，重新加载默认展开和选中项
    watch(menuInfo.value, newMenuInfo => {
      defaultSelectedKeys.value.splice(0);
      defaultOpenKeys.value.splice(0);
      const temp = toRaw(newMenuInfo) as MenuItemType[];
      menuEffect(temp);
    });

    return {
      selectedKeys,
      defaultOpenKeys,
      defaultSelectedKeys
    };
  },
  render() {
    // 子菜单渲染函数，必须是函数，不能是标签，否则识别不了子菜单项
    const sub = SubMenu({ subList: this.menuInfo });
    return (
      <a-menu
        mode="inline"
        theme="dark"
        inlineCollapsed={this.collapsed}
        onSelect={({ selectedKeys = [] }) => {
          this.selectedKeys = selectedKeys;
        }}
        defaultOpenKeys={this.defaultOpenKeys}
        defaultSelectedKeys={this.defaultSelectedKeys}
      >
        {sub}
      </a-menu>
    );
  }
});

export default MenuRender;
