import onlineHeader from './onlineheader.vue';
import onlineInput from './onlineinput.vue';
import onlineContent from './onlinecontent.vue';
import pops from './pops.vue';

onlineHeader.install = function (Vue) {
   Vue.component(onlineHeader.name, onlineHeader);
};
onlineInput.install = function (Vue) {
   Vue.component(onlineInput.name, onlineInput);
};
onlineContent.install = function (Vue) {
   Vue.component(onlineContent.name, onlineContent);
};

export {
   onlineHeader,
   onlineInput,
   onlineContent,
   pops
}

