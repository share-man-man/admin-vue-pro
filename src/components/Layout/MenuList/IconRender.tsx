import { defineComponent, PropType, reactive } from "vue";
import {
  HomeOutlined,
  FormOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  UserOutlined,
  BarChartOutlined
} from "@ant-design/icons-vue";
import { Game, T0FE } from "@/components/Icons";

export const IconMap: { [key: string]: JSX.Element } = {
  HomeOutlined: <HomeOutlined />,
  FormOutlined: <FormOutlined />,
  OrderedListOutlined: <OrderedListOutlined />,
  ProfileOutlined: <ProfileOutlined />,
  UserOutlined: <UserOutlined />,
  BarChartOutlined: <BarChartOutlined />,
  Game: <Game />,
  T0FE: <T0FE />
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
    return this.state[this.$props.type || ""];
  }
});
