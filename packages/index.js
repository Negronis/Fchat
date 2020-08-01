// loading icon
import '../examples/assets/font/iconfont.css';
import fonlineconsultation from './fonlineconsultation'; 

const components = [
   fonlineconsultation 
];
// 注册install方法
const install = function (Vue) {
   if (install.installted) return;
   components.map(component => Vue.component(component.name, component));
}
if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue);
}
export default {
   install,
   ...components
}