import store from "@/store";

const { body } = document;

const gridOptions = {
  xs: [1, 768], // 手机
  sm: [768, 992], // 平板电脑
  md: [992, 1200], // 中型台式机
  lg: [1200] // 大型台式机
};

export const fnIsMobile = (): boolean => {
  const rect = body.getBoundingClientRect();
  return rect.width < gridOptions.xs[1];
};

function disPatch() {
  store.commit("layout/setIsMobile", fnIsMobile());
}

export const watchResize = (remove = false) => {
  disPatch();
  if (remove) {
    window.addEventListener("resize", disPatch);
    return;
  }
  window.addEventListener("resize", disPatch);
};
