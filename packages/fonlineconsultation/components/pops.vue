<template>
  <div>
      <!-- 右框 -->
    <div  class="content-pops-all">
        <div class="content-avatar"  v-if=" pos === 'left' ">
            <img :src="leftSrc" width="40px" height="40px" alt />
      </div>
      <div :class='className' >
        <div  :class="'content-pops-'+pos+'-content'" v-bind="PopProp"> 
          <slot name="image"></slot>
          <slot name="message"></slot>
          <slot name="audio"></slot>
          <slot name="video"></slot>
          <slot name="link"></slot>
          <div v-if="type === 'message'">{{content}}</div>
          <div v-if="type === 'image'">{{content}}</div>
          <div v-if="type === 'audio'">{{content}}</div>
          <div v-if="type === 'video'">{{content}}</div>
          <div v-if="type === 'link'">{{content}}</div> 
        </div>
      </div>
      <div class="content-avatar"  v-if=" pos === 'right' ">
        <img :src="rightSrc" width="40px" height="40px" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contentRight",
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
      default: require("../../../examples/assets/avatar/left.jpg"),
    },
    rightSrc: {
      type: String,
      default: require("../../../examples/assets/avatar/right.jpg"),
    },
    // 消息类型
    type: {
      type: String,
      default: "message",
      validator: (value) => {
        let types = ["message", "image", "video", "autio", "link"].filter((e) =>
          e == value ? e : ""
        );
        return types.join("");
      },
    },
    content: {
      type: String,
    },
  },
  data() {
    return {};
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
    className(){
        let {pos} = this;
        return "content-pops-" + pos;
    }
  },
};
</script>

<style lang="less">
.content-pops-all {
  display: flex;
  margin: 20px;
}
.content-avatar {
  width: 50px;
  height: 40px; 
  vertical-align: middle;
}
.content-pops-right {
  vertical-align: middle;
  text-align: right;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  &::after {
    content: "";
    width: 0px;
    height: 0px;
    border: 5px solid #6aea9e;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;
    position: relative;
    top: 10px;
  }
  &-content {
    font-size: 15px;
    border-radius: 5px;
    padding: 5px;
    text-align: left;
    background: #6aea9e;
    line-height: 30px;
  }
}
.content-pops-left {
  vertical-align: middle;
  text-align: left;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  &::before {
    content: "";
    width: 0px;
    height: 0px;
    border: 5px solid #6aea9e;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent; 
    position: relative;
    top: 10px;
  }
  &-content {
    font-size: 15px;
    border-radius: 5px;
    padding: 5px;
    text-align: right;
    background: #6aea9e;
    line-height: 30px;
  }
}
</style>