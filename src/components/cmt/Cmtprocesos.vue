<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="title">Procesos</p>
          <p class="subtitle">
            En esta sección podrá crear, editar y eliminar los procesos, además
            de ver la lista de aspirantes y visualizar los resultados.
          </p>
          <button class="button" @click="irproceso()">Crear proceso</button>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="table-container">
          <table class="table is-narrow is-striped">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>Cargo</th>
                <th>Área</th>
                <th>Grupo Ocupacional</th>
                <th>País</th>
                <th>Ciudad</th>
                <th>Fecha</th>
                <th>Código</th>
                <th>Activo</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in procesos" :key="index">
                <td>
                  <button class="button is-small" @click="irproceso(item._id)">
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
                <td class="has-text-right">{{ index + 1 }}</td>
                <td>{{ item.cargo }}</td>
                <td>{{ item.area }}</td>
                <td>
                  {{ item.gocupcmt ? item.gocupcmt.nombre : "N/A" }}
                </td>
                <td>{{ item.pais }}</td>
                <td>{{ item.ciudad }}</td>
                <td>{{ item.fecha | date() }}</td>
                <td>{{ item.codigo }}</td>
                <td>{{ item.activo }}</td>
                <td>
                  <button
                    class="button is-small"
                    @click="iraspirantes(item._id)"
                  >
                    <span class="icon is-small">
                      <span class="material-icons"> account_circle </span>
                    </span>
                  </button>
                </td>
                <td>
                  <button
                    class="button is-small"
                    @click="irResProceso(item._id)"
                  >
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
  </div>
</template>

<script>
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
export default {
  data() {
    return {
      procesos: [],
    };
  },
  computed: {
    ...mapState(["modalnotification"]),
    resultnotification() {
      return this.modalnotification.result.aceptar;
    },
  },
  methods: {
    irResProceso(idproceso) {
      this.$router.replace({
        name: "resultadoprocesocmt",
        params: { procesoid: idproceso },
      });
    },
    eliminar(proceso) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Eliminar proceso",
          message: `Realmente desea eliminar el proceso ${proceso.cargo}`,
          clase: "is-danger",
          data: proceso._id,
        },
      });
    },
    iraspirantes(idproceso) {
      if (idproceso) {
        this.$router.replace({
          name: "listaspirantescmt",
          params: { procesoid: idproceso },
        });
      }
    },
    irproceso(idproceso) {
      if (idproceso) {
        this.$router.replace({
          name: "editprocesscmt",
          params: { id: idproceso },
        });
      } else {
        this.$router.replace({ name: "creaprocesscmt" });
      }
    },
    async findprocess() {
      try {
        const result = await apiServices.get(`/getprocesoscmt`);
        if (result.data) {
          this.procesos = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteproceso(id) {
      try {
        const result = await apiServices.delete(`/deleteproceso/${id}`);
        if (result.data) {
          if (result.data.message === "aspirantes") {
            this.$store.dispatch("notify", {
              message:
                "No se puede eliminar el proceso, debido a que tiene aspirantes asociados",
              type: "is-danger",
              position: "top-center",
              duration: 3000,
            });
          } else {
            this.findprocess();
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.findprocess();
  },
  watch: {
    resultnotification(nv, ov) {
      if (nv) {
        this.deleteproceso(this.modalnotification.result.data);
      }
    },
  },
};
</script>