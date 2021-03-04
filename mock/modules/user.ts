import { Request, Response } from "express";
import { MenuItemType } from "../../src/components/Layout/MenuList/data";
import { CustomResponseType } from "../../src/utils/request";

const getMenuInfo = (): CustomResponseType<MenuItemType[]> => {
  return {
    success: true,
    error: {
      msg: "没有相关权限"
    },
    data: [
      { key: "1", name: "首页", path: "/", icon: "DashboardOutlined" },
      {
        key: "2",
        name: "表单",
        path: "/form",
        icon: "DashboardOutlined",
        children: [
          {
            key: "3",
            name: "基础表单",
            path: "/form/basic",
            icon: "DashboardOutlined"
          },
          {
            key: "4",
            name: "步骤表单",
            path: "/form/step",
            icon: "DashboardOutlined"
          },
          {
            key: "5",
            name: "高级表单",
            path: "/form/advanced",
            icon: "DashboardOutlined"
          }
        ]
      },
      {
        key: "6",
        name: "列表",
        path: "/list",
        icon: "DashboardOutlined",
        children: [
          {
            key: "7",
            name: "基础列表",
            path: "/list/basic",
            icon: "DashboardOutlined"
          },
          {
            key: "8",
            name: "查询表格",
            path: "/list/search",
            icon: "DashboardOutlined"
          },
          {
            key: "9",
            name: "卡片列表",
            path: "/list/card",
            icon: "DashboardOutlined"
          }
        ]
      },
      {
        key: "10",
        name: "详情页",
        path: "/profile",
        icon: "DashboardOutlined",
        children: [
          {
            key: "11",
            name: "基础详情页",
            path: "/profile/basic",
            icon: "DashboardOutlined"
          },
          {
            key: "12",
            name: "高级详情页",
            path: "/profile/advanced",
            icon: "DashboardOutlined"
          }
        ]
      }
    ]
  };
};

const getUserInfo = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      name: "测试人员1",
      age: 123
    }
  });
};

export default {
  "POST /user/menu/list": getMenuInfo(),
  "GET /user/info/:id": getUserInfo
};
