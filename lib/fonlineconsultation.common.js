module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var setPublicPath_src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (setPublicPath_src) {
    __webpack_require__.p = setPublicPath_src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1aef832-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/fonlineconsultation/index.vue?vue&type=template&id=1f31f97a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._b({staticClass:"fonlineconsultation-outer-div",attrs:{"id":"fonlineconsultation"}},'div',_vm.Height,false),[_vm._t("header",[_c('div',{ref:"onlineHeader",staticClass:"online-header-all",attrs:{"id":"onlineHeader"}},[_c('div',{staticClass:"online-header-all-left"},[_vm._t("hLeft")],2),_c('div',{staticClass:"online-header-all-center"},[_vm._t("hCenter",[_vm._v(_vm._s(_vm.username))])],2),_c('div',{staticClass:"online-header-all-right"},[_vm._t("hRight")],2)])],{"id":"onlineHeader"}),_c('div',_vm._b({ref:"onlineContentAll",staticClass:"online-content-all"},'div',_vm.contentProp,false),[_vm._t("popList",_vm._l((_vm.MessageArray),function(item,index){return _c('pops',{key:index,attrs:{"avatarTop":item['topText'],"leftSrc":_vm.popLeftAva,"rightSrc":_vm.popRightAva,"bg":_vm.popBg,"size":_vm.popSize,"content":item['content'],"type":item['type'],"pos":item['pos'],"duration":item['duration'] || '未知'},scopedSlots:_vm._u([{key:"topText",fn:function(){return [_vm._t("topText",null,{"Item":item})]},proxy:true},{key:"message",fn:function(){return [_vm._t("message",null,{"Item":item})]},proxy:true},{key:"image",fn:function(){return [_vm._t("image",null,{"Item":item})]},proxy:true},{key:"audio",fn:function(){return [_vm._t("audio",null,{"Item":item})]},proxy:true},{key:"video",fn:function(){return [_vm._t("video",null,{"Item":item})]},proxy:true}],null,true)})}),{"List":_vm.MessageArray})],2),_c('div',{ref:"onlineInput",staticClass:"online-input-content",attrs:{"id":"onlineInput"}},[_c('div',{staticClass:"online-input-content-lefticon"},[_vm._t("leftIcon",[(!_vm.isVoice)?_c('span',{class:_vm.leftIcon,style:({fontSize:_vm.leftIconSize+'px',color:_vm.leftIconColor}),on:{"click":_vm.leftHandlerClick}}):_vm._e(),(_vm.isVoice)?_c('span',{class:_vm.leftIconChange,style:({fontSize:_vm.leftIconSize+'px',color:_vm.leftIconColor}),on:{"click":_vm.leftHandlerClick}}):_vm._e()])],2),_c('div',{staticClass:"online-input-content-centerInput"},[_vm._t("centerText",[(!_vm.isVoice)?_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.messageString),expression:"messageString"}],ref:"msgInput",attrs:{"id":"msgInput","cols":"24","rows":_vm.controlRows},domProps:{"value":(_vm.messageString)},on:{"blur":function($event){return _vm.controlHeight('blur')},"focus":function($event){return _vm.controlHeight('focus')},"input":[function($event){if($event.target.composing){ return; }_vm.messageString=$event.target.value},_vm.controlRow]}}):_vm._e(),(_vm.isVoice)?_c('div',{staticClass:"online-input-content-centerInput-voice",style:({height:_vm.isIOS == false ? '0' : '',marginBottom:_vm.isIOS == true? '0' : '', marginTop:_vm.isIOS == true ? '' : ''})},[_c('button',{style:({padding:_vm.isIOS == true ? '5px' : '5px'}),on:{"touchstart":_vm.startVoice,"touchmove":_vm.moveVoice,"touchend":_vm.endVoice}},[_vm._v(_vm._s(_vm.voiceMsg))])]):_vm._e()])],2),_c('div',{staticClass:"online-input-content-righticon"},[_vm._t("rightIcon",[_c('span',{class:_vm.rightIconLeft,style:({fontSize:_vm.rightIconSize+'px',color:_vm.rightIconColor}),on:{"click":_vm.rightHandlerClick}}),_c('span',{class:_vm.rightIconRight,style:({right:'',fontSize:_vm.rightIconSize +'px',color:_vm.rightIconColor}),on:{"click":_vm.messageHandler}})])],2)]),_vm._t("loading",[_c('div',{staticClass:"MessageLoading",style:({display:'none' , height:_vm.loadingHeight}),attrs:{"id":"messageLoading"}},[_c('div',[_c('svg',{staticClass:"MessageLoading-Img",attrs:{"width":"50","height":"50","viewBox":"0 0 38 38","xmlns":"http://www.w3.org/2000/svg","stroke":"#fff"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd"}},[_c('g',{attrs:{"transform":"translate(1 1)","stroke-width":"2"}},[_c('circle',{attrs:{"stroke-opacity":".5","cx":"18","cy":"18","r":"18"}}),_c('path',{attrs:{"d":"M36 18c0-9.94-8.06-18-18-18"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"1s","repeatCount":"indefinite"}})],1)])])])])])]),_c('input',{staticStyle:{"display":"none"},attrs:{"type":"file","id":"sendImg"}}),(_vm.startVoiceBoolean)?_c('div',{staticClass:"voice-pop"},[(_vm.voiceContent == '正在录音....')?_c('img',{attrs:{"src":"https://p.pstatp.com/origin/13790000036267af24495","alt":"","width":"50px"}}):_vm._e(),(_vm.voiceContent != '正在录音....')?_c('img',{attrs:{"src":"https://p.pstatp.com/origin/ff92000312944dc6f369","width":"50px","alt":""}}):_vm._e(),_c('div',{staticClass:"voice-pop-contant"},[_vm._v(_vm._s(_vm.voiceContent))])]):_vm._e(),(_vm.voiceStartLoading)?_c('div',{staticClass:"voice-pop"},[_c('svg',{staticClass:"MessageLoading-Img",attrs:{"width":"50","height":"50","viewBox":"0 0 38 38","xmlns":"http://www.w3.org/2000/svg","stroke":"#fff"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd"}},[_c('g',{attrs:{"transform":"translate(1 1)","stroke-width":"2"}},[_c('circle',{attrs:{"stroke-opacity":".5","cx":"18","cy":"18","r":"18"}}),_c('path',{attrs:{"d":"M36 18c0-9.94-8.06-18-18-18"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"1s","repeatCount":"indefinite"}})],1)])])]),_vm._m(0)]):_vm._e()],2)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"voice-pop-contant"},[_c('br'),_vm._v("Loading")])}]


// CONCATENATED MODULE: ./packages/fonlineconsultation/index.vue?vue&type=template&id=1f31f97a&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d1aef832-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/fonlineconsultation/pops.vue?vue&type=template&id=02bb6a66&
var popsvue_type_template_id_02bb6a66_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.avatarTop)?_c('div',{class:'content-pops-time-'+_vm.pos},[_vm._t("topText",[_c('div',{class:'content-pops-time-'+_vm.pos + '-child'},[_vm._v(_vm._s(_vm.avatarTop))])])],2):_vm._e(),_c('div',{staticClass:"content-pops-all"},[( _vm.pos === 'left' )?_c('div',{staticClass:"content-avatar"},[_c('img',{attrs:{"src":_vm.leftSrc,"width":"40px","height":"40px","alt":""}})]):_vm._e(),(_vm.type === 'message')?_c('div',{class:_vm.className},[_vm._t("message",[_c('div',_vm._b({class:'content-pops-'+_vm.pos+'-content'},'div',_vm.PopProp,false),[_c('pre',{domProps:{"innerHTML":_vm._s(_vm.content)}})])])],2):_vm._e(),(_vm.type === 'image')?_c('div',{class:_vm.className},[_vm._t("image",[_c('div',_vm._b({class:'content-pops-'+_vm.pos+'-content'},'div',_vm.PopProp,false),[_c('div',{staticStyle:{"text-align":"center"}},[(!_vm.imgLoadingComplete)?_c('div',{staticClass:"content-pops-all-img-loading"},[_c('svg',{attrs:{"width":"50","height":"50","viewBox":"0 0 38 38","xmlns":"http://www.w3.org/2000/svg","stroke":"#fff"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd"}},[_c('g',{attrs:{"transform":"translate(1 1)","stroke-width":"2"}},[_c('circle',{attrs:{"stroke-opacity":".5","cx":"18","cy":"18","r":"18"}}),_c('path',{attrs:{"d":"M36 18c0-9.94-8.06-18-18-18"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"1s","repeatCount":"indefinite"}})],1)])])])]):_vm._e(),_c('img',{style:({marginTop:'0px' , display:_vm.imgLoadingComplete == true ? 'block' : 'none'}),attrs:{"src":_vm.content,"alt":"loading","width":"100%"},on:{"load":function($event){return _vm.imgLoad(_vm.content)}}})])])])],2):_vm._e(),(_vm.type === 'audio')?_c('div',{class:_vm.className},[_vm._t("audio",[_c('div',_vm._b({class:'content-pops-'+_vm.pos+'-content'},'div',_vm.PopProp,false),[_c('div',[_c('div',{class:'content-pops-'+_vm.pos+'-content-audio',on:{"click":function($event){return _vm.play(_vm.content,_vm.duration)}}},[(_vm.pos=='right')?_c('span',[_vm._v(_vm._s(typeof _vm.duration == "number" ? _vm.duration + '"' : _vm.duration)+" ")]):_vm._e(),_c('span',{class:_vm.pos == 'left' ? 'FiconFont  icon-iconyuyin' : 'FiconFont  icon-yuyin'}),(_vm.pos=='left')?_c('span',[_vm._v(" "+_vm._s(typeof _vm.duration == "number" ? _vm.duration + '"' : _vm.duration))]):_vm._e()])])])])],2):_vm._e(),(_vm.type === 'video')?_c('div',{class:_vm.className},[_vm._t("video",[_c('div',_vm._b({class:'content-pops-'+_vm.pos+'-content'},'div',_vm.PopProp,false),[_c('div',[_c('video',{staticClass:"videoBox",attrs:{"id":"PopsVideo","width":"100%","src":_vm.content,"preload":"","controls":"","webkit-playsinline":"true","playsinline":"true","x-webkit-airplay":"allow","x5-video-player-type":"h5","x5-video-player-fullscreen":"true","x5-video-orientation":"portraint"}})])])])],2):_vm._e(),( _vm.pos === 'right' )?_c('div',{staticClass:"content-avatar"},[_c('img',{attrs:{"src":_vm.rightSrc,"width":"40px","height":"40px","alt":""}})]):_vm._e()])])}
var popsvue_type_template_id_02bb6a66_staticRenderFns = []


// CONCATENATED MODULE: ./packages/fonlineconsultation/pops.vue?vue&type=template&id=02bb6a66&

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./packages/fonlineconsultation/handler.js
   
function installRecorder(isPromise){
   var that = this;
   if(!isPromise) return ;
   external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$RecordApp.RequestPermission(
         // 用户已经授权的回调
      function () { 
         that.createToast('音频授权成功。') 
      },
      //用户拒绝未授权或不支持
      function (msg, isUserNotAllow) {  
         that.createToast(isUserNotAllow ? "授权出现问题" : "音频出现故障" + '，原因是：'+msg);
         that.voiceState = true; 
      }
   );
}
class handler_FChat {
   constructor(message) {
      // 消息列表
      this.message = message;
      // loading状态
      this.loadingState =  false ;
      //图片最大多少mb
      this.maxSize = 2 ;
      //是否只能发图片
      this.onlyImg =  false;
      //Toast单例
      this.ToastDiv = null;
      // 音频错误状态记录
      this.voiceState = false;  
      //audio标签单例
      this.audioObj = ""; 
      //createToast所用的top ,所有header的高度之和
      this.ToastTop = "";
   }
   openVoice(url,isPromise){ 
      const that = this;
      // 如果挂载音频则帮忙授权  
      if(external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$RecordApp){    
         if(url){ 
            window.PageSet_RecordAppWxApi = url;
         }
         setTimeout(function(){
            that.createToast('正在加载音频插件，请稍等');
         },0)
         if(!isPromise) return ;
         external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$RecordApp.RequestPermission(
               // 用户已经授权的回调
            function () { 
               that.createToast('音频授权成功。') 
            },
            //用户拒绝未授权或不支持
            function (msg, isUserNotAllow) {  
               that.createToast(isUserNotAllow ? "授权出现问题" : "音频出现故障" + '，原因是：'+msg);
               that.voiceState = true; 
            }
         );
      }
   }
   // 参数设定
   setConfig(key,value,config){ 
      if(!config){ 
         if(this[key] !== null || this[key] !== undefined){
            this[key] = value; 
         }else{
            throw Error('参数错误')
         }
      }else{
         for(var i in config){
            if(this[i]){
               this[i] = config[i];
            }
         }
      } 
   }
   // Loading状态
   loading(time, loadingId, texDisabled = false){
      let tex = document.getElementById('msgInput');
      let loadingDiv = document.getElementById(loadingId || 'messageLoading');
      loadingDiv.style.display = 'block';
      this.loadingState = true;
      if(tex && texDisabled){
         tex.disabled = true;
      }
      // 超时处理
      setTimeout(()=>{
         loadingDiv.style.display = 'none';
         this.loadingState = false;
         if(tex){
            tex.disabled = false;
         }
         return new Promise((resolve,reject)=>{
            resolve('请求超时');
         })
      },time||5000)
   }
   //获取loading状态
   getLoading(){ 
      return this.loadingState ;
   }
   //取消Loading状态
   cancelLoading(loadingId){
      let loadingDiv = document.getElementById(loadingId || 'messageLoading');
      loadingDiv.style.display = 'none';
      this.loadingState = false;
      let tex = document.getElementById('msgInput');
      if(tex && tex.disabled){
         tex.disabled = false;
      }
   }
   // 滚动到消息最底
   scrollMessage() {
      let contentDom = document.querySelector('.online-content-all');
      if (contentDom) {
         let Height = contentDom.scrollHeight;
         contentDom.scrollTo({
            top: Height,
            behavior: 'smooth'
         })
      }
   }
   // 清空消息框
   delMessage() {
      let tex = document.getElementById('msgInput');
      tex.rows = 1, tex.value = "", tex.dispatchEvent(new Event('input'));
   }
   // 设置消息列表
   setMessageList(arr,handleFuc){
      this.message.length = 0;
      if(!handleFuc){
         if(arr.length == 0){
            return ;
         }
         arr.forEach(e=>this.message.push(e));
      }else{
         handleFuc.call(this,arr)
      }
   }
   // 返回消息列表
   getMessage() {
      return this.message;
   }
   // 普通消息
   addMessage(msg, pos) {
      var MessageObject = {};
      // 对于链接的处理
      var HttpReg = /((http|https|ftp)(:\/\/)([a-z]|[0-9]|[\.]|[:])+)/ig
      var link = msg.match(HttpReg);
      if (link) {
         msg = msg.replace(HttpReg, `<a href=${link[0]}>${link[0]}</a>`);
      }
      MessageObject['content'] = msg;
      MessageObject['type'] = "message",
      MessageObject['pos'] = pos || "right";
      return MessageObject;
   }
   // 图片消息
   addImage(pos) { 
      return new Promise((resolve, reject) => {
         var MessageObject = {};
         var imgInput = document.getElementById('sendImg');
         // 清空value -- 修复无法重复发送同一张图片
         imgInput.value = "";
         imgInput.click();
         imgInput.onchange = (e) => {
            var files = e.target.files, file;
            if (files && files.length != 0) {
               file = files[0];
               var { type, size } = file; 
               console.log(type , file , size);
               size = (size / 1024).toFixed(2) / 1000; 
               var fileReader = new FileReader();
               fileReader.readAsDataURL(file);
               fileReader.onload = function(event){  
                  const result = this.result;
                  MessageObject['content'] = result;
                  if (type.indexOf('image') != -1) {
                     MessageObject['type'] = "image";  
                     if(size > this.maxSize){ 
                        reject('上传图片过大');
                     }
                  }
                  if (type.indexOf('video') != -1 && !this.onlyImg) { 
                     MessageObject['type'] = "video";
                  }
                  if(type.indexOf('image') == -1 && type.indexOf('video') == -1){
                     reject('请传入正确类型'); 
                  }
                  MessageObject['pos'] = pos || "right";
                  resolve(MessageObject);
               }
            }
         }
      })
   }
   // 消息发送
   sendMessage(FchatObj) {
      this.message.push(FchatObj);
      //   自动滚动到底
      setTimeout(() => {
         this.scrollMessage();
         // 消息清空
         setTimeout(() => {
            if(FchatObj['type'] != 'audio' && FchatObj['type'] != 'video' && FchatObj['type'] != 'image'){
               this.delMessage();
            }
         }, 0);
      }, 0)
   }
   // 发送音频
   sendVoice(content,duration,pos){ 
      var MessageObject = {};
      MessageObject['content'] = content;
      MessageObject['type'] = "audio",
      MessageObject['pos'] = pos || "right";
      MessageObject['duration'] = duration;
      return MessageObject;
   }
   // 播放音频
   playVoice(src,duration){  
      if(this.audioObj == "") {
         var audio = document.createElement('audio');
         audio.src = src;
         document.body.appendChild(audio); 
         this.audioObj = audio;
      }else{
         this.audioObj.src = src;
      }
      this.audioObj.play();
      this.createToast('正在播放音频 ...',duration * 1000);
   }
   // 开始录音
   startVoice(){ 
      return new Promise(function(resolve,reject){ 
         external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$RecordApp.Start(
            { 
            type: "mp3",
            sampleRate: 16000,
            bitRate: 16,  
            onProcess: function ( buffers,  powerLevel,  bufferDuration,    bufferSampleRate,  newBufferIdx,  asyncEnd  ) {
               console.log(
                  buffers, powerLevel,  bufferDuration,   bufferSampleRate, newBufferIdx, asyncEnd
               ); 
            },
            }, 
            function(){
               resolve();
               console.log('开始录音 ....');
            },
            function (msg) {
               reject("开始录音失败：" + msg)
               console.log("开始录音失败：" + msg);
            }); 
      })
   }
   // 暂停录音
   pauseVoice(){ 
      let that = this; 
      return new Promise(function(resolve,reject){
      external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$RecordApp.Stop(
         function (blob, duration) {
           //到达指定条件停止录音和清理资源
           console.log(
             blob,  (window.URL || window.webkitURL).createObjectURL(blob),
             "时长:" + duration + "ms"
           );  
            //   let fileBlob =  (window.URL || window.webkitURL).createObjectURL(blob);  
            // 暂停后发送至服务器，然后发出语音消息
            if(duration){
               duration = Math.ceil(duration / 1000);
            }  
           var voiceObject = that.sendVoice(blob,duration);
           resolve(voiceObject);
         },
         function (msg) {
           console.log("录音失败:" + msg);  
           reject("录音失败:" + msg);
         });
      })
   }
   //创建提示框
   createToast(msg,timer){ 
      var that = this; 
      if(!this.ToastDiv){
         var div = document.createElement('div');
         div.id = 'FChatToast';
         div.style.cssText = `
            width:100%;
            line-height:30px;
            background:rgba(0,0,0,.5);
            position:fixed;
            left:0;
            font-size:16px;
            text-indent:10px;
            color:#fff; 
            transition:.5s linear all;
            z-index:10;
            overflow:hidden;
            height:0px;
            top:${this.ToastTop || document.getElementById('onlineHeader').clientHeight || 40}px;
         `
         div.innerHTML = msg;
         document.body.appendChild(div);
         this.ToastDiv = div;
         setTimeout(function(){
            that.ToastDiv.style.height = 30 +'px';
         },100)
      }else{
         this.ToastDiv.style.height = 30 + 'px';
         this.ToastDiv.innerHTML = msg;
      }
      setTimeout(function(){ 
         that.ToastDiv.style.height = 0 + 'px';
      },timer || 3000)
   }
}
/* harmony default export */ var handler = (new handler_FChat([]));
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/fonlineconsultation/pops.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var popsvue_type_script_lang_js_ = ({
  name: "pops",
  props: {
    avatarTop:{ 
    },
    pos: {
      type: String,
      default: "right",
    },
    size: {
      type: Number,
      default: 15,
    },
    bg: {
      type: String,
      default: "#6AEA9E",
    },
    // 头像地址
    leftSrc: {
      type: String,
      default: "https://p.pstatp.com/origin/137460000bd26a8a1928a"
    },
    rightSrc: {
      type: String,
      default: "https://p.pstatp.com/origin/1379d00013a79df92cd7a"
    },
    // 消息类型
    type: {
      type: String,
      default: "message",
      validator: (value) => {
        let types = ["message", "image", "video", "audio"].filter((e) =>
          e == value ? e : ""
        );
        if (!types.join("")) {
          throw new Error("请传入正确类型");
          return;
        }
        return types.join("");
      },
    },
    content: {
      type: String,
    },
    duration:{ 
    }
  },
  data() {
    return {
      imgLoadingComplete:false
    };
  },
  methods:{
    //图片的loading方法
    imgLoad(){   
        this.imgLoadingComplete = true;
        setTimeout(() => {
          handler.scrollMessage();
        }, 0) 
    },
    // 语音播放
    play(src,duration){
      handler.playVoice(src,duration);
    }
  },
  computed: {
    // 气泡相关属性
    PopProp() {
      let { size, bg } = this;
      let propObj = {
        fontSize: size + "px",
      };
      if (bg && bg !== "#6AEA9E") propObj["background"] = bg; 
      return {
        style: propObj,
      };
    },
    // 动态修改左右
    className() {
      let { pos } = this;
      return "content-pops-" + pos;
    },
  },
  mounted(){
    this.$nextTick(()=>{
      // 视频加载完 
      let video = document.getElementById('PopsVideo');
      if(video){
        video.addEventListener('canplaythrough',function(){
            console.log('视频加载完毕');
            handler.scrollMessage();
          }); 
      }
     
    }) 
  }
});

// CONCATENATED MODULE: ./packages/fonlineconsultation/pops.vue?vue&type=script&lang=js&
 /* harmony default export */ var fonlineconsultation_popsvue_type_script_lang_js_ = (popsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./packages/fonlineconsultation/pops.vue





/* normalize component */

var component = normalizeComponent(
  fonlineconsultation_popsvue_type_script_lang_js_,
  popsvue_type_template_id_02bb6a66_render,
  popsvue_type_template_id_02bb6a66_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var pops = (component.exports);
// CONCATENATED MODULE: ./packages/mixins/mixin.js
//Fchat 
 
/* harmony default export */ var mixin = ({
    data() {
        return {
            messageString: "",
            controlFocus: true,
            loadingHeight: 0
        }
    },
    props: { 
        // header
        username: {
            type: String,
            default: "暂无联系人"
        },
        // content
        contentHeight: {
            type: Number,
        },
        contentBg: {
            type: String,
            default: "#F5F5F5",
        },
        // input
        preventId:{
            default:"fonlineconsultation"
        }, 
        leftIcon: {
            type: String,
            default: "FiconFont icon-volume"
        },
        // 音频切换
        leftIconChange:{
            type:String,
            default:"FiconFont icon-fillin"
        },
        rightIconLeft: {
            type: String,
            default: "FiconFont icon-picture"
        },
        rightIconRight: {
            type: String,
            default: "FiconFont icon-send"
        },
        leftIconSize: {
            type: Number,
            default: 23
        },
        rightIconSize: {
            type: Number,
            default: 23
        },
        leftIconColor: {
            type: String,
            default: "#000"
        },
        rightIconColor: {
            type: String,
            default: "#000"
        },
        // pop
        popBg:{
            type:String, 
        },
        popSize:{
            type:Number, 
        },
        popLeftAva:{
            type:String
        },
        popRightAva:{
            type:String
        }
    },
    computed: {  
        contentProp() {
            let { contentHeight, authorHeight, contentBg } = this;
            let retObj = {};
            retObj["style"] =
                "height:" +
                (contentHeight || window.innerHeight - authorHeight) +
                "px" +
                ";background:" + contentBg || false;
            return retObj;
        },
        // input 

        // pop
    },
    methods: {
        // input 
        // 修改消息框(content)高度实现响应方法
        changContentHeight(height) {
            new Promise((resolve) => {
                this.$refs.onlineContentAll.style.height = this.contentHeight ||
                    height - (
                        (this.$refs.onlineHeader.offsetHeight || 0) +
                        (this.$refs.onlineInput.offsetHeight || 0)+
                        (handler.ToastTop||0)
                    ) + "px";
                this.loadingHeight = height + 'px';
                resolve();
            }).then(() => {
                this.scrollAll();
            }).catch(err => {
                throw new Error(err);
            })
        },
        // 跳转到页面最顶部，消息最底部滚动
        scrollAll() {
            window.scrollTo(0, 0);
            handler.scrollMessage();
        },
        // 获取焦点时的高度和滚动控制 -- 手机端兼容
        controlHeight(handler) {
            /** 
             * 失去焦点 
             * 解开滚动 
             * 控制参数controlFocus 
             * 阻止重复获取focus bug
            */
            if (handler === 'blur') {
                this.controlScroll(document.body, true);
                this.controlFocus = true;
            }
            // 阻止重复获取focus bug
            if (this.controlFocus) {
                setTimeout(() => {
                    /**
                     * 由于行数变换的瞬间高度变化 整体高度发生变化
                     * 导致window.innerHeight变为整体页面高度
                     * 故保存刚获取焦点时的正常高度用作换行相应的处理 
                     * */
                    this.changContentHeight(window.innerHeight);
                    this.innerHeight = window.innerHeight;
                }, 450);
                /**  
                 * 焦点获得 
                 * 锁定滚动
                 * 设定controlFocus为false 
                 * 防止多次focus触发
                */
                if (handler === 'focus') {
                    this.controlScroll(document.body, false);
                    this.controlFocus = false;
                }
            }
        },
        // 重置输入
        initInput() {
            this.messageString = "";
            this.controlRows = 1;
        },
        // 禁止滚动与允许滚动
        scroll(event) {
            event.preventDefault();
        },
        // 控制是否锁定滚动方法
        controlScroll(dom, isScroll) {
            if (isScroll) {
                dom.removeEventListener('touchmove', this.scroll);
            } else {
                dom.addEventListener('touchmove', this.scroll, { passive: false });
            }
        },
        // textarea行数控制
        controlRow() {
            let tex = this.$refs.msgInput;
            let ChiReg = /[\u4e00-\u9fa5]/;
            let values = tex.value.split('');
            let addNum = 0,
                cols = tex.cols;
            values.forEach((e) => {
                // 中英文
                if (ChiReg.test(e)) {
                    addNum += 2;
                } else {
                    addNum += 1;
                }
                // 换行相应 -- 暂不开启 
                if (e.indexOf('\n') != -1) {
                    // addNum = addNum + cols;
                    // return;
                }
            })
            // 自动计算最大行数
            if (this.controlRows < 3 && addNum != 0) {
                this.controlRows = Math.ceil(addNum / cols);
            }
            if (this.controlRows >= 3 && addNum) {
                this.controlRows = Math.ceil(addNum / cols) > 3 ? 3 : Math.ceil(addNum / cols);
            }
            if (addNum == 0) {
                this.controlRows = 1;
            }
        },
        //默认录音方法
        leftHandlerClick() { 
            if(this.$RecordApp){
                this.isVoice = !this.isVoice;
            }else{
                handler.createToast('您未开启音频加载，无法使用音频');
            }
        },
        //发送图片
        rightHandlerClick() {
            this.$emit('sendImg', handler.addImage());
        },
        // 消息发出
        messageHandler() {
            let tex = document.getElementById('msgInput');
            if (tex) {
                if (!handler.getLoading()) {
                    this.$emit('send', handler.addMessage(tex.value));
                }
            }
        }, 
        /**
         * 长按开始录音
         * 同时设定一些值
         */
        startVoice(e) { 
            var that = this;
            clearTimeout(this.touchTimer); 
            /**
             * 阻止页面滚动
             * 阻止文字选中
             * 初始化参数
             */
            document.getElementById(this.preventId).className = "fonlineconsultation-outer-div noSelect"; 
            that.controlScroll(document.body, false); 
            this.isCancel = false;
            this.touchTimer = 0;
            that.voiceStartLoading = true;
            this.touchTimer = setTimeout(function () { 
                handler.startVoice().then(function(){ 
                    /** 
                     * 去掉loading状态
                     * 修改文字
                     * 修改按钮文字
                     * 将开启录音状态改为true,调出模态框
                    */
                    that.voiceStartLoading = false;
                    that.voiceContent = "正在录音...."
                    that.voiceMsg = "松开结束";
                    that.startVoiceBoolean = true; 
                }).catch(function(err){
                    handler.createToast(err);
                    that.endInit();
                    // return ;
                });
            }, 300);
            // 记录开始的位置
            this.voiceStartX= e['touches']['0']['pageX'];
            this.voiceStartY  =e['touches']['0']['pageY'];
        }, 
        /** 
         * 根据手指移动判定方向
         * 上滑取消功能
         *             if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
                            //从左到右
                        }
                        else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
                            //从右到左
                        }
                        else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
                            //从上到下 
                        }
                        else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
                            //从下到上 
                        }
                        else{ 

                        } 
        */
        moveVoice(e) {    
            clearTimeout(this.touchTimer);
            var pageX  = e['touches']['0']['pageX'];
            var pageY  = e['touches']['0']['pageY']; 
            // 判断滑动位置 （top , bottom , right , left）
            var X = pageX - this.voiceStartX;
            var Y = pageY - this.voiceStartY; 
            function events(msg , isCancel){
                if(this.touchTimer!=0){ 
                      this.voiceContent = msg;
                      this.isCancel = isCancel;
                  }
            } 
            if ( Math.abs(Y) > Math.abs(X)+50 && Y < 0 ) { 
                events.call(this, "上滑取消录音" , true); 
            }else{
                events.call(this, "正在录音...." , false);
            }
        },
        // 结束状态 初始化 
        endInit(){
            var that = this; 
            clearTimeout(this.touchTimer);//清除定时器
            setTimeout(function(){ 
                /**
                 * 关闭图片
                 * 重置按钮文字
                 * 允许滚动
                 * 允许页面文字选中
                 * 重置定时器
                 */
                that.startVoiceBoolean = false;
                that.voiceMsg = "开始录音"; 
                that.controlScroll(document.body, true); 
                document.getElementById(that.preventId).className = "fonlineconsultation-outer-div";
                that.touchTimer = 0;
                that.voiceStartLoading = false; 
            },0)
        },
        /** 
         * 取消录音情况
         * 服务器成功返回情况
         * 服务器返回不成功的情况
        */
        endVoice() {
            var that = this; 
            that.endInit(); 
            if(that.isCancel){ 
                that.$RecordApp.Stop();
                console.log('取消录音'); 
            }else{
                handler.loading();
                setTimeout(function(){
                    handler.pauseVoice().then(function(res){
                        that.endInit(); 
                        handler.cancelLoading();
                        that.$emit('sendVoice',res);  
                    }).catch(function(err){
                        handler.cancelLoading();
                        handler.createToast(err); 
                        that.endInit(); 
                    })
                },500) 
            }  
        }
    },
    /** 
     * 事件绑定和高度计算
     * 绑定enter发送
     * 监听页面高度变化 - 安卓收起输入法响应
    */
    mounted() {
        // content
        this.$nextTick(() => {
            this.authorHeight =
                (this.$refs.onlineHeader.offsetHeight || 0) +
                (this.$refs.onlineInput.offsetHeight || 0)
                +(handler.ToastTop||0);
                this.loadingHeight = window.innerHeight + 'px';
        }); 
        window.addEventListener('keydown', (e) => {
            let { keyCode } = e;
            if (keyCode === 13) {
                e.preventDefault();
                this.messageHandler();
            }
        }) 
        window.addEventListener('resize', () => {
            this.changContentHeight(window.innerHeight);
        });
    },
    /** 
     * 监听行数变化
     * 响应高度
    */
    watch: {
        controlRows(val) {
            setTimeout(() => {
                this.changContentHeight(this.innerHeight);
            }, 0)
        }
    }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/fonlineconsultation/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// components


const components_arr = {
  pops: pops
};
// mixins

/* harmony default export */ var fonlineconsultationvue_type_script_lang_js_ = ({
  name: "FonlineConsultation",
  mixins: [mixin],
  components: components_arr,
  props: {
    height: {
      default: window.innerHeight,
    },
  },
  data() {
    return { 
      MessageArrays:handler.getMessage(),
      // header
      authorHeight: 0, 
      // 发送消息的loading
      loading:true,
      // input
      controlRows:1,  
      //content 
      innerHeight:0, //保存content消息框响应高度
      isVoice:false, //是否为音频
      voiceMsg:"按住说话", //音频按钮文字
      touchTimer:null,  //长按用的定时器
      voiceContent:"正在录音....",  //录音文字
      voiceStartX:0,//录音开始的位置记录
      voiceStartY:0,
      isCancel:false, //用来判断是否需要取消录音
      startVoiceBoolean:false , //开始录音 -- 显示灰色图案
      voiceStartLoading:false,  //录音开始前的loading状态
    };
  },
  computed: {
    Height() {
      let { fheight , headerHeight } = this;
      return {
        // style: "height:" + fheight - headerHeight  + "px",
      };
    },
    // 动态的消息列表
    MessageArray(){ 
      return this.MessageArrays;
    },
    isIOS(){  
      return navigator.userAgent.indexOf('iPhone') != -1;
    }
  },  
  created(){ 
    
  }
});

// CONCATENATED MODULE: ./packages/fonlineconsultation/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var packages_fonlineconsultationvue_type_script_lang_js_ = (fonlineconsultationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/fonlineconsultation/index.vue





/* normalize component */

var fonlineconsultation_component = normalizeComponent(
  packages_fonlineconsultationvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var fonlineconsultation = (fonlineconsultation_component.exports);
// CONCATENATED MODULE: ./packages/fonlineconsultation/index.js



pops.install = function (Vue) {
  Vue.component(pops.name, pops);
};
fonlineconsultation.install = function(Vue){
   Vue.component(fonlineconsultation.name,fonlineconsultation);
}; 

// CONCATENATED MODULE: ./packages/index.js
 
const components = [
   fonlineconsultation, pops 
]; 
// 注册install方法
const install = function (Vue) {
   if (install.installted) return;
   components.map(component => Vue.component(component.name, component));
   Vue.prototype.$FChat = handler;  
}
if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue);
}

/* harmony default export */ var packages_0 = ({
   install,
   fonlineconsultation: fonlineconsultation,
   pops: pops,
   FChat: handler, 
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (packages_0);



/***/ })

/******/ });
//# sourceMappingURL=fonlineconsultation.common.js.map