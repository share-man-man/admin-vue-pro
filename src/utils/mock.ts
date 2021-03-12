import Mock from "mockjs"; //引入mockjs

const service = import.meta.env.VITE_APP_SERVICE;

// 延迟
Mock.setup({ timeout: 500 });

const MyMock = () => {
  return new Promise(resolve => {
    const modules = import.meta.glob("../../mock/modules/**/*.ts");
    Object.keys(modules).forEach((path, index) => {
      if (path !== "../../mock/modules/oauth.ts") {
        modules[path]().then(({ default: mockObj }) => {
          Reflect.ownKeys(mockObj).forEach(key => {
            const [method, url] = (key as string).trim().split(" ");
            Mock.mock(`/api${url}`, method.toLowerCase(), (options: object) => {
              let res = {};
              // 对象直接返回值，函数需要函数自行执行
              if (typeof mockObj[key] === "object") {
                res = Mock.mock(mockObj[key]);
              } else if (typeof mockObj[key] === "function") {
                res = Mock.mock(mockObj[key](options));
              }
              return res;
            });
          });

          if (index === Object.keys(modules).length - 1) {
            resolve(true);
          }
        });
      }
    });

    // 单独引入oauth接口
    Mock.mock(`/api/oauth/refresh_token`, {
      success: true,
      data: {
        accessToken: "test-access2"
      }
    });
    Mock.mock(`/api/oauth/login`, {
      success: true,
      data: {
        accessToken: "test-access1",
        refreshToken: "test-refresh"
      }
    });
    Mock.mock(`/api/oauth/logout`, { success: true });
  });
};

// MyMock();

export default async () => {
  if (service === "mockjs") {
    return MyMock();
  } else {
    return true;
  }
};
