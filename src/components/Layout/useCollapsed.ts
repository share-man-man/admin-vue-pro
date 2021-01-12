import { Ref, ref } from "vue";

export interface StateType {
  collapsed: Ref<boolean>;
  setCollapsed: (val: boolean) => void;
}

export default function useCollapsed(): StateType {
  const collapsed = ref(false);
  const setCollapsed = (val: boolean) => {
    collapsed.value = val;
  };

  return {
    collapsed,
    setCollapsed
  };
}
