import Request from "@/utils/request";
import { ProjectListItem } from "@/views/mock-server/project";
import { ApiListItem } from "@/views/mock-server/project/detail";

export const getList = async (params = {}) =>
  Request<{ list: ProjectListItem[] }>({
    baseURL: "/mock-server",
    url: "/project/list",
    method: "GET",
    params
  });

export const getAllList = async (data = {}) =>
  Request<{ list: ProjectListItem[] }>({
    baseURL: "/mock-server",
    url: "/project/allList",
    method: "POST",
    data
  });

export const getDetail = async (params: { code: string }) =>
  Request<ProjectListItem>({
    baseURL: "/mock-server",
    url: "/project",
    method: "GET",
    params
  });

export const getApiList = async (params = {}) =>
  Request<{ list: ApiListItem[] }>({
    baseURL: "/mock-server",
    url: "/api/list",
    method: "GET",
    params
  });

export const getApiDetail = async (params: Partial<ApiListItem>) =>
  Request<ApiListItem>({
    baseURL: "/mock-server",
    url: "/api",
    method: "GET",
    params
  });

export const createApi = async (data = {}) =>
  Request<{ list: ApiListItem[] }>({
    baseURL: "/mock-server",
    url: "/api/create",
    method: "POST",
    data
  });

export const updateApi = async (data: Partial<ApiListItem>) =>
  Request({
    baseURL: "/mock-server",
    url: "/api/update",
    method: "POST",
    data
  });
