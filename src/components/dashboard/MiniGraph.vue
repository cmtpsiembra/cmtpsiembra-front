<template>
  <div>
    <canvas :id="idcanvas"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
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
        "rgba(255,255,255,0.9)",
        "rgba(255,255,255,0.7)",
        "rgba(255,255,255,0.5)",
        "rgba(255,255,255,0.3)",
        "rgba(255,255,255,0.1)",
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
    dividircadena(text) {
      let arrayDeCadenas = text.split(" ");
      let returned = "";
      for (let index = 0; index < arrayDeCadenas.length; index++) {
        const cadena = arrayDeCadenas[index];
        returned += `${cadena.substr(0, 1)}`;
      }
      returned = returned.substr(0, 4);
      return returned;
    },
    render(_this) {
      if (_this.datagraph.prioridad === "pa") {
        this.colorbase = [
          "rgba(255,126,103,0.9)",
          "rgba(255,126,103,0.7)",
          "rgba(255,126,103,0.5)",
          "rgba(255,126,103,0.3)",
          "rgba(255,126,103,0.1)",
        ];
      } else if (_this.datagraph.prioridad === "ad") {
        this.colorbase = [
          "rgba(21,183,185,0.9)",
          "rgba(21,183,185,0.7)",
          "rgba(21,183,185,0.5)",
          "rgba(21,183,185,0.3)",
          "rgba(21,183,185,0.1)",
        ];
      } else if (_this.datagraph.prioridad === "pm") {
        this.colorbase = [
          "rgba(255,211,110,0.9)",
          "rgba(255,211,110,0.7)",
          "rgba(255,211,110,0.5)",
          "rgba(255,211,110,0.3)",
          "rgba(255,211,110,0.1)",
        ];
      }
      // const _this = this;
      Chart.defaults.global.defaultFontFamily = "'Montserrat', sans-serif"; // con esto configuramos el tipo de letra
      Chart.defaults.global.tooltips.backgroundColor = "rgba(45, 64, 89, 0.9)"; // con esto se configura el fondo del tooltip
      // Chart.defaults.global.defaultFontColor = "#ffffff";
      let datasets = _this.sortData(_this.datagraph);
      const ctx = document.getElementById(_this.idcanvas);
      ctx.getContext("2d");
      ctx.height = 150;
      const labels = _this.datagraph.labels;
      const labelsMod = [];
      for (let index = 0; index < labels.length; index++) {
        let lab = labels[index];
        lab = _this.dividircadena(lab);
        labelsMod.push(lab);
      }
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
      if (_this.chart) {
        // si la grafica ya existia la destruimos
        _this.chart.destroy();
      }

      _this.config.options.tooltips = {
        enabled: true, // poner en true si quiere que le salga el tooltip
        callbacks: {
          label: function (tooltipItem, data) {
            let label = `${_this.datagraph.labels[tooltipItem.index]}: ${
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            }`;
            return label;
          },
        },
      };
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
            d.backgroundColor.push(_this.colorbase[control]);
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
          d.borderColor = [];
          d.backgroundColor = [];
          k.forEach(function (k1, v1) {
            if (control === _this.colorbase.length) {
              // esto es para que repita los colores
              control = 0;
            }
            d.borderColor.push(_this.colorbase[control]);
            d.backgroundColor.push(_this.colorbase[control]);
            control++;
          });
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

// ejemplo de datagrafica
// const dataGrafica = {
//         typeGraphic: "pie",
//         options: {
//           scales: {
//             yAxes: [
//               {
//                 gridLines: {
//                   display: true,
//                   color: "#FFFFFF",
//                   drawOnChartArea: false,
//                 },
//                 ticks: {
//                   beginAtZero: true,
//                 },
//               },
//             ],
//             xAxes: [
//               {
//                 gridLines: {
//                   display: true,
//                   color: "#FFFFFF",
//                 },
//               },
//             ],
//           },
//           legend: { position: "bottom", display: false },
//           // cutoutPercentage: 80,
//         },
//         datasetOverride: [],
//         series: ["Girardota"],
//         labels: [
//           "Jefe",
//           "Claridad",
//           "Trato",
//           "Recursos",
//           "Apoyo Org.",
//           "Estabilidad",
//           "Retribución",
//           "Coherencia",
//           "Pertenencia",
//           "Equipo",
//           "Clima",
//         ],
//         data: [[65.6, 57.1, 63.4, 58, 62.6, 62.8, 57.8, 59.2, 58.1, 60.3, 63]],
//       };
</script>

<style>
</style>



