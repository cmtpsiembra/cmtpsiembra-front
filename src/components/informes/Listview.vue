<template>
  <div>
    <section class="hero is-info">
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
                  class="button is-info is-inverted is-medium"
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
          <h1 class="title is-2">{{carpetaselected.nombre}}</h1>
          <h3 class="subtitle is-4">{{carpetaselected.descripcion}}</h3>
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>Informe</th>
                <th>Controles</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(info,index) in informes" :key="index">
                <td>
                  <span class="subtitle is-3">{{index +1}}</span>
                </td>
                <td>
                  <span class="is-size-3">{{info.nombre}}</span>
                </td>
                <td>
                  <router-link
                    :to="{ name: 'listviewid', params: { id: info.id } }"
                    class="button is-info"
                  >
                    <span class="icon">
                      <i class="material-icons">visibility</i>
                    </span>
                  </router-link>
                  <button class="button is-link" @click="showShare(info)">
                    <span class="icon">
                      <i class="material-icons">share</i>
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <modalshare
      :show="showData"
      :informe="infoshare"
      @showmodalshare="showmodalshare"
    ></modalshare>
  </div>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
import modalshare from "@/components/modals/Modalshare.vue";
export default {
  data() {
    return {
      carpetas: [],
      informes: [],
      carpetaselected: {},
      infoshare: {},
      showData: false
    };
  },
  computed: {
    ...mapState(["idtoken"])
  },
  methods: {
    showShare(i) {
      this.infoshare = i;
      this.showData = true;
    },
    showmodalshare() {
      if (this.showData) {
        this.showData = false;
      } else {
        this.showData = true;
      }
    },
    folderselect(f) {
      if (f.id === this.carpetaselected.id) {
        return false;
      } else {
        return true;
      }
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
    async traeInformes(_this, idcarpeta) {
      let result;
      try {
        result = await apiServices.get(`/informelist/${idcarpeta}`);
        _this.informes = [];
        result.data.forEach(el => {
          const d = {
            nombre: el.title,
            id: el._id,
            status: el.status,
            password: el.password
          };
          _this.informes.push(d);
        });
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
    }
  },
  components: {
    modalshare
  }
};
</script>