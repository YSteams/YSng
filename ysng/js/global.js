/*! YS v1.0.0 | by YSTeam | Copyright (c) 2013-2017 http://www.ysframe.com All rights reserved. | Licensed under MIT | 2017-12-22T12:00:00+0800 */ 
 
// YS前端架构，她是一种开发模式。简单、易用、高效。
// 我们的口号：配置化开发，让前端开发简单，再简单一点
/******************************************
YS架构由以下五个部分组成
一、配置项conf，包括主域名，开发生产设置、公共路径，私有路径等
二、业务逻辑处理模块main,主要处理每个页面的业务
三、初始化控制器，单页面应用的控制器，我们只有1个控制器；
四、公共指令，YS架构的公共指令
五、私有指令，开发者自己的自定义指令
六、angular绑定dom；
结束


约定：
1、$scope.com_lista = {
                        params:{},  //传给后端的参数放这里
                        data:[],  //后端返回数据放这里
                        before:function(sco){},  //传之前进行处理，return false；可以终止提交.sco是ctrl控制器的$scope;
                        done:function(re,sco){} //后端返回re；sco是ctrl控制器的$scope;
                      };
2、conf里面的 list代表的是返回的数据是个列表，obj代表的是返回的是对象

******************************************/

(function(window, undefined) {
//配置项 ============================================================================ 
var conf = {
  rooturl:'meizi.lc/',//网站根目录
  tplpath:'./html',  //每个模块的静态页面存放路径
  index:"./html/pageone.html",//默认include进来的模板
  jsonpath:'./json/',//约定json路径
  debug:true,//开发模式，会所有的请求为get方法，并请求本地json;
  console:true,//ture开启，则打印一些YS提示错误信息，false关闭,不打印YS的提示信息; 

  com_del:{url:'auth/comdel',method:'POST','name':'POST方法-无分页列表'},
  com_add:{url:'auth/comadd',method:'POST','name':'POST方法-无分页列表'},
  com_lista:{url:'auth/comlist',method:'GET','name':'POST方法-无分页列表'},
  com_plista:{url:'auth/comlist',method:'GET','name':'GET方法-有分页列表',load:true,page:true}, 
  com_obja:{url:'auth/comadd',method:'GET','name':'GET方法-返回对象，如详情，添加，删除'}, 
  YS_lista:{url:'auth/comlist',method:'GET','name':'GET方法-无分页列表'}, 
  YS_plista:{url:'auth/comlist',method:'GET','name':'GET方法-有分页列表',load:true,page:true},
  YS_obja:{url:'auth/comadd',method:'POST','name':'POST方法-返回对象，如详情，添加，删除'}, 
};
//业务逻辑块 ============================================================================
var main = {
  // 主控制器初始化
  ctrl_init:function(sco) {
     //设置hash，html路径，hash参数
     sco.dealhash(location.href,sco);  
     // 调用，初始化让$scope有这些数据
     sco.init(sco);
     //调用公共业务：获取省份
     sco.com_lista.url = 'Open/prov';
     sco.fetch('com_lista');
     sco.com_lista.done = function(re,sco){ 
          //调用公共业务：获取城市 
          sco.fetch('com_listb');
     }

     //调用公共业务：获取城市
     sco.com_listb.url = 'Open/city'; 
     sco.com_listb.params = {pid:17};  

     //定义变量
     sco.ystab = 0;



  },
  //页面1业务逻辑
  pageone:function(sco) {  
      sco.YS_lista.url = 'abc/aa';
      sco.fetch('YS_plista'); 
     sco.fetch('com_listb'); 
  },
    //页面2业务逻辑
  city:function(sco) {
      //业务：设定采集，温度  
      
  },
  //更多页面业务逻辑，往下添加
  mattertpl:function(sco) {

     sco.YS_plista.url = 'Index/system_mattertpl_list';
     sco.fetch('YS_plista');
 
  },
  tongbiao:function(sco) {
    //专业列表
     sco.YS_lista.url = 'Index/major_select';
     sco.fetch('YS_lista');

     //新增专业
     sco.YS_obja.url = 'Index/major_add'; 

    //资料列表     
     sco.YS_listb.url = 'Index/archive_select';
     sco.fetch('YS_listb');

     //新增资料
     sco.YS_objb.url = 'Index/archive_add'; 
  },
  weather:function(sco) {
          //天气列表
     sco.YS_plista.url = 'Index/service_weather_list';
     // sco.fetch('YS_plista');
  },
  userlist:function(sco) {
     //用户列表
     sco.YS_plista.url = 'Index/operate_user_list';
     sco.YS_plista.params.userid = 123;
     sco.fetch('YS_plista');

    //登陆日志  
     sco.YS_plistb.page = true;  
     sco.YS_plistb.url = 'Index/operate_login_list';
     // sco.fetch('YS_plistb');
    
    //汇总登陆     
     sco.YS_lista.url = 'Index/loginStatistic';
     // sco.fetch('YS_lista');
  },
  programcount:function(sco) {
          //项目列表
     sco.YS_plista.url = 'Index/operate_pro_list';
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
//存放容器 html路径,模块路径，hash参数对象
 $scope.body = {url:'',path:'',hashobj:{}};   
//初始化公共
$scope['com_del'] = {params:{},data:{}};//公共删除
$scope['com_add'] = {params:{},data:{}};//公共增加

['a','b','c','d'].map(function(elem) {
 $scope['com_obj'+elem] = {params:{},data:{}};
 $scope['com_list'+elem] = {params:{},data:[]};
 $scope['com_plist'+elem]  = {params:{listnum:10,curPage:1},data:{datalist:[]}};

 $scope['YS_list'+elem] = {params:{},data:[]};
 $scope['YS_plist'+elem]  = {params:{listnum:10,curPage:1},data:{datalist:[]}};
 $scope['YS_obj'+elem] = {params:{},data:{}};
});
$scope.init = function(sco) { 
 ['a','b','c','d'].map(function(elem) { 
 sco['YS_list'+elem] = {params:{},data:[]};
 sco['YS_plist'+elem]  = {params:{listnum:10,curPage:1},data:{datalist:[]}}; 
 sco['YS_obj'+elem] = {params:{},data:{}};
}); 
  //找到相关的模块，传入$scope,执行这个函数
  main[sco.body.path]&&main[sco.body.path](sco);
} 
//处理html路径，模块路径，hash的参数对象
$scope.dealhash = function(str,sco){ 
  var url = str.split('#/'); 
  sco.body.url = conf.index;
  if(url[1]){
    var key = url[1].split('?'); 
    sco.body.url = conf.tplpath +'/'+ key[0]+'.html?time='+YSfac.time();
    sco.body.path = key[0];
    key[1]&&(sco.body.hashobj = YSfac.hashToobj(key[1])); 
  } 
} 
//定义公共方法：请求函数
$scope.fetch = function(key){ 
 YSfac.fetdata($scope,key); 
};
 

// hash切换
window.onhashchange = function(){
  $scope.dealhash(location.href,$scope);
  $scope.init($scope);
  $scope.$apply();
}; 
//初始化ctrl，执行一些方法，
main.ctrl_init($scope);  
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
           e.keyCode==13&&sco.fetch(iAttrs.ysenter);
        });
     }
};
}); 

//checkbox 全选
app.directive('yschkall', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){ 
           var arr = iAttrs.yschkall.split('.'); 
           var list = sco; 
           arr.map(function(el){list = list[el];}); 
           list.map(function(el){el.ischk = iElm.is(':checked');});
           sco.$apply(); 
        });
     }
};
}); 


//点击，赋值
app.directive('setvalue', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){ 
          debugger;
           var arr = iAttrs.setvalue.split('.'); 
           var obj = sco;
           var key = '';
           arr.map(function(el,ind){ 
            ind<arr.length-1&&(obj = obj[el]);
            ind==arr.length-1&&(key=el);
          });
           obj[key] = iAttrs.value; 
           sco.$apply(); 
        });
     }
};
}); 


//公共增加，触发会调用接口   ysadd='YS_plista.data.datalist'  
app.directive('ysaddrun', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){ 
           var arr = iAttrs.ysaddrun.split('.'); 
           var list = sco; 
           arr.map(function(el){list = list[el];}); 
              sco.com_add.done = function(re,sco) {
                if(re.code==1){ 
                  list.unshift(re.data); 
                  YS('layer',function() {layer.msg('成功');});
                }else{ 
                  YS('layer',function() {layer.msg('失败');});
                }
              }
              sco.fetch('com_add'); 
        });
     }
};
}); 

//公共编辑  ysedit='YS_obja.params'  
app.directive('ysaddedit', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){
           var arr = iAttrs.ysadd.split('.'); 
           var list = sco; 
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
           var arr = iAttrs.ysselrun.split('.'); 
           var obj = sco;
           var key = '';
           arr.map(function(el,ind){ 
            ind<arr.length-1&&(obj = obj[el]);
            ind==arr.length-1&&(key=el);
          });
           obj[key] = iElm.val();
           sco.fetch(arr[0]);
        });
     }
};
}); 

//select 选中赋值
app.directive('yssel', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("change",function(e){ 
           var arr = iAttrs.yssel.split('.'); 
           var obj = sco;
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
app.directive('changetab', function(){ 
return { 
link: function(sco, iElm, iAttrs) {
        iElm.on("click",function(e){ 
          var ctrlsco = YSfac.getscope_byid(sco,2);
            ctrlsco.ystab = iAttrs.changetab;
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
           var arr = iAttrs.ysdel.split('.'); 
           var list = sco;
           arr.map(function(el){list = list[el];}); 
           var delids = [];
           list.map(function(el){el.ischk&&delids.push(el[iAttrs.delkey]);}); 
           YS('layer',function() {//引入layer弹窗 
           if(!delids.length){layer.msg('请选择删除项');return false;} 
                 var layercon = layer.confirm('您确定要删除么？', {
                    btn: ['确定','取消'] //按钮
                  }, function(){ 
                    sco.com_del.params[iAttrs.delkey] = delids.join(','); 
                    sco.com_del.done = function(re,sco) {
                      if(re.code==1){
                        list.map(function(el){el.ischk&&(el.isdel = 1);});
                        layer.msg('删除成功');
                      }else{
                        layer.msg('删除失败');
                      }
                    }
                    sco.fetch('com_del');
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
            var _sco = sco;  
            YS('layer',function() {//引入layer弹窗  
            var layercon = layer.confirm('您确定要删除么？', {
              btn: ['确定','取消'] //按钮
            }, function(){ 
              sco.com_del.params[iAttrs.ysdelone] = sco.value[iAttrs.ysdelone]; 
              sco.com_del.done = function(re,sco) {
                if(re.code==1){
                  _sco.value.isdel = 1;
                  layer.msg('删除成功');
                }else{
                  layer.msg('删除失败');
                }
              }
              sco.fetch('com_del');
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
    getscope_byid: function(sc, id) {
    /*递归，找到$id为 num 的scope.并返回；*/
    var sp = sc.$id == id?sc:this.getscope_byid(sc.$parent, id);
    return sp; 
  },

};
window.YSfac = YSfac;
return YSfac;
})(window);
