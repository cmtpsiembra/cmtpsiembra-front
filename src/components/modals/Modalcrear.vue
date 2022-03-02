<template>
  <div class="modal" v-bind:class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card" style="width:1700px;">
      <header class="modal-card-head">
        <p class="modal-card-title">Agregar Datos</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <table class="table">
          <tr>
            <th v-for="(k,v) in variablescrear" :key="v">{{k}}</th>
          </tr>
          <tr>
            <td width: = "500px" v-for="(k,v) in variablescrear" :key="v">
              <textarea class="textarea is-large" type="text" v-model="dataCreated[k]"></textarea>
            </td>
          </tr>
        </table>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="crear">Aceptar</button>
        <button class="button" @click="closeModal">Cancelar</button>

      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataCreated: {},
      rowCreated: {},
    };
  },
  props: {
    show: Boolean,
    variablescrear: Array,
    datoSelected: Object
  },
  methods: {
    closeModal() {
      this.$emit("showmodalgraph", false);
      this.dataCreated = {};
      this.rowCreated = {};
    },
    crear(){
      const _this = this;
      this.variablescrear.forEach(function(k){
        let n;
        if(k === 'Grupo' || k === 'SubGrupo'){
          _this.rowCreated[k] = _this.dataCreated[k];
        }else{
          _this.rowCreated[k] = {};
          if(_this.dataCreated[k]){
            n = parseFloat(_this.dataCreated[k]);
          }else{
            n = 0;
          }
          _this.rowCreated[k][_this.datoSelected.d] = n;
        }
      });
      this.$emit("crea", this.rowCreated);
      this.dataCreated = {};
      this.rowCreated = {};
    }
  }
};
</script>