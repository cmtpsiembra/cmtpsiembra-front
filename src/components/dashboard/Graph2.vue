<template>
  <div>
    <canvas :id="idcanvas"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
import graph from "@/helpers/graph";
// import graph from "@/helpers/graph";

export default {
  props: {
    datagraph: {
      type: Object,
    },
    cambio: Number,
    height: Number,
    ismovil: Boolean,
  },
  data() {
    return {
      idcanvas: "",
      chart: null,
      config: null,
      colorbase: [
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
        "#248ea9",
      ],
    };
  },
  created() {
    this.idcanvas = Math.random().toString(36).substr(2, 9);
  },
  mounted() {
    if (this.datagraph.data) {
      this.render(this);
    }
  },
  methods: {
    render(_this) {
      // const _this = this;
      Chart.defaults.global.defaultFontFamily = "'Montserrat', sans-serif"; // con esto configuramos el tipo de letra
      Chart.defaults.global.tooltips.backgroundColor = "rgba(39, 66, 82, 0.9)"; // con esto se configura el fondo del tooltip
      Chart.defaults.global.defaultFontSize = 11; // con esto se configura el tamaño de la letra

      let datasets = _this.sortData(_this.datagraph);
      const ctx = document.getElementById(_this.idcanvas);
      if (_this.height) {
        ctx.height = _this.height;
      } else {
        ctx.height = 320;
      }
      ctx.getContext("2d");
      // ctx.height = 220;
      _this.config = {
        // The type of chart we want to create
        type: _this.datagraph.typeGraphic,

        // The data for our dataset
        data: {
          labels: _this.datagraph.labels,
          datasets: datasets,
        },
        // Configuration options go here
        options: _this.datagraph.options,
      };
      _this.config.options.hover = {
        animationDuration: 0,
      };

      _this.config.options.tooltips = {
        enabled: true, // poner en true si quiere que le salga el tooltip
        callbacks: {
          label: function (tooltipItem, data) {
            let label = `${_this.datagraph.labels2[tooltipItem.index]}: ${
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            }`;
            return label;
          },
        },
      };

      // display data values on chart
      _this.config.options.animation = {
        duration: 1,
        onComplete: function () {
          let chartInstance = _this.chart;
          let ctx = chartInstance.ctx;
          ctx.font = Chart.helpers.fontString(
            Chart.defaults.global.defaultFontSize,
            Chart.defaults.global.defaultFontStyle,
            Chart.defaults.global.defaultFontFamily
          );
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          datasets.forEach(function (dataset, i) {
            let meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              let data = dataset.data[index];
              ctx.fillText(data, bar._model.x - 18, bar._model.y + 18);
            });
          });
        },
      };
      if (_this.chart) {
        // si la grafica ya existia la destruimos
        _this.chart.destroy();
      }
      _this.chart = new Chart(ctx, this.config);
    },
    decimals(arr) {
      const newArr = [];
      for (let val of arr) {
        newArr.push(Number(val.toFixed(1)));
      }
      return newArr;
    },
    sortData(datagraph) {
      const datasets = [];
      const _this = this;
      datagraph.data.forEach(function (k, v) {
        const d = {};
        d.label = datagraph.series[v];
        const lengthColors = datagraph.colors.length;
        let indexcolor = 0;
        d.backgroundColor = [];
        d.borderColor = [];
        for (let index = 0; index < k.length; index++) {
          const color = datagraph.colors[indexcolor];
          const backgroundcolor = graph.hexToRgbA(color);
          d.backgroundColor.push(backgroundcolor);
          d.borderColor.push(color);
          if (indexcolor < lengthColors - 1) {
            indexcolor++;
          } else {
            indexcolor = 0;
          }
        }
        // d.borderColor = datagraph.colors[v];
        // d.backgroundColor = graph.hexToRgbA(datagraph.colors[v]);
        // d.backgroundColor = ["red", "blue", "green", "blue", "red", "blue"];
        d.borderWidth = 2;
        d.data = _this.decimals(k);
        if (datagraph.datasetOverride[v]) {
          d.type = datagraph.datasetOverride[v].type;
        }
        datasets.push(d);
      });
      return datasets;
    },
  },
  watch: {
    cambio(newv, oldv) {
      if (this.datagraph.data) {
        this.render(this);
      }
    },
  },
};
</script>

<style>
</style>

