import axios from "axios";
import { getBaseUrl } from "./functions"

const restClient = axios.create({
    baseURL: getBaseUrl(),
});


restClient.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token')? localStorage.getItem('token') : '';
    config.headers = { 
      ...config.headers, 
      'content-type': 'application/json'
    } 
    if (token){
      config.headers = { 
        ...config.headers, 'Authorization': `Token ${token}`
      }
    };
    return config;
    }, function (error) {
      return Promise.reject(error);
    }
);

export { restClient };