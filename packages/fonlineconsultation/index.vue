<template>
  <div class="fonlineconsultation-outer-div" v-bind="Height" >
    <!-- header -->
    <div id="onlineHeader" class="online-header-all" ref="onlineHeader">
      <div class="online-header-all-left">功能1</div>
      <div class="online-header-all-center">{{username}}</div>
      <div class="online-header-all-right">功能2</div>
    </div>
    <!-- content -->
    <div class="online-content-all" v-bind="contentProp" ref="onlineContentAll"> 
      <pops v-for = "(item,index) in MessageArray" :key = "index" :content="item['content']" :type="item['type']" :pos="item['pos']"></pops>
    </div>
    <!-- input -->
    <div class='online-input-content' id='onlineInput' ref='onlineInput'>
         <div class='online-input-content-lefticon'> 
           <!-- left  -->
           <slot name="leftIcon">
            <span :class="leftIcon" :style="{fontSize:leftIconSize+'px',color:leftIconColor}" @click="leftHandlerClick"></span>
           </slot>
          </div>
         <div class='online-input-content-centerInput'>
           <!-- center -->
            <slot name="centerText">
              <textarea @blur="controlHeight('blur')" @focus="controlHeight('focus')" id="msgInput" v-model="messageString" ref="msgInput" @input="controlRow" cols="24" :rows="controlRows" ></textarea>
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
            <img class="MessageLoading-Img" width="50px"  src="@/assets/svg/oval.svg" alt="" /> 
        </div>
      </slot> 
      <input type="file" id="sendImg" style="display:none">
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
    }
  },  
  created(){
     this.fheight = this.height;
  }
};
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0; 
  position: relative;
}  
.fonlineconsultation-outer-div {
  box-sizing: border-box; 
}
// header
.online-header-all { 
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 40px;
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
        width:100%;
        padding:8px 1%;
        border-radius:5px;
        outline: none; 
        font-size:18px;
        border:1px solid #dcdee2;
        resize:none;
      }
  }  
}
.MessageLoading{ 
  width:100%; 
  position: fixed;
  z-index:1000;
  top:0px; 
  box-sizing: border-box;
  background:rgba(0,0,0,.5);
  &-Img{
     position: absolute;
      z-index:1000;
      top:0px;
      left:0px;
      bottom:0px;
      right:0px;
      margin:auto;
  }
}
</style>