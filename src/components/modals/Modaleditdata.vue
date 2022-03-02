<template>
  <div class="modal" v-bind:class="{ 'is-active': show}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Editando el campo
          <strong>{{datatoedit.campo}}</strong>
        </p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <input class="input is-large" type="text" placeholder="Text" v-model="datatosave.input" />
      </section>
      <footer class="modal-card-foot">
        <button class="button is-info is-large" @click="savedata">Guardar</button>
        <button class="button is-large" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import apiServices from "@/services/yungol-services";
export default {
  data() {
    return {
      datatosave:{}
    }
  },
  props: {
    show: Boolean,
    datatoedit: Object,
  },
  methods: {
    closeModal() {
      this.$emit("showmodaleditdata", false);
    },
    asigncampos(){
      this.datatosave.input = this.datatoedit.input;
      this.datatosave._id = this.datatoedit._id;
      this.datatosave.set = {};
    },
    async savedata(){
      try{
      this.datatosave.set[`grupos.${this.datatoedit.campo}`] = this.datatosave.input;
      
        const result = await apiServices.put(
          `/editdatobyid`,
          this.datatosave
        );
        if(result.data && result.data.nModified === 1){
          this.closeModal();
          this.datatosave.campo = this.datatoedit.campo;
          this.$emit("responsemodaleditdata", this.datatosave);
        }
      }catch(err){
        console.log(err);
      }
    }
  },
  watch:{
    show(nv,ov){
      if(nv){
        this.asigncampos();
      }
    }
  }
};
</script>