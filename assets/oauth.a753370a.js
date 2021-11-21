import{_ as te,C as Be}from"./debounce.b47df357.js";import{N as Ie,m as Ue}from"./index.75ac00a3.js";import{C as De,a as Le,E as qe}from"./CloseCircleOutlined.99fb16f4.js";import{I as Fe}from"./InfoCircleOutlined.354af1bf.js";import{i as C}from"./vendor.0aef34f5.js";import{E as He,H as Me}from"./code.aa7872b2.js";import{r as _e}from"./index.de3dd9d1.js";var E={},re=4.5,ne="24px",ae="24px",oe="topRight",se=function(){return document.body},ie=null;function Je(t){var e=t.duration,r=t.placement,n=t.bottom,a=t.top,o=t.getContainer,u=t.closeIcon;e!==void 0&&(re=e),r!==void 0&&(oe=r),n!==void 0&&(ae=typeof n=="number"?"".concat(n,"px"):n),a!==void 0&&(ne=typeof a=="number"?"".concat(a,"px"):a),o!==void 0&&(se=o),u!==void 0&&(ie=u)}function ze(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:ne,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ae,n;switch(t){case"topLeft":n={left:"0px",top:e,bottom:"auto"};break;case"topRight":n={right:"0px",top:e,bottom:"auto"};break;case"bottomLeft":n={left:"0px",top:"auto",bottom:r};break;default:n={right:"0px",top:"auto",bottom:r};break}return n}function Ke(t,e){var r=t.prefixCls,n=t.placement,a=n===void 0?oe:n,o=t.getContainer,u=o===void 0?se:o,i=t.top,s=t.bottom,d=t.closeIcon,y=d===void 0?ie:d,f="".concat(r,"-").concat(a);if(E[f]){e(E[f]);return}Ie.newInstance({prefixCls:r,class:"".concat(r,"-").concat(a),style:ze(a,i,s),getContainer:u,closeIcon:function(){var c=C("span",{class:"".concat(r,"-close-x")},[y||C(Be,{class:"".concat(r,"-close-icon")},null)]);return c}},function(l){E[f]=l,e(l)})}var Ve={success:De,info:Fe,error:Le,warning:qe};function We(t){var e=t.icon,r=t.type,n=t.description,a=t.message,o=t.btn,u=t.prefixCls||"ant-notification",i="".concat(u,"-notice"),s=t.duration===void 0?re:t.duration,d=null;if(e)d=function(){return C("span",{class:"".concat(i,"-icon")},[e])};else if(r){var y=Ve[r];d=function(){return C(y,{class:"".concat(i,"-icon ").concat(i,"-icon-").concat(r)},null)}}var f=t.placement,l=t.top,c=t.bottom,g=t.getContainer,b=t.closeIcon;Ke({prefixCls:u,placement:f,top:l,bottom:c,getContainer:g,closeIcon:b},function(w){w.notice({content:function(){return C("div",{class:d?"".concat(i,"-with-icon"):""},[d&&d(),C("div",{class:"".concat(i,"-message")},[!n&&d?C("span",{class:"".concat(i,"-message-single-line-auto-margin")},null):null,a]),C("div",{class:"".concat(i,"-description")},[n]),o?C("span",{class:"".concat(i,"-btn")},[o]):null])},duration:s,closable:!0,onClose:t.onClose,onClick:t.onClick,key:t.key,style:t.style||{},class:t.class})})}var Xe={open:We,close:function(e){Object.keys(E).forEach(function(r){return E[r].removeNotice(e)})},config:Je,destroy:function(){Object.keys(E).forEach(function(e){E[e].destroy(),delete E[e]})}},k=Xe,Ge=["success","info","warning","error"];Ge.forEach(function(t){k[t]=function(e){return k.open(te(te({},e),{type:t}))}});k.warn=k.warning;var L=k,q={exports:{}},ue=function(e,r){return function(){for(var a=new Array(arguments.length),o=0;o<a.length;o++)a[o]=arguments[o];return e.apply(r,a)}},Ye=ue,x=Object.prototype.toString;function F(t){return x.call(t)==="[object Array]"}function H(t){return typeof t=="undefined"}function Ze(t){return t!==null&&!H(t)&&t.constructor!==null&&!H(t.constructor)&&typeof t.constructor.isBuffer=="function"&&t.constructor.isBuffer(t)}function Qe(t){return x.call(t)==="[object ArrayBuffer]"}function et(t){return typeof FormData!="undefined"&&t instanceof FormData}function tt(t){var e;return typeof ArrayBuffer!="undefined"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&t.buffer instanceof ArrayBuffer,e}function rt(t){return typeof t=="string"}function nt(t){return typeof t=="number"}function ce(t){return t!==null&&typeof t=="object"}function R(t){if(x.call(t)!=="[object Object]")return!1;var e=Object.getPrototypeOf(t);return e===null||e===Object.prototype}function at(t){return x.call(t)==="[object Date]"}function ot(t){return x.call(t)==="[object File]"}function st(t){return x.call(t)==="[object Blob]"}function le(t){return x.call(t)==="[object Function]"}function it(t){return ce(t)&&le(t.pipe)}function ut(t){return typeof URLSearchParams!="undefined"&&t instanceof URLSearchParams}function ct(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function lt(){return typeof navigator!="undefined"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window!="undefined"&&typeof document!="undefined"}function M(t,e){if(!(t===null||typeof t=="undefined"))if(typeof t!="object"&&(t=[t]),F(t))for(var r=0,n=t.length;r<n;r++)e.call(null,t[r],r,t);else for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.call(null,t[a],a,t)}function _(){var t={};function e(a,o){R(t[o])&&R(a)?t[o]=_(t[o],a):R(a)?t[o]=_({},a):F(a)?t[o]=a.slice():t[o]=a}for(var r=0,n=arguments.length;r<n;r++)M(arguments[r],e);return t}function ft(t,e,r){return M(e,function(a,o){r&&typeof a=="function"?t[o]=Ye(a,r):t[o]=a}),t}function dt(t){return t.charCodeAt(0)===65279&&(t=t.slice(1)),t}var m={isArray:F,isArrayBuffer:Qe,isBuffer:Ze,isFormData:et,isArrayBufferView:tt,isString:rt,isNumber:nt,isObject:ce,isPlainObject:R,isUndefined:H,isDate:at,isFile:ot,isBlob:st,isFunction:le,isStream:it,isURLSearchParams:ut,isStandardBrowserEnv:lt,forEach:M,merge:_,extend:ft,trim:ct,stripBOM:dt},O=m;function fe(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var de=function(e,r,n){if(!r)return e;var a;if(n)a=n(r);else if(O.isURLSearchParams(r))a=r.toString();else{var o=[];O.forEach(r,function(s,d){s===null||typeof s=="undefined"||(O.isArray(s)?d=d+"[]":s=[s],O.forEach(s,function(f){O.isDate(f)?f=f.toISOString():O.isObject(f)&&(f=JSON.stringify(f)),o.push(fe(d)+"="+fe(f))}))}),a=o.join("&")}if(a){var u=e.indexOf("#");u!==-1&&(e=e.slice(0,u)),e+=(e.indexOf("?")===-1?"?":"&")+a}return e},pt=m;function j(){this.handlers=[]}j.prototype.use=function(e,r,n){return this.handlers.push({fulfilled:e,rejected:r,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1};j.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};j.prototype.forEach=function(e){pt.forEach(this.handlers,function(n){n!==null&&e(n)})};var ht=j,mt=m,vt=function(e,r){mt.forEach(e,function(a,o){o!==r&&o.toUpperCase()===r.toUpperCase()&&(e[r]=a,delete e[o])})},pe=function(e,r,n,a,o){return e.config=r,n&&(e.code=n),e.request=a,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e},yt=pe,he=function(e,r,n,a,o){var u=new Error(e);return yt(u,r,n,a,o)},bt=he,gt=function(e,r,n){var a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):r(bt("Request failed with status code "+n.status,n.config,null,n.request,n))},A=m,wt=A.isStandardBrowserEnv()?function(){return{write:function(r,n,a,o,u,i){var s=[];s.push(r+"="+encodeURIComponent(n)),A.isNumber(a)&&s.push("expires="+new Date(a).toGMTString()),A.isString(o)&&s.push("path="+o),A.isString(u)&&s.push("domain="+u),i===!0&&s.push("secure"),document.cookie=s.join("; ")},read:function(r){var n=document.cookie.match(new RegExp("(^|;\\s*)("+r+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(r){this.write(r,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),Ct=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)},Et=function(e,r){return r?e.replace(/\/+$/,"")+"/"+r.replace(/^\/+/,""):e},xt=Ct,Ot=Et,St=function(e,r){return e&&!xt(r)?Ot(e,r):r},J=m,kt=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],Tt=function(e){var r={},n,a,o;return e&&J.forEach(e.split(`
`),function(i){if(o=i.indexOf(":"),n=J.trim(i.substr(0,o)).toLowerCase(),a=J.trim(i.substr(o+1)),n){if(r[n]&&kt.indexOf(n)>=0)return;n==="set-cookie"?r[n]=(r[n]?r[n]:[]).concat([a]):r[n]=r[n]?r[n]+", "+a:a}}),r},me=m,Rt=me.isStandardBrowserEnv()?function(){var e=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a"),n;function a(o){var u=o;return e&&(r.setAttribute("href",u),u=r.href),r.setAttribute("href",u),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:r.pathname.charAt(0)==="/"?r.pathname:"/"+r.pathname}}return n=a(window.location.href),function(u){var i=me.isString(u)?a(u):u;return i.protocol===n.protocol&&i.host===n.host}}():function(){return function(){return!0}}(),N=m,jt=gt,At=wt,Nt=de,Pt=St,$t=Tt,Bt=Rt,z=he,ve=function(e){return new Promise(function(n,a){var o=e.data,u=e.headers,i=e.responseType;N.isFormData(o)&&delete u["Content-Type"];var s=new XMLHttpRequest;if(e.auth){var d=e.auth.username||"",y=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";u.Authorization="Basic "+btoa(d+":"+y)}var f=Pt(e.baseURL,e.url);s.open(e.method.toUpperCase(),Nt(f,e.params,e.paramsSerializer),!0),s.timeout=e.timeout;function l(){if(!!s){var g="getAllResponseHeaders"in s?$t(s.getAllResponseHeaders()):null,b=!i||i==="text"||i==="json"?s.responseText:s.response,w={data:b,status:s.status,statusText:s.statusText,headers:g,config:e,request:s};jt(n,a,w),s=null}}if("onloadend"in s?s.onloadend=l:s.onreadystatechange=function(){!s||s.readyState!==4||s.status===0&&!(s.responseURL&&s.responseURL.indexOf("file:")===0)||setTimeout(l)},s.onabort=function(){!s||(a(z("Request aborted",e,"ECONNABORTED",s)),s=null)},s.onerror=function(){a(z("Network Error",e,null,s)),s=null},s.ontimeout=function(){var b="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(b=e.timeoutErrorMessage),a(z(b,e,e.transitional&&e.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",s)),s=null},N.isStandardBrowserEnv()){var c=(e.withCredentials||Bt(f))&&e.xsrfCookieName?At.read(e.xsrfCookieName):void 0;c&&(u[e.xsrfHeaderName]=c)}"setRequestHeader"in s&&N.forEach(u,function(b,w){typeof o=="undefined"&&w.toLowerCase()==="content-type"?delete u[w]:s.setRequestHeader(w,b)}),N.isUndefined(e.withCredentials)||(s.withCredentials=!!e.withCredentials),i&&i!=="json"&&(s.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&s.addEventListener("progress",e.onDownloadProgress),typeof e.onUploadProgress=="function"&&s.upload&&s.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(b){!s||(s.abort(),a(b),s=null)}),o||(o=null),s.send(o)})},p=m,ye=vt,It=pe,Ut={"Content-Type":"application/x-www-form-urlencoded"};function be(t,e){!p.isUndefined(t)&&p.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}function Dt(){var t;return(typeof XMLHttpRequest!="undefined"||typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]")&&(t=ve),t}function Lt(t,e,r){if(p.isString(t))try{return(e||JSON.parse)(t),p.trim(t)}catch(n){if(n.name!=="SyntaxError")throw n}return(r||JSON.stringify)(t)}var P={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:Dt(),transformRequest:[function(e,r){return ye(r,"Accept"),ye(r,"Content-Type"),p.isFormData(e)||p.isArrayBuffer(e)||p.isBuffer(e)||p.isStream(e)||p.isFile(e)||p.isBlob(e)?e:p.isArrayBufferView(e)?e.buffer:p.isURLSearchParams(e)?(be(r,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):p.isObject(e)||r&&r["Content-Type"]==="application/json"?(be(r,"application/json"),Lt(e)):e}],transformResponse:[function(e){var r=this.transitional,n=r&&r.silentJSONParsing,a=r&&r.forcedJSONParsing,o=!n&&this.responseType==="json";if(o||a&&p.isString(e)&&e.length)try{return JSON.parse(e)}catch(u){if(o)throw u.name==="SyntaxError"?It(u,this,"E_JSON_PARSE"):u}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};P.headers={common:{Accept:"application/json, text/plain, */*"}};p.forEach(["delete","get","head"],function(e){P.headers[e]={}});p.forEach(["post","put","patch"],function(e){P.headers[e]=p.merge(Ut)});var K=P,qt=m,Ft=K,Ht=function(e,r,n){var a=this||Ft;return qt.forEach(n,function(u){e=u.call(a,e,r)}),e},ge=function(e){return!!(e&&e.__CANCEL__)},we=m,V=Ht,Mt=ge,_t=K;function W(t){t.cancelToken&&t.cancelToken.throwIfRequested()}var Jt=function(e){W(e),e.headers=e.headers||{},e.data=V.call(e,e.data,e.headers,e.transformRequest),e.headers=we.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),we.forEach(["delete","get","head","post","put","patch","common"],function(a){delete e.headers[a]});var r=e.adapter||_t.adapter;return r(e).then(function(a){return W(e),a.data=V.call(e,a.data,a.headers,e.transformResponse),a},function(a){return Mt(a)||(W(e),a&&a.response&&(a.response.data=V.call(e,a.response.data,a.response.headers,e.transformResponse))),Promise.reject(a)})},h=m,Ce=function(e,r){r=r||{};var n={},a=["url","method","data"],o=["headers","auth","proxy","params"],u=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],i=["validateStatus"];function s(l,c){return h.isPlainObject(l)&&h.isPlainObject(c)?h.merge(l,c):h.isPlainObject(c)?h.merge({},c):h.isArray(c)?c.slice():c}function d(l){h.isUndefined(r[l])?h.isUndefined(e[l])||(n[l]=s(void 0,e[l])):n[l]=s(e[l],r[l])}h.forEach(a,function(c){h.isUndefined(r[c])||(n[c]=s(void 0,r[c]))}),h.forEach(o,d),h.forEach(u,function(c){h.isUndefined(r[c])?h.isUndefined(e[c])||(n[c]=s(void 0,e[c])):n[c]=s(void 0,r[c])}),h.forEach(i,function(c){c in r?n[c]=s(e[c],r[c]):c in e&&(n[c]=s(void 0,e[c]))});var y=a.concat(o).concat(u).concat(i),f=Object.keys(e).concat(Object.keys(r)).filter(function(c){return y.indexOf(c)===-1});return h.forEach(f,d),n};const zt="axios",Kt="0.21.4",Vt="Promise based HTTP client for the browser and node.js",Wt="index.js",Xt={test:"grunt test",start:"node ./sandbox/server.js",build:"NODE_ENV=production grunt build",preversion:"npm test",version:"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",postversion:"git push && git push --tags",examples:"node ./examples/server.js",coveralls:"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",fix:"eslint --fix lib/**/*.js"},Gt={type:"git",url:"https://github.com/axios/axios.git"},Yt=["xhr","http","ajax","promise","node"],Zt="Matt Zabriskie",Qt="MIT",er={url:"https://github.com/axios/axios/issues"},tr="https://axios-http.com",rr={coveralls:"^3.0.0","es6-promise":"^4.2.4",grunt:"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1",karma:"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2",minimist:"^1.2.0",mocha:"^8.2.1",sinon:"^4.5.0","terser-webpack-plugin":"^4.2.3",typescript:"^4.0.5","url-search-params":"^0.10.0",webpack:"^4.44.2","webpack-dev-server":"^3.11.0"},nr={"./lib/adapters/http.js":"./lib/adapters/xhr.js"},ar="dist/axios.min.js",or="dist/axios.min.js",sr="./index.d.ts",ir={"follow-redirects":"^1.14.0"},ur=[{path:"./dist/axios.min.js",threshold:"5kB"}];var cr={name:zt,version:Kt,description:Vt,main:Wt,scripts:Xt,repository:Gt,keywords:Yt,author:Zt,license:Qt,bugs:er,homepage:tr,devDependencies:rr,browser:nr,jsdelivr:ar,unpkg:or,typings:sr,dependencies:ir,bundlesize:ur},Ee=cr,X={};["object","boolean","number","function","string","symbol"].forEach(function(t,e){X[t]=function(n){return typeof n===t||"a"+(e<1?"n ":" ")+t}});var xe={},lr=Ee.version.split(".");function Oe(t,e){for(var r=e?e.split("."):lr,n=t.split("."),a=0;a<3;a++){if(r[a]>n[a])return!0;if(r[a]<n[a])return!1}return!1}X.transitional=function(e,r,n){var a=r&&Oe(r);function o(u,i){return"[Axios v"+Ee.version+"] Transitional option '"+u+"'"+i+(n?". "+n:"")}return function(u,i,s){if(e===!1)throw new Error(o(i," has been removed in "+r));return a&&!xe[i]&&(xe[i]=!0,console.warn(o(i," has been deprecated since v"+r+" and will be removed in the near future"))),e?e(u,i,s):!0}};function fr(t,e,r){if(typeof t!="object")throw new TypeError("options must be an object");for(var n=Object.keys(t),a=n.length;a-- >0;){var o=n[a],u=e[o];if(u){var i=t[o],s=i===void 0||u(i,o,t);if(s!==!0)throw new TypeError("option "+o+" must be "+s);continue}if(r!==!0)throw Error("Unknown option "+o)}}var dr={isOlderVersion:Oe,assertOptions:fr,validators:X},Se=m,pr=de,ke=ht,Te=Jt,$=Ce,Re=dr,S=Re.validators;function T(t){this.defaults=t,this.interceptors={request:new ke,response:new ke}}T.prototype.request=function(e){typeof e=="string"?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=$(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var r=e.transitional;r!==void 0&&Re.assertOptions(r,{silentJSONParsing:S.transitional(S.boolean,"1.0.0"),forcedJSONParsing:S.transitional(S.boolean,"1.0.0"),clarifyTimeoutError:S.transitional(S.boolean,"1.0.0")},!1);var n=[],a=!0;this.interceptors.request.forEach(function(l){typeof l.runWhen=="function"&&l.runWhen(e)===!1||(a=a&&l.synchronous,n.unshift(l.fulfilled,l.rejected))});var o=[];this.interceptors.response.forEach(function(l){o.push(l.fulfilled,l.rejected)});var u;if(!a){var i=[Te,void 0];for(Array.prototype.unshift.apply(i,n),i=i.concat(o),u=Promise.resolve(e);i.length;)u=u.then(i.shift(),i.shift());return u}for(var s=e;n.length;){var d=n.shift(),y=n.shift();try{s=d(s)}catch(f){y(f);break}}try{u=Te(s)}catch(f){return Promise.reject(f)}for(;o.length;)u=u.then(o.shift(),o.shift());return u};T.prototype.getUri=function(e){return e=$(this.defaults,e),pr(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")};Se.forEach(["delete","get","head","options"],function(e){T.prototype[e]=function(r,n){return this.request($(n||{},{method:e,url:r,data:(n||{}).data}))}});Se.forEach(["post","put","patch"],function(e){T.prototype[e]=function(r,n,a){return this.request($(a||{},{method:e,url:r,data:n}))}});var hr=T;function G(t){this.message=t}G.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")};G.prototype.__CANCEL__=!0;var je=G,mr=je;function B(t){if(typeof t!="function")throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(a){e=a});var r=this;t(function(a){r.reason||(r.reason=new mr(a),e(r.reason))})}B.prototype.throwIfRequested=function(){if(this.reason)throw this.reason};B.source=function(){var e,r=new B(function(a){e=a});return{token:r,cancel:e}};var vr=B,yr=function(e){return function(n){return e.apply(null,n)}},br=function(e){return typeof e=="object"&&e.isAxiosError===!0},Ae=m,gr=ue,I=hr,wr=Ce,Cr=K;function Ne(t){var e=new I(t),r=gr(I.prototype.request,e);return Ae.extend(r,I.prototype,e),Ae.extend(r,e),r}var v=Ne(Cr);v.Axios=I;v.create=function(e){return Ne(wr(v.defaults,e))};v.Cancel=je;v.CancelToken=vr;v.isCancel=ge;v.all=function(e){return Promise.all(e)};v.spread=yr;v.isAxiosError=br;q.exports=v;q.exports.default=v;var Er=q.exports;const U="access_token_key",Y="refresh_token_key";let Z=!1;const Q=new Map,xr=t=>{try{return localStorage.setItem(U,t.accessToken||""),!0}catch{return alert("\u8BBE\u7F6Etoken\u5931\u8D25"),!1}},Pe=()=>({accessToken:localStorage.getItem(U)||void 0,refreshToken:localStorage.getItem(Y)||void 0}),Ur=t=>{try{return localStorage.setItem(U,t.accessToken||""),localStorage.setItem(Y,t.refreshToken||""),!0}catch{return alert("\u8BBE\u7F6Etoken\u5931\u8D25"),!1}},Dr=()=>{localStorage.removeItem(U),localStorage.removeItem(Y)},Or=()=>Pe().accessToken,ee=()=>{Z=!1,Q.clear()},Sr=(t,e)=>{Q.set(t,e),!Z&&(Z=!0,Tr(Pe()).then(r=>{xr(r),Q.forEach((n,a)=>{D(a).then(o=>n(o))}),ee()}).catch(r=>{var n;L.error({message:"\u5237\u65B0\u4EE4\u724C",content:(n=r.error)==null?void 0:n.msg}),ee()}))},$e=Er.create({baseURL:"/api/",timeout:5e3});$e.interceptors.request.use(t=>{const e=Or();return e&&(t.headers.authorization=e),t},t=>{Promise.reject(t)});const kr=t=>new Promise((e,r)=>{$e(t).then(n=>{const a=n.data,{data:o,success:u,error:i}=a;if(u){e(o);return}else if((i==null?void 0:i.code)===10008){Sr(t,e);return}else if((i==null?void 0:i.code)===10010){ee(),_e.push("/user/login");return}Ue.error({content:(i==null?void 0:i.msg)||He[i==null?void 0:i.code]||"\u9519\u8BEF"}),r(a)}).catch(n=>{const a=n.response;if(!a){L.error({message:t.url,description:n.message});return}const{status:o}=a;L.error({message:t.url,description:Me[o]||`${o}\uFF1A\u8BF7\u6C42\u5931\u8D25`})})});var D=kr;async function Lr(t){return D({url:"/oauth/login",method:"POST",data:t})}async function qr(){return D({url:"/oauth/logout",method:"POST"})}async function Tr(t){return D({url:"/oauth/refresh_token",method:"POST",data:t})}export{D as R,qr as a,Lr as l,Dr as r,Ur as s};