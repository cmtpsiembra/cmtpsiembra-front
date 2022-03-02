<template>
  <section>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Usuarios</h1>
          <h2 class="subtitle">
            Crea los usuarios que pueden acceder a app CMT
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
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
      </div>
      <div class="container">
        <section class="margin-top">
          <div class="field">
            <div class="control has-icons-left">
              <input
                class="input is-large"
                type="text"
                placeholder="Nombre"
                v-model="user.displayName"
              />
              <span class="icon is-medium is-left">
                <i class="material-icons">person</i>
              </span>
            </div>
          </div>
          <div class="field">
            <div class="control has-icons-left">
              <input
                class="input is-large"
                type="email"
                placeholder="Correo"
                v-model="user.email"
              />
              <span class="icon is-medium is-left">
                <i class="material-icons">email</i>
              </span>
            </div>
          </div>
          <div class="field">
            <p class="control has-icons-left">
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
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-info is-large" @click="enviar">
                Enviar
              </button>
            </div>
            <div class="control">
              <button class="button is-large" @click="borrar">Cancelar</button>
            </div>
          </div>
        </section>
      </div>
      <br />
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
  </section>
</template>

<script>
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
function comparar(a, b) {
  if (a.nombre > b.nombre) {
    return 1;
  }
  if (a.nombre < b.nombre) {
    return -1;
  }
  return 0;
}
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
        await this.$auth.sendPasswordResetEmail(this.user.email, {
          url: "https://cmtpsiembra.com",
        });
        this.$store.dispatch("notify", {
          message: `Perfecto. Usuario creado con éxito`,
        });
        this.user.displayName = "";
        this.user.email = "";
        this.current = "";
        this.claims = {};
        console.log(result);
      } catch (error) {
        console.log(error);
        this.$store.dispatch("notify", {
          message: "Ups, ocurrió un error. Inténtelo nuevamente",
          type: "is-danger",
          duration: 4000,
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

  mounted: function () {
    async function enviar(_this) {
      let result;
      const d = {
        _id: "",
        nombre: "Empresa",
        nit: "",
      };
      try {
        result = await apiServices.get(`/empresas1`);
        const dataordenada = result.data.sort(comparar);

        _this.empresas = [].concat([d], dataordenada);
        _this.current = d;
      } catch (error) {
        console.log(error);
      }
    }
    enviar(this);
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


