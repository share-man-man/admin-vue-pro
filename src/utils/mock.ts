import Mock from "mockjs"; //引入mockjs

const service = import.meta.env.VITE_APP_SERVICE;

Mock.setup({ timeout: 0 });

const MyMock = () => {
  const modules = import.meta.glob("../../mock/modules/**/*.ts");
  Object.keys(modules).forEach(path => {
    if (path !== "../../mock/modules/oauth.ts") {
      modules[path]().then(({ default: mockObj }) => {
        Reflect.ownKeys(mockObj).forEach(key => {
          const [method, url] = (key as string).trim().split(" ");
          Mock.mock(`/api${url}`, method.toLowerCase(), (options: any) => {
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
};

// MyMock();

export default () => {
  return new Promise(resolve => {
    if (service === "mockjs") {
      MyMock();
    }
    resolve(undefined);
  });
};
