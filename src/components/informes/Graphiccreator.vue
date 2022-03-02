<template>
  <section>
    <div class="buttons is-centered">
      <span
        class="button is-light tooltip"
        data-tooltip="Gráfica de Barras"
        @click="typeGraph('bar')"
        v-bind:class="{ 'is-primary': typeGraphic === 'bar' }"
      >
        <span class="icon">
          <i class="material-icons">insert_chart_outlined</i>
        </span>
      </span>
      <span
        class="button is-light tooltip"
        data-tooltip="Gráfica de área"
        @click="typeGraph('radar')"
        v-bind:class="{ 'is-primary': typeGraphic === 'radar' }"
      >
        <span class="icon">
          <i class="material-icons">graphic_eq</i>
        </span>
      </span>
      <span
        class="button is-light tooltip"
        data-tooltip="Gráfica torta"
        @click="typeGraph('pie')"
        v-bind:class="{ 'is-primary': typeGraphic === 'pie' }"
      >
        <span class="icon">
          <i class="material-icons">pie_chart</i>
        </span>
      </span>
      <span
        class="button is-light tooltip"
        data-tooltip="Gráfica de línea"
        @click="typeGraph('line')"
        v-bind:class="{ 'is-primary': typeGraphic === 'line' }"
      >
        <span class="icon">
          <i class="material-icons">show_chart</i>
        </span>
      </span>
      <span
        class="button is-light tooltip"
        data-tooltip="Barras laterales"
        @click="typeGraph('horizontalBar')"
        v-bind:class="{ 'is-primary': typeGraphic === 'horizontalBar' }"
      >
        <span class="icon">
          <i class="material-icons">notes</i>
        </span>
      </span>
      <span
        class="button is-info tooltip"
        @click="ejecuta('rotar')"
        data-tooltip="Rotar labels series"
      >
        <span class="icon">
          <i class="material-icons">loop</i>
        </span>
      </span>
      <span
        class="button is-info tooltip"
        data-tooltip="Posicion de la leyenda"
        @click="ejecuta('leyenda')"
      >
        <span class="icon">
          <i class="material-icons">open_with</i>
        </span>
      </span>
      <span
        class="button is-info tooltip"
        v-show="viewapilado"
        data-tooltip="Grafica Apilada"
        @click="ejecuta('apilado')"
      >
        <span class="icon">
          <i class="material-icons">functions</i>
        </span>
      </span>
      <span
        class="button is-info tooltip"
        v-show="viewempzero"
        data-tooltip="Empezar en cero"
        @click="ejecuta('cero')"
      >
        <span class="icon">
          <i class="material-icons">exposure_zero</i>
        </span>
      </span>
      <span
        class="button is-info tooltip"
        data-tooltip="Cambiar color"
        @click="ejecuta('color')"
      >
        <span class="icon">
          <i class="material-icons">color_lens</i>
        </span>
      </span>
    </div>
    <y-graph :datagraph="dataGrafica" :cambio="cambio" :height="140"></y-graph>
  </section>
</template>

<script>
import yGraph from "@/components/dashboard/Graph.vue";
export default {
  props: {
    grupos: Array,
    variables: Array,
    control: Number
  },
  data() {
    return {
      dataGrafica: {},
      cambio: 0,
      typeGraphic: "bar",
      leyenda: "bottom",
      viewapilado: true,
      viewempzero: true,
      rotar: false,
      apilado: false,
      apilado0100: false,
      controlcolor: 0
    };
  },
  methods: {
    ejecuta(e) {
      if (e === "rotar") {
        if (this.rotar) {
          this.rotar = false;
        } else {
          this.rotar = true;
        }
      }
      if (e === "leyenda") {
        if (this.leyenda === "bottom") {
          this.leyenda = "right";
        } else if (this.leyenda === "right") {
          this.leyenda = "top";
        } else if (this.leyenda === "top") {
          this.leyenda = "left";
        } else {
          this.leyenda = "bottom";
        }
      }
      if (e === "apilado") {
        if (this.apilado) {
          this.apilado = false;
          this.apilado0100 = true;
        } else if (this.apilado0100) {
          this.apilado0100 = false;
        } else {
          this.apilado = true;
        }
      }
      if(e === "cero"){
        if(this.empzero){
          this.empzero = false;
        }else{
          this.empzero = true;
        }
      }
      if(e === "color"){
        if(this.controlcolor === 11){
          this.controlcolor = 0;
        }else{
          this.controlcolor++;
        }
        this.convertData();
      }
      this.addGadgets();
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
      if (this.typeGraphic === "bar" || this.typeGraphic === "line") {
        if (this.empzero) {
          this.dataGrafica.options.scales = {
            yAxes: [
              {
                ticks: { beginAtZero: true }
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
        }
        if (this.apilado0100) {
          if (this.rotar) {
            this.dataGrafica.data = this.dataGrafica.data100r;
          } else {
            this.dataGrafica.data = this.dataGrafica.data100;
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
        }
      }
      if (this.typeGraphic === "horizontalBar") {
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
        }
      }
      this.cambio++;
    },
    typeGraph(g) {
      this.typeGraphic = g;
      this.dataGrafica.typeGraphic = g;
      if (g === "pie") {
        this.dataGrafica.options.scales = {};
        this.empzero = false;
        this.apilado = false;
        this.apilado0100 = false;
        this.viewempzero = false;
        this.viewapilado = false;
      } else if (g === "horizontalBar") {
        this.empzero = false;
        this.viewempzero = false;
        this.viewapilado = true;
      } else {
        this.viewempzero = true;
        this.viewapilado = true;
      }
      this.cambio++;
    },
    colorbase(n){
      const colorbase = [
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
      const color1 = colorbase.slice(0,n);
      const color2 = colorbase.slice(n,colorbase.length);
      return color2.concat(color1);
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
      let colorbase = _this.colorbase(this.controlcolor);
      let colors = [];

      if (_this.grupos.length > 0 && _this.variables.length > 0) {
        _this.grupos.forEach(function(k1, v1) {
          const d = [];
          _this.variables.forEach(function(k2, v2) {
            d.push(k1[k2.cod].sum);
            if (totales[v2]) {
              totales[v2] += k1[k2.cod].sum;
            } else {
              totales[v2] = 0;
              totales[v2] += k1[k2.cod].sum;
            }
          });
          data.push(d);
          dataSelected.push(k1);
        });
        data.forEach(function(k, v) {
          const d1 = k.map(
            (e, v1) => Math.round((e / totales[v1]) * 100 * 100) / 100
          );
          data100.push(d1);
        });
        _this.variables.forEach(function(k) {
          labels.push(k.cod);
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
          typeGraphic: _this.typeGraphic,
          colors: colors,
          colorsn: colors,
          options: {
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
    },
    rotardata(_this, datagrafica, colorbase) {
      const data0 = datagrafica.data;
      const series0 = datagrafica.series;
      const labels0 = datagrafica.labels;
      let colors = [];
      let control = 0;
      let data1 = [];
      let data100 = [];
      let totales = {};
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
        labels1.forEach(function(k1, v1) {
          d.push(data0[v1][v]);
            if (totales[v1]) {
              totales[v1] += data0[v1][v];
            } else {
              totales[v1] = 0;
              totales[v1] += data0[v1][v];
            }
        });
        data1.push(d);
      });
      data1.forEach(function(k, v) {
        const d1 = k.map(
          (e, v1) => Math.round((e / totales[v1]) * 100 * 100) / 100
        );
        data100.push(d1);
      });
      datagrafica.seriesr = series1;
      datagrafica.labelsr = labels1;
      datagrafica.datar = data1;
      datagrafica.data100r = data100;
      datagrafica.colorsr = colors;
    }
  },
  watch: {
    control(nv, ov) {
      this.convertData();
      this.addGadgets();
    },
    cambio(nv,ov){
      this.$emit('changedata',this.dataGrafica);
    }
  },
  components: {
    yGraph
  }
};
</script>