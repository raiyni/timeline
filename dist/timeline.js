
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var Timeline = (function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var n,l$2,u$2,t$1,r$1,o$2,f$5,e$1={},c$2=[],s$2=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a$2(n,l){for(var u in l)n[u]=l[u];return n}function h$1(n){var l=n.parentNode;l&&l.removeChild(n);}function v$1(l,u,i){var t,r,o,f={};for(o in u)"key"==o?t=u[o]:"ref"==o?r=u[o]:f[o]=u[o];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):i),"function"==typeof l&&null!=l.defaultProps)for(o in l.defaultProps)void 0===f[o]&&(f[o]=l.defaultProps[o]);return y$2(l,f,t,r,null)}function y$2(n,i,t,r,o){var f={type:n,props:i,key:t,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++u$2:o};return null==o&&null!=l$2.vnode&&l$2.vnode(f),f}function d$2(n){return n.children}function _(n,l){this.props=n,this.context=l;}function k$1(n,l){if(null==l)return n.__?k$1(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?k$1(n):null}function b$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return b$1(n)}}function m$1(n){(!n.__d&&(n.__d=!0)&&t$1.push(n)&&!g$1.__r++||o$2!==l$2.debounceRendering)&&((o$2=l$2.debounceRendering)||r$1)(g$1);}function g$1(){for(var n;g$1.__r=t$1.length;)n=t$1.sort(function(n,l){return n.__v.__b-l.__v.__b}),t$1=[],n.some(function(n){var l,u,i,t,r,o;n.__d&&(r=(t=(l=n).__v).__e,(o=l.__P)&&(u=[],(i=a$2({},t)).__v=t.__v+1,j$1(o,t,i,l.__n,void 0!==o.ownerSVGElement,null!=t.__h?[r]:null,u,null==r?k$1(t):r,t.__h),z(u,t),t.__e!=r&&b$1(t)));});}function w$1(n,l,u,i,t,r,o,f,s,a){var h,v,p,_,b,m,g,w=i&&i.__k||c$2,A=w.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(_=u.__k[h]=null==(_=l[h])||"boolean"==typeof _?null:"string"==typeof _||"number"==typeof _||"bigint"==typeof _?y$2(null,_,null,null,_):Array.isArray(_)?y$2(d$2,{children:_},null,null,null):_.__b>0?y$2(_.type,_.props,_.key,null,_.__v):_)){if(_.__=u,_.__b=u.__b+1,null===(p=w[h])||p&&_.key==p.key&&_.type===p.type)w[h]=void 0;else for(v=0;v<A;v++){if((p=w[v])&&_.key==p.key&&_.type===p.type){w[v]=void 0;break}p=null;}j$1(n,_,p=p||e$1,t,r,o,f,s,a),b=_.__e,(v=_.ref)&&p.ref!=v&&(g||(g=[]),p.ref&&g.push(p.ref,null,_),g.push(v,_.__c||b,_)),null!=b?(null==m&&(m=b),"function"==typeof _.type&&_.__k===p.__k?_.__d=s=x$1(_,s,n):s=P(n,_,p,w,b,s),"function"==typeof u.type&&(u.__d=s)):s&&p.__e==s&&s.parentNode!=n&&(s=k$1(p));}for(u.__e=m,h=A;h--;)null!=w[h]&&("function"==typeof u.type&&null!=w[h].__e&&w[h].__e==u.__d&&(u.__d=k$1(i,h+1)),N(w[h],w[h]));if(g)for(h=0;h<g.length;h++)M(g[h],g[++h],g[++h]);}function x$1(n,l,u){for(var i,t=n.__k,r=0;t&&r<t.length;r++)(i=t[r])&&(i.__=n,l="function"==typeof i.type?x$1(i,l,u):P(u,i,i,t,i.__e,l));return l}function P(n,l,u,i,t,r){var o,f,e;if(void 0!==l.__d)o=l.__d,l.__d=void 0;else if(null==u||t!=r||null==t.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(t),o=null;else {for(f=r,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,r),o=r;}return void 0!==o?o:t.nextSibling}function C(n,l,u,i,t){var r;for(r in u)"children"===r||"key"===r||r in l||H(n,r,null,u[r],i);for(r in l)t&&"function"!=typeof l[r]||"children"===r||"key"===r||"value"===r||"checked"===r||u[r]===l[r]||H(n,r,l[r],u[r],i);}function $(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||s$2.test(l)?u:u+"px";}function H(n,l,u,i,t){var r;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||$(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||$(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])r=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+r]=u,u?i||n.addEventListener(l,r?T:I,r):n.removeEventListener(l,r?T:I,r);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l));}}function I(n){this.l[n.type+!1](l$2.event?l$2.event(n):n);}function T(n){this.l[n.type+!0](l$2.event?l$2.event(n):n);}function j$1(n,u,i,t,r,o,f,e,c){var s,h,v,y,p,k,b,m,g,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,o=[e]),(s=l$2.__b)&&s(u);try{n:if("function"==typeof P){if(m=u.props,g=(s=P.contextType)&&t[s.__c],x=s?g?g.props.value:s.__:t,i.__c?b=(h=u.__c=i.__c).__=h.__E:("prototype"in P&&P.prototype.render?u.__c=h=new P(m,x):(u.__c=h=new _(m,x),h.constructor=P,h.render=O),g&&g.sub(h),h.props=m,h.state||(h.state={}),h.context=x,h.__n=t,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=P.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=a$2({},h.__s)),a$2(h.__s,P.getDerivedStateFromProps(m,h.__s))),y=h.props,p=h.state,v)null==P.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(null==P.getDerivedStateFromProps&&m!==y&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(m,x),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(m,h.__s,x)||u.__v===i.__v){h.props=m,h.state=h.__s,u.__v!==i.__v&&(h.__d=!1),h.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u);}),h.__h.length&&f.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(m,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(y,p,k);});}h.context=x,h.props=m,h.state=h.__s,(s=l$2.__r)&&s(u),h.__d=!1,h.__v=u,h.__P=n,s=h.render(h.props,h.state,h.context),h.state=h.__s,null!=h.getChildContext&&(t=a$2(a$2({},t),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(k=h.getSnapshotBeforeUpdate(y,p)),A=null!=s&&s.type===d$2&&null==s.key?s.props.children:s,w$1(n,Array.isArray(A)?A:[A],u,i,t,r,o,f,e,c),h.base=u.__e,u.__h=null,h.__h.length&&f.push(h),b&&(h.__E=h.__=null),h.__e=!1;}else null==o&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=L(i.__e,u,i,t,r,o,f,c);(s=l$2.diffed)&&s(u);}catch(n){u.__v=null,(c||null!=o)&&(u.__e=e,u.__h=!!c,o[o.indexOf(e)]=null),l$2.__e(n,u,i);}}function z(n,u){l$2.__c&&l$2.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$2.__e(n,u.__v);}});}function L(l,u,i,t,r,o,f,c){var s,a,v,y=i.props,p=u.props,d=u.type,_=0;if("svg"===d&&(r=!0),null!=o)for(;_<o.length;_++)if((s=o[_])&&"setAttribute"in s==!!d&&(d?s.localName===d:3===s.nodeType)){l=s,o[_]=null;break}if(null==l){if(null===d)return document.createTextNode(p);l=r?document.createElementNS("http://www.w3.org/2000/svg",d):document.createElement(d,p.is&&p),o=null,c=!1;}if(null===d)y===p||c&&l.data===p||(l.data=p);else {if(o=o&&n.call(l.childNodes),a=(y=i.props||e$1).dangerouslySetInnerHTML,v=p.dangerouslySetInnerHTML,!c){if(null!=o)for(y={},_=0;_<l.attributes.length;_++)y[l.attributes[_].name]=l.attributes[_].value;(v||a)&&(v&&(a&&v.__html==a.__html||v.__html===l.innerHTML)||(l.innerHTML=v&&v.__html||""));}if(C(l,p,y,r,c),v)u.__k=[];else if(_=u.props.children,w$1(l,Array.isArray(_)?_:[_],u,i,t,r&&"foreignObject"!==d,o,f,o?o[0]:i.__k&&k$1(i,0),c),null!=o)for(_=o.length;_--;)null!=o[_]&&h$1(o[_]);c||("value"in p&&void 0!==(_=p.value)&&(_!==y.value||_!==l.value||"progress"===d&&!_)&&H(l,"value",_,y.value,!1),"checked"in p&&void 0!==(_=p.checked)&&_!==l.checked&&H(l,"checked",_,y.checked,!1));}return l}function M(n,u,i){try{"function"==typeof n?n(u):n.current=u;}catch(n){l$2.__e(n,i);}}function N(n,u,i){var t,r;if(l$2.unmount&&l$2.unmount(n),(t=n.ref)&&(t.current&&t.current!==n.__e||M(t,null,u)),null!=(t=n.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(n){l$2.__e(n,u);}t.base=t.__P=null;}if(t=n.__k)for(r=0;r<t.length;r++)t[r]&&N(t[r],u,"function"!=typeof n.type);i||null==n.__e||h$1(n.__e),n.__e=n.__d=void 0;}function O(n,l,u){return this.constructor(n,u)}function S(u,i,t){var r,o,f;l$2.__&&l$2.__(u,i),o=(r="function"==typeof t)?null:t&&t.__k||i.__k,f=[],j$1(i,u=(!r&&t||i).__k=v$1(d$2,null,[u]),o||e$1,e$1,void 0!==i.ownerSVGElement,!r&&t?[t]:o?null:i.firstChild?n.call(i.childNodes):null,f,!r&&t?t:o?o.__e:i.firstChild,r),z(f,u);}function D(n,l){var u={__c:l="__cC"+f$5++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(m$1);},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n);};}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n=c$2.slice,l$2={__e:function(n,l){for(var u,i,t;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return u.__E=u}catch(l){n=l;}throw n}},u$2=0,_.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a$2({},this.state),"function"==typeof n&&(n=n(a$2({},u),this.props)),n&&a$2(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),m$1(this));},_.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),m$1(this));},_.prototype.render=d$2,t$1=[],r$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g$1.__r=0,f$5=0;

  "undefined"!=typeof window&&window.__PREACT_DEVTOOLS__&&window.__PREACT_DEVTOOLS__.attachPreact("10.6.4",l$2,{Fragment:d$2,Component:_});

  var o$1={};function a$1(n){return n.type===d$2?"Fragment":"function"==typeof n.type?n.type.displayName||n.type.name:"string"==typeof n.type?n.type:"#text"}var i$1=[],s$1=[];function c$1(){return i$1.length>0?i$1[i$1.length-1]:null}var l$1=!1;function u$1(n){return "function"==typeof n.type&&n.type!=d$2}function f$4(n){for(var t=[n],e=n;null!=e.__o;)t.push(e.__o),e=e.__o;return t.reduce(function(n,t){n+="  in "+a$1(t);var e=t.__source;return e?n+=" (at "+e.fileName+":"+e.lineNumber+")":l$1||(l$1=!0,console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.")),n+"\n"},"")}var p$1="function"==typeof WeakMap,d$1=_.prototype.setState;_.prototype.setState=function(n,t){return null==this.__v?null==this.state&&console.warn('Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.\n\n'+f$4(c$1())):null==this.__P&&console.warn('Can\'t call "this.setState" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.\n\n'+f$4(this.__v)),d$1.call(this,n,t)};var h=_.prototype.forceUpdate;function y$1(n){var t=n.props,e=a$1(n),o="";for(var r in t)if(t.hasOwnProperty(r)&&"children"!==r){var i=t[r];"function"==typeof i&&(i="function "+(i.displayName||i.name)+"() {}"),i=Object(i)!==i||i.toString?i+"":Object.prototype.toString.call(i),o+=" "+r+"="+JSON.stringify(i);}var s=t.children;return "<"+e+o+(s&&s.length?">..</"+e+">":" />")}_.prototype.forceUpdate=function(n){return null==this.__v?console.warn('Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.\n\n'+f$4(c$1())):null==this.__P&&console.warn('Can\'t call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.\n\n'+f$4(this.__v)),h.call(this,n)},function(){!function(){var t=l$2.__b,e=l$2.diffed,o=l$2.__,r=l$2.vnode,a=l$2.__r;l$2.diffed=function(n){u$1(n)&&s$1.pop(),i$1.pop(),e&&e(n);},l$2.__b=function(n){u$1(n)&&i$1.push(n),t&&t(n);},l$2.__=function(n,t){s$1=[],o&&o(n,t);},l$2.vnode=function(n){n.__o=s$1.length>0?s$1[s$1.length-1]:null,r&&r(n);},l$2.__r=function(n){u$1(n)&&s$1.push(n),a&&a(n);};}();var t=!1,e=l$2.__b,r=l$2.diffed,c=l$2.vnode,l=l$2.__e,d=l$2.__,h=l$2.__h,m=p$1?{useEffect:new WeakMap,useLayoutEffect:new WeakMap,lazyPropTypes:new WeakMap}:null,v=[];l$2.__e=function(n,t,e){if(t&&t.__c&&"function"==typeof n.then){var o=n;n=new Error("Missing Suspense. The throwing component was: "+a$1(t));for(var r=t;r;r=r.__)if(r.__c&&r.__c.__c){n=o;break}if(n instanceof Error)throw n}try{l(n,t,e),"function"!=typeof n.then&&setTimeout(function(){throw n});}catch(n){throw n}},l$2.__=function(n,t){if(!t)throw new Error("Undefined parent passed to render(), this is the second argument.\nCheck if the element is available in the DOM/has the correct id.");var e;switch(t.nodeType){case 1:case 11:case 9:e=!0;break;default:e=!1;}if(!e){var o=a$1(n);throw new Error("Expected a valid HTML node as a second argument to render.\tReceived "+t+" instead: render(<"+o+" />, "+t+");")}d&&d(n,t);},l$2.__b=function(n){var r=n.type,i=function n(t){return t?"function"==typeof t.type?n(t.__):t:{}}(n.__);if(t=!0,void 0===r)throw new Error("Undefined component passed to createElement()\n\nYou likely forgot to export your component or might have mixed up default and named imports"+y$1(n)+"\n\n"+f$4(n));if(null!=r&&"object"==typeof r){if(void 0!==r.__k&&void 0!==r.__e)throw new Error("Invalid type passed to createElement(): "+r+"\n\nDid you accidentally pass a JSX literal as JSX twice?\n\n  let My"+a$1(n)+" = "+y$1(r)+";\n  let vnode = <My"+a$1(n)+" />;\n\nThis usually happens when you export a JSX literal and not the component.\n\n"+f$4(n));throw new Error("Invalid type passed to createElement(): "+(Array.isArray(r)?"array":r))}if("thead"!==r&&"tfoot"!==r&&"tbody"!==r||"table"===i.type?"tr"===r&&"thead"!==i.type&&"tfoot"!==i.type&&"tbody"!==i.type&&"table"!==i.type?console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent."+y$1(n)+"\n\n"+f$4(n)):"td"===r&&"tr"!==i.type?console.error("Improper nesting of table. Your <td> should have a <tr> parent."+y$1(n)+"\n\n"+f$4(n)):"th"===r&&"tr"!==i.type&&console.error("Improper nesting of table. Your <th> should have a <tr>."+y$1(n)+"\n\n"+f$4(n)):console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent."+y$1(n)+"\n\n"+f$4(n)),void 0!==n.ref&&"function"!=typeof n.ref&&"object"!=typeof n.ref&&!("$$typeof"in n))throw new Error('Component\'s "ref" property should be a function, or an object created by createRef(), but got ['+typeof n.ref+"] instead\n"+y$1(n)+"\n\n"+f$4(n));if("string"==typeof n.type)for(var s in n.props)if("o"===s[0]&&"n"===s[1]&&"function"!=typeof n.props[s]&&null!=n.props[s])throw new Error("Component's \""+s+'" property should be a function, but got ['+typeof n.props[s]+"] instead\n"+y$1(n)+"\n\n"+f$4(n));if("function"==typeof n.type&&n.type.propTypes){if("Lazy"===n.type.displayName&&m&&!m.lazyPropTypes.has(n.type)){var c="PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";try{var l=n.type();m.lazyPropTypes.set(n.type,!0),console.warn(c+"Component wrapped in lazy() is "+a$1(l));}catch(n){console.warn(c+"We will log the wrapped component's name once it is loaded.");}}var u=n.props;n.type.__f&&delete(u=function(n,t){for(var e in t)n[e]=t[e];return n}({},u)).ref,function(n,t,e,r,a){Object.keys(n).forEach(function(e){var i;try{i=n[e](t,e,r,"prop",null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");}catch(n){i=n;}!i||i.message in o$1||(o$1[i.message]=!0,console.error("Failed prop type: "+i.message+(a&&"\n"+a()||"")));});}(n.type.propTypes,u,0,a$1(n),function(){return f$4(n)});}e&&e(n);},l$2.__h=function(n,e,o){if(!n||!t)throw new Error("Hook can only be invoked from render methods.");h&&h(n,e,o);};var b=function(n,t){return {get:function(){var e="get"+n+t;v&&v.indexOf(e)<0&&(v.push(e),console.warn("getting vnode."+n+" is deprecated, "+t));},set:function(){var e="set"+n+t;v&&v.indexOf(e)<0&&(v.push(e),console.warn("setting vnode."+n+" is not allowed, "+t));}}},w={nodeName:b("nodeName","use vnode.type"),attributes:b("attributes","use vnode.props"),children:b("children","use vnode.props.children")},g=Object.create({},w);l$2.vnode=function(n){var t=n.props;if(null!==n.type&&null!=t&&("__source"in t||"__self"in t)){var e=n.props={};for(var o in t){var r=t[o];"__source"===o?n.__source=r:"__self"===o?n.__self=r:e[o]=r;}}n.__proto__=g,c&&c(n);},l$2.diffed=function(n){if(n.__k&&n.__k.forEach(function(t){if(t&&void 0===t.type){delete t.__,delete t.__b;var e=Object.keys(t).join(",");throw new Error("Objects are not valid as a child. Encountered an object with the keys {"+e+"}.\n\n"+f$4(n))}}),t=!1,r&&r(n),null!=n.__k)for(var e=[],o=0;o<n.__k.length;o++){var a=n.__k[o];if(a&&null!=a.key){var i=a.key;if(-1!==e.indexOf(i)){console.error('Following component has two or more children with the same key attribute: "'+i+'". This may cause glitches and misbehavior in rendering process. Component: \n\n'+y$1(n)+"\n\n"+f$4(n));break}e.push(i);}}};}();

  var Actions;

  (function (Actions) {
    Actions[Actions["CHANGE_VIEW"] = 0] = "CHANGE_VIEW";
    Actions[Actions["SET_WIDTH"] = 1] = "SET_WIDTH";
    Actions[Actions["SET_HEIGHT"] = 2] = "SET_HEIGHT";
    Actions[Actions["UPDATE_TICKS"] = 3] = "UPDATE_TICKS";
    Actions[Actions["SET_TASKS"] = 4] = "SET_TASKS";
    Actions[Actions["SET_DATES"] = 5] = "SET_DATES";
    Actions[Actions["SET_SCROLL_WIDTH"] = 6] = "SET_SCROLL_WIDTH";
    Actions[Actions["SET_X"] = 7] = "SET_X";
    Actions[Actions["TOGGLE_TASK"] = 8] = "TOGGLE_TASK";
    Actions[Actions["SET_HIGHLIGHTS"] = 9] = "SET_HIGHLIGHTS";
  })(Actions || (Actions = {}));

  var createAction = function createAction(action, payload) {
    return {
      type: action,
      payload: payload
    };
  };

  var changeView = function changeView(viewMode) {
    return createAction(Actions.CHANGE_VIEW, viewMode);
  };
  var setWidth = function setWidth(width) {
    return createAction(Actions.SET_WIDTH, width);
  };
  var setHeight = function setHeight(height) {
    return createAction(Actions.SET_HEIGHT, height);
  };
  var updateTicks = function updateTicks(ticks) {
    return createAction(Actions.UPDATE_TICKS, ticks);
  };
  var setTasks = function setTasks(data) {
    return createAction(Actions.SET_TASKS, data);
  };
  var setDates = function setDates(minDate, maxDate) {
    return createAction(Actions.SET_DATES, {
      minDate: minDate,
      maxDate: maxDate
    });
  };
  var setScrollWidth = function setScrollWidth(width) {
    return createAction(Actions.SET_SCROLL_WIDTH, width);
  };
  var setX = function setX(scrollWidth, minDate, maxDate) {
    return createAction(Actions.SET_X, function (tick) {
      return interpolate(scrollWidth, minDate, maxDate, tick);
    });
  };
  var toggleTask = function toggleTask(id) {
    return createAction(Actions.TOGGLE_TASK, id);
  };
  var setHighlights = function setHighlights(highlights) {
    return createAction(Actions.SET_HIGHLIGHTS, highlights);
  };
  var interpolate = function interpolate(width, start, end, input) {
    var distance = end.diff(start);
    var inputDistance = input.diff(start);
    var ratio = inputDistance / distance;
    return width * ratio;
  };
  var deinterpolate = function deinterpolate(width, start, end, x) {
    var ratio = x / width;
    var distance = end.diff(start);
    var inputDistance = ratio * distance;
    return start.add(inputDistance, 'millisecond');
  };

  var VIEW_MODE;

  (function (VIEW_MODE) {
    VIEW_MODE["DAY"] = "day";
    VIEW_MODE["WEEK"] = "week";
    VIEW_MODE["MONTH"] = "month";
    VIEW_MODE["YEAR"] = "year";
    VIEW_MODE["FILL"] = "fill";
  })(VIEW_MODE || (VIEW_MODE = {}));

  var ShapeType;

  (function (ShapeType) {
    ShapeType["SQUARE"] = "square";
    ShapeType["CIRCLE"] = "circle";
    ShapeType["TRIANGLE"] = "triangle";
    ShapeType["ARROW"] = "arrow";
    ShapeType["STAR"] = "star";
    ShapeType["DASH"] = "dash";
  })(ShapeType || (ShapeType = {}));

  var isImage = function isImage(obj) {
    return 'href' in obj;
  };
  var isArrow = function isArrow(obj) {
    return obj.shape === ShapeType.ARROW;
  };
  var isShape = function isShape(obj) {
    return 'shape' in obj && obj.shape != ShapeType.ARROW;
  };
  var isLine = function isLine(obj) {
    return 'start' in obj && 'end' in obj && !('shape' in obj);
  };

  var clamp = function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  };
  var uid$1 = function uid() {
    var d = new Date().getTime(); //Timestamp

    var d2 = performance && performance.now && performance.now() * 1000 || 0; //Time in microseconds since page-load or 0 if unsupported

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16; //random number between 0 and 16

      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }

      return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var dayjs_min = createCommonjsModule(function (module, exports) {
  !function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else {var i=t.name;v[i]=t,r=i;}return !n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));
  });

  var FunctionPrototype$2 = Function.prototype;
  var bind$2 = FunctionPrototype$2.bind;
  var call$2 = FunctionPrototype$2.call;
  var callBind = bind$2 && bind$2.bind(call$2);

  var functionUncurryThis = bind$2 ? function (fn) {
    return fn && callBind(call$2, fn);
  } : function (fn) {
    return fn && function () {
      return call$2.apply(fn, arguments);
    };
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
  };

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$2 =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$1 = Object.defineProperty;

  var setGlobal = function (key, value) {
    try {
      defineProperty$1(global$2, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$2[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store$1 = global$2[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store$1;

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.19.3',
    mode: 'pure' ,
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
  });

  var TypeError$a = global$2.TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError$a("Can't call method on " + it);
    return it;
  };

  var Object$5 = global$2.Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object$5(requireObjectCoercible(argument));
  };

  var hasOwnProperty = functionUncurryThis({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
  };

  var id = 0;
  var postfix = Math.random();
  var toString$2 = functionUncurryThis(1.0.toString);

  var uid = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$2(++id + postfix, 36);
  };

  var path = {};

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable = function (argument) {
    return typeof argument == 'function';
  };

  var aFunction = function (variable) {
    return isCallable(variable) ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global$2[namespace])
      : path[namespace] && path[namespace][method] || global$2[namespace] && global$2[namespace][method];
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global$2.process;
  var Deno = global$2.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  /* eslint-disable es/no-symbol -- required for testing */

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && engineV8Version && engineV8Version < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var useSymbolAsUid = nativeSymbol
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global$2.Symbol;
  var symbolFor = Symbol$1 && Symbol$1['for'];
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!hasOwnProperty_1(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
      var description = 'Symbol.' + name;
      if (nativeSymbol && hasOwnProperty_1(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else if (useSymbolAsUid && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    } return WellKnownSymbolsStore[name];
  };

  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var toString$1 = functionUncurryThis({}.toString);
  var stringSlice$1 = functionUncurryThis(''.slice);

  var classofRaw = function (it) {
    return stringSlice$1(toString$1(it), 8, -1);
  };

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  var Object$4 = global$2.Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object$4(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
  };

  var String$4 = global$2.String;

  var toString = function (argument) {
    if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$4(argument);
  };

  var charAt$1 = functionUncurryThis(''.charAt);
  var charCodeAt = functionUncurryThis(''.charCodeAt);
  var stringSlice = functionUncurryThis(''.slice);

  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString(requireObjectCoercible($this));
      var position = toIntegerOrInfinity(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$1(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };

  var functionToString = functionUncurryThis(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable(sharedStore.inspectSource)) {
    sharedStore.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap$2 = global$2.WeakMap;

  var nativeWeakMap = isCallable(WeakMap$2) && /native code/.test(inspectSource(WeakMap$2));

  var isObject = function (it) {
    return typeof it == 'object' ? it !== null : isCallable(it);
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var document$1 = global$2.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var String$3 = global$2.String;
  var TypeError$9 = global$2.TypeError;

  // `Assert: Type(argument) is Object`
  var anObject = function (argument) {
    if (isObject(argument)) return argument;
    throw TypeError$9(String$3(argument) + ' is not an object');
  };

  var call$1 = Function.prototype.call;

  var functionCall = call$1.bind ? call$1.bind(call$1) : function () {
    return call$1.apply(call$1, arguments);
  };

  var objectIsPrototypeOf = functionUncurryThis({}.isPrototypeOf);

  var Object$3 = global$2.Object;

  var isSymbol = useSymbolAsUid ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, Object$3(it));
  };

  var String$2 = global$2.String;

  var tryToString = function (argument) {
    try {
      return String$2(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var TypeError$8 = global$2.TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable = function (argument) {
    if (isCallable(argument)) return argument;
    throw TypeError$8(tryToString(argument) + ' is not a function');
  };

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable(func);
  };

  var TypeError$7 = global$2.TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = functionCall(fn, input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    throw TypeError$7("Can't convert object to primitive value");
  };

  var TypeError$6 = global$2.TypeError;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive = function (input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = functionCall(exoticToPrim, input, pref);
      if (!isObject(result) || isSymbol(result)) return result;
      throw TypeError$6("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var TypeError$5 = global$2.TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$3 = descriptors ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$5('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$3
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$4 = global$2.TypeError;
  var WeakMap$1 = global$2.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$4('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap || sharedStore.state) {
    var store = sharedStore.state || (sharedStore.state = new WeakMap$1());
    var wmget = functionUncurryThis(store.get);
    var wmhas = functionUncurryThis(store.has);
    var wmset = functionUncurryThis(store.set);
    set = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget(store, it) || {};
    };
    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      if (hasOwnProperty_1(it, STATE)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwnProperty_1(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwnProperty_1(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var FunctionPrototype$1 = Function.prototype;
  var apply = FunctionPrototype$1.apply;
  var bind$1 = FunctionPrototype$1.bind;
  var call = FunctionPrototype$1.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (bind$1 ? call.bind(apply) : function () {
    return call.apply(apply, arguments);
  });

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$2 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$2
  };

  var Object$2 = global$2.Object;
  var split = functionUncurryThis(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$2('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split(it, '') : Object$2(it);
  } : Object$2;

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (ie8DomDefine) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (hasOwnProperty_1(O, P)) return createPropertyDescriptor(!functionCall(objectPropertyIsEnumerable.f, O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$1
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable(detection) ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var bind = functionUncurryThis(functionUncurryThis.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable(fn);
    return that === undefined ? fn : bind ? bind(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;






  var wrapConstructor = function (NativeConstructor) {
    var Wrapper = function (a, b, c) {
      if (this instanceof Wrapper) {
        switch (arguments.length) {
          case 0: return new NativeConstructor();
          case 1: return new NativeConstructor(a);
          case 2: return new NativeConstructor(a, b);
        } return new NativeConstructor(a, b, c);
      } return functionApply(NativeConstructor, this, arguments);
    };
    Wrapper.prototype = NativeConstructor.prototype;
    return Wrapper;
  };

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var PROTO = options.proto;

    var nativeSource = GLOBAL ? global$2 : STATIC ? global$2[TARGET] : (global$2[TARGET] || {}).prototype;

    var target = GLOBAL ? path : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];
    var targetPrototype = target.prototype;

    var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
    var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

    for (key in source) {
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contains in native
      USE_NATIVE = !FORCED && nativeSource && hasOwnProperty_1(nativeSource, key);

      targetProperty = target[key];

      if (USE_NATIVE) if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(nativeSource, key);
        nativeProperty = descriptor && descriptor.value;
      } else nativeProperty = nativeSource[key];

      // export native or implementation
      sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

      if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

      // bind timers to global for call from export context
      if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global$2);
      // wrap global constructors for prevent changs in this version
      else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
      // make static versions for prototype methods
      else if (PROTO && isCallable(sourceProperty)) resultProperty = functionUncurryThis(sourceProperty);
      // default case
      else resultProperty = sourceProperty;

      // add a flag to not completely full polyfills
      if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(resultProperty, 'sham', true);
      }

      createNonEnumerableProperty(target, key, resultProperty);

      if (PROTO) {
        VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
        if (!hasOwnProperty_1(path, VIRTUAL_PROTOTYPE)) {
          createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
        }
        // export virtual prototype methods
        createNonEnumerableProperty(path[VIRTUAL_PROTOTYPE], key, sourceProperty);
        // export real prototype methods
        if (options.real && targetPrototype && !targetPrototype[key]) {
          createNonEnumerableProperty(targetPrototype, key, sourceProperty);
        }
      }
    }
  };

  var FunctionPrototype = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = descriptors && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwnProperty_1(FunctionPrototype, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!descriptors || (descriptors && getDescriptor(FunctionPrototype, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike = function (obj) {
    return toLength(obj.length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = lengthOfArrayLike(O);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var push = functionUncurryThis([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwnProperty_1(hiddenKeys, key) && hasOwnProperty_1(O, key) && push(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwnProperty_1(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], props[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO = sharedKey('IE_PROTO');
  var Object$1 = global$2.Object;
  var ObjectPrototype = Object$1.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = correctPrototypeGetter ? Object$1.getPrototypeOf : function (O) {
    var object = toObject(O);
    if (hasOwnProperty_1(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof Object$1 ? ObjectPrototype : null;
  };

  var redefine = function (target, key, value, options) {
    if (options && options.enumerable) target[key] = value;
    else createNonEnumerableProperty(target, key, value);
  };

  var ITERATOR$4 = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$1, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$1 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$1 == undefined || fails(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$1[ITERATOR$4].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$1 = {};
  else IteratorPrototype$1 = objectCreate(IteratorPrototype$1);

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable(IteratorPrototype$1[ITERATOR$4])) {
    redefine(IteratorPrototype$1, ITERATOR$4, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$1,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  var defineProperty = objectDefineProperty.f;





  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
    if (it) {
      var target = STATIC ? it : it.prototype;
      if (!hasOwnProperty_1(target, TO_STRING_TAG)) {
        defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
      }
      if (SET_METHOD && !toStringTagSupport) {
        createNonEnumerableProperty(target, 'toString', objectToString);
      }
    }
  };

  var iterators = {};

  var IteratorPrototype = iteratorsCore.IteratorPrototype;





  var returnThis$1 = function () { return this; };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var String$1 = global$2.String;
  var TypeError$3 = global$2.TypeError;

  var aPossiblePrototype = function (argument) {
    if (typeof argument == 'object' || isCallable(argument)) return argument;
    throw TypeError$3("Can't set " + String$1(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = functionUncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$3 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$3]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
        iterators[TO_STRING_TAG] = returnThis;
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return functionCall(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if ((FORCED) && IterablePrototype[ITERATOR$3] !== defaultIterator) {
      redefine(IterablePrototype, ITERATOR$3, defaultIterator, { name: DEFAULT });
    }
    iterators[NAME] = defaultIterator;

    return methods;
  };

  var charAt = stringMultibyte.charAt;




  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: toString(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var iteratorClose = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject(iterator);
    try {
      innerResult = getMethod(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = functionCall(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject(innerResult);
    return value;
  };

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
  };

  var noop = function () { /* empty */ };
  var empty = [];
  var construct = getBuiltIn('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = functionUncurryThis(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function (argument) {
    if (!isCallable(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function (argument) {
    if (!isCallable(argument)) return false;
    switch (classof(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
      // we can't check .prototype since constructors produced by .bind haven't it
    } return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  };

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor = !construct || fails(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var createProperty = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var ITERATOR$1 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return getMethod(it, ITERATOR$1)
      || getMethod(it, '@@iterator')
      || iterators[classof(it)];
  };

  var TypeError$2 = global$2.TypeError;

  var getIterator = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject(functionCall(iteratorMethod, argument));
    throw TypeError$2(tryToString(argument) + ' is not iterable');
  };

  var Array$2 = global$2.Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var IS_CONSTRUCTOR = isConstructor(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this == Array$2 && isArrayIteratorMethod(iteratorMethod))) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (;!(step = functionCall(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = lengthOfArrayLike(O);
      result = IS_CONSTRUCTOR ? new this(length) : Array$2(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var ITERATOR = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: arrayFrom
  });

  var from$2 = path.Array.from;

  var from$1 = from$2;

  var from = from$1;

  var t,u,r,o=0,i=[],c=l$2.__b,f=l$2.__r,e=l$2.diffed,a=l$2.__c,v=l$2.unmount;function m(t,r){l$2.__h&&l$2.__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function l(n){return o=1,p(w,n)}function p(n,r,o){var i=m(t++,2);return i.t=n,i.__c||(i.__=[o?o(r):w(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}));}],i.__c=u),i.__}function y(r,o){var i=m(t++,3);!l$2.__s&&k(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i));}function s(n){return o=5,d(function(){return {current:n}},[])}function d(n,u){var r=m(t++,7);return k(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A(n,t){return o=8,d(function(){return n},t)}function F(n){var r=u.context[n.__c],o=m(t++,9);return o.c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function x(){var t;for(i.sort(function(n,t){return n.__v.__b-t.__v.__b});t=i.pop();)if(t.__P)try{t.__H.__h.forEach(g),t.__H.__h.forEach(j),t.__H.__h=[];}catch(u){t.__H.__h=[],l$2.__e(u,t.__v);}}l$2.__b=function(n){u=null,c&&c(n);},l$2.__r=function(n){f&&f(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(g),r.__h.forEach(j),r.__h=[]);},l$2.diffed=function(t){e&&e(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i.push(o)&&r===l$2.requestAnimationFrame||((r=l$2.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b&&cancelAnimationFrame(t),setTimeout(n);},r=setTimeout(u,100);b&&(t=requestAnimationFrame(u));})(x)),u=null;},l$2.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g),t.__h=t.__h.filter(function(n){return !n.__||j(n)});}catch(r){u.some(function(n){n.__h&&(n.__h=[]);}),u=[],l$2.__e(r,t.__v);}}),a&&a(t,u);},l$2.unmount=function(t){v&&v(t);var u,r=t.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{g(n);}catch(n){u=n;}}),u&&l$2.__e(u,r.__v));};var b="function"==typeof requestAnimationFrame;function g(n){var t=u,r=n.__c;"function"==typeof r&&(n.__c=void 0,r()),u=t;}function j(n){var t=u;n.__c=n.__(),u=t;}function k(n,t){return !n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function w(n,t){return "function"==typeof t?t(n):t}

  var dayjsF = function dayjsF(input, format) {
    if (format) {
      return dayjs_min(input, format);
    }

    return dayjs_min(input);
  };

  var prepareLabel = function prepareLabel(input, defaults, config) {
    if (typeof input == 'string') {
      return _objectSpread2(_objectSpread2({
        alignment: 'left'
      }, defaults), {}, {
        label: input,
        labelStyle: _objectSpread2({}, defaults.labelStyle),
        backgroundStyle: _objectSpread2({}, defaults.backgroundStyle)
      });
    }

    var obj = _objectSpread2(_objectSpread2(_objectSpread2({
      alignment: 'left'
    }, defaults), input), {}, {
      labelStyle: _objectSpread2(_objectSpread2({}, defaults.labelStyle), input.labelStyle),
      backgroundStyle: _objectSpread2(_objectSpread2({}, defaults.backgroundStyle), input.backgroundStyle)
    });

    if (input.icons || defaults.icons) {
      var icons = input.icons || defaults.icons;

      if (!Array.isArray(icons)) {
        icons = [icons];
      }

      obj.icons = icons.map(function (i) {
        return prepareIcon(i, config);
      });
    }

    return obj;
  };

  var preparePlan = function preparePlan(options, defaults, config) {
    var plan = {
      start: dayjsF(options.start, options.dateFormat || defaults.dateFormat || config.dateFormat),
      end: dayjsF(options.end, options.dateFormat || defaults.dateFormat || config.dateFormat),
      height: options.height || defaults.height || 30,
      progressStyle: _objectSpread2(_objectSpread2({
        fill: '#f2c329'
      }, defaults.progressStyle), options.progressStyle),
      backgroundStyle: _objectSpread2(_objectSpread2({
        fill: '#acacac'
      }, defaults.backgroundStyle), options.backgroundStyle)
    };

    if (options.label) {
      plan.label = prepareLabel(options.label, defaults.label, config);
    }

    if (options.startText) {
      plan.startText = prepareLabel(options.startText, {}, config);
    }

    if (options.endText) {
      plan.endText = prepareLabel(options.endText, {}, config);
    }

    var progress = options.progress || defaults.progress || 0;

    if (typeof progress == 'number') {
      var diff = clamp(progress / 100, 0, 1) * (plan.end.unix() - plan.start.unix());
      plan.progress = dayjs_min.unix(plan.start.unix() + diff);
    } else {
      plan.progress = dayjsF(options.progress, options.dateFormat || defaults.dateFormat || config.dateFormat);
    }

    return plan;
  };

  var prepareIcon = function prepareIcon(source, config) {
    var copy = _objectSpread2({
      width: 15,
      height: 15,
      rotate: 0
    }, source);

    if (source.date) {
      copy.date = dayjsF(source.date, source.dateFormat || config.dateFormat);
    }

    return copy;
  };

  var prepareLine = function prepareLine(source, config) {
    return {
      style: _objectSpread2({
        stroke: 'black',
        strokeWidth: 2
      }, source.style),
      start: dayjsF(source.start, source.dateFormat || config.dateFormat),
      end: dayjsF(source.end, source.dateFormat || config.dateFormat)
    };
  };

  var prepareArrow = function prepareArrow(source, config) {
    var arrow = {
      shape: ShapeType.ARROW,
      style: _objectSpread2({
        stroke: 'black',
        strokeWidth: 2
      }, source.style),
      start: dayjsF(source.start, source.dateFormat || config.dateFormat),
      end: dayjsF(source.end, source.dateFormat || config.dateFormat)
    };
    return arrow;
  };

  var prepareShape = function prepareShape(source, config) {
    return _objectSpread2(_objectSpread2({
      width: 15,
      height: 15
    }, source), {}, {
      date: dayjsF(source.date, source.dateFormat || config.dateFormat),
      style: _objectSpread2({
        stroke: '#000',
        fill: '#fff',
        strokeWidth: 2,
        strokeLinejoin: 'miter'
      }, source.style)
    });
  };

  var prepareMilestone = function prepareMilestone(options, config) {
    if (isImage(options)) {
      return _objectSpread2({
        x: options.x,
        y: options.y
      }, prepareIcon(options, config));
    }

    if (isLine(options)) {
      return prepareLine(options, config);
    }

    if (isArrow(options)) {
      return prepareArrow(options, config);
    }

    if (isShape(options)) {
      return prepareShape(options, config);
    }

    return options;
  };

  var prepareColumns = function prepareColumns(task, columns, plans, config) {
    var labels = {};
    columns.forEach(function (c) {
      var options = task[c.field] || [];

      if (!Array.isArray(options)) {
        options = [options];
      }

      if (options.length < plans) {
        options = options.concat(new Array(plans - options.length).fill({}));
      }

      options.forEach(function (v, idx) {
        if (typeof v == 'string' || typeof v == 'number') {
          v = {
            label: v
          };
        }

        var defaults = c.defaults || {};

        if (Array.isArray(defaults)) {
          defaults = defaults[idx] || {};
        }

        options[idx] = prepareLabel(v, defaults, config);
      });
      labels[c.field] = options;
    });
    return labels;
  };

  var prepareTask = function prepareTask(options, config) {
    var task = {};
    var planDefaults = config.planDefaults || {};

    if (options.plan) {
      task.plans = [[preparePlan(options.plan, planDefaults[0] || {}, config)]];
    } else if (options.plans && Array.isArray(options.plans)) {
      // @ts-ignore
      task.plans = options.plans.map(function (p, idx) {
        if (!Array.isArray(p)) {
          if (Array.isArray(planDefaults)) {
            return [preparePlan(p, planDefaults[idx] || {}, config)];
          }

          return [preparePlan(p, planDefaults, config)];
        }

        return p.map(function (pl) {
          if (Array.isArray(planDefaults)) {
            return preparePlan(pl, planDefaults[idx] || {}, config);
          }

          return preparePlan(pl, planDefaults, config);
        });
      });
    } else if (options.plans) {
      console.error('Plans object is not an array');
    }

    task.milestones = [];

    if (options.milestones && Array.isArray(options.milestones)) {
      task.milestones = options.milestones.map(function (m) {
        if (!Array.isArray(m)) {
          return [prepareMilestone(m, config)];
        }

        return m.map(function (ml) {
          return prepareMilestone(ml, config);
        });
      });
    }

    if (task.milestones.length > task.plans.length) {
      var fill = from({
        length: task.milestones.length - task.plans.length
      }, function () {
        return [];
      });
      task.plans = task.plans.concat(fill);
    } else if (task.plans.length > task.milestones.length) {
      var _fill = from({
        length: task.plans.length - task.milestones.length
      }, function () {
        return [];
      });

      task.milestones = task.milestones.concat(_fill);
    }

    task.heights = task.plans.map(function (pos) {
      return Math.max.apply(null, pos.map(function (p) {
        return p.height;
      }));
    });

    if (config.columns && config.columns.length > 0) {
      task.labels = prepareColumns(options, config.columns, task.plans.length, config);
    }

    task.collapsed = options.collapsed;
    task.collapsible = options.collapsible;
    task.id = uid$1(); // TODO: apply default heights to missing plans

    return task;
  };

  var prepareHighlights = function prepareHighlights(config) {
    if (!config.highlights || !Array.isArray(config.highlights)) {
      return [];
    }

    return config.highlights.map(function (h) {
      return {
        fill: h.fill,
        headerOnly: !!h.headerOnly,
        start: dayjs_min(h.start, h.dateFormat || config.dateFormat),
        end: dayjs_min(h.end, h.dateFormat || config.dateFormat)
      };
    });
  };

  var calculateHeight = function calculateHeight(tasks) {
    // 68 = header (30) + fake row (20) + scrollbar (18)
    return 68 + tasks.map(function (t) {
      return t.collapsed ? [t.heights[0]] : t.heights;
    }).flat(3).reduce(function (a, b) {
      return a + b;
    }) + tasks.length * 2;
  };
  var useProcessData = function useProcessData(dispatch, data, config) {
    y(function () {
      if (config.viewMode) {
        dispatch(changeView(config.viewMode));
      }

      var tasks = data.map(function (t) {
        return prepareTask(t, config);
      });
      var height = calculateHeight(tasks);
      dispatch(setTasks(tasks));
      dispatch(setHeight(height));
      var highlights = prepareHighlights(config);
      dispatch(setHighlights(highlights));
    }, [data, config]);
  };

  var DEFAULT_STATE = {
    tasks: [],
    viewMode: VIEW_MODE.MONTH,
    ticks: [],
    minDate: null,
    maxDate: null,
    width: 0,
    scrollWidth: 0,
    height: 0,
    highlights: [],
    x: function x(tick) {
      return 0;
    }
  };
  var Config = D({
    state: DEFAULT_STATE,
    dispatch: function dispatch(_action) {}
  });
  var reducer = function reducer(state, action) {
    switch (action.type) {
      case Actions.CHANGE_VIEW:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          viewMode: action.payload
        });

      case Actions.SET_WIDTH:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          width: action.payload
        });

      case Actions.SET_HEIGHT:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          height: action.payload
        });

      case Actions.SET_TASKS:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          tasks: action.payload
        });

      case Actions.UPDATE_TICKS:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          ticks: action.payload
        });

      case Actions.SET_DATES:
        {
          var _action$payload = action.payload,
              minDate = _action$payload.minDate,
              maxDate = _action$payload.maxDate;
          return _objectSpread2(_objectSpread2({}, state), {}, {
            minDate: minDate,
            maxDate: maxDate
          });
        }

      case Actions.SET_SCROLL_WIDTH:
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            scrollWidth: action.payload
          });
        }

      case Actions.SET_X:
        return _objectSpread2(_objectSpread2({}, state), {}, {
          x: action.payload
        });

      case Actions.TOGGLE_TASK:
        var tasks = state.tasks;
        var task = tasks.find(function (t) {
          return t.id == action.payload;
        });
        task.collapsed = !!!task.collapsed;
        var height = calculateHeight(tasks);
        return _objectSpread2(_objectSpread2({}, state), {}, {
          tasks: tasks,
          height: height
        });

      case Actions.SET_HIGHLIGHTS:
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            highlights: action.payload
          });
        }
    }

    return state;
  };

  var Icon = function Icon(_ref) {
    var options = _ref.options,
        width = _ref.width,
        height = _ref.height,
        x = _ref.x,
        y = _ref.y,
        _ref$style = _ref.style,
        style = _ref$style === void 0 ? {} : _ref$style;
    return v$1("svg", {
      x: x,
      y: y,
      width: width,
      height: height,
      preserveAspectRatio: "none",
      viewBox: "0 0 20 20",
      style: _objectSpread2({
        overflow: 'visible'
      }, style)
    }, v$1(Shape, {
      options: options
    }));
  };
  var Shape = function Shape(_ref2) {
    var options = _ref2.options;

    switch (options.shape) {
      case ShapeType.TRIANGLE:
        return v$1("g", {
          transform: "translate(10, 10)"
        }, v$1("g", {
          transform: "rotate(".concat(options.rotate || 0, ")")
        }, v$1("polygon", {
          style: options.style,
          points: "10,2 2,18, 18,18",
          transform: "translate(-10, -10)"
        })));

      case ShapeType.SQUARE:
        return v$1("g", {
          transform: "translate(10, 10)"
        }, v$1("g", {
          transform: "rotate(".concat(options.rotate || 0, ")")
        }, v$1("rect", {
          x: 1,
          y: 1,
          width: 18,
          height: 18,
          style: options.style,
          transform: "translate(-10, -10) skewX(".concat(options.skew ? options.skew : 0, ")")
        })));

      case ShapeType.CIRCLE:
        return v$1("g", {
          transform: "translate(10, 10)"
        }, v$1("g", null, v$1("ellipse", {
          cx: 10,
          cy: 10,
          rx: 9,
          ry: 9,
          transform: "translate(-10, -10)",
          style: options.style
        })));

      case ShapeType.STAR:
        return v$1("polygon", {
          style: options.style,
          points: "10,1 12,8, 19,8, 13.5,12 15.5,19 10,15, 4.5,19 6.5,12 1,8 8,8"
        });
    }

    return null;
  };

  var useConfig = function useConfig() {
    return F(Config);
  };

  var CollapseButton = function CollapseButton(_ref) {
    var collapsed = _ref.collapsed,
        id = _ref.id;
    var store = useConfig();

    var _useState = l(false),
        _useState2 = _slicedToArray(_useState, 2),
        hover = _useState2[0],
        setHover = _useState2[1];

    return v$1("a", {
      style: {
        width: 20,
        display: 'inline',
        border: '0.1em solid rgba(0, 0, 0, 0.63)',
        borderRadius: '0.12em',
        boxSizing: 'border-box',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'all 0.2s',
        cursor: hover ? 'pointer' : 'default',
        color: hover ? '#fff' : '#000',
        backgroundColor: hover ? '#000' : 'rgba(255, 255, 255, 0.63)',
        marginRight: 5,
        userSelect: 'none'
      },
      onMouseEnter: function onMouseEnter() {
        return setHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHover(false);
      },
      onClick: function onClick() {
        return store.dispatch(toggleTask(id));
      }
    }, collapsed ? '+' : '-');
  };

  var LabelIcon = function LabelIcon(_ref2) {
    var options = _ref2.options;

    if (isImage(options)) {
      return v$1("img", {
        src: options.href,
        width: options.width,
        height: options.height,
        style: _objectSpread2({
          marginRight: 4
        }, options.style)
      });
    }

    return v$1(Icon, {
      options: options,
      width: options.width,
      height: options.height,
      style: {
        marginRight: 4
      }
    });
  };

  var Left = function Left(props) {
    return v$1("div", {
      style: {
        display: 'inline-flex',
        marginRight: 4
      }
    }, props.children);
  };

  var Center = function Center(props) {
    return v$1("div", {
      style: {
        display: 'inline-flex'
      }
    }, props.children);
  };

  var Right = function Right(props) {
    return v$1("div", {
      style: {
        display: 'inline-flex',
        marginLeft: 4
      }
    }, props.children);
  };

  var Label = function Label(_ref3) {
    var label = _ref3.label,
        height = _ref3.height,
        idx = _ref3.idx,
        row = _ref3.row,
        task = _ref3.task;
    var spanner = v$1("span", {
      style: _objectSpread2({}, label.labelStyle)
    }, label.label);
    return v$1("div", {
      style: _objectSpread2({
        height: height,
        paddingLeft: 4,
        paddingRight: 4,
        display: task.collapsed && row !== 0 ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }, label.backgroundStyle)
    }, v$1(Left, null, idx === 0 && row === 0 && task.collapsible ? v$1(CollapseButton, {
      id: task.id,
      collapsed: task.collapsed
    }) : null, !!label.icons ? label.icons.filter(function (i) {
      return !i.alignment || i.alignment == 'left';
    }).map(function (l) {
      return v$1(LabelIcon, {
        options: l
      });
    }) : null, !label.alignment || label.alignment == 'left' ? spanner : null), v$1(Center, null, !!label.icons ? label.icons.filter(function (i) {
      return i.alignment == 'center';
    }).map(function (l) {
      return v$1(LabelIcon, {
        options: l
      });
    }) : null, label.alignment == 'center' ? spanner : null), v$1(Right, null, !!label.icons ? label.icons.filter(function (i) {
      return i.alignment == 'right';
    }).map(function (l) {
      return v$1(LabelIcon, {
        options: l
      });
    }) : null, label.alignment == 'right' ? spanner : null));
  };

  var LabelSection = function LabelSection(_ref4) {
    var task = _ref4.task,
        field = _ref4.field,
        idx = _ref4.idx;
    return v$1("div", {
      style: {
        borderTop: '2px solid black'
      }
    }, task.labels[field].map(function (label, row) {
      return v$1(Label, {
        label: label,
        height: task.heights[row],
        idx: idx,
        row: row,
        task: task
      });
    }));
  };

  var Column = function Column(_ref5) {
    var column = _ref5.column,
        gridRef = _ref5.gridRef,
        forwardedRef = _ref5.forwardedRef,
        idx = _ref5.idx;
    var store = useConfig();
    var state = store.state;
    return v$1("div", {
      key: column.field,
      style: {
        display: 'flex',
        flexShrink: 0,
        flexDirection: 'column'
      }
    }, v$1("div", {
      style: {
        height: 30,
        display: 'flex',
        justifyContent: 'center'
      }
    }, v$1("span", {
      style: {
        alignSelf: 'flex-end'
      }
    }, column.text)), v$1("div", {
      className: "column-sections",
      onWheel: function onWheel(e) {
        gridRef.current.scrollBy(0, e.deltaY);
      },
      ref: forwardedRef,
      style: {
        display: 'flex',
        flexShrink: 0,
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'column',
        whiteSpace: 'nowrap'
      }
    }, state.tasks.map(function (task) {
      return v$1(LabelSection, {
        task: task,
        field: column.field,
        idx: idx
      });
    }), v$1("div", null, v$1("div", {
      style: {
        height: 40
      }
    }, " "))));
  };

  var Highlights = function Highlights() {
    var store = useConfig();
    var state = store.state;
    var highlights = state.highlights;
    return v$1("svg", {
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        height: state.height - 58,
        width: state.scrollWidth
      }
    }, highlights.map(function (hl) {
      return v$1("rect", {
        x: state.x(hl.start),
        y: 0,
        width: state.x(hl.end) - state.x(hl.start),
        height: "100%",
        style: {
          fill: hl.fill,
          opacity: 0.125
        }
      });
    }));
  };

  var Milestone = function Milestone(_ref) {
    var options = _ref.options,
        height = _ref.height;
    var store = useConfig();
    var state = store.state;

    if (isImage(options)) {
      var y = (height - options.height) / 2;
      var offset = options.alignment == 'left' ? 0 : options.alignment == 'right' ? options.width : options.width / 2;
      var x = state.x(options.date) - offset;
      return v$1("g", {
        className: "milestone-image"
      }, v$1("image", {
        href: options.href,
        width: options.width,
        height: options.height,
        y: y,
        x: x
      }));
    }

    if (isArrow(options)) {
      var _y = height / 2;

      var isBackwards = options.end < options.start;
      return v$1("g", {
        className: "milestone-arrow"
      }, v$1("line", {
        x1: state.x(options.start),
        x2: state.x(options.end),
        y1: _y,
        y2: _y,
        style: options.style
      }), v$1(Icon, {
        options: {
          shape: ShapeType.TRIANGLE,
          rotate: isBackwards ? -90 : 90,
          style: options.style
        },
        width: 15,
        height: 15,
        x: state.x(options.end) - (isBackwards ? 15 : 1),
        y: _y / 2
      }));
    }

    if (isShape(options)) {
      var _y2 = (height - options.height) / 2;

      var _offset = options.alignment == 'left' ? 0 : options.alignment == 'right' ? options.width : options.width / 2;

      var _x = state.x(options.date) - _offset;

      if (options.shape == ShapeType.DASH) {
        var x2 = state.x(options.date);
        return v$1("g", null, v$1("line", {
          x1: x2,
          x2: x2,
          y1: 0,
          y2: height,
          style: options.style,
          "stroke-dasharray": 2
        }));
      }

      return v$1(Icon, {
        options: options,
        width: options.width,
        height: options.height,
        x: _x,
        y: _y2
      });
    }

    if (isLine(options)) {
      var _y3 = height / 2;

      return v$1("g", {
        className: "milestone-line"
      }, v$1("line", {
        x1: state.x(options.start),
        x2: state.x(options.end),
        y1: _y3,
        y2: _y3,
        style: options.style
      }));
    }

    return null;
  };

  var Plan = function Plan(_ref) {
    var plan = _ref.plan;
    var store = useConfig();
    var state = store.state;
    var start = state.x(plan.start);
    var end = state.x(plan.end);
    var progress = state.x(plan.progress);
    return v$1("g", {
      className: "plan"
    }, v$1("rect", {
      x: start,
      width: end - start,
      height: plan.height,
      style: plan.backgroundStyle
    }), v$1("rect", {
      x: start,
      width: progress - start,
      height: plan.height,
      style: plan.progressStyle
    }));
  };

  var Task = function Task(_ref) {
    var task = _ref.task;
    var store = useConfig();
    var state = store.state;
    return v$1("div", {
      className: "task-group",
      style: {
        width: state.scrollWidth,
        borderTop: '2px solid black'
      }
    }, task.plans.map(function (plans, row) {
      var milestones = task.milestones[row];
      return v$1("div", {
        className: "task-row",
        style: {
          height: task.heights[row],
          width: state.scrollWidth,
          backgroundColor: '#fff',
          display: task.collapsed && row > 0 ? 'none' : 'block'
        }
      }, v$1("svg", {
        height: task.heights[row],
        width: state.scrollWidth
      }, plans.map(function (plan) {
        return v$1(Plan, {
          plan: plan
        });
      }), milestones.map(function (milestone) {
        return v$1(Milestone, {
          options: milestone,
          height: task.heights[row]
        });
      })));
    }));
  };

  var Grid = function Grid(_ref) {
    var forwardedRef = _ref.forwardedRef;
    var store = useConfig();
    var tasks = store.state.tasks;
    return v$1("div", {
      ref: forwardedRef,
      style: {
        flex: 1,
        overflowX: 'auto',
        position: 'relative'
      }
    }, v$1(Highlights, null), tasks.map(function (task) {
      return v$1(Task, {
        task: task,
        key: task.id
      });
    }), v$1("div", {
      style: {
        height: 20
      }
    }));
  };

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray = Array.isArray || function isArray(argument) {
    return classofRaw(argument) == 'Array';
  };

  var TypeError$1 = global$2.TypeError;

  // `FlattenIntoArray` abstract operation
  // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
  var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
    var targetIndex = start;
    var sourceIndex = 0;
    var mapFn = mapper ? functionBindContext(mapper, thisArg) : false;
    var element, elementLen;

    while (sourceIndex < sourceLen) {
      if (sourceIndex in source) {
        element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

        if (depth > 0 && isArray(element)) {
          elementLen = lengthOfArrayLike(element);
          targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
        } else {
          if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError$1('Exceed the acceptable array length');
          target[targetIndex] = element;
        }

        targetIndex++;
      }
      sourceIndex++;
    }
    return targetIndex;
  };

  var flattenIntoArray_1 = flattenIntoArray;

  var SPECIES = wellKnownSymbol('species');
  var Array$1 = global$2.Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor = function (originalArray) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor(C) && (C === Array$1 || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array$1 : C;
  };

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  // `Array.prototype.flat` method
  // https://tc39.es/ecma262/#sec-array.prototype.flat
  _export({ target: 'Array', proto: true }, {
    flat: function flat(/* depthArg = 1 */) {
      var depthArg = arguments.length ? arguments[0] : undefined;
      var O = toObject(this);
      var sourceLen = lengthOfArrayLike(O);
      var A = arraySpeciesCreate(O, 0);
      A.length = flattenIntoArray_1(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
      return A;
    }
  });

  var entryUnbind = getBuiltIn;

  var flat$2 = entryUnbind('Array', 'flat');

  var flat$1 = flat$2;

  var flat = flat$1;

  var getModeWidth = function getModeWidth(viewMode) {
    switch (viewMode) {
      case VIEW_MODE.DAY:
        return 96;

      case VIEW_MODE.WEEK:
        return 128;

      case VIEW_MODE.MONTH:
        return 200;

      case VIEW_MODE.YEAR:
        return 300;
    }

    return -1;
  };

  var toDayjsUnit = function toDayjsUnit(viewMode) {
    switch (viewMode) {
      case VIEW_MODE.DAY:
        return 'day';

      case VIEW_MODE.WEEK:
        return 'week';

      case VIEW_MODE.MONTH:
        return 'month';

      case VIEW_MODE.YEAR:
        return 'year';
    }

    return 'day';
  };

  var nextDate = function nextDate(viewMode, date) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    switch (viewMode) {
      case VIEW_MODE.DAY:
        return date.add(step, 'day');

      case VIEW_MODE.MONTH:
        return date.add(step, 'month');

      case VIEW_MODE.WEEK:
        return date.add(step, 'week');

      case VIEW_MODE.YEAR:
        return date.add(step, 'year');
    }

    return date.add(step, 'day');
  };

  var startDate = function startDate(viewMode, date) {
    switch (viewMode) {
      case VIEW_MODE.DAY:
        return date.subtract(1, 'day');

      case VIEW_MODE.MONTH:
        return date.subtract(1, 'month');

      case VIEW_MODE.WEEK:
        return date.subtract(1, 'week');

      case VIEW_MODE.YEAR:
        return date.subtract(3, 'month');
    }

    return date.subtract(1, 'day');
  };

  var getBoundingDates = function getBoundingDates(tasks) {
    var milestones = flat(tasks.map(function (t) {
      return t.milestones;
    }), 4);
    var plans = flat(tasks.map(function (t) {
      return t.plans;
    }), 4);
    var milestoneDates = flat(milestones.map(function (m) {
      return m.date || [m.start, m.end];
    }), 2);
    var startDates = plans.map(function (p) {
      return p.start;
    }).concat(milestoneDates);
    var endDates = plans.map(function (p) {
      return p.end;
    }).concat(milestoneDates);
    var minDate = dayjs_min.min(startDates);
    var maxDate = dayjs_min.max(endDates);
    return {
      minDate: minDate,
      maxDate: maxDate
    };
  };

  var Axis = function Axis(props) {
    var store = F(Config);
    var state = store.state;
    y(function () {
      if (state.tasks.length == 0 || !state.width) {
        return;
      }

      var _getBoundingDates = getBoundingDates(state.tasks),
          minDate = _getBoundingDates.minDate,
          maxDate = _getBoundingDates.maxDate;

      minDate = startDate(state.viewMode, minDate);
      var diff = Math.floor(maxDate.diff(minDate, toDayjsUnit(state.viewMode))) + 1;
      var modeWidth = getModeWidth(state.viewMode);
      var scrollWidth = modeWidth * diff;

      if (scrollWidth < state.width) {
        scrollWidth = state.width;
      }

      var ticks = [];
      var step = 1;

      if (state.viewMode == VIEW_MODE.FILL) {
        var stepDate = deinterpolate(scrollWidth, minDate, maxDate, 100);
        step = stepDate.diff(minDate, 'day');
        modeWidth = scrollWidth;
      }

      var currentTick = nextDate(state.viewMode, minDate, step);
      var referenceDate = state.viewMode == VIEW_MODE.FILL ? maxDate : currentTick.clone();

      while (interpolate(modeWidth, minDate, referenceDate, currentTick) < scrollWidth) {
        ticks.push(currentTick);
        currentTick = nextDate(state.viewMode, currentTick, step);
      }

      store.dispatch(setX(modeWidth, minDate, referenceDate));
      store.dispatch(setScrollWidth(scrollWidth));
      store.dispatch(setDates(minDate, maxDate));
      store.dispatch(updateTicks(ticks));
    }, [state.tasks, state.width, state.viewMode]);
    return v$1(d$2, null, props.children);
  };

  var Header = function Header(_ref) {
    var forwardedRef = _ref.forwardedRef;
    var store = F(Config);
    var state = store.state;
    var ticks = state.ticks;
    var height = 30;
    return v$1("div", {
      ref: forwardedRef,
      style: {
        overflow: 'hidden',
        'padding-right': '18px',
        'background-color': 'white',
        height: height
      }
    }, v$1(Axis, null, v$1("svg", {
      width: state.scrollWidth,
      height: height
    }, v$1("g", {
      transform: "translate(-1, 30)",
      fill: "none",
      "font-size": "10",
      "font-family": "sans-serif",
      "text-anchor": "middle"
    }, v$1("path", {
      class: "domain",
      stroke: "currentColor",
      d: "M0.5,-6V0.5H".concat(state.scrollWidth, ".5V-6")
    }), ticks.map(function (t) {
      return v$1("g", {
        class: "tick",
        opacity: "1",
        transform: "translate(".concat(state.x(t), ",0)")
      }, v$1("line", {
        stroke: "black",
        y2: "-6"
      }), v$1("text", {
        fill: "black",
        y: "-9",
        dy: "0em"
      }, t.format('MMM D')));
    })))));
  };

  var useDebounce = function useDebounce(effect, delay, deps) {
    var callback = A(effect, deps);
    y(function () {
      var handler = setTimeout(function () {
        callback();
      }, delay);
      return function () {
        clearTimeout(handler);
      };
    }, [callback, delay]);
  };

  /**
   * A collection of shims that provide minimal functionality of the ES6 collections.
   *
   * These implementations are not meant to be used outside of the ResizeObserver
   * modules as they cover only a limited range of use cases.
   */
  /* eslint-disable require-jsdoc, valid-jsdoc */
  var MapShim = (function () {
      if (typeof Map !== 'undefined') {
          return Map;
      }
      /**
       * Returns index in provided array that matches the specified key.
       *
       * @param {Array<Array>} arr
       * @param {*} key
       * @returns {number}
       */
      function getIndex(arr, key) {
          var result = -1;
          arr.some(function (entry, index) {
              if (entry[0] === key) {
                  result = index;
                  return true;
              }
              return false;
          });
          return result;
      }
      return /** @class */ (function () {
          function class_1() {
              this.__entries__ = [];
          }
          Object.defineProperty(class_1.prototype, "size", {
              /**
               * @returns {boolean}
               */
              get: function () {
                  return this.__entries__.length;
              },
              enumerable: true,
              configurable: true
          });
          /**
           * @param {*} key
           * @returns {*}
           */
          class_1.prototype.get = function (key) {
              var index = getIndex(this.__entries__, key);
              var entry = this.__entries__[index];
              return entry && entry[1];
          };
          /**
           * @param {*} key
           * @param {*} value
           * @returns {void}
           */
          class_1.prototype.set = function (key, value) {
              var index = getIndex(this.__entries__, key);
              if (~index) {
                  this.__entries__[index][1] = value;
              }
              else {
                  this.__entries__.push([key, value]);
              }
          };
          /**
           * @param {*} key
           * @returns {void}
           */
          class_1.prototype.delete = function (key) {
              var entries = this.__entries__;
              var index = getIndex(entries, key);
              if (~index) {
                  entries.splice(index, 1);
              }
          };
          /**
           * @param {*} key
           * @returns {void}
           */
          class_1.prototype.has = function (key) {
              return !!~getIndex(this.__entries__, key);
          };
          /**
           * @returns {void}
           */
          class_1.prototype.clear = function () {
              this.__entries__.splice(0);
          };
          /**
           * @param {Function} callback
           * @param {*} [ctx=null]
           * @returns {void}
           */
          class_1.prototype.forEach = function (callback, ctx) {
              if (ctx === void 0) { ctx = null; }
              for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                  var entry = _a[_i];
                  callback.call(ctx, entry[1], entry[0]);
              }
          };
          return class_1;
      }());
  })();

  /**
   * Detects whether window and document objects are available in current environment.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

  // Returns global object of a current environment.
  var global$1 = (function () {
      if (typeof global !== 'undefined' && global.Math === Math) {
          return global;
      }
      if (typeof self !== 'undefined' && self.Math === Math) {
          return self;
      }
      if (typeof window !== 'undefined' && window.Math === Math) {
          return window;
      }
      // eslint-disable-next-line no-new-func
      return Function('return this')();
  })();

  /**
   * A shim for the requestAnimationFrame which falls back to the setTimeout if
   * first one is not supported.
   *
   * @returns {number} Requests' identifier.
   */
  var requestAnimationFrame$1 = (function () {
      if (typeof requestAnimationFrame === 'function') {
          // It's required to use a bounded function because IE sometimes throws
          // an "Invalid calling object" error if rAF is invoked without the global
          // object on the left hand side.
          return requestAnimationFrame.bind(global$1);
      }
      return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
  })();

  // Defines minimum timeout before adding a trailing call.
  var trailingTimeout = 2;
  /**
   * Creates a wrapper function which ensures that provided callback will be
   * invoked only once during the specified delay period.
   *
   * @param {Function} callback - Function to be invoked after the delay period.
   * @param {number} delay - Delay after which to invoke callback.
   * @returns {Function}
   */
  function throttle (callback, delay) {
      var leadingCall = false, trailingCall = false, lastCallTime = 0;
      /**
       * Invokes the original callback function and schedules new invocation if
       * the "proxy" was called during current request.
       *
       * @returns {void}
       */
      function resolvePending() {
          if (leadingCall) {
              leadingCall = false;
              callback();
          }
          if (trailingCall) {
              proxy();
          }
      }
      /**
       * Callback invoked after the specified delay. It will further postpone
       * invocation of the original function delegating it to the
       * requestAnimationFrame.
       *
       * @returns {void}
       */
      function timeoutCallback() {
          requestAnimationFrame$1(resolvePending);
      }
      /**
       * Schedules invocation of the original function.
       *
       * @returns {void}
       */
      function proxy() {
          var timeStamp = Date.now();
          if (leadingCall) {
              // Reject immediately following calls.
              if (timeStamp - lastCallTime < trailingTimeout) {
                  return;
              }
              // Schedule new call to be in invoked when the pending one is resolved.
              // This is important for "transitions" which never actually start
              // immediately so there is a chance that we might miss one if change
              // happens amids the pending invocation.
              trailingCall = true;
          }
          else {
              leadingCall = true;
              trailingCall = false;
              setTimeout(timeoutCallback, delay);
          }
          lastCallTime = timeStamp;
      }
      return proxy;
  }

  // Minimum delay before invoking the update of observers.
  var REFRESH_DELAY = 20;
  // A list of substrings of CSS properties used to find transition events that
  // might affect dimensions of observed elements.
  var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
  // Check if MutationObserver is available.
  var mutationObserverSupported = typeof MutationObserver !== 'undefined';
  /**
   * Singleton controller class which handles updates of ResizeObserver instances.
   */
  var ResizeObserverController = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserverController.
       *
       * @private
       */
      function ResizeObserverController() {
          /**
           * Indicates whether DOM listeners have been added.
           *
           * @private {boolean}
           */
          this.connected_ = false;
          /**
           * Tells that controller has subscribed for Mutation Events.
           *
           * @private {boolean}
           */
          this.mutationEventsAdded_ = false;
          /**
           * Keeps reference to the instance of MutationObserver.
           *
           * @private {MutationObserver}
           */
          this.mutationsObserver_ = null;
          /**
           * A list of connected observers.
           *
           * @private {Array<ResizeObserverSPI>}
           */
          this.observers_ = [];
          this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
          this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
      }
      /**
       * Adds observer to observers list.
       *
       * @param {ResizeObserverSPI} observer - Observer to be added.
       * @returns {void}
       */
      ResizeObserverController.prototype.addObserver = function (observer) {
          if (!~this.observers_.indexOf(observer)) {
              this.observers_.push(observer);
          }
          // Add listeners if they haven't been added yet.
          if (!this.connected_) {
              this.connect_();
          }
      };
      /**
       * Removes observer from observers list.
       *
       * @param {ResizeObserverSPI} observer - Observer to be removed.
       * @returns {void}
       */
      ResizeObserverController.prototype.removeObserver = function (observer) {
          var observers = this.observers_;
          var index = observers.indexOf(observer);
          // Remove observer if it's present in registry.
          if (~index) {
              observers.splice(index, 1);
          }
          // Remove listeners if controller has no connected observers.
          if (!observers.length && this.connected_) {
              this.disconnect_();
          }
      };
      /**
       * Invokes the update of observers. It will continue running updates insofar
       * it detects changes.
       *
       * @returns {void}
       */
      ResizeObserverController.prototype.refresh = function () {
          var changesDetected = this.updateObservers_();
          // Continue running updates if changes have been detected as there might
          // be future ones caused by CSS transitions.
          if (changesDetected) {
              this.refresh();
          }
      };
      /**
       * Updates every observer from observers list and notifies them of queued
       * entries.
       *
       * @private
       * @returns {boolean} Returns "true" if any observer has detected changes in
       *      dimensions of it's elements.
       */
      ResizeObserverController.prototype.updateObservers_ = function () {
          // Collect observers that have active observations.
          var activeObservers = this.observers_.filter(function (observer) {
              return observer.gatherActive(), observer.hasActive();
          });
          // Deliver notifications in a separate cycle in order to avoid any
          // collisions between observers, e.g. when multiple instances of
          // ResizeObserver are tracking the same element and the callback of one
          // of them changes content dimensions of the observed target. Sometimes
          // this may result in notifications being blocked for the rest of observers.
          activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
          return activeObservers.length > 0;
      };
      /**
       * Initializes DOM listeners.
       *
       * @private
       * @returns {void}
       */
      ResizeObserverController.prototype.connect_ = function () {
          // Do nothing if running in a non-browser environment or if listeners
          // have been already added.
          if (!isBrowser || this.connected_) {
              return;
          }
          // Subscription to the "Transitionend" event is used as a workaround for
          // delayed transitions. This way it's possible to capture at least the
          // final state of an element.
          document.addEventListener('transitionend', this.onTransitionEnd_);
          window.addEventListener('resize', this.refresh);
          if (mutationObserverSupported) {
              this.mutationsObserver_ = new MutationObserver(this.refresh);
              this.mutationsObserver_.observe(document, {
                  attributes: true,
                  childList: true,
                  characterData: true,
                  subtree: true
              });
          }
          else {
              document.addEventListener('DOMSubtreeModified', this.refresh);
              this.mutationEventsAdded_ = true;
          }
          this.connected_ = true;
      };
      /**
       * Removes DOM listeners.
       *
       * @private
       * @returns {void}
       */
      ResizeObserverController.prototype.disconnect_ = function () {
          // Do nothing if running in a non-browser environment or if listeners
          // have been already removed.
          if (!isBrowser || !this.connected_) {
              return;
          }
          document.removeEventListener('transitionend', this.onTransitionEnd_);
          window.removeEventListener('resize', this.refresh);
          if (this.mutationsObserver_) {
              this.mutationsObserver_.disconnect();
          }
          if (this.mutationEventsAdded_) {
              document.removeEventListener('DOMSubtreeModified', this.refresh);
          }
          this.mutationsObserver_ = null;
          this.mutationEventsAdded_ = false;
          this.connected_ = false;
      };
      /**
       * "Transitionend" event handler.
       *
       * @private
       * @param {TransitionEvent} event
       * @returns {void}
       */
      ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
          var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
          // Detect whether transition may affect dimensions of an element.
          var isReflowProperty = transitionKeys.some(function (key) {
              return !!~propertyName.indexOf(key);
          });
          if (isReflowProperty) {
              this.refresh();
          }
      };
      /**
       * Returns instance of the ResizeObserverController.
       *
       * @returns {ResizeObserverController}
       */
      ResizeObserverController.getInstance = function () {
          if (!this.instance_) {
              this.instance_ = new ResizeObserverController();
          }
          return this.instance_;
      };
      /**
       * Holds reference to the controller's instance.
       *
       * @private {ResizeObserverController}
       */
      ResizeObserverController.instance_ = null;
      return ResizeObserverController;
  }());

  /**
   * Defines non-writable/enumerable properties of the provided target object.
   *
   * @param {Object} target - Object for which to define properties.
   * @param {Object} props - Properties to be defined.
   * @returns {Object} Target object.
   */
  var defineConfigurable = (function (target, props) {
      for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
          var key = _a[_i];
          Object.defineProperty(target, key, {
              value: props[key],
              enumerable: false,
              writable: false,
              configurable: true
          });
      }
      return target;
  });

  /**
   * Returns the global object associated with provided element.
   *
   * @param {Object} target
   * @returns {Object}
   */
  var getWindowOf = (function (target) {
      // Assume that the element is an instance of Node, which means that it
      // has the "ownerDocument" property from which we can retrieve a
      // corresponding global object.
      var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
      // Return the local global object if it's not possible extract one from
      // provided element.
      return ownerGlobal || global$1;
  });

  // Placeholder of an empty content rectangle.
  var emptyRect = createRectInit(0, 0, 0, 0);
  /**
   * Converts provided string to a number.
   *
   * @param {number|string} value
   * @returns {number}
   */
  function toFloat(value) {
      return parseFloat(value) || 0;
  }
  /**
   * Extracts borders size from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @param {...string} positions - Borders positions (top, right, ...)
   * @returns {number}
   */
  function getBordersSize(styles) {
      var positions = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          positions[_i - 1] = arguments[_i];
      }
      return positions.reduce(function (size, position) {
          var value = styles['border-' + position + '-width'];
          return size + toFloat(value);
      }, 0);
  }
  /**
   * Extracts paddings sizes from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @returns {Object} Paddings box.
   */
  function getPaddings(styles) {
      var positions = ['top', 'right', 'bottom', 'left'];
      var paddings = {};
      for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
          var position = positions_1[_i];
          var value = styles['padding-' + position];
          paddings[position] = toFloat(value);
      }
      return paddings;
  }
  /**
   * Calculates content rectangle of provided SVG element.
   *
   * @param {SVGGraphicsElement} target - Element content rectangle of which needs
   *      to be calculated.
   * @returns {DOMRectInit}
   */
  function getSVGContentRect(target) {
      var bbox = target.getBBox();
      return createRectInit(0, 0, bbox.width, bbox.height);
  }
  /**
   * Calculates content rectangle of provided HTMLElement.
   *
   * @param {HTMLElement} target - Element for which to calculate the content rectangle.
   * @returns {DOMRectInit}
   */
  function getHTMLElementContentRect(target) {
      // Client width & height properties can't be
      // used exclusively as they provide rounded values.
      var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
      // By this condition we can catch all non-replaced inline, hidden and
      // detached elements. Though elements with width & height properties less
      // than 0.5 will be discarded as well.
      //
      // Without it we would need to implement separate methods for each of
      // those cases and it's not possible to perform a precise and performance
      // effective test for hidden elements. E.g. even jQuery's ':visible' filter
      // gives wrong results for elements with width & height less than 0.5.
      if (!clientWidth && !clientHeight) {
          return emptyRect;
      }
      var styles = getWindowOf(target).getComputedStyle(target);
      var paddings = getPaddings(styles);
      var horizPad = paddings.left + paddings.right;
      var vertPad = paddings.top + paddings.bottom;
      // Computed styles of width & height are being used because they are the
      // only dimensions available to JS that contain non-rounded values. It could
      // be possible to utilize the getBoundingClientRect if only it's data wasn't
      // affected by CSS transformations let alone paddings, borders and scroll bars.
      var width = toFloat(styles.width), height = toFloat(styles.height);
      // Width & height include paddings and borders when the 'border-box' box
      // model is applied (except for IE).
      if (styles.boxSizing === 'border-box') {
          // Following conditions are required to handle Internet Explorer which
          // doesn't include paddings and borders to computed CSS dimensions.
          //
          // We can say that if CSS dimensions + paddings are equal to the "client"
          // properties then it's either IE, and thus we don't need to subtract
          // anything, or an element merely doesn't have paddings/borders styles.
          if (Math.round(width + horizPad) !== clientWidth) {
              width -= getBordersSize(styles, 'left', 'right') + horizPad;
          }
          if (Math.round(height + vertPad) !== clientHeight) {
              height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
          }
      }
      // Following steps can't be applied to the document's root element as its
      // client[Width/Height] properties represent viewport area of the window.
      // Besides, it's as well not necessary as the <html> itself neither has
      // rendered scroll bars nor it can be clipped.
      if (!isDocumentElement(target)) {
          // In some browsers (only in Firefox, actually) CSS width & height
          // include scroll bars size which can be removed at this step as scroll
          // bars are the only difference between rounded dimensions + paddings
          // and "client" properties, though that is not always true in Chrome.
          var vertScrollbar = Math.round(width + horizPad) - clientWidth;
          var horizScrollbar = Math.round(height + vertPad) - clientHeight;
          // Chrome has a rather weird rounding of "client" properties.
          // E.g. for an element with content width of 314.2px it sometimes gives
          // the client width of 315px and for the width of 314.7px it may give
          // 314px. And it doesn't happen all the time. So just ignore this delta
          // as a non-relevant.
          if (Math.abs(vertScrollbar) !== 1) {
              width -= vertScrollbar;
          }
          if (Math.abs(horizScrollbar) !== 1) {
              height -= horizScrollbar;
          }
      }
      return createRectInit(paddings.left, paddings.top, width, height);
  }
  /**
   * Checks whether provided element is an instance of the SVGGraphicsElement.
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  var isSVGGraphicsElement = (function () {
      // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
      // interface.
      if (typeof SVGGraphicsElement !== 'undefined') {
          return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
      }
      // If it's so, then check that element is at least an instance of the
      // SVGElement and that it has the "getBBox" method.
      // eslint-disable-next-line no-extra-parens
      return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
          typeof target.getBBox === 'function'); };
  })();
  /**
   * Checks whether provided element is a document element (<html>).
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  function isDocumentElement(target) {
      return target === getWindowOf(target).document.documentElement;
  }
  /**
   * Calculates an appropriate content rectangle for provided html or svg element.
   *
   * @param {Element} target - Element content rectangle of which needs to be calculated.
   * @returns {DOMRectInit}
   */
  function getContentRect(target) {
      if (!isBrowser) {
          return emptyRect;
      }
      if (isSVGGraphicsElement(target)) {
          return getSVGContentRect(target);
      }
      return getHTMLElementContentRect(target);
  }
  /**
   * Creates rectangle with an interface of the DOMRectReadOnly.
   * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
   *
   * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
   * @returns {DOMRectReadOnly}
   */
  function createReadOnlyRect(_a) {
      var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
      // If DOMRectReadOnly is available use it as a prototype for the rectangle.
      var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
      var rect = Object.create(Constr.prototype);
      // Rectangle's properties are not writable and non-enumerable.
      defineConfigurable(rect, {
          x: x, y: y, width: width, height: height,
          top: y,
          right: x + width,
          bottom: height + y,
          left: x
      });
      return rect;
  }
  /**
   * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
   * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @param {number} width - Rectangle's width.
   * @param {number} height - Rectangle's height.
   * @returns {DOMRectInit}
   */
  function createRectInit(x, y, width, height) {
      return { x: x, y: y, width: width, height: height };
  }

  /**
   * Class that is responsible for computations of the content rectangle of
   * provided DOM element and for keeping track of it's changes.
   */
  var ResizeObservation = /** @class */ (function () {
      /**
       * Creates an instance of ResizeObservation.
       *
       * @param {Element} target - Element to be observed.
       */
      function ResizeObservation(target) {
          /**
           * Broadcasted width of content rectangle.
           *
           * @type {number}
           */
          this.broadcastWidth = 0;
          /**
           * Broadcasted height of content rectangle.
           *
           * @type {number}
           */
          this.broadcastHeight = 0;
          /**
           * Reference to the last observed content rectangle.
           *
           * @private {DOMRectInit}
           */
          this.contentRect_ = createRectInit(0, 0, 0, 0);
          this.target = target;
      }
      /**
       * Updates content rectangle and tells whether it's width or height properties
       * have changed since the last broadcast.
       *
       * @returns {boolean}
       */
      ResizeObservation.prototype.isActive = function () {
          var rect = getContentRect(this.target);
          this.contentRect_ = rect;
          return (rect.width !== this.broadcastWidth ||
              rect.height !== this.broadcastHeight);
      };
      /**
       * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
       * from the corresponding properties of the last observed content rectangle.
       *
       * @returns {DOMRectInit} Last observed content rectangle.
       */
      ResizeObservation.prototype.broadcastRect = function () {
          var rect = this.contentRect_;
          this.broadcastWidth = rect.width;
          this.broadcastHeight = rect.height;
          return rect;
      };
      return ResizeObservation;
  }());

  var ResizeObserverEntry = /** @class */ (function () {
      /**
       * Creates an instance of ResizeObserverEntry.
       *
       * @param {Element} target - Element that is being observed.
       * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
       */
      function ResizeObserverEntry(target, rectInit) {
          var contentRect = createReadOnlyRect(rectInit);
          // According to the specification following properties are not writable
          // and are also not enumerable in the native implementation.
          //
          // Property accessors are not being used as they'd require to define a
          // private WeakMap storage which may cause memory leaks in browsers that
          // don't support this type of collections.
          defineConfigurable(this, { target: target, contentRect: contentRect });
      }
      return ResizeObserverEntry;
  }());

  var ResizeObserverSPI = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserver.
       *
       * @param {ResizeObserverCallback} callback - Callback function that is invoked
       *      when one of the observed elements changes it's content dimensions.
       * @param {ResizeObserverController} controller - Controller instance which
       *      is responsible for the updates of observer.
       * @param {ResizeObserver} callbackCtx - Reference to the public
       *      ResizeObserver instance which will be passed to callback function.
       */
      function ResizeObserverSPI(callback, controller, callbackCtx) {
          /**
           * Collection of resize observations that have detected changes in dimensions
           * of elements.
           *
           * @private {Array<ResizeObservation>}
           */
          this.activeObservations_ = [];
          /**
           * Registry of the ResizeObservation instances.
           *
           * @private {Map<Element, ResizeObservation>}
           */
          this.observations_ = new MapShim();
          if (typeof callback !== 'function') {
              throw new TypeError('The callback provided as parameter 1 is not a function.');
          }
          this.callback_ = callback;
          this.controller_ = controller;
          this.callbackCtx_ = callbackCtx;
      }
      /**
       * Starts observing provided element.
       *
       * @param {Element} target - Element to be observed.
       * @returns {void}
       */
      ResizeObserverSPI.prototype.observe = function (target) {
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          // Do nothing if current environment doesn't have the Element interface.
          if (typeof Element === 'undefined' || !(Element instanceof Object)) {
              return;
          }
          if (!(target instanceof getWindowOf(target).Element)) {
              throw new TypeError('parameter 1 is not of type "Element".');
          }
          var observations = this.observations_;
          // Do nothing if element is already being observed.
          if (observations.has(target)) {
              return;
          }
          observations.set(target, new ResizeObservation(target));
          this.controller_.addObserver(this);
          // Force the update of observations.
          this.controller_.refresh();
      };
      /**
       * Stops observing provided element.
       *
       * @param {Element} target - Element to stop observing.
       * @returns {void}
       */
      ResizeObserverSPI.prototype.unobserve = function (target) {
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          // Do nothing if current environment doesn't have the Element interface.
          if (typeof Element === 'undefined' || !(Element instanceof Object)) {
              return;
          }
          if (!(target instanceof getWindowOf(target).Element)) {
              throw new TypeError('parameter 1 is not of type "Element".');
          }
          var observations = this.observations_;
          // Do nothing if element is not being observed.
          if (!observations.has(target)) {
              return;
          }
          observations.delete(target);
          if (!observations.size) {
              this.controller_.removeObserver(this);
          }
      };
      /**
       * Stops observing all elements.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.disconnect = function () {
          this.clearActive();
          this.observations_.clear();
          this.controller_.removeObserver(this);
      };
      /**
       * Collects observation instances the associated element of which has changed
       * it's content rectangle.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.gatherActive = function () {
          var _this = this;
          this.clearActive();
          this.observations_.forEach(function (observation) {
              if (observation.isActive()) {
                  _this.activeObservations_.push(observation);
              }
          });
      };
      /**
       * Invokes initial callback function with a list of ResizeObserverEntry
       * instances collected from active resize observations.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.broadcastActive = function () {
          // Do nothing if observer doesn't have active observations.
          if (!this.hasActive()) {
              return;
          }
          var ctx = this.callbackCtx_;
          // Create ResizeObserverEntry instance for every active observation.
          var entries = this.activeObservations_.map(function (observation) {
              return new ResizeObserverEntry(observation.target, observation.broadcastRect());
          });
          this.callback_.call(ctx, entries, ctx);
          this.clearActive();
      };
      /**
       * Clears the collection of active observations.
       *
       * @returns {void}
       */
      ResizeObserverSPI.prototype.clearActive = function () {
          this.activeObservations_.splice(0);
      };
      /**
       * Tells whether observer has active observations.
       *
       * @returns {boolean}
       */
      ResizeObserverSPI.prototype.hasActive = function () {
          return this.activeObservations_.length > 0;
      };
      return ResizeObserverSPI;
  }());

  // Registry of internal observers. If WeakMap is not available use current shim
  // for the Map collection as it has all required methods and because WeakMap
  // can't be fully polyfilled anyway.
  var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
  /**
   * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
   * exposing only those methods and properties that are defined in the spec.
   */
  var ResizeObserver = /** @class */ (function () {
      /**
       * Creates a new instance of ResizeObserver.
       *
       * @param {ResizeObserverCallback} callback - Callback that is invoked when
       *      dimensions of the observed elements change.
       */
      function ResizeObserver(callback) {
          if (!(this instanceof ResizeObserver)) {
              throw new TypeError('Cannot call a class as a function.');
          }
          if (!arguments.length) {
              throw new TypeError('1 argument required, but only 0 present.');
          }
          var controller = ResizeObserverController.getInstance();
          var observer = new ResizeObserverSPI(callback, controller, this);
          observers.set(this, observer);
      }
      return ResizeObserver;
  }());
  // Expose public methods of ResizeObserver.
  [
      'observe',
      'unobserve',
      'disconnect'
  ].forEach(function (method) {
      ResizeObserver.prototype[method] = function () {
          var _a;
          return (_a = observers.get(this))[method].apply(_a, arguments);
      };
  });

  var index = (function () {
      // Export existing implementation if available.
      if (typeof global$1.ResizeObserver !== 'undefined') {
          return global$1.ResizeObserver;
      }
      return ResizeObserver;
  })();

  var useResizeObserver = function useResizeObserver(elRef) {
    var _useState = l(0),
        _useState2 = _slicedToArray(_useState, 2),
        width = _useState2[0],
        setWidth = _useState2[1];

    var observer = s(new index(function (entries) {
      var width = entries[0].contentRect.width;
      setWidth(width);
    }));
    y(function () {
      if (elRef.current) {
        observer.current.observe(elRef.current);
      }

      return function () {
        observer.current.unobserve(elRef.current);
      };
    }, [elRef, observer]);
    return width;
  };

  function View(_ref) {
    var data = _ref.data,
        config = _ref.config;

    var _useReducer = p(reducer, DEFAULT_STATE),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        state = _useReducer2[0],
        dispatch = _useReducer2[1];

    var store = {
      state: state,
      dispatch: dispatch
    };
    var bodyRef = s(null);
    var leftRef = s(null);
    var gridRef = s(null);
    var headerRef = s(null);
    var columnsRef = s([]);
    var width = useResizeObserver(bodyRef);
    useDebounce(function () {
      if (leftRef.current == null) {
        return;
      } // subtract padding + columns width


      dispatch(setWidth(width - (leftRef.current.clientWidth + 18)));
    }, 150, [width, leftRef]);
    y(function () {
      if (headerRef.current == null || gridRef.current == null) return;
      var scroll = gridRef.current.addEventListener('scroll', function (e) {
        headerRef.current.scrollLeft = e.target.scrollLeft;
        columnsRef.current.forEach(function (ref) {
          return ref.scrollTop = e.target.scrollTop;
        });
      });
      return function () {
        return gridRef.current.removeEventListener('scroll', scroll);
      };
    }, [headerRef, gridRef]);
    useProcessData(dispatch, data, config);
    var columns = config.columns || [];
    return v$1(Config.Provider, {
      value: store
    }, v$1("div", {
      ref: bodyRef,
      style: {
        width: '100%',
        height: '100vh',
        maxHeight: store.state.height,
        'display': 'flex',
        'flex-direction': 'row',
        'align-items': 'stretch',
        overflow: 'hidden',
        'background-color': 'white'
      }
    }, v$1("div", {
      ref: leftRef,
      style: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        flexShrink: 0
      }
    }, columns.map(function (c, idx) {
      return v$1(Column, {
        gridRef: gridRef,
        forwardedRef: function forwardedRef(dom) {
          return columnsRef.current[idx] = dom;
        },
        column: c,
        idx: idx
      });
    })), v$1("div", {
      style: {
        display: 'flex',
        'flex': '1 1 0%',
        'overflow': 'hidden'
      }
    }, v$1("div", {
      className: "column-border",
      style: {
        overflow: 'hidden',
        borderRight: '1px solid #000',
        position: 'relative'
      }
    }), v$1("div", {
      style: {
        position: 'relative',
        flex: '1 1 0%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        overflow: 'hidden'
      }
    }, v$1(Header, {
      forwardedRef: headerRef
    }), v$1(Grid, {
      forwardedRef: gridRef
    })))));
  }

  var minMax = createCommonjsModule(function (module, exports) {
  !function(e,n){module.exports=n();}(commonjsGlobal,(function(){return function(e,n,t){var i=function(e,n){if(!n||!n.length||!n[0]||1===n.length&&!n[0].length)return null;var t;1===n.length&&n[0].length>0&&(n=n[0]);t=n[0];for(var i=1;i<n.length;i+=1)n[i].isValid()&&!n[i][e](t)||(t=n[i]);return t};t.max=function(){var e=[].slice.call(arguments,0);return i("isAfter",e)},t.min=function(){var e=[].slice.call(arguments,0);return i("isBefore",e)};}}));
  });

  var customParseFormat = createCommonjsModule(function (module, exports) {
  !function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},e=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,r=/\d\d?/,i=/\d*[^\s\d-_:/()]+/,o={},s=function(t){return (t=+t)+(t>68?1900:2e3)};var a=function(t){return function(e){this[t]=+e;}},f=[/[+-]\d\d:?(\d\d)?|Z/,function(t){(this.zone||(this.zone={})).offset=function(t){if(!t)return 0;if("Z"===t)return 0;var e=t.match(/([+-]|\d\d)/g),n=60*e[1]+(+e[2]||0);return 0===n?0:"+"===e[0]?-n:n}(t);}],u=function(t){var e=o[t];return e&&(e.indexOf?e:e.s.concat(e.f))},h=function(t,e){var n,r=o.meridiem;if(r){for(var i=1;i<=24;i+=1)if(t.indexOf(r(i,0,e))>-1){n=i>12;break}}else n=t===(e?"pm":"PM");return n},d={A:[i,function(t){this.afternoon=h(t,!1);}],a:[i,function(t){this.afternoon=h(t,!0);}],S:[/\d/,function(t){this.milliseconds=100*+t;}],SS:[n,function(t){this.milliseconds=10*+t;}],SSS:[/\d{3}/,function(t){this.milliseconds=+t;}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[n,a("day")],Do:[i,function(t){var e=o.ordinal,n=t.match(/\d+/);if(this.day=n[0],e)for(var r=1;r<=31;r+=1)e(r).replace(/\[|\]/g,"")===t&&(this.day=r);}],M:[r,a("month")],MM:[n,a("month")],MMM:[i,function(t){var e=u("months"),n=(u("monthsShort")||e.map((function(t){return t.substr(0,3)}))).indexOf(t)+1;if(n<1)throw new Error;this.month=n%12||n;}],MMMM:[i,function(t){var e=u("months").indexOf(t)+1;if(e<1)throw new Error;this.month=e%12||e;}],Y:[/[+-]?\d+/,a("year")],YY:[n,function(t){this.year=s(t);}],YYYY:[/\d{4}/,a("year")],Z:f,ZZ:f};function c(n){var r,i;r=n,i=o&&o.formats;for(var s=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,n,r){var o=r&&r.toUpperCase();return n||i[r]||t[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}))).match(e),a=s.length,f=0;f<a;f+=1){var u=s[f],h=d[u],c=h&&h[0],l=h&&h[1];s[f]=l?{regex:c,parser:l}:u.replace(/^\[|\]$/g,"");}return function(t){for(var e={},n=0,r=0;n<a;n+=1){var i=s[n];if("string"==typeof i)r+=i.length;else {var o=i.regex,f=i.parser,u=t.substr(r),h=o.exec(u)[0];f.call(e,h),t=t.replace(h,"");}}return function(t){var e=t.afternoon;if(void 0!==e){var n=t.hours;e?n<12&&(t.hours+=12):12===n&&(t.hours=0),delete t.afternoon;}}(e),e}}return function(t,e,n){n.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(s=t.parseTwoDigitYear);var r=e.prototype,i=r.parse;r.parse=function(t){var e=t.date,r=t.utc,s=t.args;this.$u=r;var a=s[1];if("string"==typeof a){var f=!0===s[2],u=!0===s[3],h=f||u,d=s[2];u&&(d=s[2]),o=this.$locale(),!f&&d&&(o=n.Ls[d]),this.$d=function(t,e,n){try{if(["x","X"].indexOf(e)>-1)return new Date(("X"===e?1e3:1)*t);var r=c(e)(t),i=r.year,o=r.month,s=r.day,a=r.hours,f=r.minutes,u=r.seconds,h=r.milliseconds,d=r.zone,l=new Date,m=s||(i||o?1:l.getDate()),M=i||l.getFullYear(),Y=0;i&&!o||(Y=o>0?o-1:l.getMonth());var p=a||0,v=f||0,D=u||0,g=h||0;return d?new Date(Date.UTC(M,Y,m,p,v,D,g+60*d.offset*1e3)):n?new Date(Date.UTC(M,Y,m,p,v,D,g)):new Date(M,Y,m,p,v,D,g)}catch(t){return new Date("")}}(e,a,r),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),h&&e!=this.format(a)&&(this.$d=new Date("")),o={};}else if(a instanceof Array)for(var l=a.length,m=1;m<=l;m+=1){s[1]=a[m-1];var M=n.apply(this,s);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}m===l&&(this.$d=new Date(""));}else i.call(this,t);};}}));
  });

  var Timeline = /*#__PURE__*/function () {
    function Timeline(id, data, config) {
      _classCallCheck(this, Timeline);

      dayjs_min.extend(minMax);
      dayjs_min.extend(customParseFormat);
      this.config = config || {};

      if (id.indexOf('.') === 0) ; else {
        this.target = document.getElementById(id);
      }

      this.updateData(data);
    }

    _createClass(Timeline, [{
      key: "forceRender",
      value: function forceRender() {
        S(null, this.target);
        S(v$1(View, {
          data: this.data,
          config: this.config
        }), this.target);
      }
    }, {
      key: "updateConfig",
      value: function updateConfig(config) {
        this.config = config || {};
        this.forceRender();
      }
    }, {
      key: "updateData",
      value: function updateData(data) {
        this.data = data;
        this.forceRender();
      }
    }, {
      key: "update",
      value: function update(data, config) {
        this.config = config || {};
        this.data = data;
        this.forceRender();
      }
    }]);

    return Timeline;
  }();

  return Timeline;

})();
//# sourceMappingURL=timeline.js.map
