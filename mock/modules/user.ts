const getMenuInfo = () => {
  return [
    {
      key: "1",
      name: "报表",
      path: "/dashboard",
      icon: "DashboardOutlined",
      children: [
        {
          key: "5",
          name: "库存报表",
          path: "/dashboard/stock",
          children: [],
          icon: "FallOutlined"
        },
        {
          key: "6",
          name: "出库报表",
          path: "/dashboard/deliver",
          children: [
            {
              key: "7",
              name: "带参报表1",
              path: "/dashboard/deliver?content=1111",
              children: [],
              icon: "RiseOutlined"
            },
            {
              key: "8",
              name: "带参报表2",
              path: "/dashboard/deliver?content=2222",
              children: [],
              icon: "RiseOutlined"
            }
          ],
          icon: "RiseOutlined"
        }
      ]
    },
    {
      key: "2",
      name: "基础",
      path: "/basic",
      children: [],
      icon: "SettingOutlined"
    },
    {
      key: "3",
      name: "入库",
      path: "/income",
      children: [],
      icon: "LoginOutlined"
    },
    {
      key: "4",
      name: "测试",
      path: "/test",
      children: [
        {
          key: "9",
          name: "测试子菜单1",
          path: "/test/child-test",
          children: [
            {
              key: "11",
              name: "测试子菜单3",
              path: "/test/child-test/child-test3",
              children: [],
              icon: "LoginOutlined"
            }
          ],
          icon: "LoginOutlined"
        },
        {
          key: "10",
          name: "测试子菜单2",
          path: "/test/child-test2",
          children: [],
          icon: "LoginOutlined"
        }
      ],
      icon: "DashboardOutlined"
    }
  ];
};

export default {
  "POST /user/menu/list": getMenuInfo()
};
