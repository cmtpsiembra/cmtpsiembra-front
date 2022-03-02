<template>
  <div class="box">
    <div class="tabs">
      <ul>
        <li v-bind:class="{ 'is-active': tipeGraphic === 'bar' }">
          <a @click="typeGraph('bar')">
            <i class="material-icons icon-lista">insert_chart_outlined</i>&nbsp; Barras
          </a>
        </li>
        <li v-bind:class="{ 'is-active': tipeGraphic === 'radar' }">
          <a @click="typeGraph('radar')">
            <i class="material-icons icon-lista">graphic_eq</i>&nbsp; Área
          </a>
        </li>
        <li v-bind:class="{ 'is-active': tipeGraphic === 'pie' }">
          <a @click="typeGraph('pie')">
            <i class="material-icons icon-lista">pie_chart</i>&nbsp; Torta
          </a>
        </li>
        <li v-bind:class="{ 'is-active': tipeGraphic === 'line' }">
          <a @click="typeGraph('line')">
            <i class="material-icons icon-lista">show_chart</i>&nbsp; Línea
          </a>
        </li>
        <li v-bind:class="{ 'is-active': tipeGraphic === 'horizontalBar' }">
          <a @click="typeGraph('horizontalBar')">
            <i class="material-icons icon-lista">notes</i>&nbsp; Lateral
          </a>
        </li>
        <!-- <li>
          <a>
            <i class="material-icons icon-lista">table_chart</i> &nbsp; Tabla
          </a>
        </li>-->
      </ul>
    </div>
    <div class="field">
      <input
        v-show="viewapilado"
        class="is-checkradio is-info"
        id="rotar"
        type="checkbox"
        name="rotar"
        v-model="rotar"
        @change="addGadgets()"
      />
      <label for="rotar">Rotar</label>
      <input
        v-show="viewempzero"
        class="is-checkradio is-info"
        id="empzero"
        type="checkbox"
        name="empzero"
        v-model="empzero"
        @change="addGadgets()"
      />
      <label v-show="viewempzero" for="empzero">En cero</label>
      <input
        v-show="viewempzero"
        class="is-checkradio is-info"
        id="agrango"
        type="checkbox"
        name="agrango"
        v-model="agrango"
        @change="addGadgets()"
      />
      <label v-show="viewempzero" for="agrango">Rango</label>
      <input
        v-show="viewapilado"
        class="is-checkradio is-info"
        id="apilado"
        type="checkbox"
        name="apilado"
        v-model="apilado"
        @change="addGadgets()"
      />
      <label v-show="viewapilado" for="apilado">Apilado</label>
      <input
        v-show="viewapilado"
        class="is-checkradio is-info"
        id="apilado0100"
        type="checkbox"
        name="apilado0100"
        v-model="apilado0100"
        @change="addGadgets()"
      />
      <label v-show="viewapilado" for="apilado0100">0 - 100</label>
      <button class="button is-light" @click="addGadgets()">
        <i class="material-icons">gamepad</i>
      </button>
      <div class="select">
        <select v-model="leyenda" @change="addGadgets()">
          <option value="bottom">Inferior</option>
          <option value="top">Superior</option>
          <option value="right">Derecha</option>
          <option value="left">Izquierda</option>
        </select>
      </div>
    </div>
    <!-- <div class="notification">
      <strong>Pasos para crear la gráfica</strong>
      <br />
      <strong>1. Seleccionnar el informe:</strong>
      <strong>2. Seleccione el estudio:</strong> En el panel lateral seleccione el estudio. O agregue un archivo de excel con los datos personalizados.
      <strong>2.</strong>
    </div>-->
    <y-graph :datagraph="dataGrafica" :cambio="cambio"></y-graph>
    <div class="field">
      <div class="control">
        <input
          class="input is-large"
          type="text"
          placeholder="Nombre de la gráfica"
          v-model="nombre"
        />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <textarea class="textarea is-large" placeholder="Descripción de la gráfica" v-model="texto"></textarea>
      </div>
    </div>
    <a class="button is-large is-info is-fullwidth" @click="guardarGrafica">
      <i class="material-icons">cloud_upload</i>&nbsp; Guardar
    </a>
  </div>
</template>

<script>
import yGraph from "@/components/dashboard/Graph.vue";
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
export default {
  data() {
    return {
      cambio: 0,
      empzero: false,
      agrango: false,
      apilado: false,
      apilado0100: false,
      rotar: false,
      viewempzero: true,
      viewapilado: true,
      leyenda: "bottom",
      nombre: null,
      texto: null,
      dataGrafica: {},
      // dataGrafica: {
      //   typeGraphic: "bar",
      //   colors: [
      //     "#293462",
      //     "#216583",
      //     "#f76262",
      //     "#fff1c1",
      //     "#248ea9",
      //     "#28c3d4",
      //     "#aee7e8",
      //     "#fafdcb",
      //     "#f57170",
      //     "#f5f5f5",
      //     "#10ddc2",
      //     "#15b7b9",
      //     "#042f4b",
      //     "#fff6da",
      //     "#fbc99d",
      //     "#ed1250"
      //   ],
      //   options: {
      //     scales: {
      //       yAxes: [
      //         {
      //           ticks: { max: 100, steps: 10, beginAtZero: true },
      //           gridLines: {
      //             color: [false, false, false, false, "black", false, "black"],
      //             drawBorder: false
      //           }
      //         }
      //       ]
      //     },
      //     legend: { position: "bottom", display: true }
      //   },
      //   datasetOverride: [
      //     { type: "bar" },
      //     { type: "bar" },
      //     { type: "bar" },
      //     { type: "bar" },
      //     { type: "bar" }
      //   ],
      //   series: ["Girardota", "Cartagena", "Bogotá", "Buenaventura", "Cali"],
      //   labels: [
      //     "Jefe",
      //     "Claridad",
      //     "Trato",
      //     "Recursos",
      //     "Apoyo Org.",
      //     "Estabilidad",
      //     "Retribución",
      //     "Coherencia",
      //     "Pertenencia",
      //     "Equipo",
      //     "Clima"
      //   ],
      //   data: [
      //     [65.6, 57.1, 63.4, 58, 62.6, 62.8, 57.8, 59.2, 58.1, 60.3, 63],
      //     [66.2, 67.4, 57.4, 69.5, 65.4, 59.7, 57.1, 69.5, 64.7, 66.8, 67],
      //     [56.8, 61.5, 58.4, 56.1, 60.6, 68.1, 59.6, 63.1, 62.2, 66.5, 63.5],
      //     [59.1, 64.7, 67.2, 59.4, 65.4, 63.8, 55.6, 60.2, 71, 66.6, 65.6],
      //     [71.2, 65.6, 72.1, 51, 66.5, 70.3, 57.3, 66.6, 62.2, 66.3, 67.6]
      //   ]
      // },
      tipeGraphic: "bar"
    };
  },
  computed: {
    ...mapState(["idtoken"])
  },
  props: {
    result: Object,
    control: Number,
    data: {
      type: Object
    }
  },
  watch: {
    control(nv, ov) {
      this.convertData();
      this.cambio++;
    }
  },
  methods: {
    async guardarGrafica() {
      const _this = this;
      if (!this.nombre) {
        this.$store.dispatch("notify", {
          message: "Debe agregarle un nombre a la gráfica",
          type: "is-warning",
          position: "top-center",
          duration: 5000
        });
      }
      const dataGuardar = {
        datos: {
          data: _this.dataGrafica.data,
          labels: _this.dataGrafica.labels,
          series: _this.dataGrafica.series,
          datasetOverride: _this.dataGrafica.datasetOverride,
          options: _this.dataGrafica.options,
          colors: _this.dataGrafica.colors
        },
        informe: _this.data._id,
        tipografica: _this.dataGrafica.typeGraphic,
        nombre: _this.nombre,
        texto: _this.texto
      };
      let result;
      try {
        result = await apiServices.post(`/partes`, dataGuardar);
        if (result.data) {
          this.$store.dispatch("notify", {
            message: "Perfecto!. Gráfica guardada."
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    typeGraph(g) {
      this.tipeGraphic = g;
      this.dataGrafica.typeGraphic = g;
      if (g === "pie" || g === "radar") {
        this.dataGrafica.options.scales = {};
        this.dataGrafica.data = this.dataGrafica.datan;
        this.empzero = false;
        this.agrango = false;
        this.apilado = false;
        this.apilado0100 = false;
        this.viewempzero = false;
        this.viewapilado = false;
      } else if (g === "horizontalBar") {
        this.empzero = false;
        this.agrango = false;
        this.viewempzero = false;
        this.viewapilado = true;
      } else {
        this.viewempzero = true;
        this.viewapilado = true;
      }
      this.cambio++;
    },
    addGadgets() {
      this.dataGrafica.options.scales = {};
      this.dataGrafica.data = this.dataGrafica.datan;
      this.dataGrafica.series = this.dataGrafica.seriesn;
      this.dataGrafica.labels = this.dataGrafica.labelsn;
      this.dataGrafica.colors = this.dataGrafica.colorsn;
      this.dataGrafica.options.legend.position = this.leyenda;
      if (this.rotar) {
        this.dataGrafica.data = this.dataGrafica.datar;
        this.dataGrafica.series = this.dataGrafica.seriesr;
        this.dataGrafica.labels = this.dataGrafica.labelsr;
        this.dataGrafica.colors = this.dataGrafica.colorsr;
      }
      if (this.tipeGraphic === "bar" || this.tipeGraphic === "line") {
        if (this.empzero) {
          this.dataGrafica.options.scales = {
            yAxes: [
              {
                ticks: { max: 100, steps: 10, beginAtZero: true }
              }
            ]
          };
        }
        if (this.agrango) {
          this.dataGrafica.options.scales = {
            yAxes: [
              {
                ticks: { max: 100, steps: 10, beginAtZero: true },
                gridLines: {
                  color: [false, false, false, false, "black", false, "black"],
                  drawBorder: false
                }
              }
            ]
          };
        }
        if (this.apilado) {
          this.dataGrafica.options.scales = {
            xAxes: [
              {
                stacked: true
              }
            ],
            yAxes: [
              {
                stacked: true
              }
            ]
          };
          this.empzero = false;
          this.agrango = false;
        }
        if (this.apilado0100) {
          this.dataGrafica.data = this.dataGrafica.data100;
          this.dataGrafica.options.scales = {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  steps: 10,
                  max: 100
                }
              }
            ],
            yAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  steps: 10,
                  max: 100
                }
              }
            ]
          };
          this.empzero = false;
          this.agrango = false;
        }
      }
      if (this.tipeGraphic === "horizontalBar") {
        if (this.apilado) {
          this.dataGrafica.options.scales = {
            xAxes: [
              {
                stacked: true
              }
            ],
            yAxes: [
              {
                stacked: true
              }
            ]
          };
          this.empzero = false;
          this.agrango = false;
        }
        if (this.apilado0100) {
          if (this.rotar) {
            this.dataGrafica.data = this.dataGrafica.data100r;
          } else {
            this.dataGrafica.data = this.dataGrafica.data100n;
          }
          this.dataGrafica.options.scales = {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  steps: 10,
                  max: 100
                }
              }
            ],
            yAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  steps: 10,
                  max: 100
                }
              }
            ]
          };
          this.empzero = false;
          this.agrango = false;
        }
      }
      if (this.rotar) {
      }
      this.cambio++;
    },
    rotardata(_this, datagrafica, colorbase) {
      const data0 = datagrafica.data;
      const series0 = datagrafica.series;
      const labels0 = datagrafica.labels;
      let colors = [];
      let control = 0;
      let data1 = [];
      let data100 = [];
      const series1 = labels0;
      const labels1 = series0;
      series1.forEach(function(k, v) {
        if (control === colorbase.length) {
          // esto es para que repita los colores
          control = 0;
        }
        colors.push(colorbase[control]);
        control++;
        const d = [];
        const d100 = [];
        labels1.forEach(function(k1, v1) {
          d.push(data0[v1][v]);
          d100.push(datagrafica.data100n[v1][v]);
        });
        data1.push(d);
        data100.push(d100);
      });

      datagrafica.seriesr = series1;
      datagrafica.labelsr = labels1;
      datagrafica.datar = data1;
      datagrafica.data100r = data100;
      datagrafica.colorsr = colors;
    },
    convertData() {
      const _this = this;
      let series = [];
      let dataSelected = [];
      let data = [];
      let data100 = [];
      let labels = [];
      let totales = {};
      let control = 0;
      let colorbase = [
        "#293462",
        "#f76262",
        "#216583",
        "#aee7e8",
        "#28c3d4",
        "#fbc99d",
        "#ed1250",
        "#10ddc2",
        "#042f4b",
        "#15b7b9",
        "#f57170",
        "#248ea9"
      ];
      let colors = [];

      if (_this.result.group && _this.result.variable) {
        const grupos = Object.keys(_this.result.group);
        grupos.forEach(function(k, v) {
          _this.result.group[k].forEach(function(k1, v1) {
            if (k1.check) {
              const d = [];
              _this.result.variable.forEach(function(k2, v2) {
                if (k2.check) {
                  d.push(k1[k2.codigo][_this.result.dato.d]);
                  if (totales[v2]) {
                    totales[v2] += k1[k2.codigo][_this.result.dato.d];
                  } else {
                    totales[v2] = 0;
                    totales[v2] += k1[k2.codigo][_this.result.dato.d];
                  }
                }
              });
              // const d1 = d.map(
              //   e => Math.round((e / totales[v1]) * 100 * 100) / 100
              // );
              // data100.push(d1);
              data.push(d);
              dataSelected.push(k1);
            }
          });
        });
        data.forEach(function(k, v) {
          const d1 = k.map(
            (e, v1) => Math.round((e / totales[v1]) * 100 * 100) / 100
          );
          data100.push(d1);
        });
        _this.result.variable.forEach(function(k) {
          if (k.check) {
            labels.push(k.codigo);
          }
        });

        dataSelected.forEach(function(k, v) {
          series.push(k.SubGrupo);
          if (control === colorbase.length) {
            // esto es para que repita los colores
            control = 0;
          }
          colors.push(colorbase[control]);
          control++;
        });
        _this.dataGrafica = {
          typeGraphic: _this.tipeGraphic,
          colors: colors,
          colorsn: colors,
          options: {
            // scales: {
            //   yAxes: [
            //     {
            //       ticks: { max: 100, steps: 10, beginAtZero: true },
            //       gridLines: {
            //         color: [
            //           false,
            //           false,
            //           false,
            //           false,
            //           "black",
            //           false,
            //           "black"
            //         ],
            //         drawBorder: false
            //       }
            //     }
            //   ]
            // },
            legend: { position: _this.leyenda, display: true }
          },
          datasetOverride: [],
          series: series,
          seriesn: series,
          labelsn: labels,
          labels: labels,
          data: data,
          datan: data,
          data100: data100,
          data100n: data100
        };
        _this.rotardata(_this, _this.dataGrafica, colorbase);
      }
    }
  },
  components: {
    yGraph
  }
};
</script>
