<template>
  <div>
    <div
      :id="idcanvas"
      class="parcoords"
      style="width: 100%; height: 120px"
    ></div>
  </div>
</template>
<script>
// import graph from "@/helpers/graph";

import pco from "@/helpers/d3.parcoords.js";

export default {
  data() {
    return {
      idcanvas: "",
      datos: [
        [0, -0, 0, 0, 0, 3],
        [1, -1, 1, 2, 1, 6],
        [2, -2, 4, 4, 0.5, 2],
        [3, -3, 9, 6, 0.33, 4],
        [4, -4, 16, 8, 0.25, 9],
      ],
    };
  },
  created() {
    this.idcanvas = Math.random().toString(36).substr(2, 9);
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      pco
        .parcoords()(`#${this.idcanvas}`)
        .data(this.datos)
        .render()
        .createAxes();
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

