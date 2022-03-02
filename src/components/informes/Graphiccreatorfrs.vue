<template>
  <div class="box">
    <div class="buttons is-centered">
      <span
        v-for="(k,v) in riesgos.numeros"
        :key="v"
        class="button is-light tooltip"
        :data-tooltip="traetitulo(k)"
        @click="rotagrafica(k)"
      >{{k}}</span>
    </div>
    <div v-if="datafactores">
      Filtros
      <div v-if="datafrs" class="buttons is-centered">
        <button
          v-for="(k,v) in dataviewfrs.agrupadoras.sinagr"
          class="button is-small"
          v-bind:class="active(k)"
          :key="v"
          @click="selAgrupador(dataviewfrs.agrupadoras.original[v])"
        >{{k | agryear()}}</button>
      </div>
      <div v-if="selectAgrupador" class="buttons is-centered">
        <button
          class="button is-small"
          v-bind:class="active1(k1)"
          v-for="(k1,v1) in agrupadorfiltrado[selectAgrupador].SubGrupo"
          :key="v1"
          @click="selSubGrupo(k1,selectAgrupador)"
        >{{k1}}</button>
      </div>
      <div class="buttons is-centered">
        <button class="button is-link is-small" @click="limpiarfiltro">Quitar filtros</button>
      </div>
      <h1 class="subtitle is-6">
        {{titulo}}
        <span v-for="(k,v) in filtro" :key="v">| {{k.gr | agryear()}} {{k.subgr}}</span>
      </h1>
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input
            class="input is-large"
            v-model="namegraph"
            type="text"
            placeholder="Nombre de la gráfica"
          />
        </p>
        <p class="control">
          <a class="button is-info is-large" @click="guardarGrafica()">Guardar</a>
        </p>
      </div>
      <br />
      <br />

      <y-graph :datagraph="datafactores" :cambio="cambio"></y-graph>
      <div class="table-container">
        <table class="table">
          <tr>
            <td>Nivel</td>
            <td v-for="(k,v) in datafactores.labels" :key="v">{{k}}</td>
          </tr>
          <tr v-for="(k,v) in datafactores.data" :key="v">
            <td>
              <span>
                <i
                  class="material-icons icon-lista"
                  :style="{'color':datafactores.colors[v]}"
                >crop_din</i>
              </span>
              {{datafactores.series[v]}}
            </td>
            <td v-for="(k1,v1) in k" :key="v1">{{datafactores.data1[v][v1]}} | {{k1}}%</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import yGraph from "@/components/dashboard/Graph.vue";
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
export default {
  props: {
    idfrs: {
      type: String
    },
    cambio1: Number
  },
  data() {
    return {
      namegraph: "",
      dataAguardar: {},
      graficasaguardar: [],
      agrupadorfiltrado: {},
      dataviewfrs: {},
      avaceupload: 0,
      dataSave: {},
      cambio: 0,
      datafactores: null,
      titulo: null,
      subgrupos: [],
      selectAgrupador: null,
      selectSubgrupo: null,
      filtro: [],
      datafrs: null,
      nombre: "",
      riesgos: {
        numeros: []
      },
      horizontal: false
    };
  },
  computed: {
    datafrs1() {
      return this.dataviewfrs.data;
    },
    ...mapState(["idtoken","empresa"])
  },
  methods: {
    async traeData1(_this) {
      let result;
      try {
        result = await apiServices.get(`/informefrs/${_this.idfrs}`);
        _this.dataviewfrs = result.data;
        _this.agrupadorfiltrado = {
          original: result.data.agrupadoras.original,
          sinagr: result.data.agrupadoras.sinagr
        };
        result.data.agrupadoras.original.forEach(e => {
          _this.agrupadorfiltrado[e] = {
            SubGrupo: []
          };
          result.data.agrupadoras[e].SubGrupo.forEach(e1 => {
            if (e1) {
              _this.agrupadorfiltrado[e].SubGrupo.push(e1);
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
    rotagrafica(k) {
      if (this.horizontal) {
        this.horizontal = false;
        this.creaFactores(k, "horizontalBar");
      } else {
        this.horizontal = true;
        this.creaFactores(k);
      }
    },
    traetitulo(k) {
      const length = this.riesgos[k].original.length;
      return this.riesgos[k].modificado[length - 1];
    },
    async guardarGrafica() {
      const _this = this;
      if (!this.namegraph) {
        this.$store.dispatch("notify", {
          message: "Debe agregarle un nombre a la gráfica",
          type: "is-warning",
          position: "top-center",
          duration: 5000
        });
        return false;
      }

      const dataGuardar = {
        datos: {
          isporcentaje: true,
          data: _this.datafactores.data,
          labels: _this.datafactores.labels,
          series: _this.datafactores.series,
          datasetOverride: _this.datafactores.datasetOverride,
          options: _this.datafactores.options,
          colors: _this.datafactores.colors
        },
        viewfrs: _this.dataviewfrs._id,
        tipografica: _this.datafactores.typeGraphic,
        nombre: _this.namegraph,
        cliente: _this.empresa._id
      };
      if (_this.datafactores.data1) {
        dataGuardar.datos.data1 = _this.datafactores.data1;
      }
      let result;
      try {
        result = await apiServices.post(`/partes`, dataGuardar);
        if (result.data) {
          this.$store.dispatch("notify", {
            message: "Perfecto!. Gráfica guardada."
          });
          this.namegraph = "";
          this.limpiarfiltro();
        }
      } catch (err) {
        console.log(err);
      }
    },
    active(f) {
      const f1 = "AGR-" + f;
      if (f1 === this.selectAgrupador) {
        return {
          "is-primary": true
        };
      } else {
        return {
          "is-light": true
        };
      }
    },
    active1(d) {
      let control = false;
      this.filtro.forEach(function(k) {
        if (k.subgr === d) {
          control = true;
        }
      });
      if (control) {
        return "is-primary";
      } else {
        return "is-light";
      }
    },
    selAgrupador(d) {
      this.subgrupos = this.agrupadorfiltrado[d].SubGrupo;
      this.selectAgrupador = d;
    },
    selSubGrupo(subgrupo, grupo) {
      const g = JSON.parse(JSON.stringify(grupo));
      const s = JSON.parse(JSON.stringify(subgrupo));
      this.selectSubgrupo = s;
      let control = false;
      let aborrar = 0;
      let aborrarcontrol = false;
      this.filtro.forEach(function(k, v) {
        if (k.gr === g) {
          control = true;
        }
      });
      if (control) {
        this.filtro.forEach(function(k, v) {
          if (k.gr === g) {
            if (k.subgr === s) {
              aborrar = v;
              aborrarcontrol = true;
            } else {
              k.subgr = s;
            }
          }
        });
        if (aborrarcontrol) {
          this.filtro.splice(aborrar, 1);
        }
      } else {
        this.filtro.push({
          gr: g,
          subgr: s
        });
      }
      this.traeData(this, this.filtro);
    },
    limpiarfiltro() {
      this.filtro = [];
      this.riesgos = {
        numeros: []
      };
      this.agrupadorfiltrado = {};
      this.datafactores = null;
      this.dataviewfrs = {};
      this.traeData1(this);
    },
    creapie(d) {
      const _this = this;
      const data = {
        data: [],
        labels: [],
        series: [],
        options: {
          legend: {
            display: true,
            position: "right"
          }
        },
        typeGraphic: "pie"
      };
      data.data.push([]);
      d.forEach(el => {
        if (el.SubGrupo) {
          data.data[0].push(el.countData.sum);
          data.labels.push(el.SubGrupo);
        }
      });
      const grafica1 = {
        datos: data,
        viewfrs: _this.dataviewfrs._id,
        tipografica: data.typeGraphic,
        nombre: d[0].Grupo.substr(6, d[0].Grupo.length)
      };
      this.graficasaguardar.push(grafica1);
      return data;
    },
    async traeData(_this, filtro) {
      let result;
      let query;
      query = {
        filtro: filtro,
        idfrs: _this.idfrs
      };
      try {
        result = await apiServices.post(`/filtroinformefrs`, query);
        _this.dataviewfrs.agrupadoras.sinagr.forEach(e => {
          _this.agrupadorfiltrado[`AGR-${e}`] = {
            SubGrupo: []
          };
          result.data[e].forEach(e1 => {
            if (e1.SubGrupo) {
              _this.agrupadorfiltrado[`AGR-${e}`].SubGrupo.push(e1.SubGrupo);
            }
          });
        });
        _this.datafrs = result.data;
        this.transformData();
      } catch (err) {
        console.log(err);
      }
    },
    creaHorizontalBar(d, colors) {
      const _this = this;
      const data = {
        data: [],
        labels: [],
        series: ["Personas"],
        colors: colors,
        datasetOverride: [],
        options: {
          legend: {
            display: false,
            position: "right"
          }
        },
        typeGraphic: "horizontalBar"
      };
      data.data.push([]);
      d.forEach(el => {
        if (el.SubGrupo) {
          data.data[0].push(el.countData.sum);
          data.labels.push(el.SubGrupo);
        }
      });
      const grafica1 = {
        datos: data,
        viewfrs: _this.dataviewfrs._id,
        tipografica: data.typeGraphic,
        nombre: d[0].Grupo.substr(6, d[0].Grupo.length)
      };
      this.graficasaguardar.push(grafica1);
      return data;
    },
    creaBar(d, colors) {
      const _this = this;
      const data = {
        data: [],
        labels: [],
        series: ["Personas"],
        colors: colors,
        datasetOverride: [],
        options: {
          legend: {
            display: false,
            position: "right"
          },
          scales: {
            yAxes: [
              {
                ticks: { beginAtZero: true }
              }
            ]
          }
        },
        typeGraphic: "bar"
      };
      data.data.push([]);
      d.forEach(el => {
        if (el.SubGrupo) {
          data.data[0].push(el.countData.sum);
          data.labels.push(el.SubGrupo);
        }
      });
      const grafica1 = {
        datos: data,
        viewfrs: _this.dataviewfrs._id,
        tipografica: data.typeGraphic,
        nombre: d[0].Grupo.substr(6, d[0].Grupo.length)
      };
      this.graficasaguardar.push(grafica1);
      return data;
    },
    creaFactores(frp, typeGraphic) {
      const _this = this;
      let typeGraphic1;
      let series;
      if (typeGraphic) {
        typeGraphic1 = typeGraphic;
      } else {
        typeGraphic1 = "bar";
      }
      let arraydata = [];
      _this.riesgos[frp].original.forEach(function(k) {
        arraydata.push(_this.datafrs[k]);
      });
      const length = _this.riesgos[frp].original.length;
      _this.titulo = _this.riesgos[frp].modificado[length - 1];

      const colors = ["#38cbcd", "#6ce4e5", "#ffd36e", "#ff7e67", "#ce6757"];
      const listseries = {
        default: {
          enum: {
            "Sin riesgo o riesgo despreciable": 0,
            "Riesgo bajo": 1,
            "Riesgo medio": 2,
            "Riesgo alto": 3,
            "Riesgo muy alto": 4
          },
          lista: [
            "Sin riesgo o riesgo despreciable",
            "Riesgo bajo",
            "Riesgo medio",
            "Riesgo alto",
            "Riesgo muy alto"
          ]
        },
        default1: {
          enum: {
            "Sin riesgo o riesgo bajo": 0,
            "Riesgo bajo": 1,
            "Riesgo medio": 2,
            "Riesgo alto": 3,
            "Riesgo muy alto": 4
          },
          lista: [
            "Sin riesgo o riesgo bajo",
            "Riesgo bajo",
            "Riesgo medio",
            "Riesgo alto",
            "Riesgo muy alto"
          ]
        },
        frecuente: {
          enum: {
            "Poco frecuente": 0,
            "Medianamente frecuente": 1,
            Frecuente: 2,
            "Muy frecuente": 3,
            ".": 4
          },
          lista: [
            "Poco frecuente",
            "Medianamente frecuente",
            "Frecuente",
            "Muy frecuente",
            "."
          ]
        },
        satisfaccion: {
          enum: {
            "Satisfacción muy alta": 0,
            "Satisfacción alta": 1,
            "Satisfacción baja": 2,
            "Insatisfacción alta": 3,
            "Insatisfacción muy alta": 4
          },
          lista: [
            "Satisfacción muy alta",
            "Satisfacción alta",
            "Satisfacción baja",
            "Insatisfacción alta",
            "Insatisfacción muy alta"
          ]
        },
        burnout: {
          enum: {
            "Presentación muy baja de síntomas o sin presencia de ellos": 0,
            ".": 1,
            "Presentación media de síntomas": 2,
            "Presentación alta de síntomas": 3,
            "Presentación muy alta de síntomas": 4
          },
          lista: [
            "Presentación muy baja de síntomas o sin presencia de ellos",
            ".",
            "Presentación media de síntomas",
            "Presentación alta de síntomas",
            "Presentación muy alta de síntomas"
          ]
        },
        critico: {
          enum: {
            "Caso no crítico": 0,
            ".": 1,
            "Caso medianamente crítico": 2,
            "Caso crítico": 3,
            "Caso muy crítico": 4
          },
          lista: [
            "Caso no crítico",
            ".",
            "Caso medianamente crítico",
            "Caso crítico",
            "Caso muy crítico"
          ]
        },
        protector: {
          enum: {
            "Factor protector": 0,
            "Sin riesgo o riesgo bajo": 1,
            "Riesgo medio": 2,
            "Riesgo alto": 3,
            "Riesgo muy alto": 4
          },
          lista: [
            "Factor protector",
            "Sin riesgo o riesgo bajo",
            "Riesgo medio",
            "Riesgo alto",
            "Riesgo muy alto"
          ]
        },
        estres: {
          enum: {
            "Muy bajo": 0,
            Bajo: 1,
            Medio: 2,
            Alto: 3,
            "Muy alto": 4
          },
          lista: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"]
        }
      };
      const seriescontrol = [];
      const data = {
        data: [[], [], [], [], []],
        data1: [[], [], [], [], []],
        labels: [],
        series: [
          "Sin riesgo o riesgo despreciable",
          "Riesgo bajo",
          "Riesgo medio",
          "Riesgo alto",
          "Riesgo muy alto"
        ],
        colors: colors,
        datasetOverride: [],
        options: {
          legend: {
            display: true,
            position: "bottom"
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  steps: 10
                }
              }
            ],
            yAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  steps: 10
                }
              }
            ]
          }
        },
        typeGraphic: typeGraphic1
      };
      let totales = {};
      arraydata.forEach(function(k, v) {
        if (k) {
          totales[k[0].Grupo] = 0;
          data.labels.push(k[0].Grupo.substr(7, k[0].Grupo.length));
          data.data1[0].push(0);
          data.data1[1].push(0);
          data.data1[2].push(0);
          data.data1[3].push(0);
          data.data1[4].push(0);
          data.data[0].push(0);
          data.data[1].push(0);
          data.data[2].push(0);
          data.data[3].push(0);
          data.data[4].push(0);
          k.forEach(function(k1, v1) {
            if (k1.SubGrupo) {
              totales[k[0].Grupo] += k1.countData.sum;
              if (seriescontrol.indexOf(k1.SubGrupo) === -1) {
                seriescontrol.push(k1.SubGrupo);
              }
            }
          });
        }
      });
      let controldefault = 0;
      let controlfrecuente = 0;
      let controlsatisfaccion = 0;
      let controlburnout = 0;
      let controlcritico = 0;
      let controlprotector = 0;
      let controldefault1 = 0;
      let controlestres = 0;


      seriescontrol.forEach(function(k) {
        if (k) {
          if (listseries.default.lista.indexOf(k) === -1) {
            controldefault = 1;
          }
          if (listseries.frecuente.lista.indexOf(k) === -1) {
            controlfrecuente = 1;
          }
          if (listseries.satisfaccion.lista.indexOf(k) === -1) {
            controlsatisfaccion = 1;
          }
          if (listseries.burnout.lista.indexOf(k) === -1) {
            controlburnout = 1;
          }
          if (listseries.critico.lista.indexOf(k) === -1) {
            controlcritico = 1;
          }
          if (listseries.protector.lista.indexOf(k) === -1) {
            controlprotector = 1;
          }
          if (listseries.default1.lista.indexOf(k) === -1) {
            controldefault1 = 1;
          }
          if (listseries.estres.lista.indexOf(k) === -1) {
            controlestres = 1;
          }
        }
      });


      if (controldefault === 0) {
        series = listseries.default.enum;
        data.series = listseries.default.lista;
      } else if (controlfrecuente === 0) {
        series = listseries.frecuente.enum;
        data.series = listseries.frecuente.lista;
      } else if (controlsatisfaccion === 0) {
        series = listseries.satisfaccion.enum;
        data.series = listseries.satisfaccion.lista;
      } else if (controlburnout === 0) {
        series = listseries.burnout.enum;
        data.series = listseries.burnout.lista;
      } else if (controlcritico === 0) {
        series = listseries.critico.enum;
        data.series = listseries.critico.lista;
      } else if (controlprotector === 0) {
        series = listseries.protector.enum;
        data.series = listseries.protector.lista;
      } else if (controldefault1 === 0) {
        series = listseries.default1.enum;
        data.series = listseries.default1.lista;
      } else if (controlestres === 0) {
        series = listseries.estres.enum;
        data.series = listseries.estres.lista;
      }
      arraydata.forEach(function(k, v) {
        if (k) {
          if (totales[k[0].Grupo] >= 5) {
            k.forEach(function(k1, v1) {
              if (k1.SubGrupo) {
                data.data1[series[k1.SubGrupo]][v] += k1.countData.sum;
                data.data[series[k1.SubGrupo]][v] = (Math.round(
                  (data.data1[series[k1.SubGrupo]][v] / totales[k[0].Grupo]) *
                    1000
                )/10);
              }
            });
          }
        }
      });
      this.datafactores = data;

      this.cambio++;
    },
    transformData() {
      this.creaFactores("01");
    }
  },
  created() {
    this.traeData1(this);
    if (this.dataviewfrs.data) {
      const _this = this;
      this.datafrs = this.dataviewfrs.data;
      _this.datafrs.grupos.forEach(k => {
        if (k.substr(0, 4) === "RGO-") {
          if (_this.riesgos.numeros.indexOf(k.substr(4, 2)) === -1) {
            _this.riesgos.numeros.push(k.substr(4, 2));
            _this.riesgos[k.substr(4, 2)] = {
              original: [],
              modificado: []
            };
            _this.riesgos[k.substr(4, 2)].original.push(k);
            _this.riesgos[k.substr(4, 2)].modificado.push(
              k.substr(7, k.length)
            );
          } else {
            _this.riesgos[k.substr(4, 2)].original.push(k);
            _this.riesgos[k.substr(4, 2)].modificado.push(
              k.substr(7, k.length)
            );
          }
        }
      });
      _this.riesgos.numeros.sort();
      this.transformData();
    }
  },
  watch: {
    filtro(nv, ov) {
      this.namegraph = nv
        .map(val => `${this.$options.filters.agryear(val.gr)} ${val.subgr}`)
        .join(" - ");
    },
    datafrs1(nv, ov) {
      if (nv) {
        const _this = this;
        this.datafrs = this.dataviewfrs.data;
        _this.datafrs.grupos.forEach(k => {
          if (k.substr(0, 4) === "RGO-") {
            if (_this.riesgos.numeros.indexOf(k.substr(4, 2)) === -1) {
              _this.riesgos.numeros.push(k.substr(4, 2));
              _this.riesgos[k.substr(4, 2)] = {
                original: [],
                modificado: []
              };
              _this.riesgos[k.substr(4, 2)].original.push(k);
              _this.riesgos[k.substr(4, 2)].modificado.push(
                k.substr(7, k.length)
              );
            } else {
              _this.riesgos[k.substr(4, 2)].original.push(k);
              _this.riesgos[k.substr(4, 2)].modificado.push(
                k.substr(7, k.length)
              );
            }
          }
        });
        _this.riesgos.numeros.sort();
        this.transformData();
      }
    }
  },
  components: {
    yGraph
  }
};
</script>

<style lang='scss' scoped>
.icon-lista {
  vertical-align: bottom;
}
</style>
