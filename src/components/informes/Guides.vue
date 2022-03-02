<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">Listado de Guías</h1>
              <h2 class="subtitle">Lista de guías creadas en el sistema</h2>
            </div>
            <div class="column">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input class="input is-large" type="text" v-model="search" placeholder="Buscar" />
                  <span class="icon is-medium is-left">
                    <i class="material-icons">search</i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <br />
    <div class="container">
      <div class="buttons has-addons is-right">
        <router-link
          :to="{ name: 'creainforme'}"
          class="button is-primary is-rounded is-medium tooltip"
          data-tooltip="Crear guía"
        >
          <span class="icon">
            <i class="material-icons">add</i>
          </span>
        </router-link>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>
                <h5 class="title is-5">Nombre de la Guia</h5>
              </th>
              <th>Variable</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(guia,index) in filteredItems" :key="index">
              <td>
                <h5 class="subtitle is-5">{{index +1}}</h5>
              </td>
              <td>
                <a
                  v-show="!showformeditnameguide(guia, index)"
                  class="is-size-5"
                  @click="showeditnameguide(guia, index)"
                >{{guia.nickname}}</a>
                <div v-show="showformeditnameguide(guia, index)" class="field has-addons">
                  <div class="control is-expanded">
                    <input
                      v-model="guia.nickname"
                      class="input is-medium"
                      type="text"
                      placeholder="Nombre"
                    />
                  </div>
                  <div class="control">
                    <a class="button is-info is-medium" @click="changenameguide(guia)">Cambiar</a>
                  </div>
                  <div class="control">
                    <a class="button is-light is-medium" @click="cancelnameguide">Cancelar</a>
                  </div>
                </div>
                <div class="box" v-show="showguides(guia,index)">
                  <div v-html="guia.contenido"></div>
                </div>
              </td>
              <td>
                <h6 class="subtitle is-6">{{guia.variable}}</h6>
              </td>
              <td>
                <span
                  class="icon has-text-info hand"
                  v-show="!showguides(guia,index)"
                  @click="showmeguides(guia._id, index)"
                >
                  <i class="material-icons">visibility</i>
                </span>
                <span
                  class="icon has-text-danger hand"
                  v-show="showguides(guia,index)"
                  @click="cancelshowmeguide(guia._id, index)"
                >
                  <i class="material-icons">visibility_off</i>
                </span>
                <span class="icon has-text-dark hand">
                  <i class="material-icons">edit</i>
                </span>
                <span class="icon has-text-danger hand" @click="eliminar(guia)">
                  <i class="material-icons">delete_forever</i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container">
        <div class="buttons has-addons is-right">
          <button
            class="button is-primary is-rounded tooltip"
            data-tooltip="Ir arriba"
            @click="scrollTop()"
          >
            <span class="icon">
              <i class="material-icons">arrow_upward</i>
            </span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
const filterItems = (query, data) => {
  return data.filter(el => {
    const texto = el.nickname + el.variable;
    if (texto.toLowerCase().indexOf(query.toLowerCase()) > -1) {
      return el;
    }
  });
};
export default {
  data() {
    return {
      guias: [],
      showguide: {
        guide: "",
        index: ""
      },
      search: "",
      showformgui: {
        guide: "",
        index: ""
      }
    };
  },
  computed: {
    ...mapState(["idtoken", "modalnotification"]),
    resultnotification() {
      return this.modalnotification.result.aceptar;
    },
    filteredItems: function() {
      return filterItems(this.search, this.guias);
    }
  },

  methods: {
    showguides(guia, index) {
      if (index === this.showguide.index) {
        return true;
      } else {
        return false;
      }
    },
    changenameguide(guide) {
      this.editnameGuide(this, guide);
      this.showformgui.index = "";
      this.showformgui.guide = "";
    },
    showmeguides(guide, index) {
      this.showguide.guide = guide;
      this.showguide.index = index;
    },
    cancelshowmeguide(guide, index) {
      this.showguide.guide = "";
      this.showguide.index = "";
    },
    cancelnameguide() {
      this.showformgui.index = "";
      this.showformgui.guide = "";
    },
    showformeditnameguide(guide, index) {
      if (index === this.showformgui.index) {
        return true;
      } else {
        return false;
      }
    },
    showeditnameguide(guide, index) {
      this.showformgui.guide = guide;
      this.showformgui.index = index;
    },
    eliminar(guia) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Cuidado !",
          message: "Realmente desea eliminar la guía?",
          clase: "is-danger",
          data: guia._id
        }
      });
    },
    async editnameGuide(_this, data) {
      let result;
      try {
        result = await apiServices.post(`/editnameguides`, data);
        this.informes.forEach(function(k) {
          if (k.id === result.data._id) {
            k.nickname = result.data.nickname;
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteGuides(_id) {
      try {
        await apiServices.delete(`/guias/${_id}`);
        this.$store.dispatch("notify", {
          message: `La guía fue eliminada con éxito`,
          type: "is-link"
        });
        this.traeGuides(this);
      } catch (err) {
        this.$store.dispatch("notify", {
          message: `Hubo un problema no se pudo eliminar la guía`,
          type: "is-danger"
        });
        console.log(err);
      }
    },
    async traeGuides(_this) {
      let result;
      try {
        result = await apiServices.get(`/guias`);
        _this.guias = result.data;
      } catch (err) {
        console.log(err);
      }
    },
    scrollTop() {
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: 5
      });
    }
  },
  watch: {
    idtoken(nv, ov) {
      if (nv) {
        this.traeGuides(this);
      }
    },
    resultnotification(nv, ov) {
      if (nv) {
        this.deleteGuides(this.modalnotification.result.data);
      }
    }
  },

  created() {
    this.traeGuides(this);
  }
};
</script>