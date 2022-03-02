// import * as firebase from 'firebase/app';
// import 'firebase/auth';
import Vue from "vue";
import App from "@/App.vue";
import { sync } from "vuex-router-sync";
import router from "@/routes";
import store from "@/store";
import FirebaseAuthPlugin from "@/firebase";
import number from "@/filters/numbers";

Vue.config.productionTip = false;
Vue.use(FirebaseAuthPlugin);

Vue.use(number);

sync(store, router);

new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
});
