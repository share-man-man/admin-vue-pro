export interface OrderInfoType {
  creator: string;
  product: string;
  creatTime: number;
  relateDoc: string;
  effectDate: number[];
  remark: string;
  state: string;
  orderAmount: number;
}

export interface UserInfoType {
  userName: string;
  vipId: number;
  idCard: string;
  tel: string;
  address: string;
}
