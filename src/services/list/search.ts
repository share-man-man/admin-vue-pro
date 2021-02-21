import request from "@/utils/request";
import { TableDataType } from "@/views/list/search";

interface SearchListRespType {
  list: TableDataType[];
}

export async function getList() {
  return request<SearchListRespType>({
    url: "/list/search",
    method: "GET"
  });
}
