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

/***/ "2308":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/oval.be00fc4a.svg";

/***/ }),

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

/***/ "a9d8":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/left.6d512d6c.jpg";

/***/ }),

/***/ "daf2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/right.53d3da8b.jpg";

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

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"08c6babb-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/fonlineconsultation/index.vue?vue&type=template&id=21d0aeb5&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._b({staticClass:"fonlineconsultation-outer-div"},'div',_vm.Height,false),[_c('div',{ref:"onlineHeader",staticClass:"online-header-all",attrs:{"id":"onlineHeader"}},[_c('div',{staticClass:"online-header-all-left"},[_vm._v("功能1")]),_c('div',{staticClass:"online-header-all-center"},[_vm._v(_vm._s(_vm.username))]),_c('div',{staticClass:"online-header-all-right"},[_vm._v("功能2")])]),_c('div',_vm._b({ref:"onlineContentAll",staticClass:"online-content-all"},'div',_vm.contentProp,false),_vm._l((_vm.MessageArray),function(item,index){return _c('pops',{key:index,attrs:{"content":item['content'],"type":item['type'],"pos":item['pos']}})}),1),_c('div',{ref:"onlineInput",staticClass:"online-input-content",attrs:{"id":"onlineInput"}},[_c('div',{staticClass:"online-input-content-lefticon"},[_vm._t("leftIcon",[_c('span',{class:_vm.leftIcon,style:({fontSize:_vm.leftIconSize+'px',color:_vm.leftIconColor}),on:{"click":_vm.leftHandlerClick}})])],2),_c('div',{staticClass:"online-input-content-centerInput"},[_vm._t("centerText",[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.messageString),expression:"messageString"}],ref:"msgInput",attrs:{"id":"msgInput","cols":"24","rows":_vm.controlRows},domProps:{"value":(_vm.messageString)},on:{"blur":function($event){return _vm.controlHeight('blur')},"focus":function($event){return _vm.controlHeight('focus')},"input":[function($event){if($event.target.composing){ return; }_vm.messageString=$event.target.value},_vm.controlRow]}})])],2),_c('div',{staticClass:"online-input-content-righticon"},[_vm._t("rightIcon",[_c('span',{class:_vm.rightIconLeft,style:({fontSize:_vm.rightIconSize+'px',color:_vm.rightIconColor}),on:{"click":_vm.rightHandlerClick}}),_c('span',{class:_vm.rightIconRight,style:({right:'',fontSize:_vm.rightIconSize +'px',color:_vm.rightIconColor}),on:{"click":_vm.messageHandler}})])],2)]),_vm._t("loading",[_c('div',{staticClass:"MessageLoading",style:({display:'none' , height:_vm.loadingHeight}),attrs:{"id":"messageLoading"}},[_c('img',{staticClass:"MessageLoading-Img",attrs:{"width":"50px","src":__webpack_require__("2308"),"alt":""}})])]),_c('input',{staticStyle:{"display":"none"},attrs:{"type":"file","id":"sendImg"}})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/fonlineconsultation/index.vue?vue&type=template&id=21d0aeb5&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"08c6babb-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/fonlineconsultation/pops.vue?vue&type=template&id=4b8e531c&
var popsvue_type_template_id_4b8e531c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"content-pops-all"},[( _vm.pos === 'left' )?_c('div',{staticClass:"content-avatar"},[_c('img',{attrs:{"src":_vm.leftSrc,"width":"40px","height":"40px","alt":""}})]):_vm._e(),_c('div',{class:_vm.className},[_c('div',_vm._b({class:'content-pops-'+_vm.pos+'-content'},'div',_vm.PopProp,false),[_vm._t("image"),_vm._t("message"),_vm._t("audio"),_vm._t("video"),(_vm.type === 'message')?_c('pre',{domProps:{"innerHTML":_vm._s(_vm.content)}},[_vm._v(" \n        ")]):_vm._e(),(_vm.type === 'image')?_c('div',{staticStyle:{"text-align":"center"}},[(!_vm.imgLoadingComplete)?_c('div',{staticClass:"content-pops-all-img-loading"},[_c('img',{attrs:{"src":__webpack_require__("2308"),"width":"50px","alt":""}})]):_vm._e(),_c('img',{style:({marginTop:'0px' , display:_vm.imgLoadingComplete == true ? 'block' : 'none'}),attrs:{"src":_vm.content,"alt":"loading","width":"100%"},on:{"load":function($event){return _vm.imgLoad(_vm.content)}}})]):_vm._e(),(_vm.type === 'audio')?_c('div'):_vm._e(),(_vm.type === 'video')?_c('div',[_c('video',{staticClass:"videoBox",attrs:{"id":"PopsVideo","width":"100%","src":_vm.content,"preload":"","controls":"","webkit-playsinline":"true","playsinline":"true","x-webkit-airplay":"allow","x5-video-player-type":"h5","x5-video-player-fullscreen":"true","x5-video-orientation":"portraint"}})]):_vm._e()],2)]),( _vm.pos === 'right' )?_c('div',{staticClass:"content-avatar"},[_c('img',{attrs:{"src":_vm.rightSrc,"width":"40px","height":"40px","alt":""}})]):_vm._e()])])}
var popsvue_type_template_id_4b8e531c_staticRenderFns = []


// CONCATENATED MODULE: ./packages/fonlineconsultation/pops.vue?vue&type=template&id=4b8e531c&

// CONCATENATED MODULE: ./packages/fonlineconsultation/handler.js
class FChat {
   constructor(message,loadingState,maxSize,onlyImage) {
      this.message = message;
      this.loadingState = loadingState || false ;
      this.maxSize = maxSize || 2 ;
      this.onlyImage = onlyImage || false;
   }
   setConfig(key,value,config){ 
      if(!config){
         if(this[key]){
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
   loading(loadingId,time,texDisabled = false){
      let tex = document.getElementById('msgInput');
      let loadingDiv = document.getElementById(loadingId || 'messageLoading');
      loadingDiv.style.display = 'block';
      this.loadingState = true;
      if(texDisabled){
         tex.disabled = true;
      }
      // 超时处理
      setTimeout(()=>{
         loadingDiv.style.display = 'none';
         this.loadingState = false;
         tex.disabled = false;
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
      tex.disabled = false;
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
      let MessageObject = {};
      // 对于链接的处理
      let HttpReg = /((http|https|ftp)(:\/\/)([a-z]|[0-9]|[\.]|[:])+)/ig
      let link = msg.match(HttpReg);
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
         let MessageObject = {};
         let imgInput = document.getElementById('sendImg');
         // 清空value -- 修复无法重复发送同一张图片
         imgInput.value = "";
         imgInput.click();
         imgInput.onchange = (e) => {
            let files = e.target.files, file;
            if (files && files.length != 0) {
               file = files[0];
               let { type, size } = file; 
               size = (size / 1024).toFixed(2) / 1000; 
               let fileReader = new FileReader();
               fileReader.readAsDataURL(file);
               fileReader.onload = (event) => { 
                  const result = event.target.result;
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
   sendMessage(FchatObj) {
      this.message.push(FchatObj);
      //   自动滚动到底
      setTimeout(() => {
         this.scrollMessage();
         // 消息清空
         setTimeout(() => {
            this.delMessage();
         }, 0);
      }, 0)
   }
   sendVoice(){
      
   }

}
/* harmony default export */ var handler = (new FChat([]));
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


/* harmony default export */ var popsvue_type_script_lang_js_ = ({
  name: "pops",
  props: {
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
      default: __webpack_require__("a9d8"),
    },
    rightSrc: {
      type: String,
      default: __webpack_require__("daf2"),
    },
    // 消息类型
    type: {
      type: String,
      default: "message",
      validator: (value) => {
        let types = ["message", "image", "video", "autio"].filter((e) =>
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
  },
  computed: {
    // 气泡相关属性
    PopProp() {
      let { size, bg } = this;
      let propObj = {
        fontSIze: size + "px",
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
  popsvue_type_template_id_4b8e531c_render,
  popsvue_type_template_id_4b8e531c_staticRenderFns,
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
            loadingHeight:0
        }
    },
    props: {
        // index
        height: {
            default: window.innerHeight,
        },
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
        sendMessage: {
            default: ""
        },
        leftIcon: {
            type: String,
            default: "FiconFont icon-weixinyuyin"
        },
        rightIconLeft: {
            type: String,
            default: "FiconFont icon-picture"
        },
        rightIconRight: {
            type: String,
            default: "FiconFont icon-fasong"
        },
        leftIconSize: {
            type: Number,
            default: 18
        },
        rightIconSize: {
            type: Number,
            default: 18
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
    },
    computed: {
        // index 

        // header 

        // content 

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
                        (this.$refs.onlineInput.offsetHeight || 0)
                    ) + "px";
                    this.loadingHeight =  height+'px';
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
        //默认录音方法 方法可定 通过this.$ref.emit()调用
        leftHandlerClick() {
            this.$emit('sendVoice', handler.sendMessage());
        }, 
        rightHandlerClick() {
            this.$emit('sendImg',handler.addImage());
        },
        // 消息发出
        messageHandler() {
            let tex = document.getElementById('msgInput'); 
            if(tex){
                if(!handler.getLoading()){
                    this.$emit('send',handler.addMessage(tex.value));
                }
            }
        }, 
    },
    //事件绑定/高度计算
    mounted() {
        // content
        this.$nextTick(() => {
            this.authorHeight =
                (this.$refs.onlineHeader.offsetHeight || 0) +
                (this.$refs.onlineInput.offsetHeight || 0);
        });
        //绑定enter发送
        window.addEventListener('keydown', (e) => {
            let { keyCode } = e;
            if (keyCode === 13) { 
                this.messageHandler(); 
            }
        })
        // 监听页面高度变化 - 安卓收起输入法响应
        window.addEventListener('resize', () => {
            this.changContentHeight(window.innerHeight);
        });
    },
    watch: {
        // 监听行数变化 响应高度
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
    }
  },  
  created(){
     this.fheight = this.height;
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
   FChat: handler
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (packages_0);



/***/ })

/******/ });
//# sourceMappingURL=fonlineconsultation.common.js.map