import{d as e,e as t,x as i,c as a,a as l,i as r,F as o}from"./index.4276a2be.js";import{P as d,a as n}from"./Content.f11592c4.js";import"./index.3cbd3f46.js";import{R as s}from"./oauth.70a3402e.js";import{f as m}from"./index.0b56b13b.js";import{A as u}from"./index.7ce74f6f.js";import{C as c}from"./index.3493271b.js";import{D as p}from"./index.f3e04bc7.js";import{D as f}from"./index.c3376da8.js";import{T as j}from"./index.f63f1cb7.js";import{B as b}from"./index.e5415693.js";import"./vendor.60046542.js";import"./index.c67619f6.js";import"./createChainedFunction.2d5d7d53.js";import"./ExclamationCircleFilled.5305c341.js";import"./CloseCircleFilled.a8c4753a.js";import"./LoadingOutlined.d8f50435.js";import"./InfoCircleOutlined.1118f476.js";import"./code.aa7872b2.js";import"./index.a87ecf9f.js";import"./dropdown.b8c73783.js";import"./Trigger.11e93bb4.js";import"./index.819724c8.js";import"./wave.450679b5.js";import"./Event.c36f22c9.js";import"./LeftOutlined.e20f3a52.js";import"./EllipsisOutlined.f8fca143.js";import"./index.1ccf94fb.js";import"./isEqual.21a1b4c7.js";import"./colors.1554396d.js";import"./index.67d27100.js";import"./transButton.a1ab3fb2.js";import"./index.85c78157.js";import"./index.c4d4e8f1.js";import"./Col.59e1c9ac.js";import"./shallowequal.20d16f51.js";import"./index.43d58076.js";import"./SearchOutlined.159af7f3.js";import"./index.e05a0395.js";import"./CheckOutlined.771b9026.js";import"./get.7724f218.js";import"./index.50da88cc.js";import"./index.87d4a831.js";import"./isNumeric.2bec345d.js";function x(e){return"function"==typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!r(e)}var h=e({setup(){const e=t([{id:"pickUpNo",label:"取货单号",value:""},{id:"state",label:"状态",value:""},{id:"saleNo",label:"销售单号",value:""},{id:"childNo",label:"子订单",value:""}]),r=t([{id:"name",label:"用户姓名",value:""},{id:"tel",label:"联系电话",value:""},{id:"express",label:"常用快递",value:""},{id:"address",label:"取货地址",value:""},{id:"mark",label:"备注",value:""}]),h=({text:e,record:t})=>"总计"!==t.no?e:void 0,w=t([{title:"商品编号",dataIndex:"no",width:100,customRender:({text:e})=>a("a",null,[e])},{title:"商品名称",dataIndex:"name",width:120,customRender:h},{title:"商品条码",dataIndex:"barCode",width:150,customRender:h},{title:"单价",dataIndex:"price",width:100,customRender:h},{title:"数量",dataIndex:"number",width:100,customRender:({text:e,record:t})=>"总计"!==t.no?e:a("span",{style:"color:red"},[e])},{title:"金额",dataIndex:"amount",width:100}]),v=t([{title:"时间",dataIndex:"time",width:200,customRender:({text:e})=>m(Number(e))},{title:"当前进度",dataIndex:"process",width:150},{title:"状态",dataIndex:"state",width:100,customRender:({text:e})=>a(b,{status:"完成"===e?"success":"processing",text:e},null)},{title:"操作员ID",dataIndex:"userId",width:100},{title:"耗时",dataIndex:"timeConsuming",width:100}]),g=t([]),I=t([]);return i((async()=>{const{refund:t,userInfo:i}=await async function(){return s({url:"/profile/basic",method:"POST"})}(),{list:a}=await async function(){return s({url:"/profile/basic/return-gogds",method:"POST"})}(),{list:l}=await async function(){return s({url:"/profile/basic/return-process",method:"POST"})}();e.splice(0,e.length,...e.map((e=>{const i=e;return i.value=t[e.id],i}))),r.splice(0,r.length,...r.map((e=>{const t=e;return t.value=i[e.id],t}))),g.splice(0,g.length,...a,{id:0,no:"总计",name:"",barCode:0,price:0,number:a.map((e=>e.number)).reduce(((e,t)=>e+t)),amount:a.map((e=>e.amount)).reduce(((e,t)=>e+t))}),I.splice(0,I.length,...l)})),()=>{let t,i;return a(o,null,[a(d,null,{default:()=>[a(u,null,{default:()=>[l("基础详情页")]})]}),a(n,null,{default:()=>[a(c,null,{default:()=>[a(p,{title:"退款申请"},x(t=e.map((e=>a(p.Item,{label:e.label},{default:()=>[e.value]}))))?t:{default:()=>[t]}),a(f,null,null),a(p,{title:"用户信息"},x(i=r.map((e=>a(p.Item,{label:e.label},{default:()=>[e.value]}))))?i:{default:()=>[i]}),a(f,null,null),a(j,{rowKey:"id",style:{"margin-bottom":"24px"},scroll:{x:"100%"},title:()=>"退货商品",columns:w,dataSource:g,pagination:!1},null),a(j,{rowKey:"id",style:{"margin-bottom":"24px"},scroll:{x:"100%"},title:()=>"退货进度",columns:v,dataSource:I,pagination:!1},null)]})]})])}}});export default h;