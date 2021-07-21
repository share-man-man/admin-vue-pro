import { MenuItemType } from "@/components/Layout/MenuList/data";
import request from "@/utils/request";

export async function getMenuInfo(data?: unknown) {
  return request<MenuItemType[]>({
    // baseURL: "/_mock",
    url: "/user/menu/list",
    method: "POST",
    data
  });
}

export async function getUserInfo(params?: unknown) {
  return request<{ name: string; age: number }>({
    url: "/user/info/3",
    method: "GET",
    params
  });
}
