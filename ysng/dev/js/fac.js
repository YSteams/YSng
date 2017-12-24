/*! YS v1.0.0 | by YSTeam | Copyright (c) 2013-2017 http://www.ysframe.com All rights reserved. | Licensed under MIT | 2017-12-22T12:00:00+0800 */ 
// 公共方法函数
(function(window, undefined) {
 var YSfac = {
//把地址栏的参数转成对象  a=1&c=3 > {a:1,c:3}
hashToobj:function(str){
var obj = {};
if(!str)return obj;
    if(str.indexOf('&')>0){
      var arr = str.split('&'); 
      arr.map(function(el){
          var t = el.split('=');
          var a = t.length>1?obj[t[0]] = t[1]:'';
      });  
    }else{ 
          var t = str.split('=');
          var a = t.length>1?obj[t[0]] = t[1]:'';     
    } 
return obj;
}, 
time:function(str){
//返回时间戳；str 为空则返回当前时间戳；
var timestamp = !str?Date.parse(new Date()):Date.parse(new Date(str)); 
return timestamp; 
},
load:function(num){ 
  var a = num?$('#loader').fadeIn(100):$('#loader').fadeOut(1000); 
}, 
 fetdata:function(sco,key){ 
var url,path,page,load,method = ''; 
  // 开启调试模式关闭调试模式
 url = sco.conf.debug?sco.conf.jsonpath:sco.conf.rooturl;  
path = (sco[key]&&sco[key].url)||(sco.conf[key]&&sco.conf[key].url);
if(!path){console.log(key+'未配置路径信息，可conf中配置或者给sco.'+key+'.url赋值路径');return false;}
url += path + (sco.conf.debug&&'.json'); 
load = (sco[key]&&sco[key].load)||(sco.conf[key]&&sco.conf[key].load);
page = (sco[key]&&sco[key].page)||(sco.conf[key]&&sco.conf[key].page);
method = (sco[key]&&sco[key].method)||(sco.conf[key]&&sco.conf[key].method);
method = sco.conf.debug?'GET':method;


   //运行前 ，执行的函数；
   if(typeof(sco[key].before)==="function"){var v = sco[key].before(sco); if(v===false){return false;} }
   if(load){YSfac.load(1);}  
   //执行请求
   var scon ={method:method, 
              url: url,
              headers: {'Content-Type':'application/x-www-form-urlencoded'}};
          method=='GET'?scon.params=(sco[key].params||{}):scon.data=sco[key].params||{};  
   sco.$http(scon).success(function (re) {
    //调试模式打印路径信息
    sco.conf.console?console.log('接口调试信息，url:'+url,'参数params:',sco[key].params,'返回re:',re):'';                        
              sco[key].data = {};
              if(re.code==1){
                sco[key].data = re.data;

                //接口如果需要分页的话，会调用
                page&&YS('laypage',function(){  
                  var id ='#' + key;
                  if($(id).length==0){console.log('未设置分页的id="'+key+'"的div容器');return false;}
                   
                      laypage({
                        cont: key, //容器。值支持id名、原生dom对象，jquery对象,
                        pages: re.data.pages, //总页数
                        skin: 'molv', //皮肤
                        first: 1, //将首页显示为数字1,。若不显示，设置false即可
                        //last: 11, 将尾页显示为总页数。若不显示，设置false即可
                        curr: sco[key].params.curPage || 1, //当前页
                        prev: '<', //若不显示，设置false即可
                        next: '>', //若不显示，设置false即可
                        jump: function(obj, first){ //触发分页后的回调
                                    if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                              sco[key].params.curPage = obj.curr;
                              sco.fetch(key);
                              sco.$apply();
                                    }
                                } 
                      });
                    }) 
              }
              //运行后拿到数据，执行函数
             if(typeof(sco[key].done)==="function"){sco[key].done(re,sco);} 
             if(load){YSfac.load(0);} 
    }).
    error(function (re) { 
      sco.conf.console?console.log('模块：'+key+'的接口'+url,'参数params:',sco[key].params,'返回err:',re):'';  
         YS('layer',function(){layer.msg('模块：'+key+'的接口'+url+'网络超时！',{icon:0,time: 2000});});
    }); 
 },
setstore:function(key,value){
value = typeof(value) ==='object'?JSON.stringify(value):value;
localStorage.setItem(key,value);
 return true;
},
getstore:function(key){
      var tem = '';
      try {tem = localStorage.getItem(key);
      tem = JSON.parse(tem); 
      }catch(e){tem = localStorage.getItem(key);}
      return tem; 
},
unsetstore:function(key){ localStorage.removeItem(key); return true;},
setCookie:function(name,value){
         //写cookies 
    var d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
    },
getCookie:function(cname){
         //读取cookies 
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
    },
delCookie:function(name){ 
        //删除cookies 
        f.setCookie(name, "", -1);  
    },

};
window.YSfac = YSfac;
return YSfac;
})(window);
