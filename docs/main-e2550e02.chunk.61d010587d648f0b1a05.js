(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{
/***/1:
/***/function(t,e,n){"use strict";
/* unused harmony export foreach */
/* unused harmony export isNumber */
/* unused harmony export lookup */
/* harmony export (binding) */n.d(e,"b",(function(){return i})),
/* unused harmony export isObject */
/* unused harmony export isString */
/* harmony export (binding) */n.d(e,"c",(function(){return a})),
/* unused harmony export isUndefined */
/* unused harmony export isDefined */
/* harmony export (binding) */n.d(e,"d",(function(){return r})),
/* harmony export (binding) */n.d(e,"a",(function(){return o}));var r=Symbol("klass"),i=function isArray(t){return t instanceof Array},a=function isFunction(t){return"function"==typeof t},o=Symbol("design:inputTypes");//foreach for arrays, collections, objects
},
/***/10:
/***/function(t,e,n){"use strict";
/* harmony export (binding) */n.d(e,"b",(function(){return i})),
/* harmony export (binding) */n.d(e,"a",(function(){return a}));
/* harmony import */var r=n(38),i=
/* */
function(){function TranslationService(){this.defaultLanguage=""}var t=TranslationService.prototype;return t.setTranslate=function setTranslate(t,e){Object(r.setTranslate)(t,e)},t.setDefaultLanguage=function setDefaultLanguage(t){this.defaultLanguage=t,Object(r.setDefaultLanguage)(t);for(var e=a.translationComponents.entries(),n=e.next();!n.done;){var i=n.value[0];"router-outlet"!==n.value[1]&&i.update(),n=e.next()}},t.getCurrentLanguage=function getCurrentLanguage(){return this.defaultLanguage},TranslationService}(),a=function InternalTranslationService(){};
/* harmony import */a.translationComponents=new Map},
/***/19:
/***/function(t,e,n){"use strict";
/* harmony export (binding) */n.d(e,"a",(function(){return s}));
/* harmony import */var r,i=n(34),a=n(1),o=n(10),u=n(24),s={register:(r=new(
/* */
function(){function InternalInjector(){this._map=new Map,this.get=void 0,this.set=void 0,this.get=this._map.get.bind(this._map),this.set=this._map.set.bind(this._map),this._defaultServices()}var t=InternalInjector.prototype;return t._defaultServices=function _defaultServices(){this.registerService("TranslationService",new o.b);var t=new u.a;this.registerService("InternalRouter",t),this.registerService("Router",new u.b(t.getCurrentRoute.bind(t),t.navigateTo.bind(t),t.onNavigationStart.bind(t)))},t.getService=function getService(t){var e=this.get(t);if(e)return e;throw Error(t+" is not a registered provider.")},t.clear=function clear(){this._map=new Map},t.registerService=function registerService(t,e,n){if(void 0===n&&(n=[]),!t||!e)throw"error: Requires name and constructor to define service";if(!this.get(t))if(Object(a.c)(e)){var r=Object(i.a)(e,n);this.set(t,r)}else this.set(t,e)},InternalInjector}())).registerService.bind(r),get:r.getService.bind(r),clear:r.clear.bind(r)};
/* harmony import */},
/***/24:
/***/function(t,e,n){"use strict";
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var r=n(39),i=/* */n.n(r),a=n(1),o=n(4),u=/* */n.n(o),s=n(20),c=/* */n.n(s),l=n(21),h=/* */n.n(l),d=(n(36),n(5)),f=n(11);
// CONCATENATED MODULE: ./src/lib/router.ts
function _templateObject(){var t=u()(["\n\t\t\t\t\t<div></div>\n\t\t\t\t"]);return _templateObject=function _templateObject(){return t},t}var p=n(68);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/Subject.js + 1 modules
// CONCATENATED MODULE: ./src/lib/routerService.ts
/* harmony export (binding) */n.d(e,"a",(function(){return g})),
/* harmony export (binding) */n.d(e,"b",(function(){return b}));
//https://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
var v=
/* */
function(){function StaticRouter(){}return StaticRouter.checkParams=function checkParams(t,e){for(var n=0,r={},i=e.ParamCount,a=0;a<t.length;a++){var o=e.Params[a];o.indexOf(":")>=0&&(r[o.split(":")[1]]=t[a],n+=1)}return n===i?r:{}},StaticRouter.getParamCount=function getParamCount(t){var e=0;return t.forEach((function(t){t.indexOf(":")>=0&&(e+=1)})),e},StaticRouter.formatRoute=function formatRoute(t){var e={Params:{},Url:"",Template:"",TemplatePath:"",ParamCount:0,IsRegistered:!1,redirectTo:""};if(e.Params=t.path.split("/").filter((function(t){return t.length>0})),e.Url=t.path,e.Template="",e.redirectTo=t.redirectTo,t.template){if(!t.templatePath)throw Error("templatePath is required in route if template is mentioned.");e.Template=t.template,e.TemplatePath=t.templatePath}return e.ParamCount=StaticRouter.getParamCount(e.Params),e},StaticRouter}(),g=
/* */
function(){function InternalRouter(){this.currentRoute={params:{}},this.routeList=[],this.currentPage=null,this.previousPage="",this.$templateSubscriber=new p.a}var t=InternalRouter.prototype;return t._navigateTo=function _navigateTo(t){var e,r,a,o;return i.a.async((function _navigateTo$(u){for(;;)switch(u.prev=u.next){case 0:if(this.currentPage===t){u.next=24;break}if(this.previousPage=this.currentPage,this.currentPage=t,e=t.split("/").filter((function(t){return t.length>0})),r=this.routeList.filter((function(n){return n.Params.length===e.length?n:n.Url===t?n:void 0})),!(a=r.length>0?r[0]:null)){u.next=24;break}if(o=v.checkParams(e,a),!(Object.keys(o).length>0||t)){u.next=23;break}if(this.currentRoute.params=o,a.IsRegistered){u.next=19;break}if(!a.TemplatePath){u.next=16;break}return u.next=14,i.a.awrap(n(66)("./"+a.TemplatePath));case 14:window.history.pushState(null,"",t),this.$templateSubscriber.next(a.Template);case 16:a.IsRegistered=!0,u.next=21;break;case 19:window.history.pushState(null,"",t),this.$templateSubscriber.next(a.Template);case 21:u.next=24;break;case 23:this._navigateTo(a.redirectTo);case 24:case"end":return u.stop()}}),null,this)},t.addRoutes=function addRoutes(t){if(!Object(a.b)(t))throw Error("router.addRoutes: the parameter must be an array");var e=t,n=Array.isArray(e),r=0;for(e=n?e:e[Symbol.iterator]();;){var i;if(n){if(r>=e.length)break;i=e[r++]}else{if((r=e.next()).done)break;i=r.value}var o=i;this.routeList.push(v.formatRoute(o))}},t.getCurrentRoute=function getCurrentRoute(){return this.currentRoute},t.navigateTo=function navigateTo(t){void 0===t&&(t=""),this._navigateTo(t)},t.onNavigationStart=function onNavigationStart(t){t&&Object(a.c)(t)&&window.addEventListener("hashchange",t,!1)},InternalRouter}(),b=function Router(t,e,n){this.getCurrentRoute=void 0,this.navigateTo=void 0,this.onNavigationStart=void 0,function registerRouterComponent(){var t,e,n,r,i,a,o;t=Object(d.a)({selector:"router-outlet"}),e=Reflect.metadata("design:paramtypes",[void 0===g?Object:g]),n=Object(d.c)(),r=Reflect.metadata("design:type","undefined"==typeof Array?Object:Array),t(i=e((a=
/* */
function(){function RouterOutlet(t){this.router=t,this.template="",this.update=void 0,c()(this,"routes",o,this),this.isRoutesAdded=!1}var t=RouterOutlet.prototype;return t.beforeMount=function beforeMount(){var t=this;this.router.$templateSubscriber.subscribe((function(e){t.template=e,t.update()}))},t.mount=function mount(){var t=this;window.onpopstate=function(){t.router.navigateTo(window.location.pathname)}},t.unmount=function unmount(){this.router.$templateSubscriber.unsubscribe()},t.render=function render(){if(this.routes.length>0&&!this.isRoutesAdded){this.router.addRoutes(this.routes),this.isRoutesAdded=!0;var t=window.location.pathname;this.router.navigateTo("/"!==t?t:"")}if(this.template){var e=[""+this.template];return e.raw=[""+this.template],Object(f.a)(e)}return Object(f.a)(_templateObject())},RouterOutlet}(),o=h()(a.prototype,"routes",[n,r],{configurable:!0,enumerable:!0,writable:!0,initializer:function initializer(){return[]}}),i=a))||i)}(),this.getCurrentRoute=t,this.navigateTo=e,this.onNavigationStart=n}},
/***/30:
/***/function(t,e){
/***/},
/***/42:
/***/function(t,e,n){"use strict";
/* harmony import */n(19);
/* harmony import */var r=n(5);
/* harmony reexport (safe) */n.d(e,"a",(function(){return r.a})),
/* harmony reexport (safe) */n.d(e,"b",(function(){return r.b})),
/* harmony reexport (safe) */n.d(e,"c",(function(){return r.c}));
/* harmony import */n(30);
/* harmony import */var i=n(11);
/* harmony reexport (safe) */n.d(e,"f",(function(){return i.a}));
/* harmony import */var a=n(31);
/* harmony reexport (safe) */n.d(e,"g",(function(){return a.b}));
/* harmony import */var o=n(24);
/* harmony reexport (safe) */n.d(e,"d",(function(){return o.b}));
/* harmony import */n(48);
/* harmony import */var u=n(10);
/* harmony reexport (safe) */n.d(e,"e",(function(){return u.b}))},
/***/59:
/***/function(t,e,n){"use strict";
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/assertThisInitialized.js
var r=n(35),i=/* */n.n(r),a=n(50),o=/* */n.n(a),u=n(51),s=/* */n.n(u),c=n(1),l=n(11),h=new WeakMap,d=function clone(t){if(null==t||"object"!=typeof t)return t;var e=t.constructor();for(var n in t)e[n]=t[n];return e},f=
/* */
function(){function CreateWatch(t,e,n){this.interval=null,this._obj=null,this._actualValue=null,this._clonedValue=null,this._watchableProp=void 0,this._handler=null,this.defineProp(t,e,n),t.objVal=null,this._obj=t,this._actualValue=t[e],this._clonedValue=t[e],this._watchableProp=e,this._handler=n}var t=CreateWatch.prototype;return t.dirtyWatch=function dirtyWatch(){var t=this;this.interval=setInterval((function(){t._actualValue=t._obj[t._watchableProp],function getDiff(t,e){e||(e={});var n=[];for(var r in t)e[r]&&t[r]===e[r]||n.push(r);if(0===n.length)for(var i in e)t[i]&&e[i]===t[i]||n.push(i);return n}(t._actualValue,t._clonedValue).length>0&&(t._handler(t._clonedValue,t._actualValue),t._clonedValue=d(t._actualValue))}),50)},t.defineProp=function defineProp(t,e,n){var r=this,i=function getExistingSetter(t,e){var n=Object.getOwnPropertyDescriptor(t,e);return n?n.set:void 0}(t,e),a=function setter(e){var i=d(t.objVal);r._actualValue=d(e),n(i,e),t.objVal=e};Object.defineProperty(t,e,{get:function getter(){return t.objVal},set:function set(t){a.call(this,t),i&&i(t)},enumerable:!0,configurable:!0})},t.unwatch=function unwatch(){this.interval&&clearInterval(this.interval),delete this._obj[this._watchableProp],delete this._obj.objVal,this._actualValue=null,this._clonedValue=null},CreateWatch}(),p=function watch(t,e,n){if(!h.has(t)){var r=new f(t,e,n);h.set(t,r),r.dirtyWatch()}},v=n(34),g=n(10),b=n(31);
// CONCATENATED MODULE: ./src/lib/registerElement.ts
/* harmony export (binding) */n.d(e,"a",(function(){return R}));var m=!1,w=new CSSStyleSheet,_={},S=function getComputedCss(t){void 0===t&&(t="");var e=new CSSStyleSheet;if(t){var r=_[t]?_[t]:n(44)("./"+t);_[t]=r,e.replace(r)}return[w,e]},R=function registerElement(t,e,r,a,u){if(!u)if(a&&!m&&t.styleUrl){m=!0;var d=document.createElement("style"),f=n(44)("./"+t.styleUrl);d.innerText=(f||"").toString(),w.replace((f||"").toString()),document.getElementsByTagName("head")[0].appendChild(d)}else if(a&&m)throw Error("Cannot register duplicate root component in "+t.selector+" component");window.customElements.define(t.selector,
/* */
function(n){function _temp(){var r;return(r=n.call(this)||this).render=void 0,r[c.d]=void 0,r.shadow=void 0,r._inputprop=void 0,r.update=function(){r.init()},r.getModel=function(){return r[c.d]},r.shadow=u?i()(r):r.attachShadow({mode:"open"}),r.shadow.adoptedStyleSheets=u?[]:S(t.styleUrl),r._inputprop=Reflect.getMetadata(c.a,e),r._inputprop&&p(i()(r),r._inputprop,(function(t,e){e!==t&&r[c.d]&&r[c.d][r._inputprop]&&(r[c.d][r._inputprop]=i()(r)[r._inputprop],r.update())})),r}o()(_temp,n);var a=_temp.prototype;return a.init=function init(){var t=this[c.d].render.bind(this[c.d]);l.b.bind(this[c.d],this.shadow,t)()},a.connectedCallback=function connectedCallback(){this[c.d]=Object(b.a)(function wrapper(t,e,n){return function(){return Object(v.a)(t,e,n)}}(e,r,this[this._inputprop]))(),this[c.d].element=this.shadow,this[c.d].beforeMount&&this[c.d].beforeMount(),this.init(),this[c.d].update=this.update.bind(this),this[c.d].mount&&this[c.d].mount(),g.a.translationComponents.set(this,t.selector)},a.disconnectedCallback=function disconnectedCallback(){g.a.translationComponents.delete(this),this._inputprop&&function unwatch(t){h.has(t)&&(h.get(t).unwatch(),h.delete(t))}(this),this[c.d].unmount&&this[c.d].unmount()},_temp}(s()(HTMLElement)))}}},[[15,2,5,6,3,8,9,4,7,1]]]);