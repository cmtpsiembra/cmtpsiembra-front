<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="title">CMT</p>
          <p class="subtitle">Cuestionario de motivación para el trabajo</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="notification">
              <h1 class="title">Administrar Procesos</h1>
              <h2 class="subtitle has-text-justified">
                En este menú podrá crear, editar y eliminar los procesos de
                selección y podrá visualizar los resultados de los procesos
                existentes, su lista de aspirantes y los resultados individuales
                de cada uno de ellos.
              </h2>
              <button class="button is-link" @click="irruta('cmtprocesos')">
                Ingresar
              </button>
            </div>
          </div>
          <div class="column">
            <div class="notification">
              <h1 class="title">Estado de Cuenta</h1>
              <h2 class="subtitle">
                Se han diligenciado
                <strong>{{ aspirantes | number() }}</strong> cuestionarios en
                <strong>{{ countprocess | number() }}</strong> procesos
              </h2>
              <div class="notification" :class="classalert()">
                <strong
                  >Cuestionarios disponibles {{ estadocuenta.saldo }}</strong
                >
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4">
            <div class="notification">
              <h1 class="title">Descargas</h1>
              <div class="buttons">
                <a
                  href="https://firebasestorage.googleapis.com/v0/b/cmtnew-1201e.appspot.com/o/CMT%20MANUAL%20.pdf?alt=media&token=ec83a323-642e-46df-9136-5b0f57209846"
                  target="_blank"
                  class="button is-info"
                >
                  <span class="icon is-small">
                    <span class="material-icons"> get_app </span> </span
                  >&nbsp;<span>Manual metodología </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
export default {
  data() {
    return {
      countprocess: 0,
      aspirantes: 0,
    };
  },
  computed: {
    ...mapState(["empresa"]),
    estadocuenta() {
      const returned = {
        saldo: this.empresa.saldocmt,
        alerta: this.empresa.alertacmt,
      };
      return returned;
    },
  },
  methods: {
    classalert() {
      if (this.estadocuenta.saldo > this.estadocuenta.alerta) {
        return "is-success";
      } else if (this.estadocuenta.saldo > 0) {
        return "is-warning";
      } else {
        return "is-danger";
      }
    },
    async findprocesos() {
      try {
        const result = await apiServices.get(`/getcountprocesoscmt`);
        if (result.data) {
          this.countprocess = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async findaspirants() {
      try {
        const result = await apiServices.get(`/getcountaspirantescmt`);
        if (result.data) {
          this.aspirantes = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    irruta(ruta) {
      this.$router.replace({ name: ruta });
    },
  },
  created() {
    this.findprocesos();
    this.findaspirants();
  },
};
</script>