<template>
  <div class="modal" v-bind:class="{ 'is-active': modalordengraph.show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"></p>
        <div class="buttons has-addons is-right">
          <button class="delete is-right" aria-label="close" @click="closeModal"></button>
        </div>
      </header>
      <section class="modal-card-body">
        <div class="columns is-vcentered">
          <div class="column is-8">
            <p class="bd-notification is-primary">
              <y-graphiccreator
                :grupos="newgrupo"
                :variables="newvar"
                :control="control"
                @changedata="changedata"
              ></y-graphiccreator>
            </p>
          </div>
          <div class="column">
            <p class="bd-notification is-primary"></p>
            <div class="panel-top">
              <a class="panel-block" v-for="serie in datagraph.series" :key="serie">
                <div class="field">
                  <input
                    class="is-checkbox"
                    required
                    type="checkbox"
                    v-bind:value="serie"
                    v-model="checkedSeries"
                  />
                  <label for>{{ serie }}</label>
                </div>
              </a>
            </div>
            <span>Orden seleccionado: {{ checkedSeries }}</span>
            <br />
            <br />
            <button
              v-if="datagraph.series"
              class="button is-link"
              @click="ordergraph"
              :disabled="!(datagraph.series.length == Object.keys(checkedSeries).length)"
            >Ordenar</button>
          </div>
        </div>
        <footer>
          <button class="button is-info is-large" @click="aceptar">Aceptar</button>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
// import yGraph from "@/components/dashboard/Graph.vue";
import yGraphiccreator from "@/components/graficas/Graphiccreator.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      control: 0,
      checkedSeries: [],
      datamodificada: {},
      datagraph: {},
      coordenadas: {},
      dataoriginal: {}
    };
  },
  computed: {
    ...mapState(["modalordengraph"]),
    cambioshow() {
      return this.modalordengraph.show;
    },
    newvar() {
      const dat = this.datagraph;
      const variables = [];
      if (dat.labels) {
        if (dat.typeGraphic === "pie") {
          dat.series.forEach(k => {
            const d = {
              cod: k,
              check: true
            };
            variables.push(d);
          });
        } else {
          dat.labels.forEach(k => {
            const d = {
              cod: k,
              check: true
            };
            variables.push(d);
          });
        }
      }
      return variables;
    },
    newgrupo() {
      const dat = this.datagraph;
      const grupos = [];
      if (dat.series) {
        if (dat.typeGraphic === "pie") {
          dat.data.forEach((k, v) => {
            const d = {};
            d.Grupo = "NA";
            d.SubGrupo = "NA";
            dat.series.forEach((k1, v1) => {
              d[k1] = {
                sum: dat.data[v][v1]
              };
            });
            grupos.push(d);
          });
        } else {
          dat.series.forEach((k, v) => {
            const d = {};
            d.Grupo = "NA";
            d.SubGrupo = k;
            dat.labels.forEach((k1, v1) => {
              d[k1] = {
                sum: dat.data[v][v1]
              };
            });
            grupos.push(d);
          });
        }
      }
      return grupos;
    }
  },
  methods: {
    aceptar() {
      this.$store.commit("changeordengraph", {
        show: false,
        result: {
          data: this.datagraph,
          coordenadas: this.coordenadas
        }
      });
    },
    changedata(d) {
      this.datagraph = d;
      console.log("la datamodificada es", this.datagraph);
    },
    ordergraph() {
      const _this = this;
      const dat = [];
      _this.dataoriginal = {};
      console.log('la datagraph antes de ordenar',_this.datagraph);
      this.datagraph.series.forEach((e, v) => {
        _this.dataoriginal[e] = _this.datagraph.data[v];
      });
      this.datagraph.series = this.checkedSeries;
      this.checkedSeries.forEach(e => {
        dat.push(_this.dataoriginal[e]);
      });
      this.datagraph.data = dat;
      this.control++;
    },
    closeModal() {
      this.$store.commit("changeordengraph", {
        show: false,
        result: {}
      });
    }
  },
  watch: {
    cambioshow(nv, ov) {
      if (nv) {
        console.log('abro el modal de modificar data y me viene la siguiente data',this.modalordengraph);
        this.checkedSeries = [];
        this.datagraph = this.modalordengraph.info;
        this.coordenadas = this.modalordengraph.info.coordenadas;
        this.control++;
      }
    }
  },
  components: {
    // yGraph,
    yGraphiccreator
  }
};
</script>