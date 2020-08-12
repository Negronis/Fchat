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

}
export default new FChat([]);