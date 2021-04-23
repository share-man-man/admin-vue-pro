import { defineComponent, onMounted, ref } from "vue";
import { getColumnData } from "@/services/dashboard/workspace";
import { ColumnDataItem, LineDataItem } from "./data";
import { PageContent } from "@/components/Page";
import { Card } from "ant-design-vue";
import ColumnChart from "@/components/Charts/Column";

const reducerOneDay = (list: ColumnDataItem[]) => {
  const obj: { [key: string]: number } = {};
  list.forEach(i => {
    if (obj[i.date] >= 0) {
      obj[i.date] = obj[i.date] + i.value;
    } else {
      obj[i.date] = i.value;
    }
  });

  return Object.entries(obj).map(([key, value]) => ({
    date: key,
    count: value
  }));
};

export default defineComponent({
  setup() {
    const loading = ref(true);
    const data = ref<{ column: ColumnDataItem[]; line: LineDataItem[] }>({
      column: [],
      line: []
    });

    const loadData = async () => {
      const columnData = await getColumnData();
      data.value.column.splice(0, columnData.length, ...columnData);
      data.value.line = reducerOneDay(data.value.column);
      loading.value = false;
    };

    onMounted(() => {
      loadData();
    });

    return () => (
      <PageContent>
        <Card
          title="营收"
          style={{ "margin-bottom": "24px" }}
          loading={loading.value}
          bordered={false}
          body-style={{ padding: 0 }}
        >
          <div style="min-height: 400px;margin:12px 24px">
            <ColumnChart data={data.value} />
          </div>
        </Card>
      </PageContent>
    );
  }
});
