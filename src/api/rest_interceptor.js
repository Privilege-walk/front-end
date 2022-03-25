import axios from "axios";
import { getBaseUrl } from "./functions"

const restClient = axios.create({
    baseURL: getBaseUrl(),
    responseType: 'blob'
});

let token = localStorage.getItem('token')? localStorage.getItem('token') : '';

restClient.interceptors.request.use(function (config) {
    config.headers = { ...config.headers, 
      'content-type': 'application/json', 'Authorization': `Token ${token}`};
    return config;
    }, function (error) {
    return Promise.reject(error);
    }
);

export { restClient };