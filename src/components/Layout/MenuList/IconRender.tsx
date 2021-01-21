import { defineComponent, PropType, reactive } from "vue";
import { IconType } from "./data.d";
import {
  DashboardOutlined,
  SettingOutlined,
  LoginOutlined,
  FallOutlined,
  RiseOutlined
} from "@ant-design/icons-vue";

export default defineComponent({
  props: {
    type: {
      type: String as PropType<IconType>
    }
  },
  setup() {
    const state = reactive({
      [DashboardOutlined.name]: <DashboardOutlined />,
      [SettingOutlined.name]: <SettingOutlined />,
      [LoginOutlined.name]: <LoginOutlined />,
      [FallOutlined.name]: <FallOutlined />,
      [RiseOutlined.name]: <RiseOutlined />
    });
    return {
      state
    };
  },
  render({ type }: { type: IconType }) {
    return this.state[type];
  }
});
