<template>
  <div class="modal" v-bind:class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Estadístico de {{data.grupo}} variable
          <strong>{{data.variable}}</strong>
        </p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div v-for="(grupo, index) in data.grupos" :key="index">
          <h3 class="title is-5">{{grupo}}</h3>
          <div class="table-container">
            <table class="table table is-narrow table is-bordered">
              <thead style="background-color: #ececec;">
                <tr>
                  <th>Grupo</th>
                  <th>n</th>
                  <th>m</th>
                  <th>desv</th>
                  <th>gl</th>
                  <th>t</th>
                  <th>Critico</th>
                  <th>Significancia</th>
                </tr>
              </thead>

              <tr v-for="(subgrupo, index1) in data.grupos" :key="index1">
                <td style="background-color: #ececec;">{{subgrupo}}</td>
                <td class="is-family-monospace has-text-right">{{data.estadistico[grupo][subgrupo] ? data.estadistico[grupo][subgrupo].tstudent.n2 : ''}}</td>
                <td class="is-family-monospace">{{data.estadistico[grupo][subgrupo] ? data.estadistico[grupo][subgrupo].tstudent.m2 : ''}}</td>
                <td class="is-family-monospace">{{data.estadistico[grupo][subgrupo] ? data.estadistico[grupo][subgrupo].tstudent.desv2: ''}}</td>
                <td class="is-family-monospace">{{data.estadistico[grupo][subgrupo] ? data.estadistico[grupo][subgrupo].tstudent.gl : ''}}</td>
                <td class="is-family-monospace">{{data.estadistico[grupo][subgrupo] ? data.estadistico[grupo][subgrupo].tstudent.t: ''}}</td>
                <td class="is-family-monospace">{{data.estadistico[grupo][subgrupo] ? data.estadistico[grupo][subgrupo].tstudent.critico : ''}}</td>
                <td class="is-family-monospace">{{data.estadistico[grupo][subgrupo] ? data.estadistico[grupo][subgrupo].tstudent.significancia: ''}}</td>
              </tr>
            </table>
          </div>
          <br>
        </div>
        <!-- Content ... -->
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="close">Cerrar</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    show: Boolean,
    data: Object
  },
  methods: {
    close() {
      this.$emit("close", true);
    }
  }
};
</script>

<style>
</style>