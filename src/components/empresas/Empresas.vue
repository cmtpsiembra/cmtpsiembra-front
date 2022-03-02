<template>
  <section>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">Estas son tus Empresas</h1>
              <h2 class="subtitle">¿Con cuál deseas trabajar hoy?</h2>
              <router-link
                v-if="tokenUser.admin"
                :to="{ name: 'createcompany' }"
                class="button is-dark"
                >Crear Empresa</router-link
              >
            </div>
            <div class="column">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input is-large"
                    type="text"
                    v-model="search"
                    placeholder="Buscar"
                  />
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
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>Empresa</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, v) in empresas" :key="v">
              <td>{{ v + pagination.inicial * 20 + 1 }}</td>
              <td>
                <h5 class="title is-5">
                  {{ item.nombre }}
                  <small>{{ item.nit }}</small>
                </h5>
                <h6 class="subtitle is-6 has-text-justified">{{ item.descripcion }}</h6>
              </td>
              <td>
                <div class="buttons">
                  <a @click="refEmp(item)" class="button is-link is-small"
                    >Seleccionar</a
                  >
                  <router-link
                    v-if="tokenUser.admin"
                    :to="{ name: 'editcompany', params: { id: item._id } }"
                    class="button is-dark is-small"
                    >Editar</router-link
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <nav class="pagination" role="navigation" aria-label="pagination">
          <a class="pagination-previous" @click="previous">Anterior</a>
          <a class="pagination-previous">{{ pagination.inicial + 1 }}</a>
          <a class="pagination-next" @click="next">Siguiente</a>
          <ul class="pagination-list">
            <li>
              <a
                class="pagination-link"
                :class="pagination.inicial === 0 ? 'is-current' : ''"
                aria-label="Page 1"
                aria-current="page"
                @click="ir(0)"
                >1</a
              >
            </li>
            <li v-show="pagination.total > 1">
              <a
                class="pagination-link"
                :class="pagination.inicial === 1 ? 'is-current' : ''"
                aria-label="Goto page 2"
                @click="ir(1)"
                >2</a
              >
            </li>
            <li v-show="pagination.total > 2">
              <a
                class="pagination-link"
                :class="pagination.inicial === 2 ? 'is-current' : ''"
                aria-label="Goto page 3"
                @click="ir(2)"
                >3</a
              >
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-show="pagination.total > 5">
              <a
                class="pagination-link"
                :class="
                  pagination.inicial === pagination.mitad - 1
                    ? 'is-current'
                    : ''
                "
                @click="ir(pagination.mitad - 1)"
                >{{ pagination.mitad }}</a
              >
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-show="pagination.total > 4">
              <a
                class="pagination-link"
                :class="
                  pagination.inicial === pagination.total - 1
                    ? 'is-current'
                    : ''
                "
                aria-label="Goto page 47"
                @click="ir(pagination.total - 1)"
                >{{ pagination.total }}</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
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
      empresas: [],
      search: "",
      pagination: {
        count: 0,
        inicial: 0,
        total: 0,
        mitad: 0,
      },
    };
  },
  computed: {
    ...mapState(["idtoken", "empresa", "tokenUser"]),
    filteredItems: function () {
      return filterItems(this.search, this.empresas);
    },
  },
  methods: {
    next() {
      if (this.pagination.inicial + 1 < this.pagination.total) {
        this.pagination.inicial++;
        this.find();
      }
    },
    previous() {
      if (this.pagination.inicial > 0) {
        this.pagination.inicial--;
        this.find();
      }
    },
    ir(n) {
      this.pagination.inicial = n;
      this.find();
    },
    async refEmp(p) {
      try {
        await apiServices.get(`/changecompany/${p._id}`);
        const _this = this;
        const result = await apiServices.get(`/changecompany/${p._id}`);
        if (result.data) {
          apiServices.get(`/empresacredential`).then((empresa) => {
            _this.$store.commit("refreshEmpresa", empresa.data);
          });
        }
      } catch (error) {}
    },
    async find() {
      const _this = this;
      const f = {
        search: _this.search,
        inicial: _this.pagination.inicial * 20,
      };
      let result;
      try {
        result = await apiServices.post(`/searchempresa`, f);
        _this.empresas = result.data.data;
        _this.pagination.count = result.data.count;
        _this.pagination.total = Math.ceil(_this.pagination.count / 20);
        _this.pagination.mitad = Math.round(
          (_this.pagination.total - 3) / 2 + 3
        );
        if (_this.empresas.length === 0) {
          _this.pagination.inicial = 0;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    empresa(newv, oldv) {
      if (oldv._id !== newv._id) {
        this.$router.push("home");
      }
    },
    search(nv, ov) {
      this.find();
    },
  },
  created() {
    if (this.idtoken) {
      this.find();
    }
  },
};
</script>

<style lang="scss" scoped>
.icon-font-size {
  font-size: 17px;
  vertical-align: bottom;
}
</style>



