import { List } from "ant-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <List>
        <List.Item actions={[<a>修改</a>]}>
          <List.Item.Meta
            title="账户密码"
            description="当前密码强度:强"
          ></List.Item.Meta>
        </List.Item>
        <List.Item actions={[<a>修改</a>]}>
          <List.Item.Meta
            title="密保手机"
            description="已绑定手机：131**3812"
          ></List.Item.Meta>
        </List.Item>
        <List.Item actions={[<a>设置</a>]}>
          <List.Item.Meta
            title="密保问题"
            description="未设置密保问题，密保问题可有效保护账户安全"
          ></List.Item.Meta>
        </List.Item>
        <List.Item actions={[<a>修改</a>]}>
          <List.Item.Meta
            title="备用邮箱"
            description="已绑定邮箱:ant***sign.com"
          ></List.Item.Meta>
        </List.Item>
        <List.Item actions={[<a>绑定</a>]}>
          <List.Item.Meta
            title="MFA 设备"
            description="未绑定 MFA 设备，绑定后，可以进行二次确认"
          ></List.Item.Meta>
        </List.Item>
      </List>
    );
  }
});
