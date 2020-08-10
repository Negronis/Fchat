import Vue from 'vue';
import App from './App.vue';
import router from  './router';

//低版本浏览器兼容es6 
import "babel-polyfill";

// loading icon
import '../examples/assets/font/iconfont.css';
import fonlineconsulatation from '../packages'; 
import pops from '../packages'; 
//import Vconsole
import Vconsole from 'vconsole';
const vconsole = new Vconsole();

Vue.config.productionTip = false;
Vue.use(vconsole);   
Vue.use(fonlineconsulatation); 
Vue.use(pops); 

new Vue ({
   router,
   render : h => h(App),
}).$mount("#app");