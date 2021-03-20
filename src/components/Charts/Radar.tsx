import { defineComponent, onMounted } from "vue";
import { Radar, RadarOptions } from "@antv/g2plot/esm/plots/radar";

export default defineComponent({
  setup() {
    const data = [
      { item: "Design", user: "a", score: 70 },
      { item: "Design", user: "b", score: 30 },
      { item: "Design", user: "c", score: 40 },
      { item: "Development", user: "a", score: 60 },
      { item: "Development", user: "b", score: 70 },
      { item: "Development", user: "c", score: 10 },
      { item: "Marketing", user: "a", score: 50 },
      { item: "Marketing", user: "b", score: 60 },
      { item: "Marketing", user: "c", score: 30 },
      { item: "Users", user: "a", score: 40 },
      { item: "Users", user: "b", score: 50 },
      { item: "Users", user: "c", score: 80 },
      { item: "Test", user: "a", score: 60 },
      { item: "Test", user: "b", score: 70 },
      { item: "Test", user: "c", score: 50 }
    ];

    const config: RadarOptions = {
      data,
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
      const radarPlot = new Radar("radarContainer", config);
      radarPlot.render();
    });
    return () => <div id="radarContainer"></div>;
  }
});
