/*! YS v1.0.0 | by YSTeam | Copyright (c) 2013-2017 http://www.ysframe.com All rights reserved. | Licensed under MIT | 2017-12-22T12:00:00+0800 */ 
(function(window, undefined) {
//配置项 ============================================================================ 
var conf = {
  rooturl:'meizi.lc/',//网站根目录
  tplpath:'./html',  //每个模块的静态页面存放路径
  index:"./html/pageone.html",//默认include进来的模板
  jsonpath:'./json/',//约定json路径
  debug:true,//开发模式，会所有的请求为get方法，并请求本地json;
  console:true,//ture开启，则打印一些YS提示错误信息，false关闭,不打印YS的提示信息; 
  subfix:['a','b'], //约定数据容器的后缀；
};


$scope.com_lista = {
    params:{},  //传给后端的参数放这里
    data:[],  //后端返回数据放这里
    before:function(sco){},  //传之前进行处理，return false；可以终止提交.sco是ctrl控制器的$scope;
    done:function(re,sco){} //后端返回re；sco是ctrl控制器的$scope;
  };

//业务逻辑块 ============================================================================
var main = { 
  ctrl_init:function(sco) {// 主控制器初始化 
     sco.com_lista.url = 'Open/prov';//调用公共业务：获取省份
     sco.fetch('com_lista');
     sco.com_lista.done = function(re,sco){          
          sco.fetch('com_listb'); //调用公共业务：获取城市 
     }

     sco.com_listb.url = 'Open/city'; //调用公共业务：获取城市 
     sco.com_listb.params = {pid:17};  
  }, 
  city:function(sco) { //城市管理模块 
      sco.YS_obja.url = 'Index/edit_template';//业务：设定采集，温度
  }, 
  mattertpl:function(sco) { //原材管理模块 
     sco.YS_plista.url = 'Index/system_mattertpl_list';
     sco.fetch('YS_plista');

     sco.com_add.url = 'Auth/comadd';//设置新增原材的路径
     sco.com_add.url = 'Auth/comdel';//设置新增原材的路径
  },
  tongbiao:function(sco) { //省同表管理模块   
     sco.YS_lista.url = 'Index/major_select';//专业列表
     sco.fetch('YS_lista');

     sco.YS_obja.url = 'Index/major_add';//新增专业

     sco.YS_listb.url = 'Index/archive_select';//资料列表 
     sco.fetch('YS_listb');
     
     sco.YS_objb.url = 'Index/archive_add';//新增资料 
  },
  weather:function(sco) { //温度管理模块 
     sco.YS_plista.url = 'Index/service_weather_list'; //设置天气列表url 
  },
  userlist:function(sco) {//用户管理模块 
     sco.YS_plista.url = 'Index/operate_user_list';//获取用户列表 
     sco.fetch('YS_plista');
      
     sco.YS_plistb.page = true;  
     sco.YS_plistb.url = 'Index/operate_login_list'; //登陆日志   
        
     sco.YS_lista.url = 'Index/loginStatistic'; //汇总登陆 
  },
  programcount:function(sco) {          
     sco.YS_plista.url = 'Index/operate_pro_list';//项目列表
     sco.fetch('YS_plista');
  }
}; 
//初始化控制器 ============================================================================
var app = angular.module("app", []);
//过滤html 
app.filter("htmlfil",["$sce",function($sce){ 
  return function(text){ return $sce.trustAsHtml(text);};
}]);  
app.controller('ctrl', ['$scope','$http',function($scope,$http){ 
//初始化
$scope.conf = conf;
$scope.main = main;  
$scope.$http = $http;
$scope.value = {};//备用与增加或者编辑
$scope.ystab = 0; //定义tab切换变量
//存放 html路径,模块路径，hash参数对象
$scope.hrefinfo = {url:'',path:'',hashobj:{}};   
//初始化公共
$scope.com_del = {params:{},data:{}};//公共删除
$scope.com_add = {params:{},data:{}};//公共增加

conf.subfix.map(function(elem) { //定义接口数据容器
 $scope['com_obj'+elem] = {params:{},data:{}};
 $scope['com_list'+elem] = {params:{},data:[]};
 $scope['com_plist'+elem]  = {page:true,params:{listnum:10,curPage:1},data:{datalist:[]}};

 $scope['YS_list'+elem] = {params:{},data:[]};
 $scope['YS_plist'+elem]  = {page:true,params:{listnum:10,curPage:1},data:{datalist:[]}};
 $scope['YS_obj'+elem] = {params:{},data:{}};
}); 

$scope.fetch = function(key){//定义公共方法：请求函数 
 YSfac.fetdata($scope,key); 
}; 

$scope.dealhash = function(str,sco){ //定义处理html路径，模块路径，hash的参数对象的方法
  var url = str.split('#/'); 
  sco.hrefinfo.url = conf.index;
  if(url[1]){
    var key = url[1].split('?'); 
    sco.hrefinfo.url = conf.tplpath +'/'+ key[0]+'.html?time='+YSfac.time();
    sco.hrefinfo.path = key[0];
    key[1]&&(sco.hrefinfo.hashobj = YSfac.hashToobj(key[1])); 
  } 
}
$scope.dealhash(location.href,$scope); //调用方法，设置hash，html路径，hash参数  

$scope.init = function(sco) { //初始化每一个模块的数据容器
 conf.subfix.map(function(elem) { 
 sco['YS_list'+elem] = {params:{},data:[]};
 sco['YS_plist'+elem]  = {page:true,params:{listnum:10,curPage:1},data:{datalist:[]}}; 
 sco['YS_obj'+elem] = {params:{},data:{}};
});  
main[sco.hrefinfo.path]&&main[sco.hrefinfo.path](sco);//找到相关的模块，传入$scope,执行这个函数
}
$scope.init($scope);// 调用，初始化让$scope有这些数据 

window.onhashchange = function(){// hash变化，要执行两个方法
  $scope.dealhash(location.href,$scope);
  $scope.init($scope);
  $scope.$apply();
};

main.ctrl_init($scope);//初始化ctrl，执行一些方法  
console.log($scope);
}]);
//公共指令 ============================================================================
//点击去请求某个接口
app.directive('ysfetch', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){ 
           var ctrlsco = YSfac.getscope_byid(sco,2);
           ctrlsco.fetch(iAttrs.ysfetch); 
        });
     }
};
}); 
//回车，就去请求某个接口
app.directive('ysenter', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("keyup",function(e){ 
          var ctrlsco = YSfac.getscope_byid(sco,2);
          e.keyCode==13&&ctrlsco.fetch(iAttrs.ysenter);
        });
     }
};
}); 

//checkbox 全选
app.directive('yschkall', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){ 
           var ctrlsco = YSfac.getscope_byid(sco,2); 
           var arr = iAttrs.yschkall.split('.'); 
           var list = ctrlsco; 
           arr.map(function(el){list = list[el];}); 
           list.map(function(el){el.ischk = iElm.is(':checked');});
           ctrlsco.$apply(); 
        });
     }
};
}); 


//点击，赋值
app.directive('setvalue', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){
           var ctrlsco = YSfac.getscope_byid(sco,2);
           var arr = iAttrs.setvalue.split('.'); 
           var obj = ctrlsco;
           var key = '';
           arr.map(function(el,ind){ 
            ind<arr.length-1&&(obj = obj[el]);
            ind==arr.length-1&&(key=el);
          });
           obj[key] = iAttrs.value; 
           ctrlsco.$apply(); 
        });
     }
};
}); 


//公共增加，触发会调用接口   ysadd='YS_plista.data.datalist'  
app.directive('ysaddrun', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){
           var ctrlsco = YSfac.getscope_byid(sco,2); 
           var arr = iAttrs.ysaddrun.split('.'); 
           var list = ctrlsco; 
           arr.map(function(el){list = list[el];}); 
              ctrlsco.com_add.done = function(re,sco) {
                if(re.code==1){ 
                  list.unshift(re.data); 
                  YS('layer',function() {layer.msg('成功');});
                }else{ 
                  YS('layer',function() {layer.msg('失败');});
                }
              }
              ctrlsco.fetch('com_add'); 
        });
     }
};
}); 

//公共编辑,写法：  ysedit='YS_obja.params'  
app.directive('ysaddedit', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){
           var ctrlsco = YSfac.getscope_byid(sco,2); 
           var arr = iAttrs.ysadd.split('.'); 
           var list = ctrlsco; 
           arr.map(function(el){list = list[el];});

               
        });
     }
};
}); 

 
//select 选中赋值并执行
app.directive('ysselrun', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("change",function(e){ 
           var ctrlsco = YSfac.getscope_byid(sco,2); 
           var arr = iAttrs.ysselrun.split('.'); 
           var obj = ctrlsco;
           var key = '';
           arr.map(function(el,ind){ 
            ind<arr.length-1&&(obj = obj[el]);
            ind==arr.length-1&&(key=el);
          });
           obj[key] = iElm.val();
           ctrlsco.fetch(arr[0]);
        });
     }
};
}); 

//select 选中赋值
app.directive('yssel', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("change",function(e){ 
           var ctrlsco = YSfac.getscope_byid(sco,2); 
           var arr = iAttrs.yssel.split('.'); 
           var obj = ctrlsco;
           var key = '';
           arr.map(function(el,ind){ 
            ind<arr.length-1&&(obj = obj[el]);
            ind==arr.length-1&&(key=el);
          });
           obj[key] = iElm.val(); 
        });
     }
};
}); 

//公共切换tab的值
app.directive('setystab', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){ 
          var ctrlsco = YSfac.getscope_byid(sco,2);
            ctrlsco.ystab = iAttrs.setystab;
            ctrlsco.$apply();
        });
     }
};
}); 

//公共删除事件,删除1或多条
app.directive('ysdel', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){ 
           var ctrlsco = YSfac.getscope_byid(sco,2);
           var arr = iAttrs.ysdel.split('.'); 
           var list = ctrlsco;
           arr.map(function(el){list = list[el];}); 
           var delids = [];
           list.map(function(el){el.ischk&&delids.push(el[iAttrs.delkey]);}); 
           YS('layer',function() {//引入layer弹窗 
           if(!delids.length){layer.msg('请选择删除项');return false;} 
                 var layercon = layer.confirm('您确定要删除么？', {
                    btn: ['确定','取消'] //按钮
                  }, function(){ 
                    ctrlsco.com_del.params[iAttrs.delkey] = delids.join(','); 
                    ctrlsco.com_del.done = function(re,sco) {
                      if(re.code==1){
                        list.map(function(el){el.ischk&&(el.isdel = 1);});
                        layer.msg('删除成功');
                      }else{
                        layer.msg('删除失败');
                      }
                    }
                    ctrlsco.fetch('com_del');
                    layer.close(layercon);
                  }); 
            });  
        });
     }
};
}); 

//公共删除事件,删除一条
app.directive('ysdelone', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){
          var ctrlsco = YSfac.getscope_byid(sco,2);
            var _sco = sco;  
            YS('layer',function() {//引入layer弹窗  
            var layercon = layer.confirm('您确定要删除么？', {
              btn: ['确定','取消'] //按钮
            }, function(){ 
              ctrlsco.com_del.params[iAttrs.ysdelone] = sco.value[iAttrs.ysdelone]; 
              ctrlsco.com_del.done = function(re,sco) {
                if(re.code==1){
                  _sco.value.isdel = 1;
                  layer.msg('删除成功');
                }else{
                  layer.msg('删除失败');
                }
              }
              ctrlsco.fetch('com_del');
              layer.close(layercon);
            }); 
            });  
        });
     }
};
});


//自定义私有指令 ============================================================================
app.directive('findtable', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){ 
          var ctrlsco = YSfac.getscope_byid(sco,2);
          ctrlsco.YS_listb.params.pid = sco.value.pid;
          ctrlsco.fetch('YS_listb');
          ctrlsco.ystab = 2;
          ctrlsco.$apply(); 
        });
     }
};
});

//绑定dom ============================================================================
 angular.element(document).ready(function() {angular.bootstrap(document, ['app']);}); 
})(window);
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
method = (sco[key]&&sco[key].method)||(sco.conf[key]&&sco.conf[key].method)||'GET';
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
    getscope_byid: function(sc, id) {
    /*递归，找到$id为 num 的scope.并返回；*/
    var sp = sc.$id == id?sc:this.getscope_byid(sc.$parent, id);
    return sp; 
  },

};
window.YSfac = YSfac;
return YSfac;
})(window);
