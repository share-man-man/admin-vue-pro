import{a as c}from"./Content.04b38a87.js";import{d as p,H as d,u as f,h as l,r as _,a as t,a6 as y,s as k,R as v,$ as b}from"./index.e1409c94.js";import{C as g}from"./Card.72d41c0d.js";import{M as n}from"./Menu.fb13f539.js";import"./debounce.63695ae7.js";import"./index.580754a0.js";import"./tabs.e87a6b5b.js";import"./LeftOutlined.38c21891.js";import"./Col.8566bedb.js";import"./_setToArray.0ddff03f.js";import"./_Set.ed75c1de.js";import"./Trigger.7768cff1.js";import"./EllipsisOutlined.90a80699.js";const h="_main_16qtk_1",x="_left_16qtk_7",C="_mobile_16qtk_11",q="_right_16qtk_15";var a={main:h,left:x,mobile:C,right:q};function R(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!k(e)}var I=p({setup(){const e=d(),r=f(),u=l(()=>e.path),s=l(()=>r.state.layout.isMobile?a.mobile:void 0),m=_([{key:"/account/settings/base",text:"\u57FA\u7840\u8BBE\u7F6E"},{key:"/account/settings/security",text:"\u5B89\u5168\u8BBE\u7F6E"},{key:"/account/settings/custom",text:"\u4E2A\u6027\u5316"}]);return()=>{let i;return t(c,null,{default:()=>[t(g,null,{default:()=>[t("div",{class:[a.main,s.value]},[t("div",{class:[a.left,s.value]},[t(n,{mode:s.value?"horizontal":"inline",selectedKeys:[u.value]},R(i=m.value.map(o=>t(n.Item,{key:o.key},{default:()=>[t(y,{to:o.key},{default:()=>[o.text]})]})))?i:{default:()=>[i]})]),t("div",{class:a.right},[t(v,null,{default:({Component:o})=>t(b,null,[o])})])])]})]})}}});export{I as default};