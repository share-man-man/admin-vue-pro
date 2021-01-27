/**
 * 菜单项范型
 */
export type MenuItemType = {
  key: string | number;
  name: string;
  path: string;
  children?: MenuItemType[];
  icon?: IconType;
};
