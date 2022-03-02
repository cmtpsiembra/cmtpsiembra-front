<template>
  <div class="modal" v-bind:class="{ 'is-active': showmodal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{infomodal.title}}</p>
        <button class="delete" aria-label="close" @click="closemodal"></button>
      </header>
      <section v-if="infomodal.fuente === 'selBloque'" class="modal-card-body">
        <div class="select">
          <select v-model="informeSelected">
            <option
              v-for="(option, index) in informes"
              v-bind:value="option"
              v-bind:key="index"
            >{{ option.nombre }}</option>
          </select>
        </div>
      </section>
      <section
        v-if="infomodal.fuente === 'selBloque' || infomodal.fuente === 'selBloqueEmbed'"
        class="modal-card-body"
      >
        <div class="buttons is-centered">
          <button
            class="button is-light"
            v-bind:class="{ 'is-primary': active('una') }"
            @click="selcol('una')"
          >
            <span class="icon">
              <i class="material-icons">menu</i>
            </span>&nbsp; Una Columna
          </button>
          <button
            class="button is-light"
            v-bind:class="{ 'is-primary': active('dos') }"
            @click="selcol('dos')"
          >
            <span class="icon">
              <i class="material-icons">dashboard</i>
            </span>&nbsp; Dos Columnas
          </button>
          <button
            class="button is-light"
            v-bind:class="{ 'is-primary': active('tres') }"
            @click="selcol('tres')"
          >
            <span class="icon">
              <i class="material-icons">view_column</i>
            </span>&nbsp; Tres Columnas
          </button>
          <button
            class="button is-light"
            v-bind:class="{ 'is-primary': active('plantilla') }"
            @click="selcol('plantilla')"
          >
            <span class="icon">
              <i class="material-icons">chrome_reader_mode</i>
            </span>&nbsp; Cargar Plantilla
          </button>
        </div>
        <div v-show="showbloque2" class="buttons is-centered">
          <button
            class="button is-light"
            @click="selcol('izq')"
            v-bind:class="{ 'is-primary': active('izq') }"
          >Izquierda</button>
          <button
            class="button is-light"
            @click="selcol('cent')"
            v-bind:class="{ 'is-primary': active('cent') }"
          >Iguales</button>
          <button
            class="button is-light"
            @click="selcol('der')"
            v-bind:class="{ 'is-primary': active('der') }"
          >Derecha</button>
        </div>
        <div v-show="showplantilla" class="buttons is-centered">
          <button
            @click="selplantilla(item)"
            class="button is-small is-dark is-outlined"
            v-for="(item, index) in plantillas"
            :key="index"
          >{{item.title}}</button>
        </div>
        <!-- Content ... -->
      </section>
      <section v-if="infomodal.fuente === 'contenido'" class="modal-card-body">
        <div class="buttons is-centered">
          <button
            class="button is-light"
            v-bind:class="{ 'is-primary': active('titulo') }"
            @click="selcol('titulo')"
          >Titulo</button>
          <button
            class="button is-light"
            v-bind:class="{ 'is-primary': active('title') }"
            @click="selcol('title')"
          >Titulo con fondo</button>
          <button
            class="button is-light"
            v-bind:class="{ 'is-primary': active('card') }"
            @click="selcol('card')"
          >Texto</button>
          <button
            class="button is-light"
            v-bind:class="{ 'is-primary': active('timeline') }"
            @click="selcol('timeline')"
          >Linea de tiempo</button>
          <button
            class="button is-light"
            v-bind:class="{ 'is-primary': active('graphic') }"
            @click="selcol('graphic')"
          >Gráfica</button>
          <button
            class="button is-light"
            v-bind:class="{ 'is-primary': active('images') }"
            @click="selcol('images')"
          >Imagen</button>
          <button
            class="button is-light"
            v-bind:class="{ 'is-primary': active('files') }"
            @click="selcol('files')"
          >Archivos adjuntos</button>
        </div>
        <div v-show="bloquesel === 'titulo'">
          <div class="field">
            <div class="control">
              <input v-model="item.titulo" class="input is-large" type="text" placeholder="Título" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                v-model="item.subtitulo"
                class="input is-large"
                type="text"
                placeholder="Subtítulo"
              />
            </div>
          </div>
        </div>
        <div v-show="bloquesel === 'title'">
          <div class="field">
            <div class="control">
              <input v-model="item.title" class="input is-large" type="text" placeholder="Título" />
            </div>
          </div>
          <div class="buttons is-centered">
            <button class="button is-primary" @click="item.color='#ff9800'">
              <span class="icon">
                <i class="material-icons">format_paint</i>
              </span>
            </button>
            <button class="button is-info" @click="item.color='#15b7b9'">
              <span class="icon">
                <i class="material-icons">format_paint</i>
              </span>
            </button>
          </div>
        </div>
        <div v-show="bloquesel === 'card'">
          <div class="field">
            <div class="control">
              <input v-model="item.title" class="input is-large" type="text" placeholder="Título" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                v-model="item.subtitle"
                class="input is-large"
                type="text"
                placeholder="Subtítulo"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea v-model="item.texto" class="textarea is-large" placeholder="Texto"></textarea>
            </div>
          </div>
        </div>
        <div v-show="bloquesel === 'graphic'">
          <table class="table is-striped is-fullwidth">
            <tr>
              <th>Nombre</th>
              <th>Texto</th>
              <th></th>
            </tr>
            <tr v-for="(item,index) in graficas" :key="index">
              <td>{{item.nombre}}</td>
              <td>{{item.texto}}</td>
              <td>
                <button class="button is-info" @click="selGrafica(item)">Seleccionar</button>
              </td>
            </tr>
          </table>
        </div>
        <div v-show="bloquesel === 'timeline'">
          <div class="buttons is-centered">
            <button
              class="button is-light"
              v-bind:class="{ 'is-primary': activetime(time.id) }"
              v-for="(time,indext) in item.timeline"
              :key="indext"
              @click="seltimeline(time)"
            >{{indext + 1}}</button>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="item.title" class="input is-large" type="text" placeholder="Título" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea v-model="item.texto" class="textarea is-large" placeholder="Texto"></textarea>
            </div>
          </div>
        </div>
        <div v-show="bloquesel === 'images'">
          <div class="field">
            <div class="file is-primary">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  accept=".png, .jpg, jpeg"
                  @change="onFileChange"
                  name="resume"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="material-icons">add_photo_alternate</i>
                  </span>
                  <span class="file-label">Seleccionar Imagen</span>
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
          <figure class="image">
            <img :src="urlimg" />
          </figure>
        </div>
        <div v-show="bloquesel === 'files'">
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
          <a :href="urlfile" v-if="urlfile" target="_blank">
            <span class="icon icon-lista">
              <i class="material-icons">attach_file</i>
            </span>
            <span class="icon-listas">{{namefile}}</span>
          </a>
        </div>
      </section>
      <section v-if="infomodal.fuente === 'guardar'" class="modal-card-body">
        <div class="field is-grouped">
          <div class="control">
            <div class="select">
              <select v-model="informeSelected">
                <option
                  v-for="(option, index) in informes"
                  v-bind:value="option"
                  v-bind:key="index"
                >{{ option.nombre }}</option>
              </select>
            </div>
          </div>
          <div class="control">
            <div class="select">
              <select v-model="tipo">
                <option value="informe">Informe</option>
                <option value="plantilla">Plantilla</option>
              </select>
            </div>
          </div>
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="Nombre" v-model="nombreInforme"/>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="estoyseguro">Estoy seguro</button>
        <button class="button" @click="closemodal">Cancel</button>
      </footer>
    </div>''
  </div>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
export default {
  data() {
    return {
      bloquesel: "",
      showbloque2: false,
      plantillas: null,
      showplantilla: false,
      plantillasel: {},
      showtitulo: false,
      item: {},
      graficas: [],
      urlimg: "",
      urlfile: "",
      namefile: "",
      avaceupload: 0,
      timesel: "",
      informeSelected: {},
      informes: [],
      tipo: "informe",
      nombreInforme: ''
    };
  },
  computed: {
    ...mapState(["showmodal", "idtoken", "infomodal"])
  },
  methods: {
    seltimeline(t, i) {
      this.timesel = t.id;
      this.item.title = t.data.title;
      this.item.texto = t.data.texto;
      this.item.idtime = t.id;
    },
    onFileChange(e) {
      const _this = this;
      let task;
      const files = e.target.files;
      if (files.length) {
        const file = files[0];
        if (_this.bloquesel === "images") {
          task = _this.$fire.putimg(file);
        } else {
          task = _this.$fire.reffile(file);
        }
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
          () => {
            task.snapshot.ref
              .getDownloadURL()
              .then(url => {
                if (_this.bloquesel === "images") {
                  _this.urlimg = url;
                  _this.item.img = url;
                } else {
                  _this.namefile = file.name;
                  _this.urlfile = url;
                  _this.item.file = {
                    name: file.name,
                    url: url
                  };
                }
                _this.avaceupload = 0;
              })
              .catch(err => {
                console.log("ocurrio un error", err);
              });
          }
        );
      }
    },
    selGrafica(i) {
      this.item.title = i.nombre;
      this.item.message = i.texto;
      this.item.data = i.datos;
      this.item.data.typeGraphic = i.tipografica;
    },
    selplantilla(i) {
      this.plantillasel = i;
    },
    closemodal() {
      this.$store.commit("showmodal");
      this.bloquesel = "";
      this.showbloque2 = false;
      this.plantillas = null;
      this.showplantilla = false;
      this.plantillasel = {};
      this.item = {};
      this.urlimg = "";
      this.urlfile = "";
      this.namefile = "";
      this.avaceupload = 0;
    },
    selcol(c) {
      this.bloquesel = c;
      if (
        this.infomodal.fuente === "selBloque" ||
        this.infomodal.fuente === "selBloqueEmbed"
      ) {
        if (c === "dos" || c === "izq" || c === "cent" || c === "der") {
          this.showbloque2 = true;
          this.showplantilla = false;
        } else if (c === "plantilla") {
          this.showplantilla = true;
          this.showbloque2 = false;
          this.traePlantillas(this);
        } else {
          this.showbloque2 = false;
          this.showplantilla = false;
        }
      }
      if (this.infomodal.fuente === "contenido") {
        if (c === "title") {
          this.item.color = "#15b7b9";
        }
        if (c === "graphic") {
          this.traePartes(this);
        }
      }
    },
    estoyseguro() {
      const _this = this;
      if (_this.infomodal.fuente === "selBloque") {
        this.$store.commit("resultdatamodal", {
          fuente: _this.infomodal.fuente,
          data: {
            bloquesel: _this.bloquesel,
            data: _this.plantillasel,
            informeSelected: _this.informeSelected
          }
        });
        this.$store.commit("showmodal");
        this.bloquesel = "";
        this.showbloque2 = false;
        this.plantillas = null;
        this.showplantilla = false;
        this.plantillasel = {};
        this.urlimg = "";
        this.urlfile = "";
        this.namefile = "";
        this.item = {};
        this.avaceupload = 0;
      }
      if (_this.infomodal.fuente === "selBloqueEmbed") {
        this.$store.commit("resultdatamodal", {
          fuente: _this.infomodal.fuente,
          data: {
            bloquesel: _this.bloquesel,
            data: _this.plantillasel,
            idbloque: _this.infomodal.data.c.id
          }
        });
        this.$store.commit("showmodal");
        this.bloquesel = "";
        this.showbloque2 = false;
        this.plantillas = null;
        this.showplantilla = false;
        this.plantillasel = {};
        this.urlimg = "";
        this.urlfile = "";
        this.namefile = "";
        this.item = {};
        this.avaceupload = 0;
      }
      if (_this.infomodal.fuente === "contenido") {
        this.$store.commit("resultdatamodal", {
          isEdit: _this.infomodal.isEdit,
          fuente: _this.infomodal.fuente,
          data: {
            type: _this.bloquesel,
            item: _this.item,
            res: _this.infomodal.data
          }
        });
        this.$store.commit("showmodal");
        this.bloquesel = "";
        this.showbloque2 = false;
        this.plantillas = null;
        this.showplantilla = false;
        this.plantillasel = {};
        this.urlimg = "";
        this.urlfile = "";
        this.namefile = "";
        this.item = {};
        this.avaceupload = 0;
      }
      if(_this.infomodal.fuente === "guardar"){
        this.$store.commit("resultdatamodal", {
          fuente: _this.infomodal.fuente,
          data: {
            informeSelected: _this.informeSelected,
            tipo: _this.tipo,
            nombreInforme: _this.nombreInforme
          }
        });
        this.$store.commit("showmodal");
        this.bloquesel = "";
        this.showbloque2 = false;
        this.plantillas = null;
        this.showplantilla = false;
        this.plantillasel = {};
        this.urlimg = "";
        this.urlfile = "";
        this.namefile = "";
        this.item = {};
        this.avaceupload = 0;
      }
    },
    active(c) {
      if (c === this.bloquesel) {
        return true;
      } else {
        return false;
      }
    },
    activetime(t) {
      if (t === this.timesel) {
        return true;
      } else {
        return false;
      }
    },
    async traePlantillas(_this) {
      let result;
      try {
        result = await apiServices.get(`/plantillas`);
        _this.plantillas = result.data;
      } catch (err) {
        console.log(err);
      }
    },
    async traePartes(_this) {
      let result;
      try {
        result = await apiServices.get(
          `/partes/${_this.infomodal.informe._id}`
        );
        _this.graficas = result.data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    infomodal(nv, ov) {
      if (nv.isEdit) {
        this.bloquesel = nv.item.type;
        this.item.titulo = nv.item.titulo;
        this.item.subtitulo = nv.item.subtitulo;
        this.item.subtitle = nv.item.subtitle;
        this.item.texto = nv.item.texto;
        this.item.title = nv.item.title;
        this.item.color = nv.item.color;
        if (nv.item.type === "graphic") {
          this.traePartes(this);
        }
        if (nv.item.type === "files") {
          this.urlfile = nv.data.s.data.file[0].url;
          this.namefile = nv.data.s.data.file[0].name;
        }
        if (nv.item.type === "images") {
          this.urlimg = nv.data.s.data.img;
        }
        if (nv.item.type === "timeline") {
          this.item.timeline = nv.item.timeline;
          this.timesel = nv.item.timeline[0].id;
          this.item.title = nv.item.timeline[0].data.title;
          this.item.texto = nv.item.timeline[0].data.texto;
          this.item.idtime = nv.item.timeline[0].id;
        }
      }
      if (nv.fuente === "selBloque" && nv.data && nv.data.informes) {
        this.informeSelected = nv.data.informeSelected;
        this.informes = nv.data.informes;
      }
      if(nv.fuente === "guardar"){
        this.informeSelected = nv.data.informeSelected;
        this.informes = nv.data.informes;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-lista {
  vertical-align: bottom;
}
</style>