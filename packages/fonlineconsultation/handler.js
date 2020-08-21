import Vue from 'vue'; 
class FChat {
   constructor(message,loadingState,maxSize,onlyImg) {
      // 消息列表
      this.message = message;
      // loading状态
      this.loadingState = loadingState || false ;
      //图片最大多少mb
      this.maxSize = maxSize || 2 ;
      //是否只能发图片
      this.onlyImg = onlyImg || false;
      //Toast单例
      this.ToastDiv = null;
      // 音频错误状态记录
      this.voiceState = false;  
   } 
   // 可由用户选择是否开启音频
   openVoice(url,isPromise){
      const that = this;
      // 如果挂载音频则帮忙授权
      if(!Vue.prototype.$RecordApp){
         Promise.all([
            import ('../../packages/recorder')
         ]).then(function(){
            console.log('音频插件以挂载');
            if(!isPromise) return ;
            Vue.prototype.$RecordApp.RequestPermission(
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
         })
         if(url){
            console.log(window);
            window.PageSet_RecordAppWxApi = url;
         }
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
   // 发送音频
   sendVoice(content,duration,pos){
      MessageObject['content'] = content;
      MessageObject['type'] = "audio",
      MessageObject['pos'] = pos || "right";
      MessageObject['duration'] = duration;
      return MessageObject;
   }
   // 播放音频
   playVoice(src,duration){
      console.log(duration);
      this.createToast('正在播放音频 ...');
   }
   // 开始录音
   startVoice(){
      Vue.prototype.$RecordApp.Start(
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
           console.log('开始录音 ....');
         },
         function (msg) {
           console.log("开始录音失败：" + msg);
         }); 
   }
   // 暂停录音
   pauseVoice(){
      let that = this;
      Vue.prototype.$RecordApp.Stop(
         function (blob, duration) { 
           //到达指定条件停止录音和清理资源
           console.log(
             blob,  (window.URL || window.webkitURL).createObjectURL(blob),
             "时长:" + duration + "ms"
           ); 
           //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传
           let fileBlob =  (window.URL || window.webkitURL).createObjectURL(blob);  
           var voiceObject = that.sendVoice(fileBlob,duration);
           return voiceObject;
         },
         function (msg) {
           console.log("录音失败:" + msg); 
         } );
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
            top:${document.getElementById('onlineHeader').clientHeight}px;
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
         console.log('定时器执行');
         that.ToastDiv.style.height = 0 + 'px';
      },timer || 3000)
   }
}
export default new FChat([]);