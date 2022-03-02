<template>
  <section>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">Usuarios</h1>
              <h2 class="subtitle">Lista de Usuarios con permisos</h2>
            </div>
            <div class="column">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input class="input is-large" type="text" v-model="search" placeholder="Buscar" />
                  <span class="icon is-medium is-left">
                    <i class="material-icons">search</i>
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
              <th>Usuario</th>
              <th>Empresa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredItems" :key="index">
              <td>
                <h5 class="title is-5">{{user.displayName}}</h5>
                <h6 class="subtitle is-6">{{user.email}}</h6>
              </td>
              <td>
                <h6 class="subtitle is-7">{{user.currentCompany.nombre}}</h6>
              </td>
              <td>
                <span class="icon has-text-danger hand">
                  <router-link :to="{ name: 'edituser', params: { id: user._id } }">
                    <i class="material-icons">edit</i>
                  </router-link>
                </span>
                <span class="icon has-text-danger hand" @click="eliminar(user)">
                  <i class="material-icons">delete_forever</i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
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
    </section>
  </section>
</template>


<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
const filterItems = (query, data) => {
  return data.filter((el) => {
    const texto = el.displayName + el.email + el.currentCompany.nombre;
    if (texto.toLowerCase().indexOf(query.toLowerCase()) > -1) {
      return el;
    }
  });
};
export default {
  data() {
    return {
      users: [],
      search: "",
    };
  },
  computed: {
    ...mapState(["idtoken", "modalnotification"]),
    filteredItems: function () {
      return filterItems(this.search, this.users);
    },
    resultnotification() {
      return this.modalnotification.result.aceptar;
    },
  },

  methods: {
    eliminar(user) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Cuidado !",
          message: "Realmente desea eliminar el usuario?",
          clase: "is-danger",
          data: user._id,
        },
      });
      console.log("el usuario a eliminar es", user._id);
    },
    async deleteUsers(_id) {
      try {
        await apiServices.delete(`/users/${_id}`);
        this.$store.dispatch("notify", {
          message: `El usuario fue eliminado con éxito`,
          type: "is-link",
        });
        this.traeData(this);
      } catch (err) {
        this.$store.dispatch("notify", {
          message: `Hubo un problema no se pudo eliminar el usuario`,
          type: "is-danger",
        });
        console.log(err);
      }
    },
    async traeData(_this) {
      let result;
      try {
        result = await apiServices.get(`/users`);
        // _this.users = result.data.users;
        _this.users = result.data;
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
  },
  watch: {
    idtoken(nv, ov) {
      if (nv) {
        this.traeData(this);
      }
    },
    resultnotification(nv, ov) {
      if (nv) {
        this.deleteUsers(this.modalnotification.result.data);
      }
    },
  },

  created() {
    this.traeData(this);
  },
};
</script>
<style lang="scss" scoped>
</style>


