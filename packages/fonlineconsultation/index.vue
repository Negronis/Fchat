<template>
  <div id="fonlineconsultation" class="fonlineconsultation-outer-div" v-bind="Height" >
    <!-- header -->
    <div id="onlineHeader" class="online-header-all" ref="onlineHeader">
      <div class="online-header-all-left">功能1</div>
      <div class="online-header-all-center">{{username}}</div>
      <div class="online-header-all-right">功能2</div>
    </div>
    <!-- content -->
    <div class="online-content-all" v-bind="contentProp" ref="onlineContentAll"> 
      <slot name="popList" v-bind:List="MessageArray">
          <pops :leftSrc="popLeftAva" :rightSrc="popRightAva" :bg="popBg" :size="popSize" v-for = "(item,index) in MessageArray" :key = "index" :content="item['content']" :type="item['type']" :pos="item['pos']" :duration="item['duration'] || '未知'">
                 <template v-slot:message>
                    <slot name="message" v-bind:Item="item"></slot> 
                </template>
                 <template v-slot:image>
                  <slot name="image" v-bind:Item="item"></slot>
                </template>
                 <template v-slot:audio>
                  <slot name="audio" v-bind:Item="item"></slot>
                </template>
                 <template v-slot:video>
                  <slot name="video" v-bind:Item="item"></slot>
                </template>
          </pops>
      </slot> 
    </div>
    <!-- input -->
    <div class='online-input-content' id='onlineInput' ref='onlineInput'>
         <div class='online-input-content-lefticon'> 
           <!-- left  -->
           <slot name="leftIcon"> 
            <span v-if="!isVoice"  :class="leftIcon" :style="{fontSize:leftIconSize+'px',color:leftIconColor}" @click="leftHandlerClick"></span>
            <span v-if="isVoice"  :class="leftIconChange" :style="{fontSize:leftIconSize+'px',color:leftIconColor}" @click="leftHandlerClick"></span> 
           </slot>
          </div>
         <div class='online-input-content-centerInput' >
           <!-- center -->
            <slot name="centerText">
                <textarea  v-if="!isVoice" @blur="controlHeight('blur')" @focus="controlHeight('focus')" id="msgInput" v-model="messageString" ref="msgInput" @input="controlRow" cols="24" :rows="controlRows" ></textarea>
                <div   v-if="isVoice"  class="online-input-content-centerInput-voice" :style="{height:isIOS == false ? '21px' : '',marginBottom:isIOS == true? '2px' : '', marginTop:isIOS == true ? '2px' : ''}">
                    <button @touchstart="startVoice" @touchmove="moveVoice" @touchend="endVoice" :style="{lineHeight:isIOS == true ? '20px' : ''}">{{voiceMsg}}</button>
                </div>
            </slot> 
         </div> 
         <div class='online-input-content-righticon'>
           <!-- right -->
            <slot name="rightIcon">
              <span :class="rightIconLeft" :style="{fontSize:rightIconSize+'px',color:rightIconColor}" @click="rightHandlerClick"></span>
              <span :class="rightIconRight" :style="{right:'',fontSize:rightIconSize +'px',color:rightIconColor}"  @click="messageHandler"></span>
            </slot>
         </div> 
      </div> 
      <slot name="loading">
        <div class='MessageLoading'  id="messageLoading" :style="{display:'none' , height:loadingHeight}"> 
          <div>
              <svg class="MessageLoading-Img" width="50" height="50" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                        <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="1s"
                                repeatCount="indefinite"/>
                        </path>
                    </g>
                </g>
            </svg>
          </div>
        </div>
      </slot> 
      <input type="file" id="sendImg" style="display:none">
      <div class="voice-pop" v-if="startVoiceBoolean">
          <img v-if="voiceContent == '正在录音....'" src="https://p.pstatp.com/origin/13790000036267af24495" alt="" width="50px">
          <img v-if="voiceContent != '正在录音....'" src="https://p.pstatp.com/origin/ff92000312944dc6f369" width="50px" alt="">
          <div class="voice-pop-contant">{{voiceContent}}</div>
      </div>
      <div class="voice-pop" v-if="voiceStartLoading">  
              <svg class="MessageLoading-Img" width="50" height="50" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                        <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="1s"
                                repeatCount="indefinite"/>
                        </path>
                    </g>
                </g>
            </svg> 
          <div class="voice-pop-contant"><br>Loading</div>
      </div>

  </div>
</template>

<script>
// components
import  pops  from "./pops.vue";
import FChat from './handler';
const components_arr = {
  pops
};
// mixins
import mixinsProp from "../mixins/mixin.js";
export default {
  name: "FonlineConsultation",
  mixins: [mixinsProp],
  components: components_arr,
  props: {
    height: {
      default: window.innerHeight,
    },
  },
  data() {
    return { 
      MessageArrays:FChat.getMessage(),
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
};
</script>
 