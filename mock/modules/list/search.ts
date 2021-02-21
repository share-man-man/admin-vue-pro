import { ultramanclub } from "../../utils/data";

export default {
  "GET /list/search": {
    success: true,
    data: {
      "list|1-40": [
        {
          "ruleName|1": ultramanclub,
          desc: `这个世界上真的有奥特曼`,
          "count|1-100": 0,
          "state|1": ["CLOSE", "EXCEPTION", "ONLINE", "RUNNING"],
          dispatchTime: () =>
            new Date().getTime() - Math.round(Math.random() * 999999999999)
        }
      ]
    }
  }
};
