var y=Object.defineProperty,h=Object.defineProperties;var b=Object.getOwnPropertyDescriptors;var s=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var c=(r,t,o)=>t in r?y(r,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[t]=o,p=(r,t)=>{for(var o in t||(t={}))g.call(t,o)&&c(r,o,t[o]);if(s)for(var o of s(t))j.call(t,o)&&c(r,o,t[o]);return r},l=(r,t)=>h(r,b(t));import{P as x,a as I}from"./Content.04b38a87.js";import{a as k,b as P}from"./project.0b64762c.js";import{P as A}from"./index.5a8452ab.js";import{d as B,r as D,e as E,a as e,b as m,F}from"./index.e1409c94.js";import{A as q}from"./index.9b3d4d87.js";import{S as u}from"./index.0debbcaf.js";import{C as S}from"./Card.72d41c0d.js";import{D as n}from"./index.9c5644c5.js";import{B as d}from"./button.6a459199.js";import{m as H}from"./index.ec74e710.js";import"./oauth.2cca38c9.js";import"./debounce.63695ae7.js";import"./CloseCircleOutlined.28f2dbdb.js";import"./InfoCircleOutlined.9f8a4fb5.js";import"./code.aa7872b2.js";import"./index.1452a2c0.js";import"./lodash.176c03aa.js";import"./Form.ccdeba7a.js";import"./SearchOutlined.52ce1b8b.js";import"./_Set.ed75c1de.js";import"./Col.8566bedb.js";import"./_setToArray.0ddff03f.js";import"./isArrayLikeObject.d4b6bd5e.js";import"./_baseProperty.74f89655.js";import"./toInteger.37a40d04.js";import"./ExclamationCircleFilled.9f777fc4.js";import"./CloseCircleFilled.4dc39271.js";import"./LoadingOutlined.3103cde2.js";import"./initDefaultProps.5e2544d9.js";import"./useSize.9fcd18e3.js";import"./index.580754a0.js";import"./tabs.e87a6b5b.js";import"./LeftOutlined.38c21891.js";import"./Input.db60bf9c.js";import"./index.9563d230.js";import"./index.1e2fd8c8.js";import"./Menu.fb13f539.js";import"./Trigger.7768cff1.js";import"./EllipsisOutlined.90a80699.js";import"./index.66957e12.js";import"./index.7b952c9e.js";import"./index.67508f43.js";import"./index.d547124f.js";import"./index.6ba0dd6a.js";import"./index.91886a29.js";import"./index.b893f673.js";import"./CheckOutlined.de965fe7.js";import"./transButton.aaf2b8f0.js";import"./index.a46ebb6b.js";import"./Avatar.1434461f.js";import"./useBreakpoint.256f6e5f.js";import"./wave.af64de9e.js";import"./createChainedFunction.2d5d7d53.js";var Lt=B({props:{code:{type:String,required:!0,default:()=>""}},setup(r){const t=D({}),o=E(),f=[{dataIndex:"id",title:"id"},{dataIndex:"name",title:"api\u63CF\u8FF0"},{dataIndex:"url",title:"\u8BF7\u6C42\u8DEF\u5F84"},{dataIndex:"json_str",title:"json\u5B57\u7B26\u4E32",ellipsis:!0},{dataIndex:"option",title:"\u64CD\u4F5C",customRender:({record:i})=>e(u,null,{default:()=>[e(d,{type:"link",onClick:()=>{const a=document.createElement("input");a.setAttribute("value",i.json_str),document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),H.success("\u6210\u529F\u590D\u5236\u5230\u526A\u5207\u677F")}},{default:()=>[m("\u590D\u5236json")]}),e(d,{type:"link",onClick:()=>{o.push({path:"/mock-server/project/api",query:{id:i.id,projectId:t.value.id}})}},{default:()=>[m("\u8BE6\u60C5")]})]})}],C=async()=>{const i=await P({code:r.code});t.value=p({},i)};return()=>e(F,null,[e(x,null,{default:()=>[e(q,null,{default:()=>[m("\u57FA\u7840\u8BE6\u60C5\u9875")]})]}),e(I,null,{default:()=>[e(u,{direction:"vertical"},{default:()=>[e(S,null,{default:()=>[e(n,{title:"\u9879\u76EE\u57FA\u672C\u4FE1\u606F"},{default:()=>[e(n.Item,{label:"\u9879\u76EE\u82F1\u6587\u540D"},{default:()=>[t.value.code]}),e(n.Item,{label:"\u9879\u76EE\u4E2D\u6587\u540D"},{default:()=>[t.value.name]})]}),e(u,null,{default:()=>[e(d,{type:"primary",onClick:()=>{o.push({path:"/mock-server/project/api"})}},{default:()=>[m("\u65B0\u5EFAapi")]})]})]}),e(A,{title:()=>e("h3",null,[m("api\u5217\u8868")]),search:!1,columns:f,request:(i,a,v)=>C().then(()=>k(l(p({},i),{sorter:a,filter:l(p({},v),{code:t.value.code})})))},null)]})]})])}});export{Lt as default};