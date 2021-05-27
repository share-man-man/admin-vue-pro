import Request from "@/utils/request";
import { TableListItem } from "@/views/list/card";

interface CardListRespType {
  list: TableListItem[];
}

export async function getCardList() {
  return Request<CardListRespType>({
    // baseURL: "/_mock",
    url: "/list/card",
    method: "GET"
  });
}
