import request from "@/utils/request";
import { OAuthTokenObj } from "@/utils/tokens";

export interface LoginReq {
  username: string;
  password: string;
}

export async function login(data: LoginReq) {
  return request<OAuthTokenObj>({
    url: "/oauth/login",
    method: "POST",
    data
  });
}

export async function logout() {
  return request({
    url: "/oauth/logout",
    method: "POST"
  });
}

export async function getNewAccessToken(data?: OAuthTokenObj) {
  return request<OAuthTokenObj>({
    url: "/oauth/refresh_token",
    method: "POST",
    data
  });
}
