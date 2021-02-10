export interface RouteItem {
  /**
   * 主键
   */
  key: string;
  /**
   * 路径
   */
  path: string;
  /**
   * 全路径
   */
  fullPath: string;
  /**
   * 路由匹配组件
   */
  component: VNode;
  /**
   * 标签页名字
   */
  tabName: string;
  /**
   * 重载时间，用于组件的动态key
   */
  reloadTime: number;
  /**
   * 重载
   */
  reloading: boolean;
}
