<template>
  <div class='fonlineconsultation-outer-div' v-bind="tagProp">
    <onlineHeader></onlineHeader>
    <onlineContent></onlineContent>
    <onlineInput ></onlineInput>
  </div>
</template>

<script>
// components
import {onlineInput , onlineHeader , onlineContent} from './components';
const components_arr = {
  onlineInput:onlineInput,
  onlineHeader:onlineHeader,
  onlineContent:onlineContent
}
export default {
  name: "FonlineConsultation",
  components:components_arr,
  props: {
    height: {
      default: window.innerHeight,
    },
  },
  data() {
    return {};
  },
  computed: {
    tagProp() {
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
</style>