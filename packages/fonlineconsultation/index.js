import fonlineconsultation from './index.vue';
import pops from './pops.vue';
import FChat from './handler';
pops.install = function (Vue) {
  Vue.component(pops.name, pops);
};
fonlineconsultation.install = function(Vue){
   Vue.component(fonlineconsultation.name,fonlineconsultation);
}; 
export {
   pops , fonlineconsultation,FChat
 }