import moment from "moment";

export const formatTime = (n: Date | number) =>
  moment(n).format("YYYY-MM-DD HH:mm:ss");
