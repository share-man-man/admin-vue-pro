export interface RefundType {
  pickUpNo: number;
  state: string;
  saleNo: string;
  childNo: string;
}

export interface UserInfoType {
  name: number;
  tel: string;
  express: string;
  address: string;
  mark: string;
}

export interface ReturnGoodsType {
  id: number;
  no: string;
  name: string;
  barCode: number;
  price: number;
  number: number;
  amount: number;
}

export interface ReturnProcessType {
  id: number;
  time: number;
  process: string;
  state: string;
  userId: string;
  timeConsuming: string;
}
