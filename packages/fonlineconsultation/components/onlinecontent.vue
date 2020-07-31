<template>
  <div class='online-content-all' v-bind="contentProp"> 
    <contentLeft></contentLeft>
    <contentRight></contentRight> 
  </div>
</template>

<script>
import contentLeft from './contentLeftPop.vue';
import contentRight from './contentRightPop.vue';

const componets = {
  contentLeft , 
  contentRight 
};
export default {
  name: "onlineContent",
  components: componets,
  props: {
    contentHeight: {
      type: Number,
    },
    contentBg: {
      type: String,
      default: "#F5F5F5",
    },
  },
  data() {
    return {
      authorHeight: 0,
    };
  },
  computed: {
    contentProp() {
      let { contentHeight, authorHeight, contentBg } = this;
      let retObj = {};
      retObj["style"] =
        "height:" +
          (contentHeight || window.innerHeight - authorHeight) +
          "px" +
          ";background:" +
          contentBg || "#f5f5f5";
      return retObj;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.authorHeight =
        (document.getElementById("onlineHeader").offsetHeight || 0) +
        (document.getElementById("onlineInput").offsetHeight || 0);
    });
  },
};
</script>

<style lang="less">
.online-content-all { 
  box-sizing: border-box;
  overflow-y: scroll;
}
</style>