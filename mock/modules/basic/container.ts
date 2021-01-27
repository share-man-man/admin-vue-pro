import { Request, Response } from "express";

export default {
  "GET /container": {
    success: true,
    "data|10": [
      {
        "id|+1": 2021011615,
        "name|1": ["柜机", "电池"]
      }
    ]
  },
  "GET /container/detail": (req: Request, res: Response) => {
    res.json({
      success: false,
      error: {
        code: 0,
        msg: "没有获取到相应的id"
      },
      data: {
        no: "成功",
        type: 3,
        time: new Date().getTime()
      }
    });
  }
};
