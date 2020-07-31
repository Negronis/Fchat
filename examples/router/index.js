import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Home from '../components/Index.vue';
export default new Router({
   routes:[
      {
         path:"/",
         name:"home",
         component:Home,
         children:[

         ]
      }
   ]
})