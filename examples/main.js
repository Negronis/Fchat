import Vue from 'vue';
import App from './App.vue';
import router from  './router';
// loading icon
import '../examples/assets/font/iconfont.css';
import fonlineconsulatation from '../packages'; 
import pops from '../packages'; 

Vue.config.productionTip = false;
Vue.use(fonlineconsulatation); 
Vue.use(pops); 


new Vue ({
   router,
   render : h => h(App),
}).$mount("#app");