(function () {
   "use strict";
   window.RecordAppBaseFolder = window.PageSet_RecordAppBaseFolder || "/src/";
   console.log('支持文件加载')
   var MyWxApi = window.PageSet_RecordAppWxApi;
   window.OnRecordAppInstalled = window.IOS_Weixin_RecordApp_Config = function () {
      console.log("ios-weixin-config install");
      window.IOS_Weixin_RecordApp_Config = null;
      window.Native_RecordApp_Config && Native_RecordApp_Config();//如果native-config.js也引入了的话，也需要初始化
      var App = RecordApp;
      var platform = App.Platforms.Weixin;
      var config = platform.Config;
      var win = window.top;
      config.Enable = function (call) {
         call(true);
      };
      config.WxReady = function (call) {
     if (!win.WxReady) {
            MyWxApi = window.PageSet_RecordAppWxApi;
            win.eval("var InitJsSDK=" + InitJsSDK.toString() + ";InitJsSDK")(App, MyWxApi, ajax);
         };
         win.WxReady(call);
      };
      config.DownWxMedia = function (param, success, fail) {
         MyWxApi = window.PageSet_RecordAppWxApi;
         ajax(MyWxApi, {
            action: "wxdown"
            , mediaID: param.mediaId
         }, function (data) {
            //   下载回调
            success(data);
         }, function (msg) {
            fail("下载音频失败：" + msg);
         });
      }; 
      var ajax = function (url, data, True, False) {
         var xhr = new XMLHttpRequest();
         xhr.timeout = 20000;
         xhr.open("POST", url);
         xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
               if (xhr.status == 200) {
                  var o = JSON.parse(xhr.responseText);
                  if (o.c) {
                     False(o.m);
                     return;
                  };
                  True(o);
               } else {
                  False("请求失败[" + xhr.status + "]");
               }
            }
         };
         var arr = [];
         for (var k in data) {
            arr.push(k + "=" + encodeURIComponent(data[k]));
         };
         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
         xhr.send(arr.join("&"));
      }; 
      var InitJsSDK = function (App, MyWxApi, ajax) {
         var wxOjbK = function (call) {
            if (errMsg) {
               call(null, errMsg);
               return;
            }; 
            wxConfig(function () {
               call(wx);
            }, function (msg) {
               call(wx, "请求微信接口失败: " + msg);
            });
         }; 
         //微信环境准备完毕
         window.WxReady = function (call) {
            if (isReady) {
               wxOjbK(call);
            } else {
               calls.push(call);
            };
         };
         var isReady = false;
         var calls = [];
         var errMsg = "";

         var jsEnd = function () {
            isReady = true;
            var arr = calls;
            calls = [];
            for (var i = 0; i < arr.length; i++) {
               wxOjbK(arr[i]);
            };
         };
         App.Js([{ url: "https://res.wx.qq.com/open/js/jweixin-1.4.0.js", check: function () { return !window.wx || !wx.config } }], function () {
            console.log("weixin jssdk加载好了");
            jsEnd();
         }, function (msg) {
            errMsg = "加载微信JsSDK失败，请刷新页面：" + msg;
            console.error("weixin jssdk加载失败:" + msg);
            jsEnd();
         }, window); 
         //等等完成签名
         var wxConfigStatus = 0;
         var wxConfigErr = "";
         var wxConfigCalls = [];
         var wxConfig = function (True, False) {
            if (wxConfigStatus == 6) {
               True();
               return;
            } else if (wxConfigStatus == 5) {
               False(wxConfigErr);
               return;
            };
            wxConfigCalls.push({ t: True, f: False });
            var end = function (err) {
               if (wxConfigStatus < 5) {
                  wxConfigErr = err ? "微信config失败，请刷新页面重试：" + err : "";
                  wxConfigStatus = err ? 5 : 6;
                  for (var i = 0; i < wxConfigCalls.length; i++) {
                     var o = wxConfigCalls[i];
                     if (err) {
                        o.f(wxConfigErr);
                     } else {
                        o.t();
                     };
                  };
               };
            };
            if (wxConfigStatus != 0) {
               return;
            };
            wxConfigStatus = 1;
            // 这里可以改
            var config = function (data) {
               wx.config({
                  debug: false
                  , appId: data.appid
                  , timestamp: data.timestamp
                  , nonceStr: data.nonceStr
                  , signature: data.signature
                  , jsApiList: ("getLocation"
                     + ",startRecord,stopRecord,onVoiceRecordEnd"
                     + ",playVoice,pauseVoice,stopVoice,onVoicePlayEnd"
                     + ",uploadVoice,downloadVoice"
                  ).split(",")
               });
               wx.error(function (res) {
                  end(res.errMsg);
               });
               wx.ready(function () {
                  console.log("微信JsSDK签名配置完成");
                  end();
               });
            };
            ajax(MyWxApi, {
               action: "sign"
               , url: encodeURIComponent(location.href.replace(/#.*/g, ""))
            }, function (data) { 
               config(data);
            }, end);
         };
      };
   };
   if (window.RecordApp) {
      OnRecordAppInstalled();
   };

})();