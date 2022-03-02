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
    if (this.datagraph && this.datagraph.data) {
      this.render(this);
    }
  },
  methods: {
    dividircadena(text){
      let arrayDeCadenas = text.split(" ");
      let returned = "";
      for(let index= 0; index< arrayDeCadenas.length; index++){
        const cadena = arrayDeCadenas[index];
        returned += `${cadena.substr(0,1)} `;
      }
      return returned
    },
    render(_this) {
      // const _this = this;
      Chart.defaults.global.defaultFontFamily = "'Montserrat', sans-serif"; // con esto configuramos el tipo de letra
      Chart.defaults.global.tooltips.backgroundColor = "rgba(45, 64, 89, 0.9)"; // con esto se configura el fondo del tooltip
      let datasets = _this.sortData(_this.datagraph);
      const ctx = document.getElementById(_this.idcanvas);
      ctx.getContext("2d");
      const labels = _this.datagraph.labels;
      const labelsMod = [];
      for (let index = 0; index < labels.length; index++) {
        let lab = labels[index];
        lab = _this.dividircadena(lab);
        labelsMod.push(lab);
      }
      // ctx.height = 220;
      _this.config = {
        // The type of chart we want to create
        type: _this.datagraph.typeGraphic,

        // The data for our dataset
        data: {
          labels: labelsMod,
          datasets: datasets,
        },
        // Configuration options go here
        options: _this.datagraph.options,
      };
      _this.config.options.tooltips = {
        enabled: true, // poner en true si quiere que le salga el tooltip
        callbacks: {
          title: function (tooltipItem, data) {
            let title = `${labels[tooltipItem[0].index]}`;
            return title;
          },
          label: function (tooltipItem, data) {
            let label = `${data.datasets[tooltipItem.datasetIndex].label}: ${
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            }`;
            return label;
          },
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
      let control = 0;
      if (datagraph.typeGraphic === "pie") {
        datagraph.data.forEach(function (k, v) {
          const d = {};
          d.label = datagraph.series[v];
          d.borderColor = [];
          d.backgroundColor = [];
          control = 0;
          k.forEach(function (k1, v1) {
            if (control === _this.colorbase.length) {
              // esto es para que repita los colores
              control = 0;
            }
            d.borderColor.push(_this.colorbase[control]);
            d.backgroundColor.push(graph.hexToRgbA(_this.colorbase[control]));
            control++;
          });
          d.borderWidth = 3;
          d.data = _this.decimals(k);
          datasets.push(d);
        });
      } else {
        datagraph.data.forEach(function (k, v) {
          const d = {};
          d.label = datagraph.series[v];
          d.borderColor = datagraph.colors[v];
          d.backgroundColor = graph.hexToRgbA(datagraph.colors[v]);
          d.borderWidth = 2;
          d.data = _this.decimals(k);
          if (datagraph.datasetOverride[v]) {
            d.type = datagraph.datasetOverride[v].type;
          }
          datasets.push(d);
        });
      }
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

