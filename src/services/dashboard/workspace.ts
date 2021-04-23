import request from "@/utils/request";
import { ColumnDataItem } from "@/views/dashboard/data";

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

export async function getColumnData() {
  return request<ColumnDataItem[]>({
    url: "/dashboard/column",
    method: "GET"
  });
}
