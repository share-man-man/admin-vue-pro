export type IconType =
  | "PieChartOutlined"
  | "MailOutlined"
  | "DashboardOutlined"
  | "SettingOutlined"
  | "LoginOutlined"
  | "FallOutlined"
  | "RiseOutlined"
  | "DashboardOutlined";

export type MenuItemType = {
  key: string | number;
  name: string;
  path: string;
  children?: MenuItemType[];
  icon?: IconType;
};
