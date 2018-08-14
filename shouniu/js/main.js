// document.write("<script language=javascript src='/js/md5.js'></script>");
var ip = "47.52.236.104";
// var ip = "192.168.0.105";
var port = "8080";
var app = "Shou6Control";
//接受传过来的参数
function getParamsByKey(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// 分享到第三方平台的链接
function getSharedUrl(type, picUrl, title) {
  var _shareUrl = "";
  if (type == "xinlang") {
    _shareUrl = "http://v.t.sina.com.cn/share/share.php?";
    _shareUrl += "&url=" + encodeURIComponent(document.location); //分享的链接
    _shareUrl += "&title=" + encodeURIComponent(title); //分享的标题
    _shareUrl += "&pic=" + encodeURIComponent(picUrl); //分享的图片
  } else if (type == "baidutieba") {
    _shareUrl = "http://tieba.baidu.com/f/commit/share/openShareApi?";
    _shareUrl += "title=" + encodeURIComponent(title); //分享的标题
    _shareUrl += "&url=" + encodeURIComponent(document.location); //分享的链接
    _shareUrl += "&pic=" + encodeURIComponent(picUrl); //分享的图片
  } else if (type == "qqkongjian") {
    _shareUrl =
      "https://h5.qzone.qq.com/q/qzs/open/connect/widget/mobile/qzshare/index.html?page=qzshare.html&loginpage=loginindex.html&logintype=qzone?";
    _shareUrl += "&url=" + encodeURIComponent(document.location); //参数url设置分享的内容链接|默认当前页location
    _shareUrl += "&title=" + encodeURIComponent(title); //参数title设置分享标题，可选参数
    _shareUrl += "&pics=" + encodeURIComponent(picUrl); //参数title设置分享标题，可选参数
  } else if (type == "douban") {
    _shareUrl = "http://shuo.douban.com/!service/share?";
    _shareUrl += "&href=" + encodeURIComponent(document.location); //分享的链接
    _shareUrl += "&name=" + encodeURIComponent(title); //分享的标题
    _shareUrl += "&image=" + encodeURIComponent(picUrl); //分享的图片
  } else if (type == "tengxunweibo") {
    _shareUrl = "http://v.t.qq.com/share/share.php?";
    _shareUrl += "title=" + encodeURIComponent(title); //分享的标题
    _shareUrl += "&url=" + encodeURIComponent(document.location); //分享的链接
    _shareUrl += "&appkey=5bd32d6f1dff4725ba40338b233ff155";
    _shareUrl += "&pic=" + encodeURIComponent(picUrl); //分享的图片
  }
  window.open(
    _shareUrl,
    "_blank",
    "width = " +
      600 +
      ", height = " +
      535 +
      ", left = " +
      (screen.width - 600) / 2 +
      ", top = " +
      (screen.height - 535) / 2 +
      ", toolbar = no, menubar = no, scrollbars = no, resizable = 1, location = no, status = 0"
  );
}
// 定义shopCar对象操作myLocalStorage
var shopCar = {
  set: function(val) {
    var array = myLocalStorage.get("shopCar");
    if (array == null) {
      array = [val];
    } else {
      var isFind = false;
      for (var i = 0; i < array.length; i++) {
        if (array[i].shMpid == val.shMpid && array[i].shColor == val.shColor) {
          array[i].shNum = val.shNum + array[i].shNum;
          array[i].shPrice = val.shPrice + array[i].shPrice;
          isFind = true;
        }
      }
      if (isFind) {
      } else {
        array.push(val);
      }
    }
    myLocalStorage.set("shopCar", array);
  },
  get: function(key) {
    return myLocalStorage.get(key);
  },
  delete: function(key) {
    myLocalStorage.delete(key);
  },
  updateByIdType: function(val) {
    var array = myLocalStorage.get("shopCar");
    for (var i = 0; i < array.length; i++) {
      if (array[i].shMpid == val.shId && array[i].shColor == val.shColor) {
        array[i].shNum = val.shNum;
        array[i].shPrice = val.shPrice;
      }
    }
    myLocalStorage.set("shopCar", array);
  }
};
//购物车页面待结算的商品
var settlementProductObj = {
  set: function(val) {
    var settlementProductArr = myLocalStorage.get("settlementProduct");
    if (settlementProductArr == null) {
      settlementProductArr = [val];
    } else {
      settlementProductArr.push(val);
    }
    myLocalStorage.set("settlementProduct", settlementProductArr);
  },
  get: function(key) {
    return myLocalStorage.get(key);
  },
  delete: function(key) {
    myLocalStorage.delete(key);
  },
  updateByIdType: function(val) {
    var array = myLocalStorage.get("settlementProduct");
    for (var i = 0; i < array.length; i++) {
      if (array[i].Mpid == val.id && array[i].Color == val.typeColor) {
        array[i].Num = val.num;
        array[i].Price = val.price;
      }
    }
    myLocalStorage.set("settlementProduct", array);
  }
};

// 定义一个myLocalStorage对象操作localStorage
var myLocalStorage = {
  set: function(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  get: function(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  delete: function(key) {
    localStorage.removeItem(key);
  }
};
//接口访问成功（除了200以外的状态码）返回的其他状态码
function otherStates(code) {
  if (code == 300) {
    alert("接口调用失败");
  } else if (code == 301) {
    alert("接口调用失败，参数不合法");
  } else if (code == 302) {
    alert("接口调用失败，用户未登录");
  } else if (code == 303) {
    alert("服务器连接超时");
  } else if (code == 304) {
    alert("服务器数据为空");
  } else if (code == 305) {
    alert("请求被禁止，未绑定默认车辆");
  } else if (code == 306) {
    alert("请求被禁止，上传文件过大");
  } else if (code == 500) {
    alert("服务器错误+[错误原因]");
  } else if (code == 600) {
    alert("硬件已休眠");
  }
}
//用户登录id加密
function getJSessionId() {
  var jSessionId = myLocalStorage.get("jSessionId");
  var tmp = jSessionId + format(new Date(), "yyyyMMddHHmm");
  return hex_md5(tmp) + jSessionId;
}
//获取密码加密
function getpassword() {
  var pwd = myLocalStorage.get("pwd");
  var tmp = pwd + format(new Date(), "yyyyMMddHHmm");
  return hex_md5(tmp);
}
//时间转换
function format(date, format) {
  var mat = {};
  mat.Y = date.getFullYear();
  mat.M = date.getMonth() + 1; //月份记得加1
  mat.d = date.getDate();
  mat.H = date.getHours();
  mat.m = date.getMinutes();
  mat.s = date.getSeconds();

  mat.Y = mat.Y.toString().substr(0, 4);
  mat.M = check(mat.M);
  mat.d = check(mat.d);
  mat.H = check(mat.H);
  mat.m = check(mat.m);
  mat.s = check(mat.s);

  return format
    .replace("yyyy", mat.Y)
    .replace("MM", mat.M)
    .replace("dd", mat.d)
    .replace("HH", mat.H)
    .replace("mm", mat.m)
    .replace("ss", mat.s);
}
//检查是不是两位数字，不足补全
function check(str) {
  str = str.toString();
  if (str.length < 2) {
    str = "0" + str;
  }
  return str;
}
//阻止事件冒泡
function stopBubble(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  else window.event.cancelBubble = true; //兼容ie
}
// 阻止默认浏览器动作(W3C)
function stopDefault(e) {
  // 阻止默认浏览器动作(W3C)
  if (e && e.preventDefault) {
    e.preventDefault();
  } else {
    // IE中阻止函数器默认动作的方式
    window.event.returnValue = false;
  }
  return false;
}
//显示收藏分享菜单
var isShow = true;
function showMenu() {
  var popUp = document.getElementById("pop-up");
  if (isShow) {
    popUp.style.display = "block";
  } else {
    popUp.style.display = "none";
  }
  isShow = !isShow;
}
//分享弹窗页面
function shield() {
  var s = document.getElementById("mask");
  s.style.display = "block";

  var l = document.getElementById("log_window");
  l.style.display = "block";
}
function cancel_shield() {
  var s = document.getElementById("mask");
  s.style.display = "none";

  var l = document.getElementById("log_window");
  l.style.display = "none";
}
//统一返回
function toReturn() {
  history.back();
}
