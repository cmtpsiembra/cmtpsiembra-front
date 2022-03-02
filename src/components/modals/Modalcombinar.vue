<template>
  <div class="modal" v-bind:class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Combinar Categorías</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <ul>
          <li v-for="(k,v) in groups" :key="v">
            <input
              class="is-checkradio"
              type="checkbox"
              :id="k.id"
              v-model="selection[k.nombre]"
            />
            <label :for="k.id" class="is-capitalized">{{k.nombre}}</label>
          </li>
        </ul>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="combinar">Aceptar</button>
        <button class="button" @click="closeModal">Cancelar</button>

      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selection: {}
    };
  },
  props: {
    show: Boolean,
    groups: Array
  },
  methods: {
    combinar(){
      this.$emit("combina", this.selection);
    },
    closeModal() {
      this.$emit("showmodalgraph", false);
    }
  }
};
</script>