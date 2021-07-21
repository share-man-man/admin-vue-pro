import { MenuItemType } from "../../src/components/Layout/MenuList/data";
import { CustomResponseType } from "../../src/utils/request";

const getMenuInfo = (): CustomResponseType<MenuItemType[]> => {
  return {
    success: true,
    error: {
      msg: "没有相关权限"
    },
    data: [
      { key: "1", name: "工作台", path: "/workspace", icon: "HomeOutlined" },
      {
        key: "dashboard",
        name: "报表",
        path: "/dashboard",
        icon: "BarChartOutlined"
      },
      {
        key: "2",
        name: "表单",
        path: "/form",
        icon: "FormOutlined",
        children: [
          {
            key: "3",
            name: "基础表单",
            path: "/form/basic",
            icon: "FormOutlined"
          },
          {
            key: "4",
            name: "步骤表单",
            path: "/form/step",
            icon: "FormOutlined"
          },
          {
            key: "5",
            name: "高级表单",
            path: "/form/advanced",
            icon: "FormOutlined"
          }
        ]
      },
      {
        key: "6",
        name: "列表",
        path: "/list",
        icon: "OrderedListOutlined",
        children: [
          {
            key: "7",
            name: "基础列表",
            path: "/list/basic",
            icon: "OrderedListOutlined"
          },
          {
            key: "8",
            name: "查询表格",
            path: "/list/search",
            icon: "OrderedListOutlined"
          },
          {
            key: "9",
            name: "卡片列表",
            path: "/list/card",
            icon: "OrderedListOutlined"
          }
        ]
      },
      {
        key: "10",
        name: "详情页",
        path: "/profile",
        icon: "ProfileOutlined",
        children: [
          {
            key: "11",
            name: "基础详情页",
            path: "/profile/basic",
            icon: "ProfileOutlined"
          },
          {
            key: "12",
            name: "高级详情页",
            path: "/profile/advanced",
            icon: "ProfileOutlined"
          }
        ]
      },
      {
        key: "13",
        name: "个人页",
        path: "/account",
        icon: "UserOutlined",
        children: [
          {
            key: "14",
            name: "个人中心",
            path: "/account/center",
            icon: "UserOutlined"
          },
          {
            key: "15",
            name: "个人设置",
            path: "/account/settings",
            icon: "UserOutlined"
          }
        ]
      },
      {
        key: "16",
        name: "小游戏",
        path: "/games",
        icon: "Game",
        children: [
          {
            key: "17",
            name: "2048",
            path: "/games/2048",
            icon: "T0FE"
          }
        ]
      },
      {
        key: "18",
        name: "Mock服务",
        path: "/mock-server",
        icon: "UserOutlined",
        children: [
          {
            key: "19",
            name: "项目管理",
            path: "/mock-server/project",
            icon: "UserOutlined"
          }
        ]
      }
    ]
  };
};

const getUserInfo = () => {
  return {
    success: true,
    data: {
      name: "测试人员1",
      age: 123
    }
  };
};

export default {
  "POST /user/menu/list": getMenuInfo(),
  "GET /user/info/:id": getUserInfo()
};
