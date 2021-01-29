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
