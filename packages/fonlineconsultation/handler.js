class FChat {
   constructor(message) {
      this.message = message;
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
   // 返回消息列表
   getMessage() {
      return this.message;
   }
   // 发送普通消息
   addMessage(msg, pos) {
      return new Promise((resolve, reject) => {
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
         this.message.push(MessageObject);
         //   自动滚动到底
         setTimeout(() => {
            this.scrollMessage();
            resolve();
         }, 0)
      })
   }
   addImage(pos) {
      let MessageObject = {};
      let imgInput = document.getElementById('sendImg');
      // 清空value -- 修复无法重复发送同一张图片
      imgInput.value = "";
      imgInput.click();
      imgInput.onchange = (e) => {
         let files = e.target.files, file;
         if (files && files.length != 0) {
            file = files[0];
            let { type } = file;
            // if (type.indexOf('image') == -1) {
            //    alert('请发送正确格式文件');
            //    return;
            // }
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = (event) => {
               const result = event.target.result;
               MessageObject['content'] = result;
               if (type.indexOf('image') != -1) {
                  MessageObject['type'] = "image";
               }
               if (type.indexOf('video') != -1) {
                  if(result.indexOf('video/quicktime') != -1){ 
                     var str = result.replace('video/quicktime','video/mp4');  
                     // MessageObject['content'] = 'https://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4';
                  }
                  MessageObject['type'] = "video"; 
               }
               MessageObject['pos'] = pos || "right";
               console.log(this.message);
               this.message.push(MessageObject);
               //   自动滚动到底
               setTimeout(() => {
                  this.scrollMessage();
               }, 0)
            }
         }
      }
   }

}
export default new FChat([]);