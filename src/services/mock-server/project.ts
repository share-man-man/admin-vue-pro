import Request from "@/utils/request";
import { ProjectListItem } from "@/views/mock-server/project";

export const getList = async params =>
  Request<{ list: ProjectListItem[] }>({
    baseURL: "/mock-server",
    url: "/project/list",
    method: "GET",
    params
  });

export const getDetail = async (params: { code: string }) =>
  Request<ProjectListItem>({
    baseURL: "/mock-server",
    url: "/project",
    method: "GET",
    params
  });
