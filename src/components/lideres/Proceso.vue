<template>
  <section class="section">
    <h1 class="title">Proceso</h1>
    <h2 class="subtitle">Seleccione el proceso en el que va a trabajar</h2>
    <div class="field has-addons">
      <div class="control">
        <input class="input is-large" v-model="nombre" type="text" placeholder="Nombre" />
      </div>
      <button class="button is-info is-large" @click="crear">
        <span class="icon">
          <i class="material-icons">add_circle_outline</i>
        </span>
        <span>Crear</span>
      </button>
    </div>

    <hr />
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
          <div class="buttons">
            <button class="button is-info" @click="seleccionar(k)">
              <span class="icon">
                <i class="material-icons">check</i>
              </span>
            </button>
            <button class="button is-danger" @click="eliminar(k)">
              <span class="icon">
                <i class="material-icons">delete_forever</i>
              </span>
            </button>
          </div>
        </td>
      </tr>
    </table>
  </section>
</template>
<script>
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";

export default {
  data() {
    return {
      nombre: "",
      listprocesos: []
    };
  },
  computed: {
    ...mapState(["idtoken", "modalnotification"]),
    resultnotification() {
      return this.modalnotification.result.aceptar;
    }
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
              position: "top-center"
            });
          }
          _this.traeprocesos();
        }
      } catch (err) {
        console.log("ocurrio un error", err);
      }
    },
    eliminar(inf) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Cuidado !",
          message: "Realmente desea eliminar el proceso?",
          clase: "is-danger",
          data: inf._id
        }
      });
    },
    seleccionar(d) {
      this.$emit("selproceso", d);
    },
    async crear() {
      let result;
      try {
        result = await apiServices.post(
          `/createliderproceso`,
          { nombre: this.nombre }
        );
        if (result.data) {
          this.$store.dispatch("notify", {
            message: "Perfecto!. Proceso Creado."
          });
          this.traeprocesos();
        }
      } catch (err) {
        console.log(err);
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
    }
  },
  watch: {
    resultnotification(nv, ov) {
      if (nv) {
        this.deleteProceso(this, this.modalnotification.result.data);
      }
    }
  },
  created() {
    this.traeprocesos();
  }
};
</script>