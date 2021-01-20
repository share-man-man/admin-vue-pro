// 使用tsx实现，避免模版组建渲染警告

import { defineComponent, PropType, reactive } from "vue";
import { MenuItemType } from "./data";
import IconType from "./IconType.vue";

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
    if (!isSub(item)) {
      return (
        <a-menu-item key={item.key}>
          <IconType type={item.icon} />
          <span>{item.name}</span>
          {item.path && <router-link to={item.path} />}
        </a-menu-item>
      );
    } else {
      return (
        <a-sub-menu
          key={item.key}
          title={() => (
            <span>
              <IconType type={item.icon} />
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
    //   是否关闭
    collapsed: {
      type: Boolean,
      default: false
    },
    // 菜单列表
    menuInfo: {
      type: Object as PropType<MenuItemType[]>,
      default: []
    }
  },
  setup() {
    const state = reactive({
      /**
       * 选择的菜单key
       */
      selectedKeys: []
    });

    return {
      state
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
          this.state.selectedKeys = selectedKeys;
        }}
        selected-keys={this.state.selectedKeys}
      >
        {sub}
      </a-menu>
    );
  }
});

export default MenuRender;
