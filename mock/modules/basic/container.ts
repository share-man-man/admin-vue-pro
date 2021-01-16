import { Request, Response } from "express";

export default {
  "GET /container": {
    "data|10": [
      {
        "id|+1": 2021011615,
        "name|1": ["柜机", "电池"]
      }
    ]
  },
  "GET /container/detail": (req: Request, res: Response) => {
    res.json({
      no: "1111",
      type: 3,
      time: new Date().getTime()
    });
  }
};
