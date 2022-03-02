<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title has-text-white is-2">Líderes PhD</h1>
          <h2 class="subtitle has-text-white is-4">Personas que hacen la diferencia</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <table class="table">
          <tr>
            <th></th>
            <th>Proceso</th>
            <th>Controles</th>
          </tr>
          <tr v-for="(k,v) in listprocesos" :key="v">
            <td>{{v+1}}</td>
            <td>{{k.nombre}}</td>
            <td>
              <router-link
                :to="{ name: 'resultlider', params: { procesoid: k._id, liderid: user.empleado } }"
                class="button is-info"
              >
                <span class="icon">
                  <i class="material-icons">visibility</i>
                </span>
              </router-link>
            </td>
          </tr>
        </table>
      </div>
    </section>
  </div>
</template>
<script>
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
export default {
  data() {
    return {
      listprocesos: [],
      user: {},
    };
  },
  computed: {
    ...mapState(["idtoken", "tokenUser"]),
    resultnotification() {
      return this.modalnotification.result.aceptar;
    },
  },
  methods: {
    async deleteProceso(_this, id) {
      try {
        const result = await apiServices.delete(`/proceso/${id}`);
        if (result.data) {
          if (result.data.message === "eliminar relaciones") {
            this.$store.dispatch("notify", {
              message:
                "No se elimino el Proceso. Debe eliminar primero las relaciones.",
              type: "is-warning",
              duration: 4000,
              position: "top-center",
            });
          }
          _this.traeprocesos();
        }
      } catch (err) {
        console.log("ocurrio un error", err);
      }
    },
    async traeprocesos() {
      this.listprocesos = [];
      let result;
      try {
        result = await apiServices.get(`/listliderprocesos`);
        if (result.data) {
          this.listprocesos = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async traeusuario() {
      this.listprocesos = [];
      let result;
      try {
        result = await apiServices.get(`/usermg/${this.tokenUser.user_id}`);
        if (result.data) {
          this.user = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.traeprocesos();
    this.traeusuario();
  },
};
</script>