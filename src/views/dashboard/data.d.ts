export interface ColumnDataItem {
  // /* 微信 */
  // wechat: number;
  // /* 支付宝 */
  // alipay: number;
  // /* 现金 */
  // cash: number;
  date: string;
  type: "wechat" | "alipay" | "cash";
  value: number;
}

export interface LineDataItem {
  date: string;
  count: number;
}
