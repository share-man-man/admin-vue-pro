// 引入封装的axios
import request from "@/utils/request";

export async function fakeReq(params?: any) {
  return request({
    url: "/api/mock/getData",
    method: "GET",
    params
  });
}
