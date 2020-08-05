<template>
  <div>
    <!-- 右框 -->
    <div class="content-pops-all">
      <div class="content-avatar" v-if=" pos === 'left' ">
        <img :src="leftSrc" width="40px" height="40px" alt />
      </div>
      <div :class="className">
        <div :class="'content-pops-'+pos+'-content'" v-bind="PopProp">
          <slot name="image"></slot>
          <slot name="message"></slot>
          <slot name="audio"></slot>
          <slot name="video"></slot>
          <slot name="link"></slot>
          <pre v-if="type === 'message'">{{content}}</pre>
          <div v-if="type === 'image'">
            <img :src="content" alt="loading" width="100%" style="margin-top:10px" />
          </div>
          <div v-if="type === 'audio'">{{content}}</div>
          <div v-if="type === 'video'">{{content}}</div>
          <div v-if="type === 'link'">
              <a :href="content">{{content}}</a>
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
        let types = ["message", "image", "video", "autio", "link"].filter((e) =>
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
    className() {
      let { pos } = this;
      return "content-pops-" + pos;
    },
  },
};
</script>

<style lang="less">

// 全局通用参数
.content-pops-global (@justify:flex-end) {
  vertical-align: middle;
  text-align: left;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: @justify;
  pre{
    padding:0;
    margin:0;
  }
}
.content-pops-after-global {
  content: "";
  width: 0px;
  height: 0px;
  border: 5px solid #6aea9e;
  border-top-color: transparent;
  border-bottom-color: transparent;
  position: relative;
  top: 10px;
}
.content-pops-content-global {
  font-size: 15px;
  border-radius: 5px;
  padding: 5px;
  background: #6aea9e;
  line-height: 30px; 
}
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
  .content-pops-global();
  &::after {
    .content-pops-after-global();
    border-right-color: transparent;
  }

  &-content {
    .content-pops-content-global();
    text-align: left;
    &:hover {
      filter: grayscale(40%);
    }
  }
}
.content-pops-left {
  .content-pops-global(flex-start);
  &::before {
    .content-pops-after-global();
    border-left-color: transparent;
  }
  &-content {
    .content-pops-content-global();
    text-align: left;
    &:hover {
      filter: grayscale(40%);
    }
  }
}
</style>