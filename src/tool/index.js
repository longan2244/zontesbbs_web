import axios from "axios";

const ajax = axios.create({
  baseURL: "http://60.205.191.83:5139",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}) 
 
ajax.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

export default ajax