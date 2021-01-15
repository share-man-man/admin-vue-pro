import { MockApi } from ".";

const UserModule: Array<MockApi> = [
  /**
   * @api {post} /user 添加用户
   * @apiName AddUser
   * @apiGroup User
   * @apiVersion 1.0.0
   *
   * @apiParam {String} username          用户ID
   * @apiParam {String} passowrd          用户密码
   * @apiParam {String} [age]             用户年龄
   *
   * @apiSuccessExample Success-Response:
   *     {
   *       code: 0,
   *       message: '保存成功'
   *     }
   */
  {
    url: "/user",
    type: "post",
    data: {
      code: 0,
      msg: "",
      data(req: Request) {
        console.log(req.body);

        return {
          code: 0,
          message: "保存成功！"
        };
      }
    }
  },
  /**
   * @api {get} /user/:id 请求用户信息
   * @apiName GetUser
   * @apiGroup User
   * @apiVersion 1.0.0
   *
   * @apiParam {String} id 用户唯一编码
   *
   * @apiSuccess {String} id 用户唯一编码
   * @apiSuccess {String} username 用户名
   * @apiSuccess {String} password  用户密码
   * @apiSuccess {Integer} age 用户年龄
   */
  {
    url: "/user/:id",
    type: "get",
    data: {
      code: 0,
      msg: "",
      data: {
        id: "@id()",
        username: "斯蒂芬",
        password: "",
        age: "@integer(1,100)"
      }
    }
  }
];

export default UserModule;
