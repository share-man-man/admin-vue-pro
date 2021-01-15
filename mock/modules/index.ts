import UserModule from "./user";

// 接口对象，为配合之前MockJS规范，定义该接口
export interface MockApi {
  url: string | RegExp;
  type: "get" | "post" | "put" | "delete";
  data:
    | {
        code: number;
        msg: string | null;
        data?: any;
      }
    | Function;
  description?: string;
}

export default [...UserModule];
