import{d as t,g as e,f as n,c as a,i as r}from"./index.4276a2be.js";import{A as o,a7 as i,r as c}from"./index.3cbd3f46.js";function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=o(t({name:"ADivider",props:{prefixCls:String,type:{type:String,default:"horizontal"},dashed:{type:Boolean,default:!1},orientation:{type:String,default:"center"}},setup:function(t,o){var u=o.slots,s=e("configProvider",c).getPrefixCls,d=n((function(){return s("divider",t.prefixCls)})),f=n((function(){var e,n=t.type,a=t.dashed,r=t.orientation,o=r.length>0?"-"+r:r,i=d.value;return l(e={},i,!0),l(e,"".concat(i,"-").concat(n),!0),l(e,"".concat(i,"-with-text").concat(o),u.default),l(e,"".concat(i,"-dashed"),!!a),e}));return function(){var t,e,n=i(null===(t=u.default)||void 0===t?void 0:t.call(u));return a("div",{class:f.value,role:"separator"},[n.length?a("span",{class:"".concat(d.value,"-inner-text")},(e=n,"function"==typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!r(e)?n:{default:function(){return[n]}})):null])}}}));export{u as D};