import axios from 'axios';
const serverUrl = "http://fepic.natapp4.cc/api";
export let getMessage = () => {
   return axios.get(serverUrl + '/getMessage');
}
export let sendMessage = (MessageObject) => {
   return axios.post(serverUrl + '/sendMessage',MessageObject);
}