import axios from "axios"

axios.defaults.baseURL="http://172.16.22.45:5050"
// axios.defaults.baseURL="http://172.16.22.44:5050"
axios.defaults.withCredentials=true;

export {axios}