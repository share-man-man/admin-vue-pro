import Request from "@/utils/request";
import { RefundType, UserInfoType } from "@/views/profile/basic/data";

export async function getInfo() {
  return Request<{
    refund: RefundType;
    userInfo: UserInfoType;
  }>({
    url: "/profile/basic",
    method: "POST"
  });
}
