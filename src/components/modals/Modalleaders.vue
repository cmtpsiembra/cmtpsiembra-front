<template>
  <div class="modal" v-bind:class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card" style="width:1280px;">
      <header class="modal-card-head">
        <p class="modal-card-title"></p>
        <div class="buttons has-addons is-right">
          <button class="delete is-right" aria-label="close" @click="closeModal"></button>
        </div>
      </header>
      <section class="modal-card-body">
        <h2 class="subtitle" align="center">prueba</h2>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    show: Boolean
  },
  methods: {
    closeModal() {
      this.$emit("showmodalleaders", false);
    }
  }
};
</script>