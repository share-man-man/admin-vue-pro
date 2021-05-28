import { computed, defineComponent, onMounted, ref } from "vue";
import { PageContent, PageHeader } from "@/components/Page";
import {
  PageHeader as AntPageHeader,
  Card,
  Button,
  Input,
  message,
  Form,
  Select
} from "ant-design-vue";
import {
  getAllList,
  getApiDetail,
  createApi,
  updateApi
} from "@/services/mock-server/project";
import { ProjectListItem } from ".";
import { ApiListItem } from "./detail";

export default defineComponent({
  props: {
    id: {
      type: [Number],
      require: false
    },
    projectId: {
      type: [Number],
      require: false
    }
  },
  setup(props) {
    const form = ref<
      | Partial<ApiListItem>
      | {
          [key: string]: (string | number)[] | string | number;
        }
    >({});
    const formRef = ref<typeof Form.methods>(undefined);
    const mode = computed(() => (props.id ? "edit" : "add"));
    const projectList = ref<ProjectListItem[]>([]);

    const onSubmit = () => {
      formRef?.value?.validateFields().then(() => {
        if (mode.value === "add") {
          createApi(form.value);
          message.success("添加成功");
        } else if (mode.value === "edit") {
          updateApi(form.value);
          message.success("修改成功");
        }
      });
    };

    onMounted(async () => {
      getAllList().then(res => {
        projectList.value = res.list;
      });

      if (mode.value === "edit") {
        const res = await getApiDetail({
          id: props.id
        });

        form.value = res;
      }

      //   form.value = {
      //     json_str: '{"n":"11"}',
      //     name: "ghj",
      //     project_id: 2,
      //     url: "sadasd"
      //   };
    });

    return () => (
      <>
        <PageHeader>
          <AntPageHeader>{props.id ? "api详情页" : "新建api"}</AntPageHeader>
        </PageHeader>
        <PageContent>
          <Card>
            <Form layout="vertical" model={form.value} ref={formRef}>
              <Form.Item label="id" name="id">
                <Input v-model={[form.value["id"], "value"]} disabled />
              </Form.Item>
              <Form.Item label="api描述" name="name" required>
                <Input v-model={[form.value["name"], "value"]} />
              </Form.Item>
              <Form.Item label="关联项目英文名">
                <Input
                  value={
                    projectList.value.find(
                      i => i.id === form.value["project_id"]
                    )?.code
                  }
                  disabled
                />
              </Form.Item>
              <Form.Item
                label="关联项目"
                name="project_id"
                rules={[
                  { type: "number" },
                  {
                    validator: (_: any, v: string) => {
                      if (!v) {
                        return Promise.reject("请输入关联项目");
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Select v-model={[form.value["project_id"], "value"]}>
                  {projectList.value.map(i => (
                    <Select.Option key={i.id} value={i.id}>
                      {i.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="请求路径" name="url" required>
                <Input v-model={[form.value["url"], "value"]} />
              </Form.Item>
              <Form.Item
                label="mock数据的json字符串"
                name="json_str"
                // required
                rules={[
                  {
                    validator: (_: any, v: string) => {
                      if (!v) {
                        return Promise.reject("json串不能为空");
                      }
                      try {
                        const jsonObj = JSON.parse(v);
                        if (typeof jsonObj !== "object") {
                          throw new Error();
                        }
                      } catch (error) {
                        return Promise.reject("请输入正确的json格式");
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input.TextArea
                  v-model={[form.value["json_str"], "value"]}
                  allowClear
                  autoSize={{ minRows: 8 }}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={onSubmit}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </PageContent>
      </>
    );
  }
});
