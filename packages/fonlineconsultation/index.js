import fonlineconsultation from './index.vue';
import pops from './pops.vue';
pops.install = function (Vue) {
  Vue.component(pops.name, pops);
};
fonlineconsultation.install = function(Vue){
   Vue.component(fonlineconsultation.name,fonlineconsultation);
}; 
export {
   pops , fonlineconsultation
 }