<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <h1 class="title">Listado de Gráficas</h1>
        <h2 class="subtitle">Lista de Gráficas creadas en el sistema</h2>
        <button v-on:click="showCreate = !showCreate" class="button">
          <span class="material-icons">create_new_folder</span>&nbsp;
          <span>Crear Carpeta</span>
        </button>
        <button v-on:click="showFolder = !showFolder" class="button">
          <span class="material-icons">list</span>&nbsp;
          <span>Mostrar Carpetas</span>
        </button>
      </div>
    </section>
    <section v-if="showCreate" class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="box has-background-grey-light">
              <div class="field">
                <div class="control">
                  <input
                    v-model="nombreCarpeta"
                    class="input"
                    type="text"
                    placeholder="Nombre de la carpeta"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <textarea
                    v-model="descripcionCarpeta"
                    class="textarea"
                    placeholder="Descripción de la carpeta"
                  ></textarea>
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button @click="guardarcarpeta" class="button is-info">Crear</button>
                </div>
                <div class="control">
                  <button class="button is-link is-danger" @click="cancelNameFolder">Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-if="showFolder" class="section">
      <div class="container">
        <div class="box has-background-grey-light">
          <table class="table is-fullwidth has-background-grey-light">
            <thead>
              <tr>
                <th>Nombre carpeta</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(folder,index) in folders" :key="index">
                <td class="hand">
                  <h2 class="subtitle">
                    <span class="material-icons">folder</span>
                    &nbsp;{{folder.nombre}}
                  </h2>
                  <span v-show="!showformeditnameinforme(folder, index)" class="is-size-3"></span>
                  <div v-if="showformeditnameinforme(folder, index)" class="field has-addons">
                    <div class="control is-expanded">
                      <input v-model="folder.nombre" class="input" type="text" placeholder="Nombre" />
                    </div>
                  </div>
                </td>
                <td>
                  <h3 class="subtitle">{{folder.descripcion}}</h3>
                  <span v-show="!showformeditnameinforme(folder, index)" class="is-size-3"></span>
                  <div v-if="showformeditnameinforme(folder, index)" class="field has-addons">
                    <div class="control is-expanded">
                      <input
                        v-model="folder.descripcion"
                        class="input"
                        type="text"
                        placeholder="Descripción"
                      />
                    </div>
                    <div class="control">
                      <a class="button is-info" @click="uploadnamechange(folder)">Cambiar</a>
                    </div>
                    <div class="control">
                      <a class="button is-light" @click="cancelFolder">Cancelar</a>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="icon has-text-link hand">
                    <i class="material-icons" @click="selectFolder(folder)">visibility</i>
                  </span>
                  <span class="icon has-text-info hand" @click="showeditnameinforme(folder, index)">
                    <i class="material-icons">edit</i>
                  </span>
                  <span class="icon has-text-danger hand" @click="deleteFolder(folder)">
                    <i class="material-icons">delete_forever</i>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <span class="tag is-light is-large" v-show="showEmpty">No hay carpetas creadas</span>
        </div>
      </div>
    </section>
    <section v-if="folderShowSelected" class="section">
      <div class="container">
        <div class="columns is-mobile">
          <div class="column">
            <h1 class="title is-3">{{folderShowSelected.nombre}}</h1>
            <h3 class="subtitle is-4">{{folderShowSelected.descripcion}}</h3>
          </div>
          <div class="column">
            <div v-if="!showAllGraphics" class="buttons has-addons is-right">
              <button class="button" @click="showAllGraph">
                <span class="icon">
                  <i class="material-icons">arrow_back</i>
                </span>Todas las Gráficas
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <section v-if="!showAllGraphics" class="section">
        <div class="container">
          <div class="columns" v-for="(item,index) in groups" :key="index">
            <div class="column">
              <div class="box">
                <div class="columns">
                  <div class="column is-6">
                    <h1
                      v-if="graphicsInFolder[item*2]"
                      class="title is-5"
                    >{{item*2+1}}. {{graphicsInFolder[item*2].parte.nombre}}</h1>
                  </div>
                  <div class="column">
                    <span
                      class="icon has-text-danger hand"
                      @click="eliminar(graphicsInFolder[item*2].parte)"
                    >
                      <i class="material-icons">delete_forever</i>
                    </span>
                  </div>
                  <div class="column">
                    <span
                      class="icon has-text-info hand"
                      @click="showeditnameinforme(graphicsInFolder[item*2].parte, `c1${index}`)"
                    >
                      <i class="material-icons" v-show="!isclient">edit</i>
                    </span>
                  </div>
                  <div class="column">
                    <span
                      class="icon has-text-dark hand"
                      @click="showGraphicFolder(graphicsInFolder[item*2].parte, `c1${index}`)"
                    >
                      <i class="material-icons">folder</i>
                    </span>
                  </div>
                  <div class="column">
                    <span
                      class="icon has-text-warning-dark hand"
                      @click="unarchive(graphicsInFolder[item*2])"
                    >
                      <i class="material-icons">unarchive</i>
                    </span>
                  </div>
                </div>
                <div
                  v-if="showaddGraphicFolder(graphicsInFolder[item*2].parte, `c1${index}`)"
                  class="field"
                >
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <div class="select is-fullwidth">
                        <select v-model="folderSelected">
                          <option
                            v-for="(option, index) in folders"
                            :value="option"
                            :key="index"
                          >{{ option.nombre }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="control">
                      <button
                        type="submit"
                        class="button is-info"
                        @click="SaveGraphicFolder(graphicsInFolder[item*2].parte._id)"
                      >Guardar</button>
                      <button
                        type="submit"
                        class="button is-light"
                        @click="cancelShowAddFolder"
                      >Cancelar</button>
                    </div>
                  </div>
                </div>
                <span
                  v-show="!showformeditnameinforme(graphicsInFolder[item*2].parte, `c1${index}`)"
                  class="is-size-3"
                ></span>
                <div
                  v-if="showformeditnameinforme(graphicsInFolder[item*2].parte, `c1${index}`)"
                  class="field has-addons"
                >
                  <div class="control is-expanded">
                    <input
                      v-model="graphicsInFolder[item*2].parte.nombre"
                      class="input"
                      type="text"
                      placeholder="Nombre"
                    />
                  </div>
                  <div class="control">
                    <a
                      class="button is-info"
                      @click="subecambionombre(graphicsInFolder[item*2].parte)"
                    >Cambiar</a>
                  </div>
                  <div class="control">
                    <a class="button is-light" @click="cancelnamegraph">Cancelar</a>
                  </div>
                </div>
                <y-graph
                  v-if="graphicsInFolder[item*2].parte"
                  :datagraph="transformdata(graphicsInFolder[item*2].parte)"
                  :cambio="cambio"
                ></y-graph>
              </div>
            </div>
            <div class="column">
              <div class="box" v-if="graphicsInFolder[item*2+1]">
                <div class="columns">
                  <div class="column is-6">
                    <h1
                      v-if="graphicsInFolder[item*2+1].parte"
                      class="title is-5"
                    >{{item*2+2}}. {{graphicsInFolder[item*2+1].parte.nombre}}</h1>
                  </div>
                  <div class="column">
                    <span
                      class="icon has-text-danger hand"
                      @click="eliminar(graphicsInFolder[item*2+1].parte)"
                    >
                      <i class="material-icons">delete_forever</i>
                    </span>
                  </div>
                  <div class="column">
                    <span
                      class="icon has-text-info hand"
                      @click="showeditnameinforme(graphicsInFolder[item*2+1].parte, index)"
                    >
                      <i class="material-icons" v-show="!isclient">edit</i>
                    </span>
                  </div>
                  <div class="column">
                    <span
                      class="icon has-text-dark hand"
                      @click="showGraphicFolder(graphicsInFolder[item*2+1].parte, index)"
                    >
                      <i class="material-icons" v-show="!isclient">folder</i>
                    </span>
                  </div>
                  <div class="column">
                    <span
                      class="icon has-text-warning-dark hand"
                      @click="unarchive(graphicsInFolder[item*2+1])"
                    >
                      <i class="material-icons">unarchive</i>
                    </span>
                  </div>
                </div>
                <div
                  v-if="showaddGraphicFolder(graphicsInFolder[item*2+1].parte, index)"
                  class="field"
                >
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <div class="select is-fullwidth">
                        <select v-model="folderSelected">
                          <option
                            v-for="(option,index) in folders"
                            :value="option"
                            :key="index"
                          >{{ option.nombre }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="control">
                      <button
                        type="submit"
                        class="button is-info"
                        @click="SaveGraphicFolder(graphicsInFolder[item*2+1].parte._id)"
                      >Guardar</button>
                      <button
                        type="submit"
                        class="button is-light"
                        @click="cancelShowAddFolder"
                      >Cancelar</button>
                    </div>
                  </div>
                </div>
                <span
                  v-show="!showformeditnameinforme(graphicsInFolder[item*2+1].parte, index)"
                  class="is-size-3"
                ></span>
                <div
                  v-if="showformeditnameinforme(graphicsInFolder[item*2+1].parte, index)"
                  class="field has-addons"
                >
                  <div class="control is-expanded">
                    <input
                      v-model="graphicsInFolder[item*2+1].parte.nombre"
                      class="input"
                      type="text"
                      placeholder="Nombre"
                    />
                  </div>
                  <div class="control">
                    <a
                      class="button is-info"
                      @click="subecambionombre(graphicsInFolder[item*2+1].parte)"
                    >Cambiar</a>
                  </div>
                  <div class="control">
                    <a class="button is-light" @click="cancelnamegraph">Cancelar</a>
                  </div>
                </div>
                <y-graph
                  v-if="graphicsInFolder[item*2+1]"
                  :datagraph="transformdata(graphicsInFolder[item*2+1].parte)"
                  :cambio="cambio"
                ></y-graph>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <div v-if="showAllGraphics" class="container">
      <div class="columns" v-for="(item,index) in grupos" :key="index">
        <div class="column">
          <div class="box">
            <div class="columns">
              <div class="column is-8">
                <h1
                  v-if="graficas[item*2]"
                  class="title is-5"
                >{{item*2+1}}. {{graficas[item*2].nombre}}</h1>
              </div>
              <div class="column">
                <span class="icon has-text-danger hand" @click="eliminar(graficas[item*2])">
                  <i class="material-icons">delete_forever</i>
                </span>
              </div>
              <div class="column">
                <span
                  class="icon has-text-info hand"
                  @click="showeditnameinforme(graficas[item*2], `c1${index}`)"
                >
                  <i class="material-icons" v-show="!isclient">edit</i>
                </span>
              </div>
              <div class="column">
                <span
                  class="icon has-text-dark hand"
                  @click="showGraphicFolder(graficas[item*2], `c1${index}`)"
                >
                  <i class="material-icons">folder</i>
                </span>
              </div>
            </div>
            <div v-if="showaddGraphicFolder(graficas[item*2], `c1${index}`)" class="field">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <div class="select is-fullwidth">
                    <select v-model="folderSelected">
                      <option
                        v-for="(option, index) in folders"
                        :value="option"
                        :key="index"
                      >{{ option.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="control">
                  <button
                    type="submit"
                    class="button is-info"
                    @click="SaveGraphicFolder(graficas[item*2]._id)"
                  >Guardar</button>
                  <button
                    type="submit"
                    class="button is-light"
                    @click="cancelShowAddFolder"
                  >Cancelar</button>
                </div>
              </div>
            </div>
            <span
              v-show="!showformeditnameinforme(graficas[item*2], `c1${index}`)"
              class="is-size-3"
            ></span>
            <div
              v-if="showformeditnameinforme(graficas[item*2], `c1${index}`)"
              class="field has-addons"
            >
              <div class="control is-expanded">
                <input
                  v-model="graficas[item*2].nombre"
                  class="input"
                  type="text"
                  placeholder="Nombre"
                />
              </div>
              <div class="control">
                <a class="button is-info" @click="subecambionombre(graficas[item*2])">Cambiar</a>
              </div>
              <div class="control">
                <a class="button is-light" @click="cancelnamegraph">Cancelar</a>
              </div>
            </div>
            <y-graph
              v-if="graficas[item*2]"
              :datagraph="transformdata(graficas[item*2])"
              :cambio="cambio"
            ></y-graph>
          </div>
        </div>
        <div class="column">
          <div class="box" v-if="graficas[item*2+1]">
            <div class="columns">
              <div class="column is-8">
                <h1
                  v-if="graficas[item*2+1]"
                  class="title is-5"
                >{{item*2+2}}. {{graficas[item*2+1].nombre}}</h1>
              </div>
              <div class="column">
                <span class="icon has-text-danger hand" @click="eliminar(graficas[item*2+1])">
                  <i class="material-icons">delete_forever</i>
                </span>
              </div>
              <div class="column">
                <span
                  class="icon has-text-info hand"
                  @click="showeditnameinforme(graficas[item*2+1], index)"
                >
                  <i class="material-icons" v-show="!isclient">edit</i>
                </span>
              </div>
              <div class="column">
                <span
                  class="icon has-text-dark hand"
                  @click="showGraphicFolder(graficas[item*2+1], index)"
                >
                  <i class="material-icons" v-show="!isclient">folder</i>
                </span>
              </div>
            </div>
            <div v-if="showaddGraphicFolder(graficas[item*2+1], index)" class="field">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <div class="select is-fullwidth">
                    <select v-model="folderSelected">
                      <option
                        v-for="(option,index) in folders"
                        :value="option"
                        :key="index"
                      >{{ option.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="control">
                  <button
                    type="submit"
                    class="button is-info"
                    @click="SaveGraphicFolder(graficas[item*2+1]._id)"
                  >Guardar</button>
                  <button
                    type="submit"
                    class="button is-light"
                    @click="cancelShowAddFolder"
                  >Cancelar</button>
                </div>
              </div>
            </div>
            <span v-show="!showformeditnameinforme(graficas[item*2+1], index)" class="is-size-3"></span>
            <div v-if="showformeditnameinforme(graficas[item*2+1], index)" class="field has-addons">
              <div class="control is-expanded">
                <input
                  v-model="graficas[item*2+1].nombre"
                  class="input"
                  type="text"
                  placeholder="Nombre"
                />
              </div>
              <div class="control">
                <a class="button is-info" @click="subecambionombre(graficas[item*2+1])">Cambiar</a>
              </div>
              <div class="control">
                <a class="button is-light" @click="cancelnamegraph">Cancelar</a>
              </div>
            </div>
            <y-graph
              v-if="graficas[item*2+1]"
              :datagraph="transformdata(graficas[item*2+1])"
              :cambio="cambio"
            ></y-graph>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="buttons has-addons is-right">
        <button
          class="button is-primary is-rounded tooltip"
          data-tooltip="Ir arriba"
          @click="scrollTop()"
        >
          <span class="icon">
            <i class="material-icons">arrow_upward</i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
import yGraph from "@/components/dashboard/Graph.vue";
const filterItems = (query, data) => {
  return data.filter((el) => {
    const texto = el.nombre;
    if (texto.toLowerCase().indexOf(query.toLowerCase()) > -1) {
      return el;
    }
  });
};
export default {
  data() {
    return {
      showAllGraphics: true,
      graphicsInFolder: [],
      graficas: [],
      isclient: false,
      search: "",
      showData: false,
      cambio: 0,
      grupos: [],
      groups: [],
      showCreate: false,
      showFolder: false,
      folders: [],
      folderSelected: {},
      folderShowSelected: {},
      nombreCarpeta: "",
      descripcionCarpeta: "",
      showforminf: {
        info: "",
        index: "",
      },
      showForFolder: {
        info: "",
        index: "",
      },
    };
  },
  computed: {
    ...mapState(["idtoken", "modalnotification", "empresa"]),
    filteredItems: function () {
      return filterItems(this.search, this.graficas);
    },
    resultnotification() {
      return this.modalnotification.result.aceptar;
    },
    showEmpty() {
      if (this.folders.length === 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    guardarcarpeta() {
      if (this.nombreCarpeta) {
        this.createFolder(this);
      }
    },
    SaveGraphicFolder(info) {
      if (this.folderSelected.nombre === "Carpetas") {
        this.$store.dispatch("notify", {
          message: "Debe seleccionar una carpeta.",
          type: "is-warning",
          position: "top-center",
          duration: 5000,
        });
        return false;
      } else {
        this.SaveGraphicToFolder(this, info);
      }
    },
    transformdata(i) {
      const resume = {
        data: {},
      };
      if (i && i.datos) {
        resume.title = i.nombre;
        resume.message = i.texto;
        resume.data = i.datos;
        resume.data.typeGraphic = i.tipografica;
      }
      return resume.data;
    },
    sindecimales(d) {
      if (d && d.data) {
        const f = JSON.parse(JSON.stringify(d));
        f.data = [];
        d.data.forEach((k) => {
          const a = [];
          k.forEach((k1) => {
            a.push(Math.round(k1 * 100) / 100);
          });
          f.data.push(a);
        });
        return f;
      }
    },

    subecambionombre(info) {
      this.editnameGraph(this, info);
      this.showforminf.index = "";
      this.showforminf.info = "";
    },
    uploadnamechange(info) {
      this.editNameFolder(this, info);
      this.showforminf.index = "";
      this.showforminf.info = "";
    },
    cancelnamegraph() {
      this.showforminf.index = "";
      this.showforminf.info = "";
    },
    cancelNameFolder() {
      this.nombreCarpeta = "";
      this.descripcionCarpeta = "";
      this.showCreate = false;
    },
    cancelFolder() {
      this.showforminf.index = "";
      this.showforminf.info = "";
    },
    cancelShowAddFolder() {
      this.showForFolder.index = "";
      this.showForFolder.info = "";
    },
    showformeditnameinforme(info, index) {
      if (index === this.showforminf.index) {
        return true;
      } else {
        return false;
      }
    },
    showeditnameinforme(info, index) {
      this.showforminf.info = info;
      this.showforminf.index = index;
    },

    showaddGraphicFolder(info, index) {
      if (index === this.showForFolder.index) {
        return true;
      } else {
        return false;
      }
    },
    folderSelect(folder) {
      if (folder.id === this.folderShowSelected.id) {
        return false;
      } else {
        return true;
      }
    },
    selectFolder(folder) {
      this.showFolder = false;
      this.showAllGraphics = false;
      this.folderShowSelected = folder;
      this.getGraphicsFolders(folder._id);
    },
    showAllGraph() {
      this.showAllGraphics = true;
      this.folderShowSelected = {};
      this.showFolder = false;
      this.scrollTop();
    },
    showGraphicFolder(info, index) {
      this.showForFolder.info = info;
      this.showForFolder.index = index;
    },

    eliminar(inf) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Cuidado !",
          message: "Realmente desea eliminar la grafica?",
          clase: "is-danger",
          data: inf._id,
        },
      });
    },
    unarchive(inf) {
      this.$store.commit("changenotificationmodal", {
        info: {
          message: "Realmente desea retirar la grafica de esta carpeta?",
          clase: "is-warning",
          data: inf._id,
          isUnarchive: true,
        },
      });
    },
    async unarchiveGraph(_this, _id) {
      try {
        await apiServices.delete(`/unarchiveGraph/${_id}`);
        this.$store.dispatch("notify", {
          message: `Grafica retirada de la carpeta con éxito`,
          type: "is-link",
        });
        _this.traePartes(_this);
      } catch (err) {
        this.$store.dispatch("notify", {
          message: `Hubo un problema no se pudo retirar la grafica`,
          type: "is-danger",
        });
        console.log(err);
      }
    },
    deleteFolder(folder) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Cuidado !",
          message: "Realmente desea eliminar la carpeta?",
          clase: "is-danger",
          data: folder._id,
          isfolder: true,
        },
      });
    },
    async deleteFolders(_this, id) {
      try {
        await apiServices.delete(`/folders/${id}`);
        this.$store.dispatch("notify", {
          message: `La carpeta fue eliminada con éxito`,
          type: "is-link",
        });
        _this.traeFolder(_this);
      } catch (err) {
        this.$store.dispatch("notify", {
          message: `Hubo un problema no se pudo eliminar la Carpeta`,
          type: "is-danger",
        });
        console.log(err);
      }
    },

    async editnameGraph(_this, data) {
      let result;
      try {
        result = await apiServices.post(`/editnamegraphics`, data);
        this.graficas.forEach(function (k) {
          if (k.id === result.data._id) {
            k.nombre = result.data.nombre;
          }
        });
      } catch (err) {
        console.log(err);
      }
    },

    async deleteGraph(_this, _id) {
      try {
        await apiServices.delete(`/partes/${_id}`);
        this.$store.dispatch("notify", {
          message: `Grafica eliminada con éxito`,
          type: "is-link",
        });
        _this.traePartes(_this);
      } catch (err) {
        this.$store.dispatch("notify", {
          message: `Hubo un problema no se pudo eliminar la grafica`,
          type: "is-danger",
        });
        console.log(err);
      }
    },

    async traePartes(_this) {
      let result;
      try {
        result = await apiServices.get(`/listbycliente/${this.empresa._id}`);
        _this.cambio++;
        _this.graficas = result.data;
        _this.grupos = [];
        let mitad = Math.ceil(_this.graficas.length / 2);
        for (let i = 0; i < mitad; i++) {
          _this.grupos.push(i);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async createFolder(_this) {
      const data = {
        nombre: this.nombreCarpeta,
        descripcion: this.descripcionCarpeta,
      };
      let result;
      try {
        result = await apiServices.post(`/createfolders`, data);
        this.folders.push(result.data);
        this.$store.dispatch("notify", {
          message: "Perfecto!. Carpeta creada.",
        });
        this.nombreCarpeta = "";
        this.descripcionCarpeta = "";
        this.showCreate = false;
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

    async editNameFolder(_this, data) {
      let result;
      try {
        result = await apiServices.post(`/editnamefolder`, data);
        this.folders.forEach(function (k) {
          if (k.id === result.data._id) {
            k.nombre = result.data.nombre;
          }
        });
        this.$store.dispatch("notify", {
          message: `La carpeta se editó con éxito`,
          type: "is-link",
        });
      } catch (err) {
        console.log(err);
      }
    },

    async SaveGraphicToFolder(_this, info) {
      const data = {
        folderparte: _this.folderSelected._id,
        parte: info,
      };
      let result;
      try {
        result = await apiServices.post(`/savegraphicinfolder`, data);
        if (result.data) {
          if (result.data.message) {
            this.$store.dispatch("notify", {
              message: "Esta gráfica ya se encuentra guardada en la carpeta.",
              type: "is-warning",
            });
          } else {
            this.$store.dispatch("notify", {
              message: "Perfecto!. Gráfica guardada en la carpeta.",
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
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

    scrollTop() {
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: 5,
      });
    },
    showmodalgraph() {
      if (this.showData) {
        this.showData = false;
      } else {
        this.showData = true;
      }
    },
    showDataGraphic(item) {
      this.showData = true;
    },
  },
  created() {
    if (this.idtoken) {
      this.traePartes(this);
      this.traeFolder(this);
    }
  },
  watch: {
    resultnotification(nv, ov) {
      if (nv) {
        if (this.modalnotification.result.isfolder) {
          this.deleteFolders(this, this.modalnotification.result.data);
        } else if (this.modalnotification.result.isUnarchive) {
          this.unarchiveGraph(this, this.modalnotification.result.data);
        } else {
          this.deleteGraph(this, this.modalnotification.result.data);
        }
      }
    },
  },
  components: {
    yGraph,
  },
};
</script>