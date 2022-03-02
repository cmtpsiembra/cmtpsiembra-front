<template>
  <div class="modal" v-bind:class="{ 'is-active': modalnotification.show }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="notification" v-bind:class="modalnotification.info.clase">
        <button class="delete" @click="cancelar"></button>
        <h1 class="title is-1">{{modalnotification.info.title}}</h1>
        <h2 class="subtitle is-3">{{modalnotification.info.message}}</h2>
        <div class="field is-grouped">
          <p class="control">
            <button class="button is-large" @click="aceptar">Aceptar</button>
          </p>
          <p class="control">
            <button class="button is-large is-dark" @click="cancelar">Cancelar</button>
          </p>
        </div>
      </div>
      <!-- Any other Bulma elements you want -->
    </div>
    <button class="modal-close is-large" aria-label="close" @click="cancelar"></button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["modalnotification"])
  },
  methods: {
    aceptar() {
      this.$store.commit("changenotificationmodal", {
        result: {
          aceptar: true,
          data: this.modalnotification.info.data,
          isfolder: this.modalnotification.info.isfolder,
          isUnarchive: this.modalnotification.info.isUnarchive
        }
      });
    },
    cancelar() {
      this.$store.commit("changenotificationmodal", {
        result: {
          aceptar: false
        }
      });
    }
  }
};
</script>