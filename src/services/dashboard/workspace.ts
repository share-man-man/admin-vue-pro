import request from "@/utils/request";

export async function getData() {
  return request<RespDataType>({
    url: "/dashboard/workspace/data/list",
    method: "GET"
  });
}

export async function getRadarData() {
  return request<RadarItem[]>({
    url: "/dashboard/workspace/radar/list",
    method: "GET"
  });
}
