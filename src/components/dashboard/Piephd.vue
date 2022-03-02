<template>
  <div>
    <canvas :id="idcanvas"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
// import graph from "@/helpers/graph";
// import graph from "@/helpers/graph";

export default {
  props: {
    datagraph: {
      type: Object
    },
    cambio: Number
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
        "#248ea9"
      ]
    };
  },
  created() {
    this.idcanvas = Math.random()
      .toString(36)
      .substr(2, 9);
  },
  mounted() {
    if (this.datagraph.data) {
      this.render(this);
    }
  },
  methods: {
    render(_this) {
      this.colorbase = this.datagraph.colors;
      // const _this = this;
      Chart.defaults.global.defaultFontFamily = "'Montserrat', sans-serif"; // con esto configuramos el tipo de letra
      Chart.defaults.global.tooltips.backgroundColor = "rgba(45, 64, 89, 0)"; // con esto se configura el fondo del tooltip le puse al ultimo 0 para que no se vea
      let datasets = _this.sortData(_this.datagraph);
      const ctx = document.getElementById(_this.idcanvas);
      ctx.getContext("2d");
      // ctx.height = 220;
      _this.config = {
        // The type of chart we want to create
        type: _this.datagraph.typeGraphic,

        // The data for our dataset
        data: {
          labels: _this.datagraph.labels,
          datasets: datasets
        },
        // Configuration options go here
        options: _this.datagraph.options
      };
      _this.config.options.tooltips = {
        enabled: true, // poner en true si quiere que le salga el tooltip
        callbacks: {
          label: function(tooltipItem, data) {
            _this.$emit("tooltip", {
              datapie:_this.datagraph.datapie,
              tooltipItem,
              data
            });
            let label = '';
            // let label = `${data.datasets[tooltipItem.datasetIndex].label} - ${
            //   data.labels[tooltipItem.index]
            // }: ${
            //   data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            // }`;
            return label;
          }
        }
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
      datagraph.typeGraphic = "doughnut";
      datagraph.data.forEach(function(k, v) {
        const d = {};
        d.label = datagraph.series[v];
        d.borderColor = [];
        d.backgroundColor = [];
        control = 0;
        k.forEach(function(k1, v1) {
          if (control === _this.colorbase.length) {
            // esto es para que repita los colores
            control = 0;
          }
          // d.borderColor.push(_this.colorbase[control]);
          d.borderColor.push("#fff");
          // d.backgroundColor.push(graph.hexToRgbA(_this.colorbase[control]));
          d.backgroundColor.push(_this.colorbase[control]);

          control++;
        });
        d.borderWidth = 2;
        d.data = _this.decimals(k);
        datasets.push(d);
      });
      return datasets;
    }
  },
  watch: {
    cambio(newv, oldv) {
      if (this.datagraph.data) {
        this.render(this);
      }
    }
  }
};
</script>

<style>
</style>

