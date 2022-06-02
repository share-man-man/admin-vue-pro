import{r as H,t as S,P as o,H as C,g as D,d as i,C as M,c as _,l as z,G,j as N,T as L}from"./debounce.63695ae7.js";import{d as $,k as q,r as g,a as s,j as J,t as K,v as Q}from"./index.e1409c94.js";import{C as R,E as U}from"./ExclamationCircleFilled.9f777fc4.js";import{I as W}from"./index.ec74e710.js";import{C as X}from"./CloseCircleFilled.4dc39271.js";import{C as Y,a as Z,E as ee}from"./CloseCircleOutlined.28f2dbdb.js";import{I as ae}from"./InfoCircleOutlined.9f8a4fb5.js";function oe(){}var ne={success:R,info:W,error:X,warning:U},se={success:Y,info:ae,error:Z,warning:ee},le=S("success","info","warning","error"),te={type:o.oneOf(le),closable:o.looseBool,closeText:o.VNodeChild,message:o.VNodeChild,description:o.VNodeChild,afterClose:o.func.def(oe),showIcon:o.looseBool,prefixCls:o.string,banner:o.looseBool,icon:o.VNodeChild,onClose:o.VNodeChild},ie=$({name:"AAlert",inheritAttrs:!1,props:te,emits:["close"],setup:function(a,u){var f=u.slots,y=u.emit,x=u.attrs,I=u.expose,T=q("configProvider",G),c=g(!1),P=g(!1),b=g(),A=function(l){l.preventDefault();var t=b.value;t.style.height="".concat(t.offsetHeight,"px"),t.style.height="".concat(t.offsetHeight,"px"),c.value=!0,y("close",l)},w=function(){var l;c.value=!1,P.value=!0,(l=a.afterClose)===null||l===void 0||l.call(a)};return I({animationEnd:w}),function(){var n,l=a.prefixCls,t=a.banner,E=T.getPrefixCls,e=E("alert",l),m=a.closable,r=a.type,d=a.showIcon,p=C(f,a,"closeText"),h=C(f,a,"description"),V=C(f,a,"message"),v=C(f,a,"icon");d=t&&d===void 0?!0:d,r=t&&r===void 0?"warning":r||"info";var O=(h?se:ne)[r]||null;p&&(m=!0);var F=D(e,(n={},i(n,"".concat(e,"-").concat(r),!0),i(n,"".concat(e,"-closing"),c.value),i(n,"".concat(e,"-with-description"),!!h),i(n,"".concat(e,"-no-icon"),!d),i(n,"".concat(e,"-banner"),!!t),i(n,"".concat(e,"-closable"),m),n)),j=m?s("button",{type:"button",onClick:A,class:"".concat(e,"-close-icon"),tabindex:0},[p?s("span",{class:"".concat(e,"-close-text")},[p]):s(M,null,null)]):null,k=v&&(_(v)?J(v,{class:"".concat(e,"-icon")}):s("span",{class:"".concat(e,"-icon")},[v]))||s(O,{class:"".concat(e,"-icon")},null),B=z("".concat(e,"-slide-up"),{appear:!1,onAfterLeave:w});return P.value?null:s(L,B,{default:function(){return[K(s("div",N(N({},x),{},{class:[x.class,F],"data-show":!c.value,ref:b}),[d?k:null,s("div",{class:"".concat(e,"-content")},[s("div",{class:"".concat(e,"-message")},[V]),s("div",{class:"".concat(e,"-description")},[h])]),j]),[[Q,!c.value]])]}})}}}),he=H(ie);export{he as A};