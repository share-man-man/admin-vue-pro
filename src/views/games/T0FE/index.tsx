import { defineComponent, onMounted, ref } from "vue";
import _ from "lodash";
import { PageContent } from "@/components/Page";
import { Card, message } from "ant-design-vue";

import style from "./style.module.less";

type GridItem = [number, number, number, number];
type GridType = GridItem[];

enum Direction {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight"
}

const originGrid: GridType = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

const numPool = [2, 2, 2, 2, 2, 4, 4, 4];

export default defineComponent({
  setup() {
    const grid = ref([...originGrid]);

    /**
     * 获取网格里为空的格子的坐标
     * @param li 需要查询的网格
     * @returns 空网格的坐标数组
     */
    const emptyCoordinates = (li: GridType): [number, number][] => {
      const resList: [number, number][] = [];
      li.forEach((i, y) => {
        i.forEach((j, x) => {
          if (!j) {
            resList.push([x, y]);
          }
        });
      });
      return resList;
    };

    /**
     * 随机生成数字
     * @returns
     */
    const createNum = () => {
      const emptyLi = emptyCoordinates(grid.value);
      if (emptyLi.length === 0) {
        message.error("游戏结束");
        return;
      }
      // 随机生成数的坐标
      const [x, y] = emptyLi[_.random(0, emptyLi.length - 1)];
      // 随机生成的数值
      const num = numPool[_.random(0, numPool.length - 1)];
      grid.value[y][x] = num;

      // 判断是否有可合成的格子
    };

    /**
     * 网格渲染函数
     * @param li 需要渲染的网格
     * @returns 网格列表VNode
     */
    const renderGrid = (li: number[][]) => {
      return li.map((i, y) =>
        i.map((j, x) => (
          <div key={`${x}-${y}`} class={style["cell"]}>
            {j || ""}
          </div>
        ))
      );
    };

    const listenKeyboard = () => {
      document.onkeydown = e => {
        const code = e.code;
        Direction.UP === code;

        // const paramObj = {
        //   [Direction.UP]: () => {
        //     for (let i = 0; i < grid.value.length; i++) {
        //       const element = grid.value[i];
        //     }
        //   }
        // };
        // createNum();
      };
    };

    onMounted(() => {
      listenKeyboard();
      createNum();
    });

    return () => (
      <PageContent>
        <Card>
          <div class={style["container"]}>{renderGrid(grid.value)}</div>
        </Card>
      </PageContent>
    );
  }
});
