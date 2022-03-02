<template>
  <section>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2 has-text-grey-dark">Editar Usuario</h1>
          <h1 class="title has-text-grey">{{ user.displayName }}</h1>
          <h2 class="subtitle has-text-grey">{{ user.email }}</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <section class="margin-top">
          <div class="field">
            <div class="columns">
              <div class="column">
                <input
                  v-model="user.claims.admin"
                  class="is-checkradio"
                  id="ch"
                  type="checkbox"
                  name="ch"
                />
                <label for="ch">admin</label>
              </div>
              <div class="column">
                <input
                  v-model="user.claims.cmt"
                  class="is-checkradio"
                  id="ch7"
                  type="checkbox"
                  name="ch7"
                />
                <label for="ch7">CMT</label>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button
                class="button is-primary is-large is-fullwidth"
                @click="editUser(null, 'editPermission')"
              >
                <i class="material-icons">security</i>&nbsp;Actualizar Permisos
              </button>
            </div>
          </div>
          <div class="field has-addons">
            <p class="control has-icons-left is-expanded">
              <span class="select is-large is-fullwidth">
                <select v-model="current">
                  <option
                    v-for="option in empresas"
                    v-bind:value="option"
                    v-bind:key="option._id"
                  >
                    {{ option.nombre }} {{ option.nit }}
                  </option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="material-icons">location_city</i>
              </span>
            </p>
            <div class="control">
              <button
                @click="editUser(current, 'addCompany')"
                class="button is-primary is-large"
              >
                <i class="material-icons">playlist_add</i>&nbsp;Agregar
              </button>
            </div>
          </div>
          <h1 class="title">Empresas Asignadas</h1>
          <table class="table is-fullwidth table is-striped">
            <thead>
              <tr>
                <th></th>
                <th>Empresa</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in empresasUser" :key="item.$index">
                <td></td>
                <td>
                  <h5 class="title is-5">
                    {{ item.nombrec }}
                    <small>{{ item.nit }}</small>
                  </h5>
                  <h6 class="subtitle is-6">{{ item.nombre }}</h6>
                </td>
                <td>
                  <a
                    v-show="showDelete"
                    @click="editUser(item, 'deleteCompany')"
                    class="button is-danger"
                  >
                    <i class="material-icons">delete_forever</i>&nbsp;Eliminar
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            v-if="user.claims.liderl"
            class="button is-info"
            @click="traeempleados()"
          >
            Traer Empleados
          </button>
          <section v-if="user.claims.liderl" class="section">
            <div class="field is-centered is-grouped">
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input is-normal is-focused"
                  type="text"
                  v-model="search"
                  placeholder="Buscar Empleado"
                />
                <span class="icon is-medium is-left">
                  <i class="material-icons">search</i>
                </span>
              </p>
            </div>
            <table class="table">
              <tr>
                <th></th>
                <th>Correo</th>
                <th>Nombre</th>
                <th>Cargo</th>
                <th>Dependencia</th>
                <th>Controles</th>
              </tr>
              <tr v-for="(k, v) in filteredItems" :key="v">
                <td>{{ v + 1 }}</td>
                <td>{{ k.email }}</td>
                <td>{{ k.nombre }}</td>
                <td>{{ k.cargo }}</td>
                <td>{{ k.dependencia }}</td>
                <td>
                  <button class="button is-info" @click="seleccionar(k)">
                    Seleccionar
                  </button>
                </td>
              </tr>
            </table>
          </section>
        </section>
      </div>
    </section>
    <section class="section">
      <div class="container"></div>
    </section>
  </section>
</template>

<script>
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
const filterItems = (query, data) => {
  return data.filter((el) => {
    const texto = el.email + el.nombre + el.cargo + el.dependencia + el.proceso;
    if (texto.toLowerCase().indexOf(query.toLowerCase()) > -1) {
      return el;
    }
  });
};
export default {
  data() {
    return {
      user: {
        currentCompany: "",
        companys: {},
        claims: {},
      },
      empresas: [],
      empresasUser: [],
      current: "",
      search: "",
      listempleados: [],
    };
  },
  computed: {
    ...mapState(["idtoken"]),
    filteredItems: function () {
      return filterItems(this.search, this.listempleados);
    },
    showDelete() {
      if (this.empresasUser.length > 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    seleccionar(d) {
      this.user.empleado = d._id;
    },
    borrar() {
      this.nombre = "";
      this.valor = "";
    },
    async enviar() {
      let result;
      try {
        this.user.currentCompany = this.current._id;
        this.user.companys = {};
        this.user.companys[this.current._id] = {
          id: this.current._id,
        };
        result = await apiServices.post(`/users`, this.user);
        this.$notify({
          group: "notification",
          title: "Perfecto",
          text: `Usuario creado con el id `,
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        this.$notify({
          group: "warn",
          type: "error",
          title: "Ups, ocurrió un error",
          text: `Inténtelo nuevamente`,
        });
      }
    },
    async getUserandEmpresa(_this) {
      function getUser(id) {
        const result = apiServices.get(`/usermg/${id}`);
        return result;
      }
      function getEmpresas() {
        const result = apiServices.get(`/empresas1`);
        return result;
      }
      try {
        const userEmpresas = await Promise.all([
          getUser(_this.$route.params.id),
          getEmpresas(),
        ]);
        _this.user = userEmpresas[0].data;
        const d = {
          _id: "",
          nombre: "Agregar Empresa",
          nit: "",
        };
        _this.empresas = [].concat([d], userEmpresas[1].data);
        _this.current = d;
        const empresasUser = Object.keys(_this.user.companys);
        userEmpresas[1].data.forEach((k) => {
          empresasUser.forEach((k1) => {
            if (k._id === k1) {
              _this.empresasUser.push(k);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    async editUser(i, caso) {
      if (caso === "deleteCompany") {
        delete this.user.companys[i._id];
      }
      if (caso === "addCompany") {
        this.user.companys[i._id] = {
          id: i._id,
        };
      }
      this.empresasUser = [];
      const empresasUser = Object.keys(this.user.companys);
      this.empresas.forEach((k) => {
        empresasUser.forEach((k1) => {
          if (k._id === k1) {
            this.empresasUser.push(k);
          }
        });
      });
      try {
        await apiServices.put(
          `/user/update/${this.$route.params.id}`,
          this.user
        );
        this.$store.dispatch("notify", {
          message: `El usuario fue editado con éxito`,
          type: "is-link",
        });
      } catch (error) {
        this.$store.dispatch("notify", {
          message: `Hubo un problema no se pudo editar el usuario`,
          type: "is-danger",
        });
      }
    },
    async traeempleados() {
      this.listempleados = [];
      let result;
      try {
        result = await apiServices.get(`/listliderempleados`);
        if (result.data) {
          this.listempleados = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getUserandEmpresa(this);
  },
};
</script>

<style lang="scss" scoped>
.is-checkradio[type="radio"]:checked + label::before,
.is-checkradio[type="radio"]:checked + label:before,
.is-checkradio[type="checkbox"]:checked + label::before,
.is-checkradio[type="checkbox"]:checked + label:before {
  border: 0.15rem solid #dbdbdb;
}
.is-checkradio[type="checkbox"] + label::after,
.is-checkradio[type="checkbox"] + label:after {
  border-width: 0.15rem;
}
</style>