import { Slots } from "vue";

export const getSlots = (s: Slots, name = "default") =>
  (s[name] as Function)?.();
