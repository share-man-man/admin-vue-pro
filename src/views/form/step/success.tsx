import { defineComponent, PropType } from "vue";
import { Result, Button } from "ant-design-vue";
import { FormType } from ".";
import Desc from "./descrip";

export default defineComponent({
  props: {
    form: {
      required: true,
      type: Object as PropType<FormType>
    },
    onAgain: Function as PropType<() => void>
  },
  setup(props) {
    return () => (
      <Result status="success" title="操作成功" sub-title="预计两小时到账">
        {{
          default: () => <Desc form={props.form} />,
          extra: () => (
            <>
              <Button onClick={props.onAgain} type="primary">
                再转一笔
              </Button>
              <Button>查看账单</Button>
            </>
          )
        }}
      </Result>
    );
  }
});
