import { defineComponent, onMounted, PropType, watch } from "vue";
// import { ColumnOptions } from "@antv/g2plot/esm/plots/column";
import { DualAxes, DualAxesOptions } from "@antv/g2plot/esm/plots/dual-axes";
import { ColumnDataItem, LineDataItem } from "@/views/dashboard/data";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<{
        column: ColumnDataItem[];
        line: LineDataItem[];
      }>,
      default: () => ({ column: [], line: [] })
    }
  },
  setup(props) {
    let chart: DualAxes;
    const config: DualAxesOptions = {
      data: [props.data.column, props.data.line],
      xField: "date",
      yField: ["value", "count"],
      geometryOptions: [
        {
          geometry: "column",
          isStack: true,
          seriesField: "type"
          // label: {
          //   // 可手动配置 label 数据标签位置
          //   position: "middle", // 'top', 'bottom', 'middle'
          //   // 可配置附加的布局方法
          //   layout: [
          //     // 柱形图数据标签位置自动调整
          //     { type: "interval-adjust-position" },
          //     // 数据标签防遮挡
          //     { type: "interval-hide-overlap" },
          //     // 数据标签文颜色自动调整
          //     { type: "adjust-color" }
          //   ]
          // }
        },
        {
          geometry: "line",
          label: {
            style: {
              fill: "#626681"
            }
          }
        }
      ]
    };

    onMounted(() => {
      chart = new DualAxes("columnContainer", config);
      chart.render();
    });
    watch(props.data, v => {
      chart.changeData([v.column, v.line]);
    });
    return () => <div id="columnContainer"></div>;
  }
});
