import Request from "@/utils/request";
import {
  RefundType,
  ReturnGoodsType,
  ReturnProcessType,
  UserInfoType
} from "@/views/profile/basic/data";

export async function getInfo() {
  return Request<{
    refund: RefundType;
    userInfo: UserInfoType;
  }>({
    url: "/profile/basic",
    method: "POST"
  });
}

export async function getReturnGoods() {
  return Request<{ list: ReturnGoodsType[] }>({
    url: "/profile/basic/return-gogds",
    method: "POST"
  });
}

export async function getReturnProcess() {
  return Request<{ list: ReturnProcessType[] }>({
    url: "/profile/basic/return-process",
    method: "POST"
  });
}
