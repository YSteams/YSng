/*! Sea.js 2.1.0 | seajs.org/LICENSE.md
//# sourceMappingURL=sea.js.map
*/(function(t,u){function v(b){return function(c){return Object.prototype.toString.call(c)==="[object "+b+"]"}}function S(){return w++}function J(b,c){var a;a=b.charAt(0);if(T.test(b))a=b;else if("."===a){a=(c?c.match(F)[0]:h.cwd)+b;for(a=a.replace(U,"/");a.match(K);)a=a.replace(K,"/")}else a="/"===a?(a=h.cwd.match(V))?a[0]+b.substring(1):b:h.base+b;return a}function L(b,c){if(!b)return"";var a=b,d=h.alias,a=b=d&&G(d[a])?d[a]:a,d=h.paths,f;if(d&&(f=a.match(W))&&G(d[f[1]]))a=d[f[1]]+f[2];f=a;var p=h.vars;
p&&-1<f.indexOf("{")&&(f=f.replace(X,function(a,b){return G(p[b])?p[b]:a}));a=f.length-1;b="#"===f.charAt(a)?f.substring(0,a):".js"===f.substring(a-2)||0<f.indexOf("?")||".css"===f.substring(a-3)?f:f+".js";f=J(b,c);var a=h.map,e=f;if(a)for(var d=0,g=a.length;d<g&&!(e=a[d],e=x(e)?e(f)||f:f.replace(e[0],e[1]),e!==f);d++);return e}function M(b,c){var a=b.sheet,d;if(N)a&&(d=!0);else if(a)try{a.cssRules&&(d=!0)}catch(f){"NS_ERROR_DOM_SECURITY_ERR"===f.name&&(d=!0)}setTimeout(function(){d?c():M(b,c)},20)}
function Y(){if(y)return y;if(z&&"interactive"===z.readyState)return z;for(var b=s.getElementsByTagName("script"),c=b.length-1;0<=c;c--){var a=b[c];if("interactive"===a.readyState)return z=a}}function e(b,c){this.uri=b;this.dependencies=c||[];this.exports=null;this.status=0;this._waitings={};this._remain=0}function A(b,c){var a={id:b,refUri:c};l("resolve",a);return a.uri||L(a.id,c)}function O(b,c){var a=e.get(b);a.status<j.SAVED&&(a.id=c.id||b,a.dependencies=c.deps||[],a.factory=c.factory,a.status=
j.SAVED)}if(!t.seajs){var g=t.seajs={version:"2.1.0"},h=g.data={},Z=v("Object"),G=v("String"),B=Array.isArray||v("Array"),x=v("Function"),w=0,q=h.events={};g.on=function(b,c){(q[b]||(q[b]=[])).push(c);return g};g.off=function(b,c){if(!b&&!c)return q=h.events={},g;var a=q[b];if(a)if(c)for(var d=a.length-1;0<=d;d--)a[d]===c&&a.splice(d,1);else delete q[b];return g};var l=g.emit=function(b,c){var a=q[b],d;if(a)for(a=a.slice();d=a.shift();)d(c);return g},F=/[^?#]*\//,U=/\/\.\//g,K=/\/[^/]+\/\.\.\//,W=
/^([^/:]+)(\/.+)$/,X=/{([^{]+)}/g,T=/^\/\/.|:\//,V=/^.*?\/\/.*?\//,m=document,r=location,C=r.href.match(F)[0],k=m.getElementsByTagName("script"),k=m.getElementById("seajsnode")||k[k.length-1],k=((k.hasAttribute?k.src:k.getAttribute("src",4))||C).match(F)[0],s=m.getElementsByTagName("head")[0]||m.documentElement,P=s.getElementsByTagName("base")[0],Q=/\.css(?:\?|$)/i,$=/^(?:loaded|complete|undefined)$/,y,z,N=536>1*navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/,"$1"),aa=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
ba=/\\\\/g,n=g.cache={},D,H={},I={},E={},j=e.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};e.prototype.resolve=function(){for(var b=this.dependencies,c=[],a=0,d=b.length;a<d;a++)c[a]=A(b[a],this.uri);return c};e.prototype.load=function(){if(!(this.status>=j.LOADING)){this.status=j.LOADING;var b=this.resolve();l("load",b);for(var c=this._remain=b.length,a,d=0;d<c;d++)a=e.get(b[d]),a.status<j.LOADED?a._waitings[this.uri]=(a._waitings[this.uri]||0)+1:this._remain--;if(0===this._remain)this.onload();
else{for(var f={},d=0;d<c;d++)a=n[b[d]],a.status<j.FETCHING?a.fetch(f):a.status===j.SAVED&&a.load();for(var p in f)if(f.hasOwnProperty(p))f[p]()}}};e.prototype.onload=function(){this.status=j.LOADED;this.callback&&this.callback();var b=this._waitings,c,a;for(c in b)if(b.hasOwnProperty(c)&&(a=n[c],a._remain-=b[c],0===a._remain))a.onload();delete this._waitings;delete this._remain};e.prototype.fetch=function(b){function c(){var a=f.requestUri,b=f.onRequest,c=f.charset,d=Q.test(a),e=m.createElement(d?
"link":"script");if(c&&(c=x(c)?c(a):c))e.charset=c;var g=e;d&&(N||!("onload"in g))?setTimeout(function(){M(g,b)},1):g.onload=g.onerror=g.onreadystatechange=function(){$.test(g.readyState)&&(g.onload=g.onerror=g.onreadystatechange=null,!d&&!h.debug&&s.removeChild(g),g=null,b())};d?(e.rel="stylesheet",e.href=a):(e.async=!0,e.src=a);y=e;P?s.insertBefore(e,P):s.appendChild(e);y=null}function a(){delete H[e];I[e]=!0;D&&(O(d,D),D=null);var a,b=E[e];for(delete E[e];a=b.shift();)a.load()}var d=this.uri;this.status=
j.FETCHING;var f={uri:d};l("fetch",f);var e=f.requestUri||d;!e||I[e]?this.load():H[e]?E[e].push(this):(H[e]=!0,E[e]=[this],l("request",f={uri:d,requestUri:e,onRequest:a,charset:h.charset}),f.requested||(b?b[f.requestUri]=c:c()))};e.prototype.exec=function(){function b(a){return n[b.resolve(a)].exec()}if(this.status>=j.EXECUTING)return this.exports;this.status=j.EXECUTING;var c=this.uri;b.resolve=function(a){return A(a,c)};b.async=function(a,f){e.use(a,f,c+"_async_"+w++);return b};var a=this.factory,
a=x(a)?a(b,this.exports={},this):a;a===u&&(a=this.exports);null===a&&!Q.test(c)&&l("error",this);delete this.factory;this.exports=a;this.status=j.EXECUTED;l("exec",this);return a};e.define=function(b,c,a){var d=arguments.length;1===d?(a=b,b=u):2===d&&(a=c,B(b)?(c=b,b=u):c=u);if(!B(c)&&x(a)){var e=[];a.toString().replace(ba,"").replace(aa,function(a,b,c){c&&e.push(c)});c=e}d={id:b,uri:A(b),deps:c,factory:a};if(!d.uri&&m.attachEvent){var g=Y();g&&(d.uri=g.src)}l("define",d);d.uri?O(d.uri,d):D=d};e.get=
function(b,c){return n[b]||(n[b]=new e(b,c))};e.use=function(b,c,a){var d=e.get(a,B(b)?b:[b]);d.callback=function(){for(var a=[],b=d.resolve(),e=0,g=b.length;e<g;e++)a[e]=n[b[e]].exec();c&&c.apply(t,a);delete d.callback};d.load()};e.preload=function(b){var c=h.preload,a=c.length;a?e.use(c,function(){c.splice(0,a);e.preload(b)},h.cwd+"_preload_"+w++):b()};g.use=function(b,c){e.preload(function(){e.use(b,c,h.cwd+"_use_"+w++)});return g};e.define.cmd={};t.define=e.define;g.Module=e;h.fetchedList=I;h.cid=
S;g.resolve=L;g.require=function(b){return(n[A(b)]||{}).exports};h.base=(k.match(/^(.+?\/)(\?\?)?(seajs\/)+/)||["",k])[1];h.dir=k;h.cwd=C;h.charset="utf-8";var C=h,R=[],r=r.search.replace(/(seajs-\w+)(&|$)/g,"$1=1$2"),r=r+(" "+m.cookie);r.replace(/(seajs-\w+)=1/g,function(b,c){R.push(c)});C.preload=R;g.config=function(b){for(var c in b){var a=b[c],d=h[c];if(d&&Z(d))for(var e in a)d[e]=a[e];else B(d)?a=d.concat(a):"base"===c&&("/"===a.slice(-1)||(a+="/"),a=J(a)),h[c]=a}l("config",b);return g}}})(this);
(function(window, undefined) {
function run(fun){typeof(fun) == "function"?fun():'';} 
var YS = function(pname,fun,skin,lang) { 
var u = {
//只需要引入js
'moves':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''}, 
'labelauty':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''}, 
'goup':{t:'j','ver':'0.5.1/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'jQMeter':{t:'j','ver':'0.1.2/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'easing':{t:'j','ver':'1.3.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'mixitup':{t:'j','ver':'1.4.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'filters':{t:'j','ver':'1.3/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'knob':{t:'j','ver':'1.1.2/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'waterbubble':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'tabso':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'qrcode':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'form':{t:'j','ver':'3.51.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'ZeroClipboard':{t:'j','ver':'2.1.6/','css':"",'p':'','j1':'','j2':'','j3':''},
'circliful':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'jqbar':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'tableExport':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'moment':{t:'j','ver':'2.10.6/','css':"",'p':'','j1':'','j2':'','j3':''},
'getLodop':{t:'j','ver':'6.1/','css':"",'p':'','j1':'','j2':'','j3':''},
'bootstrap':{t:'j','ver':'3.2.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'UItoTop':{t:'j','ver':'1.2/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'slide':{t:'j','ver':'2.1.1/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'laydate':{t:'j','ver':'1.1/','css':"",'p':'','j1':'','j2':'','j3':''},
'TouchSlide':{t:'j','ver':'1.1/','css':"",'p':'','j1':'','j2':'','j3':''}, 
'printarea':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''}, //打印
'validate':{t:'j','ver':'1.14/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'html2canvas':{t:'j','ver':'0.5.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'slimScroll':{t:'j','ver':'1.3.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'qqface':{t:'j','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'transformFromWGSToGCJ':{t:'j','ver':'1.0.0/','css':"",'p':'','j1':'','j2':'','j3':''},//高德地图纠偏 
'amazeui':{t:'j','ver':'2.7.2/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},

//只需要引入js、css
'layer':{t:'jc','ver':'3.0/','css':"skin/",'p':'','j1':'','j2':'','j3':''},
'cropper':{t:'jc','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'wangEditor':{t:'jc','ver':'2.1.4/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'webuploader':{t:'jc','ver':'0.1.5/','css':"",'p':'','j1':'','j2':'','j3':''},
'pwstabs':{t:'jc','ver':'1.2.1/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'fullpage':{t:'jc','ver':'2.7.1/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'bsdatetimepicker':{t:'jc','ver':'1.0/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'jqdatetimepicker':{t:'jc','ver':'2.1.9/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'laypage':{t:'jc','ver':'1.3/','css':"skin/",'p':'','j1':'','j2':'','j3':''},
'toastr':{t:'jc','ver':'2.0.3/','css':"",'p':'jquery/','j1':'','j2':'','j3':''},
'mlayer':{t:'jc','ver':'2.0/','css':"need/",'p':'/','j1':'','j2':'','j3':''},
'shCircleLoader':{t:'jc','ver':'0.2/','css':"/",'p':'jquery/','j1':'','j2':'','j3':''},
//只需要引入js1、js
'erweima':{t:'j1j','ver':'1.0/','css':"",'p':'jquery/','j1':'qrcode','j2':'','j3':''}, //?
//只需要引入js、css、js
'selectpicker':{t:'jcj1','ver':'1.10.1/','css':"",'p':'jquery/','j1':'bootstrap','j2':'','j3':''},
'jScrollPane':{t:'jcj1','ver':'2.0/','css':"",'p':'jquery/','j1':'mousewheel','j2':'','j3':''},
'highcharts':{t:'jcj1','ver':'4.2.4/','css':"",'p':'jquery/','j1':'exporting','j2':'','j3':''}, 
'highcharts3d':{t:'jcj1','ver':'4.2.4/','css':"",'p':'jquery/','j1':'exporting','j2':'','j3':''},
'highchartsmore':{t:'jcj1','ver':'4.2.4/','css':"",'p':'jquery/','j1':'exporting','j2':'','j3':''},
'mmGrid':{t:'jcj1','ver':'1.0/','css':"",'p':'jquery/','j1':'mmPaginator','j2':'','j3':''},
'zyUpload':{t:'j1cj','ver':'1.0/','css':"",'p':'jquery/','j1':'zyFile','j2':'','j3':''},
'mmGrid':{t:'jcj1','ver':'1.0/','css':"",'p':'jquery/','j1':'mmPaginator','j2':'','j3':''},
//只需要引入js、css、js1、js2
'bootstrapTable':{t:'jcj1j2j3','ver':'1.10.1/','css':"",'p':'jquery/','j1':'editableTableWidget','j2':'bootstrapTableexport','j3':'tableExport'},
//只需要引入js、js1、js2
'ueditor':{t:'j1j2j','ver':'1.4.3/','css':"",'p':'','j1':'ueditor.config','j2':'lang/zh-cn/zh-cn','j3':''},
'city':{t:'j1j2j','ver':'1.0/','css':"",'p':'','j1':'Popt','j2':'citySet','j3':''},
//先引入j1 c，js
'fullCalendar':{t:'j1cj','ver':'2.6.1/','css':"",'p':'jquery/','j1':'moment','j2':'','j3':''},
'validationEngine':{t:'j1cj','ver':'2.6.2/','css':"",'p':'jquery/','j1':'validationEngine-zh_CN','j2':'','j3':''},
//带JS皮肤参数
'echarts':{t:'jskin','ver':'3.1.6/','css':"",'p':'','j1':'','j2':'','j3':''},
//带css皮肤参数
};
var Y ='';
var bu = Y+u[pname].p+pname+'/'+u[pname].ver;
var jsurl = bu+pname+'.js'; 
var cssurl = bu+u[pname].css+pname+'.css'; 
var j1url = bu+u[pname].j1+'.js';
var j2url = bu+u[pname].j2+'.js';
var j3url = bu+u[pname].j3+'.js';
var skinjs = bu+skin+'.js';
var skincss = bu+u[pname].css+skin+'/'+pname+'.css';
switch(u[pname].t){
case 'j': 
seajs.use([jsurl],function(){run(fun)});
  break;
case 'jc':
seajs.use([jsurl,cssurl], function(){run(fun)});
  break;
case 'jj1':  
seajs.use([jsurl], function(){seajs.use([j1url],function(){run(fun)})});
  break;
case 'j1j': 
seajs.use([j1url], function(){seajs.use([jsurl],function(){run(fun)})});
  break;
case 'jcj1':   
seajs.use([jsurl,cssurl], function(){seajs.use([j1url],function(){run(fun)})});
  break;
case 'j1cj': 
seajs.use([j1url,cssurl], function(){seajs.use([jsurl],function(){run(fun)})});
  break;
case 'jj1j2': 
seajs.use([jsurl], function(){seajs.use([j1url,j2url],function(){run(fun)})});
  break;
case 'j1j2j': 
seajs.use([j1url,jsurl], function(){seajs.use([j2url],function(){run(fun)})});
  break;
case 'jcj1j2': 
seajs.use([jsurl,cssurl], function(){seajs.use([j1url,j2url],function(){run(fun)})});
  break;
case 'jcj1j2j3': 
seajs.use([jsurl,cssurl], function(){seajs.use([j1url,j2url,j3url],function(){run(fun)})});
  break;  
case 'j1j2jc': 
seajs.use([j1url,j2url,cssurl], function(){seajs.use([jsurl],function(){run(fun)})});
  break; 
case 'jskin': 
  seajs.use([jsurl], function(){skin?seajs.use([skinjs],function(){run(fun)}):run(fun);})
  break;}  
   }
window.YS = YS;
return YS;
})(window);
 
 