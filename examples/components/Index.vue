<template>
  <div>
    <!-- <div style="height:100px;width:100%"></div> -->
    <FonlineConsultation
      @send="sendMsg"
      @sendImg="sendImg"
      @sendVoice="senVoice"
    >
      <!-- <template v-slot:popList ="List">
          {{List}}
        </template> -->
         <!-- <template v-slot:topText ="List">
            {{List}}
        </template> -->
      <!-- <template v-slot:message="message">
        {{message}}
      </template>
      <template v-slot:image="image">
        {{image}}
      </template>
      <template v-slot:voice="voice">
        {{voice}}
      </template>
      <template v-slot:audio="audio">
        {{audio}}
      </template> -->
    </FonlineConsultation>
    <!-- <div style="height:100px;width:100%"></div> -->
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
    this.$FChat.openVoice(" ", true); 
    // this.$FChat.setConfig('ToastTop',100)
    // 进入页面获取服务器数据
    var that = this;
    getMessage().then((res) => {
      setTimeout(() => {
        that.$FChat.setMessageList(res.data, function (e) {
          e.forEach((el) =>{
            // el["topText"] = "德莱蒋 2012年10月";
              this.message.push(el)
          });
          setTimeout(function () {
            that.$FChat.scrollMessage();
          }, 0);
        });
      }, 1000);
    });
    this.$FChat.setConfig("maxSize", 1);
  },
  methods: {
    // 模拟一个复读机
    sendImg(cb) {
      cb.then((sendObj) => {
        this.$FChat.loading();
        sendMessage(sendObj).then((res) => {
          if (res.data) {
            console.log(res.data);
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
      }).catch((err) => {
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
            pos: "left",
          });
        }
      });
    },
    senVoice(msgObject) {
      sendMessage(msgObject).then((res) => {
        if (res.data) {
          // 经过服务器请求后决定双方发送消息
          // 己方发送
          this.$FChat.sendMessage(msgObject);
          this.$FChat.cancelLoading();
          // 服务器返回 - 格式拼接
          let { content, pos, type, duration } = res.data;
          this.$FChat.sendMessage({
            content: content,
            type: type,
            pos: "left",
            duration: duration,
          });
        }
      });
    },
  },
};
</script>

<style>
</style>