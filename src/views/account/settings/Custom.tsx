import { List, Switch } from "ant-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <List>
        <List.Item
          actions={[
            <Switch
              checkedChildren="暗色"
              unCheckedChildren="默认"
              checked
              disabled
            />
          ]}
        >
          <List.Item.Meta
            title="风格配色"
            description="整体风格配色设置"
          ></List.Item.Meta>
        </List.Item>
        <List.Item>
          <List.Item.Meta
            title="主题色"
            description="页面风格配色："
          ></List.Item.Meta>
        </List.Item>
      </List>
    );
  }
});
