<template>
  <div>
    <FonlineConsultation
      @send="sendMsg"
      @sendImg="sendImg"
    ></FonlineConsultation>
  </div>
</template>

<script>
import { getMessage, sendMessage } from "@/api/data";
export default {
  name: "index",
  data() {
    return {
      sendMessage: sendMessage,
    };
  },
  created() {
    // 进入页面获取服务器数据
    getMessage().then((res) => { 
      setTimeout(()=>{ 
        this.$FChat.setMessageList(res.data,function(e){
          e.forEach(el=>this.message.push(el))
        }); 
      },1000)
    }); 
    this.$FChat.setConfig('maxSize', 1);
  },
  methods: {
    // 模拟一个复读机
    sendImg(e) { 
      e.then((sendObj) => {
        console.log('图片加载完成');
        this.$FChat.loading();
        sendMessage(sendObj).then((res) => { 
          if (res.data) {
            this.$FChat.cancelLoading(); 
            // 我方发送
            this.$FChat.sendMessage(sendObj);
            // 对方发送
            let { content, pos, type } = res.data;
            this.$FChat.sendMessage({
              content: content,
              type: type,
              pos: "left",
            }); 
          }
        });
      }).catch((err)=>{
        alert(err);
      });
    },
    sendMsg(e) {
      this.$FChat.loading();
      sendMessage(e).then((res) => {
        if (res.data) {
          this.$FChat.cancelLoading();
          this.$FChat.sendMessage(e);
          let { content, pos, type } = res.data; 
            this.$FChat.sendMessage({
              content: content,
              type: type,
              pos: "left"
            });  
        }
      });
    },
  },
};
</script>

<style>
</style>