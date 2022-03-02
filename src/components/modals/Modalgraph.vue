<template>
  <div class="modal" v-bind:class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <button class="button" :class="active('grafica')" @click="selectVer('grafica')">Gráfica</button>

          <button class="button" :class="active('guia')" @click="selectVer('guia')">Guías</button>
        </p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <div v-show="verGrafica">
          <y-graph v-if="dataGraphic" :datagraph="dataGraphic" height="500"></y-graph>
          <div class="table-container">
            <table v-if="dataGraphic" class="table is-narrow">
              <tr>
                <td></td>
                <td></td>
                <td v-for="(k,v) in dataGraphic.labels" :key="v">
                  <small>{{k}}</small>
                </td>
              </tr>
              <tr v-for="(k,v) in dataGraphic.data" :key="v">
                <td>
                  <i class="material-icons" v-bind:style="{'color':dataGraphic.colors[v]}">crop_din</i>
                </td>
                <td>{{dataGraphic.series[v]}}</td>
                <td v-for="(k1,v1) in k" :key="v1"><span v-if="dataGraphic.data1">{{dataGraphic.data1[v] [v1]}} |</span> {{k1}}<span v-show="dataGraphic.isporcentaje">%</span> </td>
              </tr>
            </table>
          </div>
        </div>
        <div v-show="!verGrafica">
          <div class="field is-grouped">
            <p class="control" v-for="(k,v) in guias" :key="v">
              <button
                class="button is-small"
                :class="active1(k)"
                @click="selVariable(k)"
              >{{k.variable}}</button>
            </p>
          </div>
          <div v-if="variable">
            <div v-html="variable.contenido"></div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-success"
          @click="exportExcelXls(datatransform,'Tabla')"
        >Descargar Archivo</button>
      </footer>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
import yGraph from "@/components/dashboard/Graph.vue";
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";

export default {
  data() {
    return {
      mynuevadata: [],
      verGrafica: true,
      guias: [],
      variable: null
    };
  },
  props: {
    show: Boolean,
    dataGraphic: Object
  },
  computed: {
    ...mapState(["idtoken"]),
    datatransform() {
      const series = this.dataGraphic.series;
      const labels = this.dataGraphic.labels;
      const data = this.dataGraphic.data;
      const result = [];

      labels.forEach((k, v) => {
        const d = {};
        series.forEach((k1, v1) => {
          d["variables"] = k;
          d[k1] = data[v1][v];
        });
        result.push(d);
      });
      console.log(result);
      return result;
    }
  },
  methods: {
    exportExcelXls(a, b) {
      // a es la data en json y b es el nombre del archvio como lo quiero poner para exportar debe venir sin el xlsx
      var ws = XLSX.utils.json_to_sheet(a);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
      var nombreArchivo = b + ".xlsx";
      XLSX.writeFile(wb, nombreArchivo);
    },
    selVariable(d) {
      this.variable = d;
    },
    async traeGuias(_this) {
      let result;
      try {
        result = await apiServices.get(`/guias`);
        result.data.forEach(k => {
          if (_this.dataGraphic.labels.indexOf(k.variable) !== -1) {
            _this.guias.push(k);
          }
        });
        if (_this.guias.length > 0) {
          _this.variable = _this.guias[0];
        }
      } catch (err) {
        console.log(err);
      }
    },
    active(f) {
      if (f === "grafica" && this.verGrafica) {
        return {
          "is-primary is-large": true
        };
      } else if (f === "guia" && !this.verGrafica) {
        return {
          "is-primary is-large": true
        };
      } else {
        return {
          "is-info": true
        };
      }
    },
    active1(d) {
      if (d.variable === this.variable.variable) {
        return {
          "is-primary": true
        };
      } else {
        return {
          "is-light": true
        };
      }
    },
    selectVer(d) {
      if (d === "grafica") {
        this.verGrafica = true;
      } else {
        this.traeGuias(this);
        this.verGrafica = false;
      }
    },
    closeModal() {
      this.$emit("showmodalgraph", false);
    }
  },
  components: {
    yGraph
  }
};
</script>