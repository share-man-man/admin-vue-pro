import _ from "lodash";
import moment from "moment";

export const formatTime = (n: Date | number) =>
  moment(n).format("YYYY-MM-DD HH:mm:ss");

export const deleteEmptyKey = (obj: Record<string, unknown>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _.pickBy(obj as {}, _.identity) as any;
