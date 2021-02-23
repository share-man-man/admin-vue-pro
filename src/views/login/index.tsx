import { defineComponent, ref } from "vue";
import { Input, Button } from "ant-design-vue";
import { login } from "@/services/oauth";
import { useRouter } from "vue-router";
import { setTokenObj } from "@/utils/tokens";

export default defineComponent({
  setup() {
    const router = useRouter();
    const username = ref("admin");
    const password = ref("123");

    const onLogin = async () => {
      const tokenObj = await login({
        username: username.value,
        password: password.value
      });
      if (setTokenObj(tokenObj)) router.push("/");
    };

    return {
      onLogin,
      username,
      password
    };
  },
  render() {
    return (
      <>
        <Input
          value={this.username}
          onInput={(e: InputEvent) => {
            this.username = (e.target as HTMLInputElement).value;
          }}
          placeholder="用户名:admin或user"
        />
        <Input
          value={this.password}
          onInput={(e: InputEvent) => {
            this.password = (e.target as HTMLInputElement).value;
          }}
          placeholder="密码:123"
        />
        <Button type="primary" onClick={this.onLogin}>
          登陆
        </Button>
      </>
    );
  }
});
