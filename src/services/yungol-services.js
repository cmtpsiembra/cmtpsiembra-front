import axios from "axios";
import store from "../store";

const apiServices = axios.create({
  baseURL: process.env.API_URL
});

function getIdtoken() {// Esta funcion es para que cuando recargue la pagina pero ya expiro el token, le de tiempo a que se autentique con google
  return new Promise(function(resolve, reject) {
    setTimeout(async function() {
      try {
        const idtoken = await store.state.user.getIdToken(true);
        resolve(idtoken);
      } catch (err) {
        reject(err);
      }
    }, 800);
  });
}

// apiServices.defaults.headers.common['Authorization'] = "Bearer " + store.state.idtoken;

// Add a request interceptor
apiServices.interceptors.request.use(
  async function(config) {
    store.commit("loading1", true);
    let loggedin = localStorage.getItem("loggedin");
    loggedin = JSON.parse(loggedin);
    if (loggedin) {
      let idtoken = localStorage.getItem("idtoken");
      let tokenUser = localStorage.getItem("tokenUser");
      tokenUser = JSON.parse(tokenUser);
      config.headers.Authorization = "Bearer " + idtoken;
      const ya = Math.floor(+new Date() / 1000);
      let dif = (tokenUser.exp - ya) * 1000;
      dif = dif - 50000;
      if (dif < 0) {
        let idtoken;
        if (store.state.user) {
          idtoken = await store.state.user.getIdToken(true);
        } else {
          idtoken = await getIdtoken();
        }
        store.commit("decodeToken", idtoken);
        config.headers.Authorization = "Bearer " + store.state.idtoken;
        return config;
      } else {
        return config;
      }
    } else {
      console.log("no esta autenticado");
      return config;
    }
    // Do something before request is sent
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiServices.interceptors.response.use(
  function(response) {
    store.commit("loading1", false);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    store.commit("loading1", false);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default apiServices;
