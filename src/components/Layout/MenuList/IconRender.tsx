import { defineComponent, PropType, reactive } from "vue";
import {
  DashboardOutlined,
  SettingOutlined,
  LoginOutlined,
  FallOutlined,
  RiseOutlined
} from "@ant-design/icons-vue";

export const IconMap = {
  DashboardOutlined: <DashboardOutlined />,
  SettingOutlined: <SettingOutlined />,
  LoginOutlined: <LoginOutlined />,
  FallOutlined: <FallOutlined />,
  RiseOutlined: <RiseOutlined />
};

export default defineComponent({
  props: {
    type: {
      type: String as PropType<keyof typeof IconMap>
    }
  },
  setup() {
    const state = reactive(IconMap);
    return {
      state
    };
  },
  render() {
    return this.state[this.$props.type || "DashboardOutlined"];
  }
});
