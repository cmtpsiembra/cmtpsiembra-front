<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Lideres</h1>
      <div class="field">
        <div class="file is-primary">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              accept=".xls, .xlsx, .pdf, .doc, .docx"
              @change="onFileChange"
              name="resume"
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="material-icons">attach_file</i>
              </span>
              <span class="file-label">Seleccionar Archivo</span>
            </span>
          </label>
        </div>
      </div>
      <progress
        v-show="avaceupload > 0"
        class="progress is-info is-small"
        :value="avaceupload"
        max="100"
      ></progress>
      <div>
        <h1 class="title">Resultado de la carga</h1>
        <p>
          <strong>Nombre del archivo:</strong>
          {{namefile}}
          <br />
          <strong>Url:</strong>
          {{urlfile}}
        </p>
        <div class="field has-addons">
          <div class="control">
            <input v-model="nombre" class="input" type="text" placeholder="Nombre" />
          </div>
          <div class="control">
            <a class="button is-info" @click="crearlistfile">Guardar</a>
          </div>
        </div>
        <div class="content">
          <hr />
          <ul>
            <li v-for="(item, index) in lisfile" :key="index">
              <strong>{{item.nombre}}</strong>
              <button class="button is-link" @click="leer(item.url)">Leer archivo</button>
              <button class="button is-link" @click="crearresultados(item)">Crear resultados</button>
              <button class="button is-link" @click="listresultados(item)">Listar resultados</button>
              <button class="button is-link" @click="enviarcorreos(item)">Enviar Correos</button>
            </li>
          </ul>
        </div>
        <pre>{{datafile}}</pre>
        <pre>{{dataresultados}}</pre>
      </div>
    </div>
  </section>
</template>

<script>
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
export default {
  data() {
    return {
      avaceupload: 0,
      namefile: "",
      urlfile: "",
      nombre: "",
      file: {},
      lisfile: [],
      datafile: [],
      dataresultados: []
    };
  },
  computed: {
    ...mapState(["idtoken"])
  },
  methods: {
    async enviarcorreos(item){
      let result;
      const d = { id: item._id };
      try {
        result = await apiServices.post(`/enviarcorreos`, d);
        this.datafile = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async crearresultados(item) {
      let result;
      const d = { url: item.url, excel: item._id };
      try {
        result = await apiServices.post(`/crearresultadoslideres`, d);
        this.datafile = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async listresultados(item) {
      let result;
      try {
        result = await apiServices.get(`/listresultadoslideres/${item._id}`);
        this.dataresultados = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async leer(url) {
      console.log("url", url);
      let result;
      try {
        result = await apiServices.post(
          `/readfilelideres`,
          { url: url }
        );
        this.datafile = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async crearlistfile() {
      this.file.nombre = this.nombre;
      this.file.url = this.urlfile;
      try {
        await apiServices.post(`/createfilelideres`, this.file);
        this.$store.dispatch("notify", {
          message: `Perfecto. Archivo creado con exito`
        });
        await apiServices.get(`/listfilelideres`);
      } catch (error) {
        console.log(error);
        this.$store.dispatch("notify", {
          message: "Ups, ocurrió un error. Inténtelo nuevamente",
          type: "is-danger",
          duration: 4000
        });
      }
    },
    async listfilelider() {
      let result;
      try {
        result = await apiServices.get(`/listfilelideres`);
        this.lisfile = result.data;
      } catch (error) {
        console.log(error);
        this.$store.dispatch("notify", {
          message: "Ups, ocurrió un error. Inténtelo nuevamente",
          type: "is-danger",
          duration: 4000
        });
      }
    },
    onFileChange(e) {
      const _this = this;
      let task;
      const files = e.target.files;
      if (files.length) {
        const file = files[0];
        task = _this.$fire.reflideres(file);
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
              _this.namefile = file.name;
              _this.urlfile = url;
              _this.avaceupload = 0;
            } catch (err) {
              console.log("ocurrio un error", err);
            }
          }
        );
      }
    }
  },
  created() {
    if (this.idtoken) {
      this.listfilelider();
    }
  },
  watch: {
    idtoken(newv, oldv) {
      if (newv) {
        this.listfilelider();
      }
    }
  }
};
</script>