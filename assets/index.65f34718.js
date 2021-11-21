import{P as s,q,am as C,F,s as O,_ as f,g as G,d as x,j as _,G as A,a as j}from"./debounce.b47df357.js";import{C as H}from"./index.b1ec7a28.js";import{d as w,t as m,z as K,i as p,s as X}from"./vendor.0aef34f5.js";var M=globalThis&&globalThis.__rest||function(n,t){var a={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0&&(a[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(n);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(n,e[r])&&(a[e[r]]=n[e[r]]);return a};function B(){}var v=w({name:"ACheckbox",inheritAttrs:!1,__ANT_CHECKBOX:!0,props:{prefixCls:s.string,defaultChecked:s.looseBool,checked:s.looseBool,disabled:s.looseBool,isGroup:s.looseBool,value:s.any,name:s.string,id:s.string,indeterminate:s.looseBool,type:s.string.def("checkbox"),autofocus:s.looseBool,onChange:s.func,"onUpdate:checked":s.func},emits:["change","update:checked"],setup:function(){return{configProvider:m("configProvider",A),checkboxGroupContext:m("checkboxGroupContext",void 0)}},watch:{value:function(t,a){var e=this;K(function(){var r=e.checkboxGroupContext,o=r===void 0?{}:r;o.registerValue&&o.cancelValue&&(o.cancelValue(a),o.registerValue(t))})}},mounted:function(){var t=this.value,a=this.checkboxGroupContext,e=a===void 0?{}:a;e.registerValue&&e.registerValue(t),q(C(this,"checked")||this.checkboxGroupContext||!C(this,"value"),"Checkbox","`value` is not validate prop, do you mean `checked`?")},beforeUnmount:function(){var t=this.value,a=this.checkboxGroupContext,e=a===void 0?{}:a;e.cancelValue&&e.cancelValue(t)},methods:{handleChange:function(t){var a=t.target.checked;this.$emit("update:checked",a),this.$emit("change",t)},focus:function(){this.$refs.vcCheckbox.focus()},blur:function(){this.$refs.vcCheckbox.blur()}},render:function(){var t=this,a,e=F(this),r=this.checkboxGroupContext,o=this.$attrs,l=O(this),u=e.indeterminate,h=e.prefixCls,i=M(e,["indeterminate","prefixCls"]),g=this.configProvider.getPrefixCls,c=g("checkbox",h),V=o.onMouseenter,I=V===void 0?B:V,y=o.onMouseleave,S=y===void 0?B:y;o.onInput;var N=o.class,T=o.style,z=M(o,["onMouseenter","onMouseleave","onInput","class","style"]),d=f(f(f({},i),{prefixCls:c}),z);r?(d.onChange=function(){for(var P=arguments.length,$=new Array(P),b=0;b<P;b++)$[b]=arguments[b];t.$emit.apply(t,["change"].concat($)),r.toggleOption({label:l,value:e.value})},d.name=r.name,d.checked=r.sValue.indexOf(e.value)!==-1,d.disabled=e.disabled||r.disabled,d.indeterminate=u):d.onChange=this.handleChange;var U=G((a={},x(a,"".concat(c,"-wrapper"),!0),x(a,"".concat(c,"-wrapper-checked"),d.checked),x(a,"".concat(c,"-wrapper-disabled"),d.disabled),a),N),E=G(x({},"".concat(c,"-indeterminate"),u));return p("label",{class:U,style:T,onMouseenter:I,onMouseleave:S},[p(H,_(_({},d),{},{class:E,ref:"vcCheckbox"}),null),l.length?p("span",null,[l]):null])}});function D(){}var k=w({name:"ACheckboxGroup",props:{name:s.string,prefixCls:s.string,defaultValue:{type:Array},value:{type:Array},options:{type:Array},disabled:s.looseBool,onChange:s.func},emits:["change","update:value"],setup:function(){return{configProvider:m("configProvider",A)}},data:function(){var t=this.value,a=this.defaultValue;return{sValue:t||a||[],registeredValues:[]}},watch:{value:function(t){this.sValue=t||[]}},created:function(){X("checkboxGroupContext",this)},methods:{getOptions:function(){var t=this.options,a=t===void 0?[]:t,e=this.$slots;return a.map(function(r){if(typeof r=="string")return{label:r,value:r};var o=r.label;return o===void 0&&e.label&&(o=e.label(r)),f(f({},r),{label:o})})},cancelValue:function(t){this.registeredValues=this.registeredValues.filter(function(a){return a!==t})},registerValue:function(t){this.registeredValues=[].concat(j(this.registeredValues),[t])},toggleOption:function(t){var a=this.registeredValues,e=this.sValue.indexOf(t.value),r=j(this.sValue);e===-1?r.push(t.value):r.splice(e,1),C(this,"value")||(this.sValue=r);var o=this.getOptions(),l=r.filter(function(u){return a.indexOf(u)!==-1}).sort(function(u,h){var i=o.findIndex(function(c){return c.value===u}),g=o.findIndex(function(c){return c.value===h});return i-g});this.$emit("update:value",l),this.$emit("change",l)}},render:function(){var t=this.$props,a=this.$data,e=t.prefixCls,r=t.options,o=this.configProvider.getPrefixCls,l=o("checkbox",e),u=O(this),h="".concat(l,"-group");return r&&r.length>0&&(u=this.getOptions().map(function(i){return p(v,{prefixCls:l,key:i.value.toString(),disabled:"disabled"in i?i.disabled:t.disabled,indeterminate:i.indeterminate,value:i.value,checked:a.sValue.indexOf(i.value)!==-1,onChange:i.onChange||D,class:"".concat(h,"-item")},{default:function(){return[i.label]}})})),p("div",{class:h},[u])}});v.Group=k;v.install=function(n){return n.component(v.name,v),n.component(k.name,k),n};export{v as C};