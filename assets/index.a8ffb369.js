var p=Object.defineProperty,j=Object.defineProperties;var c=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var l=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var d=(i,e,t)=>e in i?p(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,s=(i,e)=>{for(var t in e||(e={}))l.call(e,t)&&d(i,t,e[t]);if(r)for(var t of r(e))f.call(e,t)&&d(i,t,e[t]);return i},a=(i,e)=>j(i,c(e));import{a as u}from"./Content.a3f02a4b.js";import{g as b}from"./project.43fa393b.js";import{d as x,k as C,E as I,i as o,j as h}from"./vendor.0aef34f5.js";import{P as O}from"./index.1d6604ae.js";import{B as g}from"./button.80abb62f.js";import"./oauth.a753370a.js";import"./debounce.b47df357.js";import"./index.75ac00a3.js";import"./createChainedFunction.2d5d7d53.js";import"./ExclamationCircleFilled.7a9ee298.js";import"./CloseCircleFilled.4ca4922c.js";import"./LoadingOutlined.e8e7e3ee.js";import"./CloseCircleOutlined.99fb16f4.js";import"./InfoCircleOutlined.354af1bf.js";import"./code.aa7872b2.js";import"./index.de3dd9d1.js";import"./index.939baae1.js";import"./lodash.f63da77e.js";import"./Card.d5621784.js";import"./index.ed5ee94f.js";import"./tabs.be0aa087.js";import"./LeftOutlined.14b5f9c0.js";import"./Col.b260d2ad.js";import"./Form.210842bd.js";import"./SearchOutlined.299869a2.js";import"./_Set.b615e6a2.js";import"./_setToArray.e78d1c9a.js";import"./isArrayLikeObject.4e55706c.js";import"./_baseProperty.74f89655.js";import"./toInteger.fd7802d2.js";import"./initDefaultProps.c0b944b7.js";import"./useSize.10ad6ac6.js";import"./Input.8b770423.js";import"./antInputDirective.dcf4b893.js";import"./index.9563d230.js";import"./index.db4d44f6.js";import"./index.75885935.js";import"./Menu.231ac2cf.js";import"./Trigger.c2d15a0a.js";import"./EllipsisOutlined.1f4e2b9f.js";import"./index.b375f5f0.js";import"./index.40f0cc85.js";import"./index.427e9567.js";import"./index.65f34718.js";import"./index.b1ec7a28.js";import"./index.8a433638.js";import"./index.9f492c9b.js";import"./CheckOutlined.27ffbdda.js";import"./transButton.11ee6a98.js";import"./wave.49730b57.js";var he=x({setup(){const i=C(),e=[{dataIndex:"id",title:"id",hideInForm:!0},{dataIndex:"code",title:"\u9879\u76EE\u82F1\u6587\u540D"},{dataIndex:"name",title:"\u9879\u76EE\u4E2D\u6587\u540D"},{dataIndex:"option",title:"\u64CD\u4F5C",customRender:({record:t})=>o(g,{type:"link",onClick:()=>{i.push({path:"/mock-server/project/detail",query:{code:t.code}})}},{default:()=>[h("\u8BE6\u60C5")]})}];return I(()=>{}),()=>o(u,null,{default:()=>[o(O,{rowKey:"id",columns:e,request:(t,n,m)=>b(a(s({},t),{sorter:n,filter:m}))},null)]})}});export{he as default};