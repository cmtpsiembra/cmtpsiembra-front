<template>
  <div class="modal" v-bind:class="{ 'is-active': showmodalinforme }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{infoinformemodal.title}}</p>
        <button class="delete" aria-label="close" @click="closemodal"></button>
      </header>
      <section v-if="infoinformemodal.fuente === 'selBloque'" class="modal-card-body">
        <div v-if="false" class="select">
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
        v-if="infoinformemodal.fuente === 'selBloque' || infoinformemodal.fuente === 'selBloqueEmbed'"
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
          <button
            v-if="infoinformemodal.isfrs"
            class="button is-light"
            v-bind:class="{ 'is-primary': active('demograficos') }"
            @click="selcol('demograficos')"
          >
            <span class="icon">
              <i class="material-icons">chrome_reader_mode</i>
            </span>&nbsp; Demográficos FRS
          </button>
          <button
            v-if="infoinformemodal.isfrs"
            class="button is-light"
            v-bind:class="{ 'is-primary': active('graficador') }"
            @click="selcol('graficador')"
          >
            <span class="icon">
              <i class="material-icons">chrome_reader_mode</i>
            </span>&nbsp; Graficador FRS
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
      <section v-if="infoinformemodal.fuente === 'contenido'" class="modal-card-body">
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
            <button class="button is-info" @click="item.color='#ff9800'">
              <span class="icon">
                <i class="material-icons">format_paint</i>
              </span>
            </button>
            <button class="button is-primary" @click="item.color='#15b7b9'">
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
          <div class="container">
            <div class="box has-background-grey-light">
              <table class="table is-fullwidth has-background-grey-light">
                <thead>
                  <tr>
                    <th>Nombre carpeta</th>
                    <th>Descripción</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(folder,index) in folders" :key="index">
                    <td class="hand">
                      <h2 class="subtitle">
                        <span class="material-icons">folder</span>
                        &nbsp;{{folder.nombre}}
                      </h2>
                    </td>
                    <td>
                      <h3 class="subtitle">{{folder.descripcion}}</h3>
                    </td>
                    <td>
                      <button class="button is-info" @click="selectFolder(folder)">Seleccionar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <span class="tag is-light is-large" v-show="showEmpty">No hay carpetas creadas</span>
            </div>
          </div>
          <section v-if="showFolder" class="section">
            <div class="container">
              <div class="box has-background-grey-light">
                <h1 class="title">Seleccione la gráfica</h1>
                <table class="table is-fullwidth has-background-grey-light">
                  <tr>
                    <th>Nombre gráfica</th>
                    <th></th>
                  </tr>
                  <tr v-for="(item,index) in graphicsInFolder" :key="index">
                    <td>{{item.parte.nombre}}</td>
                    <td>
                      <button class="button is-info" @click="selGrafica(item.parte)">Seleccionar</button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </section>
          <br />
          <button class="button is-primary" @click="showAllGraph">Todas las gráficas</button>
          <section v-if="showGraphics" class="section">
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
          </section>
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
      <section v-if="infoinformemodal.fuente === 'guardar'" class="modal-card-body">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input v-model="nombreCarpeta" class="input" type="text" placeholder="Crear Carpeta" />
          </div>
          <div class="control">
            <a @click="guardarcarpeta" class="button is-info">Aceptar</a>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <div class="select">
              <select v-model="carpetaSelected">
                <option
                  v-for="(option, index) in carpetas"
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
            <input class="input" type="text" placeholder="Nombre" v-model="nombreInforme" />
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="estoyseguro">Estoy seguro</button>
        <button class="button" @click="closemodal">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
export default {
  data() {
    return {
      showGraphics: false,
      folders: [],
      showFolder: false,
      folderShowSelected: {},
      graphicsInFolder: [],
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
      dgraph: true,
      dataforgraph: {},
      grupos: [],
      variables: [],
      control: 0,
      itemgrafica: {},
      carpetas: [{ nombre: "Carpetas" }],
      carpetaSelected: { nombre: "Carpetas" },
      tipo: "informe",
      nombreInforme: "",
      nombreCarpeta: "",
      // informeSelected: {},
      informes: [],
    };
  },
  computed: {
    ...mapState(["showmodalinforme", "idtoken", "infoinformemodal", "empresa"]),
    showEmpty() {
      if (this.folders.length === 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    showAllGraph() {
      this.traePartes(this);
      this.showGraphics = true;
    },
    guardarcarpeta() {
      if (this.nombreCarpeta) {
        this.creaCarpetas(this);
      }
    },
    changedata(d) {
      this.itemgrafica = d;
      this.item.data = d;
      // this.item. aqui metemos el item
      // asi esta en angular

      // $scope.item.data = graphic.datos;
      // $scope.item.data.typeGraphic = graphic.tipografica;
    },
    selVariable(d) {
      const _this = this;
      if (d.check) {
        d.check = false;
      } else {
        d.check = true;
      }
      this.variables = [];
      this.dataforgraph.variables.forEach(function (k) {
        if (k.check) {
          _this.variables.push(k);
        }
      });
      _this.control++;
    },
    selGrupo(d) {
      const _this = this;
      if (d.check) {
        d.check = false;
      } else {
        d.check = true;
      }
      this.grupos = [];
      this.dataforgraph.grupos.forEach((el) => {
        _this.dataforgraph[el].forEach(function (k, v) {
          if (k.check) {
            _this.grupos.push(k);
          }
        });
      });
      _this.control++;
    },
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
        } else if (_this.bloquesel === "graphic") {
          task = _this.$fire.refexcel(file);
        } else {
          task = _this.$fire.reffile(file);
        }
        _this.avaceupload = 10;
        task.on(
          "state_changed",
          (snapshot) => {
            const porcentaje =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (porcentaje > 10) {
              _this.avaceupload = porcentaje;
            }
          },
          (err) => {
            console.log("error subiendo el archivo", err);
          },
          async () => {
            try {
              const url = await task.snapshot.ref.getDownloadURL();
              if (_this.bloquesel === "images") {
                _this.urlimg = url;
                _this.item.img = url;
              } else {
                _this.namefile = file.name;
                _this.urlfile = url;
                _this.item.file = {
                  name: file.name,
                  url: url,
                };
              }
              _this.avaceupload = 0;
              if (_this.bloquesel === "graphic") {
                const data = {
                  url: url,
                };
                const result = await apiServices.post(`/leefileexcel`, data);
                if (result.data) {
                  _this.dgraph = false;
                  _this.dataforgraph = result.data;
                  _this.dataforgraph[
                    _this.dataforgraph.grupos[0]
                  ][0].check = true;
                  _this.grupos = [];
                  _this.grupos.push(
                    _this.dataforgraph[_this.dataforgraph.grupos[0]][0]
                  );
                  _this.dataforgraph.variables[0].check = true;
                  _this.variables = [];
                  _this.variables.push(_this.dataforgraph.variables[0]);
                  _this.control++;
                }
              }
            } catch (err) {
              console.log("ocurrio un error", err);
            }
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
      this.$store.commit("showmodalinforme");
      this.bloquesel = "";
      this.showbloque2 = false;
      this.plantillas = null;
      this.showplantilla = false;
      this.plantillasel = {};
      this.item = {};
      this.urlimg = "";
      this.urlfile = "";
      this.namefile = "";
      this.showGraphics = false;
      this.showFolder = false;
      this.avaceupload = 0;
    },
    selcol(c) {
      this.bloquesel = c;
      if (
        this.infoinformemodal.fuente === "selBloque" ||
        this.infoinformemodal.fuente === "selBloqueEmbed"
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
      if (this.infoinformemodal.fuente === "contenido") {
        if (c === "title") {
          this.item.color = "#15b7b9";
        }
        if (c === "graphic") {
          this.traeFolder(this);
        }
      }
    },
    estoyseguro() {
      const _this = this;
      if (_this.infoinformemodal.fuente === "selBloque") {
        this.$store.commit("resultinfomodal", {
          fuente: _this.infoinformemodal.fuente,
          data: {
            bloquesel: _this.bloquesel,
            data: _this.plantillasel,
            // informeSelected: _this.informeSelected,
          },
        });
        this.$store.commit("showmodalinforme");
        this.bloquesel = "";
        this.showbloque2 = false;
        this.plantillas = null;
        this.showplantilla = false;
        this.plantillasel = {};
        this.urlimg = "";
        this.urlfile = "";
        this.namefile = "";
        this.item = {};
        this.showGraphics = false;
        this.showFolder = false;
        this.avaceupload = 0;
      }
      if (_this.infoinformemodal.fuente === "selBloqueEmbed") {
        this.$store.commit("resultinfomodal", {
          fuente: _this.infoinformemodal.fuente,
          data: {
            bloquesel: _this.bloquesel,
            data: _this.plantillasel,
            idbloque: _this.infoinformemodal.data.c.id,
          },
        });
        this.$store.commit("showmodalinforme");
        this.bloquesel = "";
        this.showbloque2 = false;
        this.plantillas = null;
        this.showplantilla = false;
        this.plantillasel = {};
        this.urlimg = "";
        this.urlfile = "";
        this.namefile = "";
        this.item = {};
        this.showGraphics = false;
        this.showFolder = false;
        this.avaceupload = 0;
      }
      if (_this.infoinformemodal.fuente === "contenido") {
        this.$store.commit("resultinfomodal", {
          isEdit: _this.infoinformemodal.isEdit,
          fuente: _this.infoinformemodal.fuente,
          data: {
            type: _this.bloquesel,
            item: _this.item,
            res: _this.infoinformemodal.data,
          },
        });
        this.$store.commit("showmodalinforme");
        this.bloquesel = "";
        this.showbloque2 = false;
        this.plantillas = null;
        this.showplantilla = false;
        this.plantillasel = {};
        this.urlimg = "";
        this.urlfile = "";
        this.namefile = "";
        this.item = {};
        this.showGraphics = false;
        this.showFolder = false;
        this.avaceupload = 0;
      }
      if (_this.infoinformemodal.fuente === "guardar") {
        if (!_this.carpetaSelected._id && this.tipo === "informe") {
          this.$store.dispatch("notify", {
            message: "Debe seleccionar una carpeta.",
            type: "is-warning",
            position: "top-center",
            duration: 5000,
          });
          return false;
        }
        if (!_this.nombreInforme) {
          this.$store.dispatch("notify", {
            message: "Ingrese un nombre para el informe.",
            type: "is-warning",
            position: "top-center",
            duration: 5000,
          });
          return false;
        }
        this.$store.commit("resultinfomodal", {
          isEdit: _this.infoinformemodal.isEdit,
          fuente: _this.infoinformemodal.fuente,
          data: {
            title: _this.nombreInforme,
            carpeta: _this.carpetaSelected._id,
            // informeSelected: _this.informeSelected,
            tipo: _this.tipo,
          },
        });
        this.bloquesel = "";
        this.showbloque2 = false;
        this.plantillas = null;
        this.showplantilla = false;
        this.plantillasel = {};
        this.urlimg = "";
        this.urlfile = "";
        this.namefile = "";
        this.item = {};
        this.showGraphics = false;
        this.showFolder = false;
        this.avaceupload = 0;
        this.nombreInforme = "";
        this.$store.commit("showmodalinforme");
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
    async creaCarpetas(_this) {
      const data = {
        nombre: this.nombreCarpeta,
      };
      let result;
      try {
        result = await apiServices.post(`/createcarpeta`, data);
        this.carpetas.push(result.data);
        this.nombreCarpeta = "";
      } catch (err) {
        console.log(err);
      }
    },
    async traeCarpetas(_this) {
      let result;
      try {
        result = await apiServices.get(`/carpetas`);
        _this.carpetas = [{ nombre: "Carpetas" }];
        result.data.forEach(function (k, v) {
          _this.carpetas.push(k);
        });
      } catch (err) {
        console.log(err);
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
        result = await apiServices.get(`/listbycliente/${this.empresa._id}`);
        _this.cambio++;
        _this.graficas = result.data;
        _this.graficas = result.data;
      } catch (err) {
        console.log(err);
      }
    },
    async traeFolder(_this) {
      let result;
      try {
        result = await apiServices.get(`/folder`);
        _this.folders = [];
        result.data.forEach(function (k, v) {
          _this.folders.push(k);
        });
      } catch (err) {
        console.log(err);
      }
    },
    selectFolder(folder) {
      this.showFolder = true;
      this.showAllGraphics = false;
      this.folderShowSelected = folder;
      this.getGraphicsFolders(folder._id);
    },
    async getGraphicsFolders(folderid) {
      try {
        let result;
        result = await apiServices.get(`/graphicFolderList/${folderid}`);
        this.graphicsInFolder = result.data;
        this.groups = [];
        let mitad = Math.ceil(this.graphicsInFolder.length / 2);
        for (let i = 0; i < mitad; i++) {
          this.groups.push(i);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    if (this.idtoken) {
      this.traeFolder(this);
      this.traePartes(this);
    }
  },
  watch: {
    infoinformemodal(nv, ov) {
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
        // this.informeSelected = nv.data.informeSelected;
        this.informes = nv.data.informes;
      }
      if (nv.fuente === "guardar") {
        this.traeCarpetas(this);
        // this.informeSelected = nv.data.informeSelected;
        this.informes = nv.data.informes;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-lista {
  vertical-align: bottom;
}
.panel {
  border-left: 1px solid #e1e1e1;
}
</style>