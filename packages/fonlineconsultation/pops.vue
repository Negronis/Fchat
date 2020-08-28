<template>
  <div>
    <!-- 右框 -->
    <!-- 头像上方 -->
    <div :class="'content-pops-time-'+pos" v-if="avatarTop">
      <slot name="topText">
        <div :class="'content-pops-time-'+pos + '-child'">{{avatarTop}}</div>
      </slot>
    </div> 
    <div class="content-pops-all">
      <div class="content-avatar" v-if=" pos === 'left' ">
        <img :src="leftSrc" width="40px" height="40px" alt /> 
      </div>  
      <div :class="className"  v-if="type === 'message'" > 
        <slot name="message">
          <div :class="'content-pops-'+pos+'-content'" v-bind="PopProp">  
              <pre  v-html="content"></pre>
          </div>
        </slot> 
      </div>
      <div :class="className" v-if="type === 'image'">
        <slot name="image">
          <div   :class="'content-pops-'+pos+'-content'" v-bind="PopProp">
                <div style="text-align:center"> 
                  <!-- loading  -->
                  <div v-if="!imgLoadingComplete" class="content-pops-all-img-loading"> 
                  <svg   width="50" height="50" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
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
                  <!-- 图片 -->
                  <img  @load="imgLoad(content)" :src="content" alt="loading" width="100%" :style="{marginTop:'0px' , display:imgLoadingComplete == true ? 'block' : 'none'}" />
                </div>
          </div>
        </slot>
      </div>
      <div :class="className" v-if="type === 'audio'">
        <slot name="audio">
          <div   :class="'content-pops-'+pos+'-content'" v-bind="PopProp">
                <div> 
                    <div :class="'content-pops-'+pos+'-content-audio'" @click="play(content,duration)">
                      <span v-if="pos=='right'">{{typeof duration == "number" ? duration + '"' : duration}}&nbsp;</span>
                      <span :class="pos == 'left' ? 'FiconFont  icon-iconyuyin' : 'FiconFont  icon-yuyin'"></span>
                      <span v-if="pos=='left'">&nbsp;{{typeof duration == "number" ? duration + '"' : duration}}</span> 
                    </div>
                </div>
          </div>
        </slot>
      </div>
      <div :class="className" v-if="type === 'video'">
        <slot name="video"> 
          <div  :class="'content-pops-'+pos+'-content'" v-bind="PopProp">
                <div>
                  <video id="PopsVideo" width="100%"   class="videoBox"    :src="content"    preload     controls    webkit-playsinline="true"    playsinline="true"  x-webkit-airplay="allow"  x5-video-player-type="h5"  x5-video-player-fullscreen="true"    x5-video-orientation="portraint"> </video> 
                </div> 
          </div>
        </slot> 
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
    avatarTop:{ 
    },
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
      default: "https://p.pstatp.com/origin/137460000bd26a8a1928a"
    },
    rightSrc: {
      type: String,
      default: "https://p.pstatp.com/origin/1379d00013a79df92cd7a"
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
        fontSize: size + "px",
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
 