<template>
  <div class="modal" v-bind:class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Compartir Informe</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-large" id="urlText" :value="ruta" type="text" placeholder="Ruta" />
          </div>
          <div class="control">
            <a class="button is-info is-large" @click="copiar">Copiar</a>
          </div>
        </div>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-large" v-model="pass" type="text" placeholder="Contraseña" />
          </div>
          <div class="control">
            <a class="button is-primary is-large" @click="changepassword">Cambiar Contraseña</a>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-large" @click="closeModal">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<script>
// import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";

export default {
  data() {
    return {
      ruta: "",
      pass: "",
      id: "",
      rutaserver: null
    };
  },
  props: {
    show: Boolean,
    informe: Object
  },
  computed: {
    ...mapState(["idtoken"]),
    info() {
      return this.informe;
    }
  },
  methods: {
    copiar(){
      var copyText = document.getElementById('urlText');
      copyText.select();
      document.execCommand("copy");
    },
    async changepassword() {
      const _this = this;
      let result;
      const data = {
        id: _this.id,
        password: _this.pass
      };
      let ruta = 'changepassword';
      if(this.rutaserver){
        ruta = this.rutaserver
      }
      try {
        result = await apiServices.post(`/${ruta}`, data);
        if (result.data) {
          this.$store.dispatch("notify", {
            message: "Perfecto. La contraseña se cambió con éxito",
            type: "is-link",
            position: "top-center"
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    closeModal() {
      this.$emit("showmodalshare", false);
    }
  },
  watch: {
    info(nv, ov) {
      if (nv) {
        // this.ruta = "localhost:8080/share/" + nv.id;
        this.pass = nv.password;
        this.id = nv.id;
        const baseurl = process.env.FRONT_URL;
        if(nv.rutacustom){
          this.ruta = `${baseurl}/${nv.rutacustom}/${nv.id}`;
          this.rutaserver = nv.rutaserver;
          if(nv.paramscustom){
            nv.paramscustom.params.forEach(e => {
              this.ruta = this.ruta + '/'+nv.paramscustom[e];
            });
          }
        }else{
          this.ruta = `${baseurl}/share/${nv.id}`;
        }
      }
    }
  }
};
</script>