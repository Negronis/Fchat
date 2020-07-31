<template>
   <div id="onlineHeader" class='online-header-all'>
       <div class='online-header-all-left'>功能1</div>
       <div class='online-header-all-center'>{{username}}</div>
       <div class='online-header-all-right'>功能2</div>
   </div>
</template>

<script>
   export default {
      name: 'onlineHeader',
      props:{
         username:{
            type:String,
            default:"暂无联系人"
         }
      },
      data() {
         return {
            
         }
      }
   }
</script>

<style lang="less">
   .online-header-all{
      box-sizing: border-box;
      display: flex;
      width:100%;
      min-height:40px;
      line-height:40px;
      text-align: center;
      background-image:linear-gradient(to right , #EAEAEA  0% , #fff 50%, #EAEAEA 100%);
      &-left{
         flex:2;
      }
      &-center{ 
         flex:10;
      }
      &-right{
         flex:2;
      }
   }
</style>