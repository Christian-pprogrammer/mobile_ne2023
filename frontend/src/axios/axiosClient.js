import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://192.168.1.169:5000/api'
})
export default axiosClient;