import { defineComponent, reactive } from "vue";
import {
  DashboardOutlined,
  SettingOutlined,
  LoginOutlined,
  FallOutlined,
  RiseOutlined
} from "@ant-design/icons-vue";

export const IconMap = {
  [DashboardOutlined.name]: <DashboardOutlined />,
  [SettingOutlined.name]: <SettingOutlined />,
  [LoginOutlined.name]: <LoginOutlined />,
  [FallOutlined.name]: <FallOutlined />,
  [RiseOutlined.name]: <RiseOutlined />
};

export default defineComponent({
  props: {
    type: {
      type: String
    }
  },
  setup() {
    const state = reactive(IconMap);
    return {
      state
    };
  },
  render() {
    return this.state[this.$props.type || ""];
  }
});
