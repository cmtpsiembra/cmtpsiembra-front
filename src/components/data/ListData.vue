<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">Datos</h1>
              <h2 class="subtitle">Lista de datos cargados en el sistema</h2>
            </div>
            <div class="column">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input class="input is-large" type="text" v-model="search" placeholder="Buscar" />
                  <span class="icon is-medium is-left">
                    <i class="material-icons">search</i>
                  </span>
                  <span class="icon is-medium is-right">
                    <i class="fas fa-check fa-lg"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="content">
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>Datos</th>
                <th>Pruebas</th>
                <th>Estatus</th>
                <th style="width:200px;">Items</th>
                <th>Controles</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(info,index) in filteredItems" :key="index">
                <td>
                  <span>{{index +1}}</span>
                </td>
                <td>
                  <span class="subtitle is-5">{{info.nombre}}</span>
                  <span>| {{info.cliente.nombre}}</span>
                  <span>{{info.cliente.nit}}</span>
                </td>
                <td>
                  <span class="tag is-info" v-for="(k,v) in info.pruebas" :key="v">{{k}}</span>
                </td>
                <td>
                  <div class="control">
                    <div class="select">
                      <select v-model="info.status" @change="selectItem(info)">
                        <option v-for="(k,v) in selectstatus" :key="v">{{k}}</option>
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <div v-for="(k,v) in info.pruebas" :key="v">
                    <strong>{{k}}</strong>
                    <div v-for="(k1,v1) in item[k]" :key="v1">
                      <input
                        class="is-checkradio"
                        type="checkbox"
                        :id="info._id+k+v1"
                        @change="selectItem(info)"
                        v-model="info.items[k][k1.d]"
                      />
                      <label :for="info._id+k+v1">{{k1.nombre}}</label>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="field is-grouped">
                    <p class="control">
                      <router-link
                        class="button is-link tooltip"
                        data-tooltip="Estadisticos"
                        :to="{ name: 'estadisticos', params: { procesoid: info._id } }"
                      >
                        <span class="icon">
                          <i class="material-icons">functions</i>
                        </span>
                      </router-link>
                    </p>
                    <p class="control">
                      <button
                        class="button is-info tooltip" data-tooltip="Editar datos" @click="getStructure(info)"
                      >
                        <span class="icon">
                          <i class="material-icons">rule</i>
                        </span>
                      </button>
                    </p>
                    <p class="control">
                      <button class="button is-danger tooltip" data-tooltip="Eliminar" @click="eliminar(info)">
                        <span class="icon">
                          <i class="material-icons">delete_forever</i>
                        </span>
                      </button>
                    </p>
                  </div>
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
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
const filterItems = (query, data) => {
  return data.filter(el => {
    const texto = el.nombre + el.cliente.nombre + el.cliente.nit;
    if (texto.toLowerCase().indexOf(query.toLowerCase()) > -1) {
      return el;
    }
  });
};

export default {
  data() {
    return {
      selectstatus: [
        "Creado",
        "En Proceso",
        "En Revision",
        "Revisado",
        "Ajustes",
        "Enviado"
      ],
      search: "",
      datos: [],
      item: {
        clima: [
          {
            d: "e",
            nombre: "Estandarizadas"
          },
          {
            d: "pm",
            nombre: "Porcentajes"
          },
          {
            d: "m",
            nombre: "Directa"
          }
        ],
        beneficios: [
          {
            d: "e",
            nombre: "Estandarizadas"
          },
          {
            d: "pm",
            nombre: "Porcentajes"
          },
          {
            d: "m",
            nombre: "Directa"
          }
        ],
        compromiso: [
          {
            d: "me",
            nombre: "Estandarizadas"
          },
          {
            d: "m",
            nombre: "Directa"
          }
        ],
        felicidad_a: [
          {
            d: "m",
            nombre: "Sin Selección"
          }
        ],
        demograficos: [
          {
            d: "c",
            nombre: "Conteo"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["idtoken", "modalnotification"]),
    filteredItems: function() {
      return filterItems(this.search, this.datos);
    },
    resultnotification() {
      return this.modalnotification.result.aceptar;
    }
  },
  methods: {
    getStructure(info){
      if(info.structure){
        this.$store.commit("setStructure", info.structure);
      }else{
        this.$store.commit("setStructure", {grupos:[]});
      }
      this.$router.replace({name:"dataeditor", params:{id:info._id}})
    },
    async selectItem(i) {
      const _this = this;
      const d = i;
      try {
        await apiServices.put(`/dato`, d);
        _this.traeData(_this);
      } catch (err) {
        console.log(err);
      }
    },
    async traeData(_this) {
      let result;
      try {
        result = await apiServices.get(`/datos`);
        _this.datos = [];
        result.data.forEach(k => {
          const d = {};
          const keys1 = Object.keys(k);
          keys1.forEach(function(k1) {
            if (k1 !== "pruebas") {
              d[k1] = k[k1];
            } else {
              const pruebas = [];
              k[k1].forEach(function(k2) {
                if (k2 === "benef") {
                  pruebas.push("beneficios");
                } else {
                  pruebas.push(k2);
                }
              });
              d["pruebas"] = pruebas;
            }
          });
          if (!k.items) {
            d.items = {};
            d.pruebas.forEach(k1 => {
              d.items[k1] = {};
            });
          } else {
            d.pruebas.forEach(k1 => {
              if (!d.items[k1]) {
                d.items[k1] = {};
              }
            });
          }
          _this.datos.push(d);
        });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteInforme(_this, id) {
      try {
        await apiServices.delete(`/dato/${id}`);
        _this.traeData(_this);
      } catch (err) {
        console.log(err);
      }
    },
    eliminar(inf) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Cuidado !",
          message: "Realmente desea eliminar el dato?",
          clase: "is-danger",
          data: inf._id
        }
      });
    }
  },
  watch: {
    idtoken(newv, oldv) {
      if (newv) {
        this.traeData(this);
      }
    },
    resultnotification(nv, ov) {
      if (nv) {
        this.deleteInforme(this, this.modalnotification.result.data);
      }
    }
  },
  created() {
    if (this.idtoken) {
      this.traeData(this);
    }
  }
};
</script>