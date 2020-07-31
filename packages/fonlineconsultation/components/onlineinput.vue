<template> 
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
</template>

<script>
   export default {
      name: 'onlineInput',
      props:{
         leftIcon:{
            type:String,
            default:"iconfont icon-weixinyuyin"
         },
         rightIconLeft:{
            type:String,
            default:"iconfont icon-picture"   
         },
         rightIconRight:{
            type:String,
            default:"iconfont icon-fasong"
         },
         leftIconSize:{
            type:Number,
            default:18
         },
         rightIconSize:{
            type:Number,
            default:18
         },
         leftIconColor:{
            type:String,
            default:"#000"
         },
         rightIconColor:{
            type:String,
            default:"#000"
         },
         sendMessage:{
            type:String,
            default:""
         }
      },
      computed:{
          
      },
      data() {
         return {
            controlRows:1, 
         }
      },
      methods:{
         leftHandlerClick(){},
         rightHandlerClick(){}, 
         messageHandler(){
            let {sendMessage} = this;
            if(sendMessage) this.$refs.sendMessage();
            else{
               console.log(123);
            }
         },
         controlRow(){ 
            let tex = this.$refs.msgInput; 
            let ChiReg = /[\u4e00-\u9fa5]/; 
            let values = tex.value.split(''); 
            let addNum = 0; 
            values.forEach((e)=>{  
               if(ChiReg.test(e)){ 
                 addNum += 2;
               }else{
                  addNum += 1;
               } 
            })  
            if(this.controlRows < 3 && addNum != 0){
               this.controlRows = Math.ceil(addNum / 24);
            } 
            if(this.controlRows >= 3){ 
               this.controlRows = Math.ceil(addNum / 24) > 3 ? 3 :  Math.ceil(addNum / 24);
            }
         }  
      },
   }
</script>

<style lang="less">
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
               border:1px solid;
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