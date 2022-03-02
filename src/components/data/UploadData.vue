<template>
  <section>
    <div>
      <section class="section">
        <div class="container">
          <h1 class="title">Datos para Otros Estudios</h1>
          <h2
            class="subtitle"
          >En este menú podra cargar los datos de Clima, Compromiso, Beneficios, Felicidad.</h2>
          <div class="field">
            <div class="file is-primary">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  accept=".xls, .xlsx"
                  @change="onFileChange"
                  name="resume"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="material-icons">cloud_upload</i>
                  </span>
                  <span class="file-label">&nbsp; Archivo</span>
                </span>
              </label>
            </div>
          </div>
          <div v-if="data" class="field is-grouped">
            <p class="control is-expanded">
              <input
                class="input is-large"
                type="text"
                placeholder="Nombre del Informe"
                v-model="fupload.nombre"
              />
            </p>
            <p class="control">
              <a class="button is-info is-large" @click="savefile()">Guardar</a>
            </p>
          </div>
          <progress
            v-show="avaceupload > 0"
            class="progress is-info is-small"
            :value="avaceupload"
            max="100"
          ></progress>
          <div v-if="data">
            <h1 class="title">Resumen del archivo</h1>
            El archivo contiene <strong>{{data.totalDatos}}</strong> datos
            <br />
            <strong>Los estudios encontrados son:</strong>
            <br />
            <div class="tags are-medium">
              <span class="tag is-link" v-for="(k,v) in data.pruebas" :key="v">{{k}}</span>
            </div>
            <strong>Los grupos de Análisis son:</strong>
            <div class="tags">
              <div v-for="(k,v) in data.gruposAnalisis" :key="v">
                <input
                    class="is-checkradio"
                    type="checkbox"
                    :id="'itemselect'+v"
                    v-model="k.check"
                  />
                  <label :for="'itemselect'+v" class="is-capitalized">{{k.nombre}}</label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
export default {
  data() {
    return {
      avaceupload: 0,
      data: null,
      titulo: null,
      fupload: {
        nombre: "",
        url: "",
        grupos:[]
      }
    };
  },
  computed: {
    ...mapState(["idtoken", "empresa"])
  },
  methods: {
    async savefile() {
      const _this = this
      _this.fupload.grupos = [];
      this.data.gruposAnalisis.forEach(function(k){
        if(k.check){
          _this.fupload.grupos.push(k.nombre);
        }
      });
      try {
        const result = await apiServices.post(`/savefile`, _this.fupload);
        if (result.data) {
          _this.data = null;
          _this.fupload.nombre = "";
          _this.fupload.url = "";
          this.$store.dispatch("notify", {
            message: "Perfecto!. Informe Guardado."
          });
        }
      } catch (err) {
        console.log("ocurrio un error", err);
      }
    },
    onFileChange(e) {
      const _this = this;
      let task;
      const files = e.target.files;
      if (files.length) {
        const file = files[0];
        task = _this.$fire.refexcel(file);
        _this.avaceupload = 10;
        task.on(
          "state_changed",
          snapshot => {
            const porcentaje =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (porcentaje > 10) {
              _this.avaceupload = porcentaje;
            }
          },
          err => {
            console.log("error subiendo el archivo", err);
          },
          async () => {
            try {
              const url = await task.snapshot.ref.getDownloadURL();
              _this.avaceupload = 0;
              _this.fupload.url = url;
              const data = {
                url: url
              };
              const result = await apiServices.post(`/leefileexcel1`, data);
              if (result.data) {
                _this.data = result.data;
              }
            } catch (err) {
              console.log("ocurrio un error", err);
            }
          }
        );
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.icon-lista {
  vertical-align: bottom;
}
</style>