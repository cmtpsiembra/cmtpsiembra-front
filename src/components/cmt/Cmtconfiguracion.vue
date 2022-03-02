<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <h1 class="title">Configuración</h1>
        </div>
        <div class="column">
          <div class="buttons">
            <button
              class="button"
              :class="classbutton('recarga')"
              @click="selectpage('recarga')"
            >
              Recargas
            </button>
            <button
              class="button"
              :class="classbutton('olduser')"
              @click="selectpage('olduser')"
            >
              Usuarios viejos
            </button>
          </div>
        </div>
      </div>

      <hr />

      <section v-show="shows.recarga">
        <h1 class="title">
          Saldo actual <span class="fontMono">{{ empresa.saldocmt }}</span>
        </h1>
        <div class="field has-addons">
          <div class="control">
            <input
              class="input"
              v-model="recarga"
              type="text"
              placeholder="Número de recargas"
            />
          </div>
          <div class="control">
            <a class="button is-info" @click="recargar"> Recargar </a>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in recargas" :key="index">
              <td>{{ item.fecha | date() }}</td>
              <td class="has-text-right fontMono">
                {{ item.cantidad | number() }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section v-show="shows.olduser">
        <table class="table">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Activo</th>
              <th>Fecha</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in oldusers" :key="index">
              <td>{{ item.empresa }}</td>
              <td>{{ item.activo }}</td>
              <td>{{ item.fecha | date() }}</td>
              <td class="has-text-right fontMono">
                {{ item.saldo | number() }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </section>
</template>

<script>
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
export default {
  data() {
    return {
      recargas: [],
      shows: {
        recarga: true,
        olduser: false,
      },
      recarga: null,
      oldusers: [],
    };
  },
  computed: {
    ...mapState(["empresa"]),
  },
  methods: {
    selectpage(item) {
      const _this = this;
      for (let index in this.shows) {
        if (item === index) {
          _this.shows[index] = true;
        } else {
          _this.shows[index] = false;
        }
      }
      console.log(item);
    },
    classbutton(item) {
      let returned;
      if (this.shows[item]) {
        returned = "is-dark";
      } else {
        returned = "is-light";
      }
      return returned;
    },
    async recargar() {
      try {
        await apiServices.post(`/recargar`, {
          recarga: this.recarga,
        });
        this.findRecargas();
        const emp = await apiServices.get(`/empresacredential`);
        this.$store.commit("refreshEmpresa", emp.data);
        this.recarga = null;
      } catch (err) {
        console.log(err);
      }
    },
    async findRecargas() {
      try {
        const result = await apiServices.get(`/findrecargas`);
        if (result.data) {
          this.recargas = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async findOldUser() {
      try {
        const result = await apiServices.get(`/getuserscmtviejo`);
        if (result.data) {
          this.oldusers = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.findRecargas();
    this.findOldUser();
  },
};
</script>