// loading icon
import '../examples/assets/font/iconfont.css';
import { fonlineconsultation, pops, FChat } from './fonlineconsultation';
const components = [
   fonlineconsultation, pops
];
// 注册install方法
const install = function (Vue) {
   if (install.installted) return;
   components.map(component => Vue.component(component.name, component));
   Vue.prototype.$FChat = FChat;
}
if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue);
}

export default {
   install,
   fonlineconsultation,
   pops,
   FChat
}