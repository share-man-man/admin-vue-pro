// ts引入需要设置tsconfig.json的modules为commonjs,与vue3的treeshaking背道而驰。解决方案1：使用js和require；解决方案2：使用commonjs规范；解决方案3:使用deno启动服务
import express from "express"; //引入express
import Mock from "mockjs"; //引入mock

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const express = require("express");
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const Mock = require("mockjs");

/**
 * 端口
 */
const port = 4000;

/**
 * 实例化express
 */
const app = express(); //

//设置允许跨域
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/mock/getData", function(req, res) {
  res.json(
    Mock.mock({
      "data|10": [
        {
          "key|+1": 99,
          "words|1": ["哈哈", "嘿嘿", "biubiu", "啾啾", "喵喵", "啦啦"],
          "activity|1": ["吃饭", "睡觉", "打豆豆"]
        }
      ]
    })
  );
});
// app.get("/mock/getData", (req, res) => {
//   res.json(
//     Mock.mock({
//       "data|10": [
//         {
//           "key|+1": 1,
//           "words|1": ["哈哈", "嘿嘿", "biubiu", "啾啾", "喵喵", "啦啦"],
//           "activity|1": ["吃饭", "睡觉", "打豆豆"]
//         }
//       ]
//     })
//   );
// });
app.listen(port, () => {
  console.log();
  console.log("\x1b[91m", `Mock服务启动：${port}`);
  console.log();
});
