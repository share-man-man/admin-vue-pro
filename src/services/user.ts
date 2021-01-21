// 引入封装的axios
// import { MenuItemType } from "@/components/Layout/MenuList/data";
import request from "@/utils/request";

export async function getMenuInfo(data?: any) {
  return request({
    url: "/api/user/menu/list",
    method: "POST",
    data
  });
}
