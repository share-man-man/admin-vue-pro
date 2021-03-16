import { computed, defineComponent, reactive, ref } from "vue";
import {
  Form,
  Tabs,
  Alert,
  Input,
  Row,
  Col,
  Button
} from "ant-design-vue";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined
} from "@ant-design/icons-vue";
import userStyle from "../style.module.less";
import style from "./style.module.less";
import { MethodsType } from "@/views/form/basic";
import { login } from "@/services/oauth";
import { setTokenObj } from "@/utils/tokens";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const refFormLogin = ref<MethodsType>();
    const loginForm = reactive({
      username: "admin",
      password: "123",
      mobile: "",
      captcha: ""
    });
    const loginError = ref(false);
    const customActiveKey = ref("tab1");
    const messageSending = ref(false);
    const loginLoading = ref(false);
    const handleSubmit = async () => {
      await refFormLogin?.value?.validate();
      loginLoading.value = true;
      login(loginForm)
        .then(tokenObj => {
          //   const tokenObj = await login(loginForm);
          if (setTokenObj(tokenObj)) router.push("/");
          loginLoading.value = false;
        })
        .catch(() => {
          loginError.value = true;
        })
        .finally(() => {
          loginLoading.value = false;
        });
    };
    const rules = computed(() =>
      customActiveKey.value === "tab1"
        ? {
            username: [
              {
                required: true,
                message: "请输入用户名",
                trigger: "blur"
              }
            ],
            password: [
              {
                required: true,
                message: "请输入密码",
                trigger: "blur"
              }
            ],
            mobile: [{ required: false }],
            captcha: [{ required: false }]
          }
        : {
            username: [{ required: false }],
            password: [{ required: false }],
            mobile: [
              {
                required: true,
                message: "请输入手机号",
                trigger: "blur"
              }
            ],
            captcha: [
              {
                required: true,
                message: "请输入验证码",
                trigger: "blur"
              }
            ]
          }
    );

    return () => (
      <div class={userStyle["main"]}>
        <Form
          class={style["user-layout-login"]}
          ref={refFormLogin}
          model={loginForm}
          layout="vertical"
          rules={rules.value}
        >
          <Tabs
            activeKey={customActiveKey.value}
            tabBarStyle={{ textAlign: "center", borderBottom: "unset" }}
            onChange={key => {
              customActiveKey.value = key;
            }}
          >
            <Tabs.TabPane key="tab1" tab="账户密码登陆">
              {loginError.value && (
                <Alert
                  type="error"
                  showIcon
                  style="margin-bottom: 24px;"
                  message="用户名或密码错误"
                />
              )}
              <Form.Item name="username">
                <Input
                  size="large"
                  type="text"
                  placeholder="用户名:admin或user"
                  v-model={[loginForm.username, "value"]}
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                />
              </Form.Item>
              <Form.Item name="password">
                <Input.Password
                  size="large"
                  placeholder="密码:123"
                  v-model={[loginForm.password, "value"]}
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane key="tab2" tab="手机号登陆">
              <Form.Item name="mobile">
                <Input
                  size="large"
                  type="text"
                  placeholder="手机号"
                  v-model={[loginForm.mobile, "value"]}
                  prefix={
                    <MobileOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              </Form.Item>
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item name="captcha">
                    <Input
                      size="large"
                      type="text"
                      placeholder="验证码"
                      v-model={[loginForm.captcha, "value"]}
                      prefix={
                        <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Button
                    size="large"
                    disabled={messageSending.value}
                    onClick={() => {
                      messageSending.value = true;
                      setTimeout(() => {
                        messageSending.value = false;
                      }, 1000);
                    }}
                  >
                    {messageSending.value ? "发送中" : "获取验证码"}
                  </Button>
                </Col>
              </Row>
            </Tabs.TabPane>
          </Tabs>

          <Button
            size="large"
            type="primary"
            // htmlType="submit"
            class={style["login-button"]}
            loading={loginLoading.value}
            onClick={handleSubmit}
          >
            登陆
          </Button>
        </Form>
      </div>
    );
  }
});
