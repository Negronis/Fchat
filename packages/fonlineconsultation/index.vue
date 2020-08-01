<template>
  <div class="fonlineconsultation-outer-div" v-bind="Height">
    <!-- header -->
    <div id="onlineHeader" class="online-header-all">
      <div class="online-header-all-left">功能1</div>
      <div class="online-header-all-center">{{username}}</div>
      <div class="online-header-all-right">功能2</div>
    </div>
    <!-- content -->
    <div class="online-content-all" v-bind="contentProp">
      <pops :content="'卧槽卧槽'"></pops>
      <pops :pos="'left'" :content="'卧槽卧槽卧槽卧槽'"></pops>
      <pops :pos="'left'" :content="test" type="image"></pops>
      <pops :content="'卧槽卧槽'"></pops> 
      <pops :content="'http://www.baidu.com'" type="link"></pops> 

      <slot name="pops"></slot> 
    </div>
    <!-- input -->
    <div class='online-input-content' id='onlineInput'>
         <div class='online-input-content-lefticon'><span :class="leftIcon" :style="{fontSize:leftIconSize+'px',color:leftIconColor}" @click="leftHandlerClick"></span></div>
         <div class='online-input-content-centerInput'>
            <textarea ref="msgInput" @input="controlRow" cols="30" :rows="controlRows" ></textarea>
         </div>
         <div class='online-input-content-righticon'>
            <span :class="rightIconLeft" :style="{fontSize:rightIconSize+'px',color:rightIconColor}" @click="rightHandlerClick"></span>
            <span :class="rightIconRight" :style="{right:'',fontSize:rightIconSize +'px',color:rightIconColor}" @click="messageHandler"></span>
         </div> 
      </div> 
  </div>
</template>

<script>
// components
import  pops  from "./pops.vue";
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
      test:require("@/assets/avatar/left.jpg"),
      // header
      authorHeight: 0,
      // input
      controlRows:1, 
    };
  },
  computed: {
    Height() {
      let { height } = this;
      return {
        style: "height:" + height + "px",
      };
    },
  },
};
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
}
.fonlineconsultation-outer-div {
  box-sizing: border-box;
}
// header
.online-header-all {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  min-height: 40px;
  line-height: 40px;
  text-align: center;
  background-image: linear-gradient(
    to right,
    #eaeaea 0%,
    #fff 50%,
    #eaeaea 100%
  );
  &-left {
    flex: 2;
  }
  &-center {
    flex: 10;
  }
  &-right {
    flex: 2;
  }
}
// content
.online-content-all {
  box-sizing: border-box;
  overflow-y: scroll;
}
// input
.online-input-content{  
  position: absolute;
  bottom:0px;
  left:0px;
  width:100%;
  background-image:linear-gradient(to right , #EAEAEA  0% , #fff 50%, #EAEAEA 100%);
  box-sizing: border-box;
  display:flex; 
  &-lefticon{
      text-align: center;
      flex:2;  
      position: relative;
      left:0px;
      span{
        position: absolute;
        bottom:18px;
      }
  }
  &-righticon{
      flex:3;
      text-align: center; 
      position: relative;
      right:0px;
      span{
        position: absolute;
        bottom:18px; 
        &:first-child{ 
            left:13px;
        }
        &:last-child{
            right:15px;
        }
      }
  }
  &-centerInput{
      flex:8;
      padding:5px; 
      textarea{ 
        width:98%;
        padding:8px 1%;
        border-radius:5px;
        outline: none; 
        font-size:18px;
        border:1px solid #dcdee2;
        resize:none;
      }
  }  
}
</style>