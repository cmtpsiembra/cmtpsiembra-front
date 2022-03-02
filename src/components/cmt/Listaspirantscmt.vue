<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-9">
          <h1 class="title is-4">
            Aspirantes del proceso por el cargo de {{ proceso.cargo }}
          </h1>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button class="button is-link" @click="irprocesos()">
                <span class="icon">
                  <span class="material-icons"> arrow_back_ios </span>
                </span>
                <span>Volver a Procesos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Documento</th>
              <th>Edad</th>
              <th>Profesión</th>
              <th>Estudios</th>
              <th>Experiencia</th>
              <th>Correo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in aspirantes" :key="index">
              <td>
                <button class="button is-small" @click="iraspirante(item._id)">
                  <span class="icon is-small">
                    <span class="material-icons"> edit </span>
                  </span>
                </button>
              </td>
              <td>
                <button
                  class="button is-small is-danger"
                  @click="eliminar(item)"
                >
                  <span class="icon is-small">
                    <span class="material-icons"> delete_forever </span>
                  </span>
                </button>
              </td>
              <td>{{ item.nombreUno }} {{ item.nombreDos }}</td>
              <td>{{ item.apellidoUno }} {{ item.apellidoDos }}</td>
              <td class="has-text-right">{{ item.cedula }}</td>
              <td class="has-text-right">{{ item.edad }}</td>
              <td>{{ item.profesion }}</td>
              <td>{{ item.estudio }}</td>
              <td class="has-text-right">{{ item.experiencia }}</td>
              <td>{{ item.correo }}</td>
              <td>
                <button class="button is-small" @click="irresultados(item._id)">
                  <span class="icon is-small">
                    <span class="material-icons"> insert_chart </span>
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>]
<script>
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
export default {
  data() {
    return {
      aspirantes: [],
      proceso: {},
    };
  },
  computed: {
    ...mapState(["modalnotification"]),
    resultnotification() {
      return this.modalnotification.result.aceptar;
    },
  },
  methods: {
    irresultados(idaspirante) {
      if (idaspirante) {
        this.$router.replace({
          name: "resultadoaspirantecmt",
          params: { aspiranteid: idaspirante },
        });
      }
    },
    async deleteaspirante(id) {
      try {
        await apiServices.delete(`/deleteaspirante/${id}`);
        this.findAspirantes();
      } catch (err) {
        console.log(err);
      }
    },
    eliminar(aspirante) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Eliminar proceso",
          message: `Realmente desea eliminar el aspirante ${aspirante.nombreUno}`,
          clase: "is-danger",
          data: aspirante._id,
        },
      });
    },
    iraspirante(idaspirante) {
      if (idaspirante) {
        this.$router.replace({
          name: "editprocesscmt",
          params: { id: idaspirante },
        });
      }
    },
    irprocesos() {
      this.$router.replace({ name: "cmtprocesos" });
    },
    async findAspirantes() {
      try {
        const procesoid = this.$route.params.procesoid;
        const result = await apiServices.get(`/aspirantescmt/${procesoid}`);
        if (result.data) {
          this.aspirantes = result.data.aspirantes;
          this.proceso = result.data.proceso;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.findAspirantes();
  },
  watch: {
    resultnotification(nv, ov) {
      if (nv) {
        this.deleteaspirante(this.modalnotification.result.data);
      }
    },
  },
};
</script>