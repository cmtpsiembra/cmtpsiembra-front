<template>
  <section>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">Informes</h1>
              <h2 class="subtitle">Lista de Plantillas</h2>
            </div>
            <div class="column">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input class="input is-large" type="text" v-model="search" placeholder="Buscar" />
                  <span class="icon is-medium is-left">
                    <i class="material-icons">search</i>
                  </span>
                  <span class="icon is-medium is-right">
                    <i class="fas fa-check fa-lg"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>Informe</th>
              <th>Controles</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="info in filteredItems" :key="info.$index">
              <td>{{info.$index}}</td>
              <td>
                <h5 class="title is-4">{{info.nombre}}</h5>
              </td>
              <td>
                <button class="button is-danger" @click="eliminar(info)">
                  <span class="icon">
                    <i class="material-icons">delete_forever</i>
                  </span>
                </button>
                <router-link
                  :to="{ name: 'editinforme', params: { tipo:'plantilla',id: info.id } }"
                  class="button is-info"
                >
                  <span class="icon">
                    <i class="material-icons">edit</i>
                  </span>
                </router-link>
                <button
                  class="button"
                  :class="{'is-warning': info.isfrs, 'is-light': !info.isfrs }"
                  @click="selectasfrs(info)"
                >
                  <strong>F</strong>
                  <!-- <span class="icon">
                    <i class="material-icons">star</i>
                  </span>-->
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
import functions from "@/helpers/functions";
export default {
  data() {
    return {
      isfrs: false,
      plantillas: [],
      search: ""
    };
  },
  computed: {
    ...mapState(["idtoken", "modalnotification"]),
    resultnotification() {
      return this.modalnotification.result.aceptar;
    },
    filteredItems: function() {
      return functions.filterItems(this.search, this.plantillas, [
        { cod: "nombre" }
      ]);
    }
  },
  methods: {
    async selectasfrs(info) {
      const query = {
        id: info.id
      }
      try {
        const result = await apiServices.post(`/editasfrs`, query);
        if (result.data) {
          this.traeInformes(this);
        }
      } catch (err) {
        console.log(err);
      }
    },
    eliminar(inf) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Cuidado !",
          message: "Realmente desea eliminar la plantilla?",
          clase: "is-danger",
          data: inf.id
        }
      });
    },
    async traeInformes(_this) {
      let result;
      try {
        result = await apiServices.get(`/plantillas`);
        _this.plantillas = [];
        result.data.forEach(el => {
          const d = {
            nombre: el.title,
            id: el._id,
            isfrs: el.isfrs
          };
          _this.plantillas.push(d);
        });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteInformes(_this, id) {
      try {
        await apiServices.delete(`/plantilla/${id}`);
        _this.traeInformes(_this);
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    if (this.idtoken) {
      this.traeInformes(this);
    }
  },
  watch: {
    idtoken(nv, ov) {
      if (nv) {
        this.traeInformes(this);
      }
    },
    resultnotification(nv, ov) {
      if (nv) {
        this.deleteInformes(this, this.modalnotification.result.data);
      }
    }
  }
};
</script>