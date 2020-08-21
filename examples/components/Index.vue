<template>
  <div>
    <FonlineConsultation
      @send="sendMsg"
      @sendImg="sendImg"
      @sendVoice="senVoice"
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
    // 挂载音频文件 
    this.$FChat.openVoice("https://fepic.natapp4.cc/api/getSign",true);
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
    sendImg(cb) { 
      cb.then((sendObj) => {
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
    sendMsg(msgObject) {
      this.$FChat.loading();
      sendMessage(msgObject).then((res) => {
        if (res.data) {
          // 经过服务器请求后决定双方发送消息
          // 己方发送
          this.$FChat.sendMessage(msgObject);
          this.$FChat.cancelLoading();
          // 服务器返回 - 格式拼接
          let { content, pos, type } = res.data; 
            this.$FChat.sendMessage({
              content: content,
              type: type,
              pos: "left"
            });  
        }
      });
    },
    senVoice(e){
      console.log(e);
    }
  },
};
</script>

<style>
</style>