import Vue from "vue";
import Vuex from "vuex";
import { toast } from "bulma-toast";
// import isAfter from "date-fns/is_after"
// import subtractMinutes from "date-fns/sub_minutes"

Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return {
      count: 1,
      isAuthenticated: false,
      isOculto: true,
      empresa: {
        nombrec: "....",
        _id: "no id",
        nit: "...",
      },
      user: null,
      tokenUser: null,
      idtoken: null,
      loading: false,
      loading1: false,
      showmodal: false,
      resultmodal: {},
      infomodal: {},
      showmodalinforme: false, // este es para el modal de informe
      modalordengraph: {
        show: false,
        info: {},
        result: {},
      },
      modalnotification: {
        show: false,
        info: {},
        result: {},
      },
      infomodalnotification: {},
      resultmodalnotification: {},
      resultinfomodal: {}, // este es para el modal de informes
      infoinformemodal: {}, // este es para el modal de informes
      isMovil: false,
      windowheight: 0,
      windowwidth: 0,
      idfrsmodal: {
        id: null,
        show: false,
      },
      structure: {
        grupos: [],
      },
    };
  },
  mutations: {
    changeidfrsmodal(state, payload) {
      state.idfrsmodal.id = payload.id;
      state.idfrsmodal.show = payload.show;
    },
    changemovil(state, payload) {
      state.isMovil = payload;
    },
    changeheight(state, payload) {
      state.windowheight = payload;
    },
    changewidth(state, payload) {
      state.windowwidth = payload;
    },
    showmodalinforme(state, payload = {}) {
      if (state.showmodalinforme) {
        state.showmodalinforme = false;
      } else {
        state.showmodalinforme = true;
        state.infoinformemodal = payload;
      }
    },
    changenotificationmodal(state, payload) {
      if (state.modalnotification.show) {
        state.modalnotification.show = false;
        state.modalnotification.result = payload.result;
        state.modalnotification.info = {};
      } else {
        state.modalnotification.show = true;
        state.modalnotification.info = payload.info;
        state.modalnotification.result = {};
      }
    },
    changeordengraph(state, payload) {
      console.log("ejecuta change ordengraph");
      if (payload.show) {
        state.modalordengraph.show = true;
        state.modalordengraph.info = payload.info;
        state.modalordengraph.result = {};
      } else {
        state.modalordengraph.show = false;
        state.modalordengraph.info = {};
        const newObj = Object.assign({}, payload.result);
        state.modalordengraph.result = newObj;
      }
    },
    resultinfomodal(state, payload) {
      state.resultinfomodal = payload;
    },
    refreshUser(state, payload) {
      // refresca el usuario
      state.user = payload;
    },
    increment(state, payload = {}) {
      // esto es algo nuevo, lo que quiere decir que si no le paso payload me crea un objeto vacío
      state.count += payload.number || 1; // si le paso un numero lo utiliza y si no utiliza el 1
    },
    decrement(state) {
      state.count--;
    },
    loading(state, payload = true) {
      state.loading = payload;
    },
    loading1(state, payload = true) {
      state.loading1 = payload;
    },
    refreshAuth(state) {
      // determina si esta autenticado o no
      if (state.user) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    refreshEmpresa(state, payload = {}) {
      // refresca el valor de la empresa
      state.empresa = payload;
    },
    decodeToken(state, payload = {}) {
      // agrega el valor del token y guarda los valores del token decodificados en token user
      state.idtoken = payload;
      const token = state.idtoken;
      localStorage.setItem("idtoken", payload);
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      jsonPayload = JSON.parse(jsonPayload);
      state.tokenUser = jsonPayload;
      localStorage.setItem("tokenUser", JSON.stringify({exp: jsonPayload.exp}));
    },
    restartStore(state) {
      state.isAuthenticated = false;
      state.empresa = {
        nombrec: "....",
        _id: "no id",
        nit: "...",
      };
      state.user = null;
      state.tokenUser = null;
      state.idtoken = null;
      state.loading = false;
    },
    showmodal(state, payload = {}) {
      if (state.showmodal) {
        state.showmodal = false;
      } else {
        state.showmodal = true;
        state.infomodal = payload;
      }
    },
    resultdatamodal(state, payload) {
      state.resultmodal = payload;
    },
    ocultarSide(state) {
      if (state.isOculto) {
        state.isOculto = false;
      } else {
        state.isOculto = true;
      }
    },

    setStructure(state, value) {
      state.structure = value;
    },
  },
  getters: {},
  actions: {
    notify(state, payload) {
      toast({
        message: payload.message,
        type: payload.type ? payload.type : "is-primary",
        dismissible: payload.dismissible ? payload.dismissible : true,
        duration: payload.duration ? payload.duration : 3000,
        position: payload.position ? payload.position : "top-right",
        closeOnClick: payload.closeOnClick ? payload.closeOnClick : true,
        pauseOnHover: payload.pauseOnHover ? payload.pauseOnHover : true,
        animate: {
          in: payload.animateIn ? payload.animateIn : "bounceIn",
          out: payload.animateOut ? payload.animateOut : "bounceOut",
        },
      });
    },
  },
});

export default store;
