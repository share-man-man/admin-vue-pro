import { defineComponent, PropType } from "vue";
import { FormType } from ".";
import Desc from "./descrip";

export default defineComponent({
  props: {
    form: {
      required: true,
      type: Object as PropType<FormType>
    },
    onAgain: Function
  },
  setup(props) {
    return () => (
      <a-result status="success" title="操作成功" sub-title="预计两小时到账">
        {{
          default: () => <Desc form={props.form} />,
          extra: () => (
            <>
              <a-button onClick={props.onAgain} type="primary">
                再转一笔
              </a-button>
              <a-button>查看账单</a-button>
            </>
          )
        }}
      </a-result>
    );
  }
});
