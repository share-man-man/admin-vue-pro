import { ultramanclub } from "../../utils/data";

export default {
  "POST /profile/basic": {
    success: true,
    data: {
      refund: {
        "pickUpNo|1000000-2000000": 0,
        "state|1": ["新建", "待发货", "已发货", "运输中", "已取货", "完成"],
        "saleNo|65761231-75761231": 0,
        "childNo|3000000-4000000": 0
      },
      userInfo: {
        "name|1": ultramanclub,
        "tel|13128390195-18112957321": 0,
        "express|1": ["m78星云", "怪兽监狱", "地球", "百兽墓地"],
        address: "四川成都天府四街ocg",
        "mark|1": ["无", "小怪兽", "黑暗暴君"]
      }
    }
  }
};
