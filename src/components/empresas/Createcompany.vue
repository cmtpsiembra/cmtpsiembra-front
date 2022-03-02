<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ isedit ? "Edición" : "Creación" }} de Empresas</h1>
      <h2 class="subtitle">
        Módulo para la {{ isedit ? "edición" : "creación" }} de empresas.
      </h2>
      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="field">
            <label class="label">Nit</label>
            <div class="control has-icons-left">
              <input
                v-model="fempresa.nit"
                class="input"
                type="text"
                placeholder="Nit"
              />
              <span class="icon is-small is-left">
                <i class="material-icons">business</i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Razon Social</label>
            <div class="control has-icons-left">
              <input
                v-model="fempresa.nombre"
                class="input"
                type="text"
                placeholder="Razon Social"
              />
              <span class="icon is-small is-left">
                <i class="material-icons">face</i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Dirección</label>
            <div class="control has-icons-left">
              <input
                v-model="fempresa.direccion"
                class="input"
                type="text"
                placeholder="Dirección"
              />
              <span class="icon is-small is-left">
                <i class="material-icons">place</i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Sector Económico</label>
            <div class="control has-icons-left">
              <span class="select is-fullwidth">
                <select v-model="fempresa.sector">
                  <option value="Servicios">Servicios</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Salud">Salud</option>
                  <option value="Financiero">Financiero</option>
                  <option value="Energía y Minería">Energía y Minería</option>
                  <option value="Otros">Otros</option>
                  <option value="Comunicaciones">Comunicaciones</option>
                  <option value="Educación">Educación</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Público">Público</option>
                  <option value="Sin ánimo de lucro">Sin ánimo de lucro</option>
                  <option value="Transporte">Transporte</option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="material-icons">account_balance</i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Teléfono</label>
            <div class="control has-icons-left">
              <input
                v-model="fempresa.telefono"
                class="input"
                type="text"
                placeholder="Teléfono"
              />
              <span class="icon is-small is-left">
                <i class="material-icons">phone</i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Región</label>
            <div class="control has-icons-left">
              <span class="select is-fullwidth">
                <select v-model="fempresa.region">
                  <option value="Medellín">Medellín</option>
                  <option value="Bogotá">Bogotá</option>
                  <option value="Otras">Otras ciudades de Colombia</option>
                  <option value="Internacional">Internacional</option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="material-icons">location_on</i>
              </span>
            </div>
          </div>
          <div
            v-if="fempresa.cmtviejo && userscmtviejo.length > 0"
            class="field"
          >
            <label class="label">Usuario CMT Viejo</label>
            <div class="control has-icons-left">
              <span class="select is-fullwidth">
                <select v-model="fempresa.empresacmt">
                  <option
                    v-for="(item1, index1) in userscmtviejo"
                    :key="index1"
                    :value="item1._id"
                  >
                    {{ item1.empresa }}
                  </option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="material-icons">location_on</i>
              </span>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="field">
            <label class="label">Página Web</label>
            <div class="control has-icons-left">
              <input
                v-model="fempresa.pagina"
                class="input"
                type="text"
                placeholder="Página Web"
              />
              <span class="icon is-small is-left">
                <i class="material-icons">web</i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Número de Personas</label>
            <div class="control has-icons-left">
              <input
                v-model="fempresa.numero"
                class="input"
                type="text"
                placeholder="Número de Personas"
              />
              <span class="icon is-small is-left">
                <i class="material-icons">groups</i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Riesgo</label>
            <div class="control has-icons-left">
              <span class="select is-fullwidth">
                <select v-model="fempresa.riesgo">
                  <option value="Sin Clasificación">Sin Clasificación</option>
                  <option value="Alto">Alto</option>
                  <option value="Medio">Medio</option>
                  <option value="Bajo">Bajo o Mínimo</option>
                  <option value="Perdido">Cliente Perdido</option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="material-icons">warning</i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Descripción</label>
            <div class="control has-icons-left">
              <input
                v-model="fempresa.descripcion"
                class="input"
                type="text"
                placeholder="Descripción"
              />
              <span class="icon is-small is-left">
                <i class="material-icons">subject</i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Ciudad</label>
            <div class="control has-icons-left">
              <input
                v-model="fempresa.ciudad"
                class="input"
                type="text"
                placeholder="Ciudad"
              />
              <span class="icon is-small is-left">
                <i class="material-icons">place</i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">CMT Viejo</label>
            <div class="control has-icons-left">
              <span class="select is-fullwidth">
                <select v-model="fempresa.cmtviejo" @change="finduserscmtviejo">
                  <option :value="false">No</option>
                  <option :value="true">Si</option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="material-icons">warning</i>
              </span>
            </div>
          </div>
          <div class="field" v-if="fempresa.cmtviejo">
            <label class="label">Fusionar datos del CMT viejo</label>
            <button class="button is-link" @click="fusionar">Fusionar</button>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="button is-large is-dark" @click="createCompany">
          {{ isedit ? "Editar" : "Guardar" }}
        </button>
        <router-link
          class="button is-large is-light"
          :to="{ name: 'empresas' }"
        >
          <span @click="cancel">
            <small>Cancelar</small>
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
export default {
  data() {
    return {
      empresas: [],
      search: "",
      fempresa: {},
      userscmtviejo: [],
    };
  },
  computed: {
    ...mapState(["empresa"]),
    isedit() {
      if (this.$route.params.id) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async fusionar() {
      try {
        const result = await apiServices.post(`/fusioncmt`, {
          usercmtviejo: this.fempresa.empresacmt,
          empresa: this.$route.params.id,
        });
        if (result.data) {
          console.log(result.data);
        }
        // esto es para cambiar el id del usuario en los procesos de cmt por el id de la empresa
      } catch (err) {
        console.log(err);
      }
    },
    async finduserscmtviejo() {
      try {
        const result = await apiServices.get(`/getuserscmtviejo`);
        if (result.data) {
          this.userscmtviejo = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async findEmpresa() {
      try {
        const result = await apiServices.get(
          `/getcompany/${this.$route.params.id}`
        );
        if (result.data) {
          this.fempresa = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    cancel() {
      if (this.$route.params.id) {
        this.$router.replace({ name: "empresas" });
      } else {
        this.fempresa = {
          nit: "",
          nombre: "",
          direccion: "",
          sector: "",
          telefono: "",
          region: "",
          ciudad: "",
          pagina: "",
          numero: "",
          grupo: "",
          riesgo: "",
          descripcion: "",
          cmtviejo: false,
          _id: null,
        };
      }
    },
    async createCompany() {
      try {
        let result;
        let message;
        if (this.$route.params.id) {
          result = await apiServices.put(`/editcompany`, this.fempresa);
          message = "Perfecto!. Empresa Editada.";
        } else {
          result = await apiServices.post(`/createcompany`, this.fempresa);
          message = "Perfecto!. Empresa Creada.";
        }
        if (result.data) {
          this.$store.dispatch("notify", {
            message: message,
          });
          this.fempresa = {
            nit: "",
            nombre: "",
            direccion: "",
            sector: "",
            telefono: "",
            region: "",
            ciudad: "",
            pagina: "",
            numero: "",
            grupo: "",
            riesgo: "",
            descripcion: "",
            cmtviejo: false,
          };
          this.$router.replace({ name: "empresas" });
          // this.$router.replace("/settings/empresas");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.findEmpresa();
    }
  },
};
</script>
