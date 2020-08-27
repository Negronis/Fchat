import axios from 'axios';
const serverUrl = "";
export let getMessage = () => {
   return axios.get(serverUrl + '/getMessage');
}
export let sendMessage = (MessageObject) => {
   return axios.post(serverUrl + '/sendMessage',MessageObject);
}