import { resolve } from "core-js/fn/promise";

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
      return new Promise((resolve,reject)=>{ 
         let MessageObject = {};
         MessageObject['content'] = msg,
            MessageObject['type'] = msg.indexOf('http') == -1 ? "message" : 'link',
            MessageObject['pos'] = pos || "right";
         this.message.push(MessageObject);
         //   自动滚动到底
         setTimeout(() => {
            this.scrollMessage();
            resolve();
         }, 0)
      })
   }
   addImage() {

   }

}
export default new FChat([]);