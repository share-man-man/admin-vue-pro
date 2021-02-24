import { PageContent, PageHeader } from "@/components/Page";
import { PageHeader as AntPageHeader } from "ant-design-vue";
// import { Card } from "ant-design-vue";
import { Card } from "ant-design-vue/es";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <>
        <PageHeader>
          <AntPageHeader>基础详情页</AntPageHeader>
        </PageHeader>
        <PageContent>
          <Card>baskjdbaksj</Card>
        </PageContent>
      </>
    );
  }
});
