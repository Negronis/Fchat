<template>
  <div>
    <!-- 右框 -->
    <div class="content-pops-all">
      <div class="content-avatar" v-if=" pos === 'left' ">
        <img :src="leftSrc" width="40px" height="40px" alt />
      </div>
      <div :class="className">
        <div :class="'content-pops-'+pos+'-content'" v-bind="PopProp">
          <!-- 用户自定 -->
          <slot name="image"></slot>
          <slot name="message"></slot>
          <slot name="audio"></slot>
          <slot name="video"> </slot>
          <!-- 默认 -->
          <pre v-if="type === 'message'" v-html="content"> 
          </pre>
          <div v-if="type === 'image'" style="text-align:center"> 
            <!-- loading  -->
            <div v-if="!imgLoadingComplete" class="content-pops-all-img-loading">
              <img src="@/assets/svg/oval.svg" width="50px" alt="">
            </div>
            <!-- 图片 -->
            <img  @load="imgLoad(content)" :src="content" alt="loading" width="100%" :style="{marginTop:'0px' , display:imgLoadingComplete == true ? 'block' : 'none'}" />
          </div>
          <div v-if="type === 'audio'"> 
              <div :class="'content-pops-'+pos+'-content-audio'" @click="play(content,duration)">
                <span v-if="pos=='right'">{{typeof duration == "number" ? duration + '"' : duration}}&nbsp;</span>
                <span :class="pos == 'left' ? 'FiconFont  icon-yuyin1' : 'FiconFont  icon-yuyin'"></span>
                <span v-if="pos=='left'">&nbsp;{{typeof duration == "number" ? duration + '"' : duration}}</span> 
              </div>
          </div>
          <div v-if="type === 'video'">
            <video id="PopsVideo" width="100%"   class="videoBox"    :src="content"    preload     controls    webkit-playsinline="true"    playsinline="true"  x-webkit-airplay="allow"  x5-video-player-type="h5"  x5-video-player-fullscreen="true"    x5-video-orientation="portraint">
            </video> 
          </div> 
        </div>
      </div>
      <div class="content-avatar" v-if=" pos === 'right' ">
        <img :src="rightSrc" width="40px" height="40px" alt />
      </div>
    </div>
  </div>
</template>

<script>
import FChat from './handler';
export default {
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
      default: require("@/assets/avatar/left.jpg"),
    },
    rightSrc: {
      type: String,
      default: require("@/assets/avatar/right.jpg"),
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
          FChat.scrollMessage();
        }, 0) 
    },
    // 语音播放
    play(src,duration){
      FChat.playVoice(src,duration);
    }
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
            FChat.scrollMessage();
          }); 
      }
     
    }) 
  }
};
</script>
 