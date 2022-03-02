<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title has-text-white is-2">Líderes PhD</h1>
          <h2 class="subtitle has-text-white is-4">Personas que hacen la diferencia</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="contenedor">
          <ul class="progressbar">
            <li
              v-bind:class="{ 'is-active': activo('yProceso', 0) }"
              @click="selectSection('yProceso', 0)"
            >
              <a href="#">Proceso</a>
            </li>

            <li
              v-if="!tokenUser.ghumana"
              v-bind:class="{ 'is-active': activo('yEmpleados', 1) }"
              @click="selectSection('yEmpleados', 1)"
            >
              <a href="#">Empleados</a>
            </li>
            <li
              v-if="!tokenUser.ghumana"
              v-bind:class="{ 'is-active': activo('yRelaciones', 2) }"
              @click="selectSection('yRelaciones', 2)"
            >
              <a href="#">Relaciones</a>
            </li>
            <li
              v-bind:class="{ 'is-active': activo('yResumen', 3) }"
              @click="selectSection('yResumen', 3)"
            >
              <a>Resumen</a>
            </li>

            <li
              v-bind:class="{ 'is-active': activo('yResultado', 4) }"
              @click="selectSection('yResultado', 4)"
            >
              <a href="#">Resultados</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="contenedor2 has-text-centered">
        <h2 class="subtitle">Proceso seleccionado:</h2>
        <h1 class="title is-4">{{proceso.nombre}}</h1>
      </div>
    </section>
    <div class="container">
      <component :is="select" :proceso="proceso" @selproceso="selproceso"></component>
    </div>
  </div>
</template>

<script>
import yResumen from "@/components/lideres/Resumen.vue";
import yProceso from "@/components/lideres/Proceso.vue";
import yEmpleados from "@/components/lideres/Empleados.vue";
import yRelaciones from "@/components/lideres/Relaciones.vue";
import yResultado from "@/components/lideres/Resultados.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      select: "yProceso",
      step: 0,
      proceso: {
        nombre: ".....",
      },
    };
  },
  computed: {
    ...mapState(["tokenUser"]),
  },
  methods: {
    selproceso(d) {
      this.proceso = d;
      setTimeout(this.selectSection('yEmpleados', 1), 5000);
    },
    selectSection(d, step) {
      this.select = d;
      this.step = step;
    },
    activo(a, step) {
      if (a === this.select || step > this.step) {
        return false;
      } else {
        return true;
      }
    },
  },
  components: {
    yResumen,
    yProceso,
    yEmpleados,
    yRelaciones,
    yResultado,
  },
};
</script>

<style lang="scss" scoped>
.contenedor {
  width: 100%;
  position: absolute;
  z-index: 1;
}
.contenedor2 {
  width: 90%;
  position: absolute;
  z-index: 1;
}
.progressbar li {
  float: left;
  width: 20%;
  position: relative;
  text-align: center;
}
.progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 30px;
  height: 30px;
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 27px;
  background: white;
  color: #bebebe;
  text-align: center;
  font-weight: bold;
}
.progressbar {
  counter-reset: step;
}
.progressbar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  background: #979797;
  top: 15px;
  left: -50%;
  z-index: -1;
}
.progressbar li:first-child:after {
  content: none;
}
.progressbar li:first-child::before {
  background: #fa7d66;
  border: #fa7d66;
  color: white;
}
.progressbar li.is-active {
  color: #fa7d66;
}
.progressbar li.is-active::before {
  background: #fa7d66;
  border: #fa7d66;
  color: white;
}
.progressbar li.is-active + li::after {
  background: #fa7d66;
  border: #fa7d66;
}
.progressbar li.is-active + li:before {
  background: #fa7d66;
  border: 2px solid #fa7d66;
  color: white;
}
</style>