<template>
  <section class="section">
    <h1 class="title">
      Evaluados
      <button
        v-if="!tokenUser.ghumana"
        class="button is-primary"
        @click="calcularproceso()"
      >Calcular</button>
      <button
        v-if="!tokenUser.ghumana"
        class="button is-primary"
        @click="crearcuentas"
      >Crear cuentas de usuario</button>
    </h1>

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
        <th>Evaluado</th>
        <th>Controles</th>
        <th>Status</th>
      </tr>
      <tr v-for="(k,v) in filteredItems" :key="v">
        <td>{{v+1}}</td>
        <td>
          <span class="title is-5">{{k.evaluado.nombre}}</span>
          <br />
          <span class="subtitle is-6">{{k.evaluado.email}}</span>
        </td>
        <td>
          <router-link
            :to="{ name: 'resultlider', params: { procesoid: proceso._id, liderid: k.evaluado._id } }"
            class="button is-info"
            target="_blank"
          >
            <span class="icon">
              <i class="material-icons">visibility</i>
            </span>
          </router-link>
          <button class="button is-link" @click="showShare(k)">
            <span class="icon">
              <i class="material-icons">share</i>
            </span>
          </button>
        </td>
        <td>
          <span class="is-capitalized" :class="colortexto(k.status)">{{k.status}}</span>
        </td>
      </tr>
    </table>
    <modalshare :show="showData" :informe="infoshare" @showmodalshare="showmodalshare"></modalshare>
  </section>
</template>
<script>
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
import modalshare from "@/components/modals/Modalshare.vue";
const filterItems = (query, data) => {
  return data.filter(el => {
    const texto = el.evaluado.email + el.evaluado.nombre + el.status;
    if (texto.toLowerCase().indexOf(query.toLowerCase()) > -1) {
      return el;
    }
  });
};
export default {
  data() {
    return {
      search: "",
      relaciones: [],
      infoshare: {},
      showData: false
    };
  },
  props: {
    proceso: {
      type: Object
    }
  },
  computed: {
    ...mapState(["idtoken", "tokenUser"]),
    filteredItems: function() {
      return filterItems(this.search, this.relaciones);
    }
  },
  methods: {
    showmodalshare() {
      if (this.showData) {
        this.showData = false;
      } else {
        this.showData = true;
      }
    },
    showShare(i) {
      this.infoshare = {// se pueden enviar mas parametros
        password: i.password,
        id: i._id,
        paramscustom: {
          params: ['liderid','procesoid'],
          liderid: i.evaluado._id,
          procesoid: this.proceso._id
        },
        rutacustom: 'sharelider',
        rutaserver: 'changepasswordlider'
      };
      this.showData = true;
    },
    colortexto(p) {
      if (p === "enviado") {
        return "has-text-info";
      } else if (p === "creado") {
        return "has-text-grey";
      } else {
        return "has-text-success";
      }
    },
    textoenvio(p) {
      if (p === "creado") {
        return "Enviar";
      } else {
        return "Re Enviar";
      }
    },
    async crearcuentas() {
      this.relaciones = [];
      let result;
      try {
        result = await apiServices.get(
          `/crearusuariolideres/${this.proceso._id}`
        );
        if (result.data) {
          console.log(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async enviarcorreo(item) {
      let result;
      const d = {
        id: item._id
      };
      try {
        result = await apiServices.post(`/enviarcorreo`, d);
        // this.datafile = result.data;
        if (result.data) {
          this.$store.dispatch("notify", {
            message: "Correo enviado con éxito."
          });
        }
        this.traerelaciones();
      } catch (error) {
        console.log(error);
      }
    },
    async traerelaciones() {
      this.relaciones = [];
      let result;
      try {
        result = await apiServices.get(
          `/listliderrelacionauto/${this.proceso._id}`
        );
        if (result.data) {
          this.relaciones = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async calcularproceso() {
      let result;
      const d = {
        id: this.proceso._id
      };
      try {
        result = await apiServices.post(`/calcular`, d);
        if (result.data) {
          this.traerelaciones();
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.traerelaciones();
  },
  components: {
    modalshare
  }
};
</script>