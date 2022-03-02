<template>
  <section class="hero is-dark is-bold is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="card">
            <div class="hero is-warning">
              <div class="hero-body">
                <div class="container">
                  <span>
                    <img width="80%" src="@/assets/logo2.png" alt="Logo" />
                  </span>
                  <h5 class="subtitle has-text-dark" style="font-size: 11px">
                    CUESTIONARIO DE MOTIVACIÓN PARA EL TRABAJO
                  </h5>
                </div>
              </div>
            </div>
            <div v-show="!forget" class="hero is-white">
              <div class="hero-body">
                <div class="container">
                  <form method="POST" @submit.prevent="login()">
                    <div class="google-btn" @click="loginGoogle()">
                      <div class="google-icon-wrapper">
                        <img
                          class="google-icon"
                          src="@/assets/googlelogo.svg"
                        />
                      </div>
                      <p class="btn-text">
                        <b>Iniciar con Google</b>
                      </p>
                    </div>
                    <div class="field">
                      <div class="control has-icons-left">
                        <input
                          class="input is-large"
                          type="email"
                          v-model="user.email"
                          placeholder="Correo"
                          autofocus
                        />
                        <span class="icon is-medium is-left">
                          <i class="material-icons">email</i>
                        </span>
                      </div>
                    </div>

                    <div class="field">
                      <div class="control has-icons-left">
                        <input
                          class="input is-large"
                          type="password"
                          v-model="user.password"
                          placeholder="Password"
                        />
                        <span class="icon is-medium is-left">
                          <i class="material-icons">security</i>
                        </span>
                      </div>
                    </div>
                    <button
                      class="button is-block is-dark is-large is-fullwidth"
                    >
                      Iniciar Sesión
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div v-show="forget" class="hero">
              <div class="hero-body">
                <div class="container">
                  <h5 class="subtitle is-6 has-text-dark">
                    Ingresa tu correo y te enviaremos un correo para restablecer
                    tu contraseña
                  </h5>

                  <div class="field">
                    <div class="control has-icons-left">
                      <input
                        class="input is-large"
                        type="email"
                        v-model="email"
                        placeholder="Correo"
                        autofocus
                      />
                      <span class="icon is-medium is-left">
                        <i class="material-icons">email</i>
                      </span>
                    </div>
                  </div>
                  <button
                    @click="changePass"
                    class="button is-block is-link is-large is-fullwidth"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p>
            <a
              @click="forget = true"
              v-show="!forget"
              class="has-text-grey-light"
              >¿Olvidaste tu contraseña?</a
            >
            <a
              @click="forget = false"
              v-show="forget"
              class="has-text-grey-light"
              >Iniciar Sesión</a
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
// import * as firebase from "firebase/app";
// import "firebase/auth";
import apiServices from "@/services/yungol-services";

export default {
  data() {
    return {
      user: {},
      email: "",
      forget: false,
    };
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    async login() {
      let data;
      let token;
      let response;
      if (this.user.email && this.user.password) {
        try {
          data = await this.$auth.login(this.user.email, this.user.password);
          token = await data.user.getIdToken();
          response = await apiServices.get(`/usermg/${data.user.uid}`, {
            headers: { Authorization: "Bearer " + token },
          });
          if (response.data) {
            localStorage.setItem("loggedin", "true");
            this.$store.dispatch("notify", {
              message: `Hola ${data.user.displayName}`,
              duration: 5000,
            });
          } else {
            this.$auth.logout();

            // firebase.auth().signOut();
            // data.user.delete();
            this.$store.dispatch("notify", {
              message: "Lo sentimos, no tienes permisos de ingreso.",
              type: "is-danger",
              position: "top-center",
            });
          }
        } catch (error) {
          console.log(error);
          if (error.code === "auth/user-not-found") {
            this.$store.dispatch("notify", {
              message: "Lo sentimos, no tienes permisos de ingreso.",
              type: "is-danger",
              position: "top-center",
              duration: 5000,
            });
          } else if (error.code === "auth/wrong-password") {
            this.$store.dispatch("notify", {
              message: "Contraseña incorrecta",
              type: "is-danger",
              position: "top-center",
            });
          } else {
            this.$store.dispatch("notify", {
              message:
                "Ocurrio un error. Contactenos a soportecontable@yungol.com",
              type: "is-danger",
              position: "top-center",
              duration: 5000,
            });
          }
        }
      } else {
        this.$store.dispatch("notify", {
          message: "Ambos campos deben tener información.",
          type: "is-danger",
          position: "top-center",
          duration: 5000,
        });
      }
    },
    cancelLoading(_this) {
      setTimeout(function () {
        _this.$store.commit("loading", false);
      }, 1500);
    },
    async loginGoogle() {
      let data;
      let token;
      let response;
      let empresa;
      try {
        data = await this.$auth.loginGoogle();
        this.$store.commit("loading");
        token = await data.user.getIdToken();
        this.$store.commit("decodeToken", token);
        if (
          this.$store.state.tokenUser.admin ||
          this.$store.state.tokenUser.cmt
        ) {
          response = await apiServices.get(`/usermg/${data.user.uid}`, {
            headers: { Authorization: "Bearer " + token },
          });
          if (response.data) {
            localStorage.setItem("loggedin", "true");
            empresa = await apiServices.get(`/empresacredential`, {
              headers: { Authorization: "Bearer " + token },
            });
            this.$store.commit("refreshEmpresa", empresa.data);
            this.cancelLoading(this);
            this.$store.dispatch("notify", {
              message: `Hola ${data.user.displayName}`,
            });
          } else {
            this.$auth.logout();
            // firebase.auth().signOut();
            // data.user.delete();
            this.$store.dispatch("notify", {
              message: "Lo sentimos, no tienes permisos de ingreso.",
              type: "is-danger",
              position: "top-center",
              duration: 5000,
            });
            this.cancelLoading(this);
          }
        } else {
          this.$auth.logout();
          // firebase.auth().signOut();
          // data.user.delete();
          this.$store.dispatch("notify", {
            message: "Lo sentimos, no tienes permisos de ingreso.",
            type: "is-danger",
            position: "top-center",
            duration: 5000,
          });
          this.cancelLoading(this);
        }
      } catch (error) {
        console.log(error);
        this.$store.commit("loading", false);
        this.$store.dispatch("notify", {
          message: "Ocurrio un error. Contactenos a soportecontable@yungol.com",
          type: "is-danger",
          position: "top-center",
          duration: 5000,
        });
      }
    },
    async changePass() {
      try {
        await this.$auth.sendPasswordResetEmail(this.email, {
          url: "https://cmtpsiembra.com",
        });
        this.$store.dispatch("notify", {
          message:
            "Perfecto. El correo fue enviado, revisa tu bandeja de entrada.",
          type: "is-link",
          position: "top-center",
        });
      } catch (error) {
        console.log(error);
        this.$store.dispatch("notify", {
          message: "El usuario no existe.",
          type: "is-danger",
          position: "top-center",
          duration: 5000,
        });
      }
    },
  },
  watch: {
    isAuthenticated(newv, oldv) {
      if (newv) {
        this.$router.push("cmt");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669f2;

.google-btn {
  height: 50px;
  background-color: $google-blue;
  border-radius: 2px;
  margin-bottom: 12px;
  cursor: pointer;
  // box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
  .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 48px;
    height: 48px;
    border-radius: 2px;
    background-color: $white;
  }
  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: -12px;
    width: 26px;
    height: 26px;
  }
  .btn-text {
    float: left;
    margin: 10px 11px 0 67px;
    color: $white;
    font-size: 18px;
    letter-spacing: 0.2px;
  }
  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }
  &:active {
    background: $button-active-blue;
  }
}
</style>