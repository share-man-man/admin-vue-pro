// ts引入需要设置tsconfig.json的modules为commonjs,与vue3的treeshaking背道而驰。解决方案1：使用js和require；解决方案2：使用commonjs规范；解决方案3:使用deno启动服务
import express from "express"; //引入express
import Mock from "mockjs"; //引入mockjs
import fs from "fs";
import path from "path";
import intercepter from "./utils/intercept";
import bodyParser from "body-parser";
import { networkInterfaces } from "os";

console.clear();
console.time("Mock服务启动：");

/**
 * 端口
 */
const port = 4000;

/**
 * 实例化express
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * 遍历modules下的所有ts文件，进行动态导入
 * @param parentPath 文件夹路径
 */
const fileDisplay = (parentPath: string) => {
  fs.readdir(parentPath, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach(filename => {
      // path.join得到当前文件的绝对路径
      const childPath = path.join(parentPath, filename);
      // 根据文件路径获取文件信息
      fs.stat(childPath, (error, stats) => {
        if (error) {
          console.warn("获取文件stats失败");
          return;
        }
        const isFile = stats.isFile(); // 是否为文件
        const isDir = stats.isDirectory(); // 是否为文件夹
        if (isFile) {
          // 如果是文件，动态导入该文件
          import(`${parentPath}/${filename}`).then(({ default: mockObj }) => {
            Reflect.ownKeys(mockObj).forEach(key => {
              const [method, url] = (key as string).trim().split(" ");
              app[method.toLowerCase() as "get" | "post"](url, (req, res) => {
                // token拦截
                if (intercepter(req, res)) {
                  return;
                }
                // 对象直接返回值，函数需要函数自行执行
                if (typeof mockObj[key] === "object") {
                  res.json(Mock.mock(mockObj[key]));
                } else if (typeof mockObj[key] === "function") {
                  Mock.mock(mockObj[key](req, res));
                }
              });
            });
          });
        }
        if (isDir) {
          // 递归，如果是文件夹，就继续遍历该文件夹里面的文件；
          fileDisplay(childPath);
        }
      });
    });
  });
};

// 默认引入./modules下的文件
const dirPath = path.resolve(`${__dirname}`, "./modules");
fileDisplay(dirPath);

//设置允许跨域
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 开起服务
app.listen(port, () => {
  console.log();
  const ip = networkInterfaces()["en0"]?.[1]?.address;
  console.log("\x1B[31m%s\x1B[0m", `Local:   http://localhost:${port}`);
  console.log("\x1B[31m%s\x1B[0m", `Network:   http://${ip}:${port}`);
  console.log();
  console.timeEnd("Mock服务启动：");
});
