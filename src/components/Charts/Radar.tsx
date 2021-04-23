import { defineComponent, onMounted, PropType, watch } from "vue";
import { Radar, RadarOptions } from "@antv/g2plot/esm/plots/radar";

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<RadarItem[]>,
      default: () => []
    }
  },
  setup(props) {
    let chart: Radar;
    const config: RadarOptions = {
      data: props.data,
      xField: "item",
      yField: "score",
      seriesField: "user",
      meta: {
        score: {
          alias: "分数",
          min: 0,
          max: 80
        }
      },
      xAxis: {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null
            }
          }
        }
      },
      yAxis: {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: "line",
            style: {
              lineDash: null
            }
          }
        }
      },
      // 开启辅助点
      point: {
        size: 2
      }
    };

    onMounted(() => {
      chart = new Radar("radarContainer", config);
      chart.render();
    });
    watch(props.data, v => {
      chart.changeData(v);
    });

    return () => <div id="radarContainer"></div>;
  }
});
