<template>
  <div>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">Editor de datos</h1>
              <button @click="generatesearch" class="button is-info">
                <span class="material-icons">search</span>&nbsp;
                <span>Generar buscadores</span>
              </button>
              <button v-if="!showFilters" @click="showFilters = !showFilters" class="button">
                <span class="material-icons">control_point</span>&nbsp;
                <span>Filtros</span>
              </button>
              <button v-if="showFilters" @click="showFilters = !showFilters" class="button">
                <span class="material-icons">remove_circle_outline</span>&nbsp;
                <span>Filtros</span>
              </button>
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
          <div v-if="showFilters" class="box">
            <H2 class="subtitle">
              <strong>Filtros</strong>
            </H2>
            <div class="container">
              <div class="columns is-multiline">
                <div class="column is-4" v-for="(grupo,index) in structure.grupos" :key="index">
                  <div class="field" v-if="structure[grupo].subGrupos.length">
                    <label class="label is-capitalized">{{grupo}}</label>
                    <p class="control">
                      <span class="select" style="width: 100%">
                        <select
                          style="width: 100%"
                          v-model="filterselected[grupo]"
                          @change="changefilter"
                        >
                          <option
                            v-for="(data,index) in structure[grupo].subGrupos"
                            :key="index"
                          >{{data}}</option>
                        </select>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <button class="button is-info" @click="resetfilters">Borrar filtros</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <H2 class="title">
          <strong>Lista de personas</strong>
        </H2>

        <div class="table-container">
          <table class="table is-striped is-narrow">
            <thead>
              <tr>
                <th></th>
                <th
                  v-for="(title, index) in structure.grupos"
                  :key="index"
                  class="is-capitalized"
                >{{title}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data,index1) in dataEditor" :key="index1">
                <td>{{index1 + (pagination.inicial*20) +1 }}</td>
                <td v-for="(title, index) in structure.grupos" :key="index">
                  <a @click="selectfieldtoedit(data,title)">{{data.grupos[title]}}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <nav class="pagination" role="navigation" aria-label="pagination">
          <a class="pagination-previous" @click="previous">Anterior</a>
          <a class="pagination-previous">{{pagination.inicial+1}}</a>
          <a class="pagination-next" @click="next">Siguiente</a>
          <ul class="pagination-list">
            <li>
              <a
                class="pagination-link"
                :class="pagination.inicial === 0 ? 'is-current' : ''"
                aria-label="Page 1"
                aria-current="page"
                @click="ir(0)"
              >1</a>
            </li>
            <li v-show="pagination.total > 1">
              <a
                class="pagination-link"
                :class="pagination.inicial === 1 ? 'is-current' : ''"
                aria-label="Goto page 2"
                @click="ir(1)"
              >2</a>
            </li>
            <li v-show="pagination.total > 2">
              <a
                class="pagination-link"
                :class="pagination.inicial === 2 ? 'is-current' : ''"
                aria-label="Goto page 3"
                @click="ir(2)"
              >3</a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-show="pagination.total > 5">
              <a
                class="pagination-link"
                :class="pagination.inicial === pagination.mitad -1 ? 'is-current' : ''"
                @click="ir(pagination.mitad -1)"
              >{{pagination.mitad}}</a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-show="pagination.total > 4">
              <a
                class="pagination-link"
                :class="pagination.inicial === pagination.total-1 ? 'is-current' : ''"
                aria-label="Goto page 47"
                @click="ir(pagination.total-1)"
              >{{pagination.total}}</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <y-modaleditdata
      :show="showmodaledit"
      @showmodaleditdata="showmodaleditdata"
      :datatoedit="datatoedit"
      @responsemodaleditdata="responsemodaleditdata"
    ></y-modaleditdata>
  </div>
</template>
<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
import yModaleditdata from "@/components/modals/Modaleditdata.vue";
const filterItems = (query, data) => {
  return data.filter((el) => {
    const texto = el.nombre + el.nombrec + el.nit;
    if (texto.toLowerCase().indexOf(query.toLowerCase()) > -1) {
      return el;
    }
  });
};
export default {
  data() {
    return {
      updateFilter: [],
      filterselected: {},
      datatoedit: {},
      showmodaledit: false,
      groupsPeople: [],
      showFilters: false,
      showEdit: false,
      showSearch: false,
      dataEditor: [],
      search: "",
      pagination: {
        count: 0,
        inicial: 0,
        total: 0,
        mitad: 0,
      },
      showFormGroup: {
        grupo: "",
        index: "",
      },
    };
  },
  computed: {
    ...mapState(["idtoken", "empresa", "structure"]),
    filteredItems: function () {
      return filterItems(this.search, this.dataEditor);
    },
  },
  methods: {
    resetfilters() {
      this.filterselected = {};
      this.getDataEditor();
    },
    changefilter() {
      this.getDataEditor();
    },
    responsemodaleditdata(modifieddata) {
      const _this = this;
      for (let index in this.dataEditor) {
        const field = _this.dataEditor[index];
        if (field._id === modifieddata._id) {
          field.grupos[modifieddata.campo] = modifieddata.input;
          break;
        }
      }
    },
    selectfieldtoedit(field, title) {
      this.showmodaleditdata();
      this.datatoedit = {};
      this.datatoedit._id = field._id;
      this.datatoedit.campo = title;
      this.datatoedit.input = field.grupos[title];
    },
    showmodaleditdata() {
      if (this.showmodaledit) {
        this.showmodaledit = false;
      } else {
        this.showmodaledit = true;
      }
    },
    showInputEdit(info, index) {
      if (index === this.showFormGroup.index) {
        return true;
      } else {
        return false;
      }
    },
    showEditGroup(grupo, index) {
      this.showFormGroup.grupo = grupo;
      this.showFormGroup.index = index;
    },
    async generatesearch() {
      try {
        const result = await apiServices.get(
          `/addsearchtoreports/${this.$route.params.id}`
        );
        this.getDataEditor();
        this.getUpdatedFilter();
        console.log(result);
      } catch (err) {}
    },
    next() {
      if (this.pagination.inicial + 1 < this.pagination.total) {
        this.pagination.inicial++;
        this.getDataEditor();
      }
    },
    previous() {
      if (this.pagination.inicial > 0) {
        this.pagination.inicial--;
        this.getDataEditor();
      }
    },
    ir(n) {
      this.pagination.inicial = n;
      this.getDataEditor();
    },
    async getUpdatedFilter() {
      try {
        const result = await apiServices.get(
          `/updatedfilter/${this.$route.params.id}`
        );
        this.updateFilter = result.data;
        this.$store.commit("setStructure", result.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getDataEditor() {
      try {
        const _this = this;
        let filteredited = {};
        const keysfilterselected = Object.keys(this.filterselected);
        for (let index in keysfilterselected) {
          filteredited[`grupos.${keysfilterselected[index]}`] =
            _this.filterselected[keysfilterselected[index]];
        }
        const info = {
          search: this.search,
          inicial: this.pagination.inicial * 20,
          filter: filteredited,
        };
        let result;
        result = await apiServices.post(
          `/dataeditorlist/${this.$route.params.id}`,
          info
        );
        this.dataEditor = result.data.data;
        this.groupsPeople = [];
        let mitad = Math.ceil(this.dataEditor.length / 2);
        for (let i = 0; i < mitad; i++) {
          this.groupsPeople.push(i);
        }
        this.pagination.count = result.data.count;
        this.pagination.total = Math.ceil(this.pagination.count / 20);
        this.pagination.mitad = Math.round((this.pagination.total - 3) / 2 + 3);
        if (this.dataEditor.length === 0) {
          this.pagination.inicial = 0;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    search(nv, ov) {
      this.getDataEditor();
    },
  },
  created() {
    this.getDataEditor();
  },
  components: {
    yModaleditdata,
  },
};
</script>