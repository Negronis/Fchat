import Vue from 'vue';
import App from './App.vue';
import router from  './router';

//低版本浏览器兼容es6 
import "babel-polyfill";

import '../packages/styles/index.less';
import fonlineconsulatation from '../packages';   
import '../packages/recorder.js'; 

Vue.config.productionTip = false;

// import Vconsole from 'vconsole';
// const vconsole = new Vconsole;
// Vue.use(vconsole);   


Vue.use(fonlineconsulatation);   
new Vue ({
   router,
   render : h => h(App),
}).$mount("#app");