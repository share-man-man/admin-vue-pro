import{d as t,bH as e,bF as a,a9 as s,r as l,c as o,br as n,bI as u,i,bJ as r,K as c}from"./index.eb244924.js";import{a as d}from"./Content.ca3876c2.js";import{C as m}from"./index.1984c64e.js";import"./vendor.60046542.js";import"./Col.ba581b91.js";var b="_main_16qtk_1",f="_left_16qtk_7",p="_mobile_16qtk_11",v="_right_16qtk_15";var _=t({setup(){const t=e(),_=a(),y=s((()=>t.path)),k=s((()=>_.state.layout.isMobile?p:void 0)),j=l([{key:"/account/settings/base",text:"基础设置"},{key:"/account/settings/security",text:"安全设置"},{key:"/account/settings/custom",text:"个性化"}]);return()=>{let t;return o(d,null,{default:()=>[o(m,null,{default:()=>{return[o("div",{class:[b,k.value]},[o("div",{class:[f,k.value]},[o(n,{mode:k.value?"horizontal":"inline",selectedKeys:[y.value]},(e=t=j.value.map((t=>o(n.Item,{key:t.key},{default:()=>[o(u,{to:t.key},{default:()=>[t.text]})]}))),"function"==typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!i(e)?t:{default:()=>[t]}))]),o("div",{class:v},[o(r,null,{default:({Component:t})=>o(c,null,[t])})])])];var e}})]})}}});export default _;