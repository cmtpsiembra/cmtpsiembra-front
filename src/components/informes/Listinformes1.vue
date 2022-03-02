<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">Informes</h1>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="buttons">
                <button
                  v-for="(item, index) in carpetas"
                  :key="index"
                  class="button is-dark is-inverted is-medium"
                  @click="selectfolder(item)"
                  v-bind:class="{ 'is-outlined': folderselect(item) }"
                >
                  <span class="icon">
                    <i v-show="folderselect(item)" class="material-icons">folder</i>
                    <i v-show="!folderselect(item)" class="material-icons">folder_open</i>
                  </span>
                  <span>{{item.nombre}}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="content">
          <h1 class="title is-2">
            {{carpetaselected.nombre}}
            <button
              v-show="informes.length === 0"
              class="button is-danger"
              @click="eliminar1(carpetaselected)"
            >
              <span class="icon">
                <i class="material-icons">delete_forever</i>
              </span>
            </button>
            <button class="button is-info" @click="editarcarpeta()">
              <span class="icon">
                <i class="material-icons">edit</i>
              </span>
            </button>
          </h1>
          <h3 class="subtitle is-4">{{carpetaselected.descripcion}}</h3>
          <div class="field" v-show="showformcarpeta">
            <p class="control">
              <input
                v-model="carpeta.nombre"
                class="input is-large"
                type="text"
                placeholder="Nombre"
              />
            </p>
          </div>
          <div class="field" v-show="showformcarpeta">
            <p class="control">
              <input
                v-model="carpeta.descripcion"
                class="input is-large"
                type="text"
                placeholder="Descripción"
              />
            </p>
          </div>
          <div class="field" v-show="showformcarpeta">
            <p class="control">
              <button
                class="button is-large is-success"
                @click="guardarcambioscarpeta"
              >Guardar cambios</button>
              <button class="button is-large is-light" @click="canceleditcarpeta">Cancelar</button>
            </p>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>Informe</th>
                <th>Estatus</th>
                <th>Controles</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(info,index) in informes" :key="index">
                <td>
                  <span class="subtitle is-3">{{index +1}}</span>
                </td>
                <td>
                  <a
                    v-show="!showformeditnameinforme(info, index)"
                    class="is-size-4"
                    @click="showeditnameinforme(info, index)"
                  >{{info.nombre}}</a>
                  <div v-show="showformeditnameinforme(info, index)" class="field has-addons">
                    <div class="control is-expanded">
                      <input
                        v-model="info.nombre"
                        class="input is-medium"
                        type="text"
                        placeholder="Nombre"
                      />
                    </div>
                    <div class="control">
                      <a class="button is-info is-medium" @click="subecambionombre(info)">Cambiar</a>
                    </div>
                    <div class="control">
                      <a class="button is-light is-medium" @click="cancelnameinforme">Cancelar</a>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="control">
                    <div class="select">
                      <select v-model="info.status" @change="subecambionombre(info)">
                        <option v-for="(k,v) in selectstatus" :key="v">{{k}}</option>
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <button class="button is-danger" @click="eliminar(info)">
                    <span class="icon">
                      <i class="material-icons">delete_forever</i>
                    </span>
                  </button>
                  <router-link
                    :to="{ name: 'editinforme1', params: { tipo:'informe',id: info.id } }"
                    class="button is-info"
                  >
                    <span class="icon">
                      <i class="material-icons">edit</i>
                    </span>
                  </router-link>
                  <button class="button is-link" @click="copiar(info)">
                    <span class="icon">
                      <i class="material-icons">file_copy</i>
                    </span>
                  </button>
                  <button
                    class="button"
                    @click="principal(info)"
                    v-bind:class="classfavorito(info)"
                  >
                    <span class="icon">
                      <i class="material-icons">star</i>
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
import functions from "@/helpers/functions";
export default {
  data() {
    return {
      selectstatus: [
        'Creado',
        'En Proceso',
        'Terminado'
      ],
      carpetas: [],
      informes: [],
      carpetaselected: {},
      carpeta: {
        nombre: "",
        descripcion: "",
        id: ""
      },
      showformcarpeta: false,
      showformcarp: {
        info: "",
        index: ""
      }
    };
  },
  computed: {
    ...mapState(["idtoken", "modalnotification"]),
    resultnotification() {
      return this.modalnotification.result.aceptar;
    },
    filteredItems: function() {
      return functions.filterItems(this.search, this.plantillas, [
        { cod: "nombre" }
      ]);
    }
  },
  methods: {
    async copiar(info) {
      const _this = this;
      try {
        await apiServices.post(`/copyinforme`, info);
        _this.traeInformes(_this, _this.carpetaselected.id);
      } catch (err) {
        console.log(err);
      }
    },
    principal(info) {
      this.editprincipal(this, info);
    },
    classfavorito(info) {
      if (info.status === "principal") {
        return "is-warning";
      } else {
        return "is-light";
      }
    },
    subecambionombre(info) {
      this.editanombreInforme(this, info);
      this.showformcarp.index = "";
      this.showformcarp.info = "";
    },
    cancelnameinforme() {
      this.showformcarp.index = "";
      this.showformcarp.info = "";
    },
    showformeditnameinforme(info, index) {
      if (index === this.showformcarp.index) {
        return true;
      } else {
        return false;
      }
    },
    showeditnameinforme(info, index) {
      this.showformcarp.info = info;
      this.showformcarp.index = index;
    },
    guardarcambioscarpeta() {
      this.editacarpeta(this, this.carpeta);
      this.showformcarpeta = false;
      this.carpeta = {
        nombre: "",
        descripcion: "",
        id: ""
      };
    },
    editarcarpeta() {
      this.showformcarpeta = true;
      this.carpeta.nombre = this.carpetaselected.nombre;
      this.carpeta.descripcion = this.carpetaselected.descripcion;
      this.carpeta.id = this.carpetaselected.id;
    },
    canceleditcarpeta() {
      this.carpeta = {
        nombre: "",
        descripcion: "",
        id: ""
      };
      this.showformcarpeta = false;
    },
    folderselect(f) {
      if (f.id === this.carpetaselected.id) {
        return false;
      } else {
        return true;
      }
    },
    eliminar(inf) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Cuidado !",
          message: "Realmente desea eliminar el informe?",
          clase: "is-danger",
          data: inf.id
        }
      });
    },
    eliminar1(carp) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Cuidado !",
          message: "Realmente desea eliminar la carpeta?",
          clase: "is-danger",
          data: carp.id,
          isfolder: true
        }
      });
    },
    selectfolder(f) {
      this.carpetaselected = f;
      this.traeInformes(this, f.id);
    },
    async traeData(_this) {
      try {
        await _this.traeCarpetas(_this);
        if (_this.carpetas.length > 0) {
          const carpeta1 = _this.carpetas[0];
          _this.carpetaselected = carpeta1;
          _this.traeInformes(_this, carpeta1.id);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async traeCarpetas(_this) {
      let result;
      try {
        result = await apiServices.get(`/carpetas`);
        _this.carpetas = [];
        if (result.data.length > 0) {
          result.data.forEach(el => {
            const d = {
              nombre: el.nombre,
              descripcion: el.descripcion,
              id: el._id
            };
            _this.carpetas.push(d);
          });
        }
        _this.carpetas.push({
          nombre: "Sin Clasificar",
          descripcion: "Informes que no se han asignado a una carpeta",
          id: 1
        });
      } catch (err) {
        console.log(err);
      }
    },
    async editanombreInforme(_this, data) {
      let result;
      try {
        result = await apiServices.post(`/editnombreinforme`, data);
        this.informes.forEach(function(k) {
          if (k.id === result.data._id) {
            k.nombre = result.data.title;
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    async editprincipal(_this, data) {
      try {
        await apiServices.post(`/editprincipal`, data);
        _this.traeInformes(_this, _this.carpetaselected.id);
      } catch (err) {
        console.log(err);
      }
    },
    async editacarpeta(_this, data) {
      let result;
      try {
        result = await apiServices.post(`/editcarpeta`, data);
        this.carpetaselected = {
          nombre: result.data.nombre,
          descripcion: result.data.descripcion,
          id: result.data._id
        };
        this.carpetas.forEach(function(k) {
          if (k.id === _this.carpetaselected.id) {
            k.nombre = _this.carpetaselected.nombre;
            k.descripcion = _this.carpetaselected.descripcion;
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    async traeInformes(_this, idcarpeta) {
      let result;
      try {
        result = await apiServices.get(`/informelist/${idcarpeta}`);
        _this.informes = [];
        result.data.forEach(el => {
          const d = {
            nombre: el.title,
            id: el._id,
            status: el.status
          };
          _this.informes.push(d);
        });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteInformes(_this, id) {
      try {
        await apiServices.delete(`/informe/${id}`);
        _this.traeInformes(_this, _this.carpetaselected.id);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCarpeta(_this, id) {
      try {
        await apiServices.delete(`/carpetas/${id}`);
        _this.traeData(_this);
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    if (this.idtoken) {
      this.traeData(this);
    }
  },
  watch: {
    idtoken(nv, ov) {
      if (nv) {
        this.traeData(this);
      }
    },
    resultnotification(nv, ov) {
      if (nv) {
        if (this.modalnotification.result.isfolder) {
          this.deleteCarpeta(this, this.modalnotification.result.data);
        } else {
          this.deleteInformes(this, this.modalnotification.result.data);
        }
      }
    }
  }
};
</script>