// 引入封装的axios
import request from "@/utils/request";

export async function fakeReq(params?: any) {
  return request({
    url: "/api/container/detail",
    method: "GET",
    params
  });
}
