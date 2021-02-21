import request from "@/utils/request";
import { ListItemType } from "@/views/list/basic";

export interface BasicListRespType {
  list: ListItemType[];
}

export async function getList() {
  return request<BasicListRespType>({
    url: "/list/basic",
    method: "GET"
  });
}
