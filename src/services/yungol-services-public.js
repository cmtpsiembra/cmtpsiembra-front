import axios from 'axios';
import store from '../store'

const apiServices = axios.create({
  baseURL: process.env.API_URL
});

// apiServices.defaults.headers.common['Authorization'] = "Bearer " + store.state.idtoken;

// Add a request interceptor
apiServices.interceptors.request.use(async function (config) {
  store.commit("loading1", true);
  return config;
  // Do something before request is sent 
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
apiServices.interceptors.response.use(function (response) {
  store.commit("loading1", false);
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  store.commit("loading1", false);
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default apiServices;