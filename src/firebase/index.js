import store from "../store";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // esto es para la base de datos
import "firebase/storage"; // esto es para el storage
import router from "../routes";
import apiServices from "@/services/yungol-services";

// cincel produccion
const config = {
  apiKey: "AIzaSyAGUh1mpxxe2bqNjDVJFR1IzaQYAdBkD8c",
  authDomain: "cmtnew-1201e.firebaseapp.com",
  projectId: "cmtnew-1201e",
  storageBucket: "cmtnew-1201e.appspot.com",
  messagingSenderId: "261576031684",
  appId: "1:261576031684:web:8ebb30fdcd98a8e3127891",
  measurementId: "G-60KMTG762N",
};

export default {
  install: (Vue, options) => {
    firebase.initializeApp(config);
    const auth = firebase.auth();
    Vue.prototype.$auth = {
      login: async (username, pass) => {
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        return auth.signInWithEmailAndPassword(username, pass);
      },
      loginGoogle: async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        return auth.signInWithPopup(provider);
      },
      logout: async () => {
        await auth.signOut();
        store.commit("restartStore");
      },
      sendPasswordResetEmail: async (email) => {
        await auth.sendPasswordResetEmail(email, {
          url: "https://cmtpsiembra.com",
        });
      },
    };
    Vue.prototype.$fire = {
      putimg: (file) => {
        return firebase
          .storage()
          .ref("images/" + new Date().getTime() + "-" + file.name)
          .put(file);
      },
      reffile: (file) => {
        return firebase
          .storage()
          .ref("files/" + new Date().getTime() + "-" + file.name)
          .put(file);
      },
      refexcel: (file) => {
        return firebase
          .storage()
          .ref("excel/" + new Date().getTime() + "-" + file.name)
          .put(file);
      },
      reflideres: (file) => {
        return firebase
          .storage()
          .ref("lideres/" + new Date().getTime() + "-" + file.name)
          .put(file);
      },
    };
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("loggedin", "true");
        store.commit("refreshUser", user);
        store.commit("refreshAuth");
        user.getIdToken().then(
          (idtoken) => {
            store.commit("decodeToken", idtoken);
            if (store.state.tokenUser.admin || store.state.tokenUser.cmt) {
              store.commit("refreshAuth");
              apiServices
                .get(`/empresacredential`, {
                  headers: {
                    Authorization: "Bearer " + idtoken,
                  },
                })
                .then((empresa) => {
                  store.commit("refreshEmpresa", empresa.data);
                });
            } else {
              localStorage.removeItem("loggedin");
              store.commit("restartStore");
              router.replace({
                name: "logout",
              });
            }
          },
          (error) => {
            store.commit("restartStore");
            console.log(error);
          }
        );
      } else {
        localStorage.removeItem("loggedin");
        store.commit("restartStore");
      }
    });
  },
};
