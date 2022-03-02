<template>
  <div id="kkk"></div>
</template>
<script>
// import graph from "@/helpers/graph";

import pco from "@/helpers/d3.parcoords.js";
import * as d3 from "d3";

export default {
  data() {
    return {
      idcanvas: null,
      vName: {
        Logro: "LOG",
        Poder: "POD",
        Afiliación: "AFI",
        "Auto-Realización": "A-R",
        Reconocimiento: "REC",
        "Dedicación a la tarea": "DT",
        "Aceptación autoridad": "AA",
        "Aceptación normas y valores": "ANV",
        Requisición: "REQ",
        Expectación: "EXP",
        Supervisión: "SUP",
        "Grupo de trabajo": "GT",
        "Contenido de trabajo": "CT",
        Salario: "SAL",
        Promoción: "PRO",
        "Orientación al éxito": "OEX",
        "Orientación a la tarea": "OTA",
        "Adaptabilidad social": "ADP",
        Internalidad: "INT",
        Externalidad: "EXT",
      },
    };
  },
  props: {
    datagraph: {
      type: Array,
    },
    cambiop: Number,
  },

  methods: {
    showdiv() {
      return true;
    },
    render() {
      if (this.idcanvas) {
        const elem = document.getElementById(this.idcanvas);
        elem.parentNode.removeChild(elem);
      }
      this.idcanvas = `k${Math.random().toString(36).substr(2, 9)}`;
      var chart = d3.select("#kkk");
      chart
        .append("div")
        .attr("id", this.idcanvas)
        .attr("class", "parcoords")
        .style("height", "140px");

      const _this = this;
      const datos = [];
      for (let index in this.datagraph) {
        const aspirante = _this.datagraph[index];
        if (aspirante.select) {
          const d = {
            color: aspirante.color,
            _id: aspirante._id,
            name: aspirante.name,
            cedula: aspirante.cedula,
          };
          for (let index in aspirante.resultadoscalculados) {
            d[_this.vName[index]] = aspirante.resultadoscalculados[index];
          }
          datos.push(d);
        }
      }
      // const blueToBrown = d3.scale.ordinal().domain(datos).range(range);
      let parcoords = pco
        .parcoords()(`#${this.idcanvas}`)
        .color(function (d) {
          return d.color;
        }); // quantitative color scale
      parcoords.margin({ top: 24, right: 0, bottom: 10, left: 10 }).alpha(0.8);
      let cambio = 0;
      parcoords.on("brush", function (d) {
        cambio++;
        _this.$emit("returndata", { data: d, cambio });
      });

      parcoords
        .data(datos)
        .hideAxis(["name", "_id", "cedula", "color"])
        // .composite("darken")
        .render()
        .brushMode("1D-axes") // enable brushing
        .interactive();
    },
  },
  watch: {
    cambiop(newv, oldv) {
      if (this.datagraph) {
        this.render();
      }
    },
  },
};
</script>

<style lang="css">
.parcoords > canvas {
  font: 14px sans-serif;
  position: absolute !important;
}
.parcoords > canvas {
  pointer-events: none;
}
.parcoords text.label {
  cursor: default;
}
.parcoords rect.background:hover {
  fill: rgba(120, 120, 120, 0.2);
}
.parcoords canvas {
  opacity: 1;
  transition: opacity 0.3s;
  -moz-transition: opacity 0.3s;
  -webkit-transition: opacity 0.3s;
  -o-transition: opacity 0.3s;
}
.parcoords canvas.faded {
  opacity: 0.25;
}
.parcoords {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: white;
}
</style>

