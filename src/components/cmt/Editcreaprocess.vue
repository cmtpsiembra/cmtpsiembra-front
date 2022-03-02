<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        {{ isedit ? "Editar" : "Crea" }} proceso
        <small class="has-text-grey">{{ proceso.cargo }}</small>
      </h1>
      <div class="columns">
        <div class="column is-offset-2 is-8">
          <div class="field">
            <label class="label">Cargo</label>
            <div class="control">
              <input
                v-model="proceso.cargo"
                class="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Área</label>
            <div class="control">
              <input
                v-model="proceso.area"
                class="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Grupo Ocupacional</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="proceso.gocupcmt">
                  <option :value="null">Seleccione un grupo ocupacional</option>
                  <option
                    v-for="(item, index) in gocup"
                    :key="index"
                    :value="item._id"
                  >
                    {{ item.nombre }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">País</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="proceso.pais">
                  <option :value="null">Ninguno</option>
                  <option
                    v-for="(item1, index1) in paises"
                    :key="index1"
                    :value="item1"
                  >
                    {{ item1 }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Ciudad</label>
            <div class="control">
              <input
                v-model="proceso.ciudad"
                class="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Perfil por defecto</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="proceso.perfil1" @change="changeperfil()">
                  <option
                    v-for="(item2, index2) in filtros"
                    :key="index2"
                    :value="item2._id"
                  >
                    {{ item2.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Activo</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="proceso.activo">
                  <option value="Sí">Si</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="buttons">
              <button class="button is-danger" @click="cancelar">
                <span class="icon is-small">
                  <span class="material-icons"> cancel </span>
                </span>
                <span>Cancelar</span>
              </button>
              <button class="button is-link" @click="saveprocesos()">
                <span class="icon is-small">
                  <span class="material-icons"> save </span>
                </span>
                <span>Guardar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import apiServices from "@/services/yungol-services";
export default {
  data() {
    return {
      proceso: {
        cargo: null,
        area: null,
        gocupcmt: null,
      },
      gocup: [],
      filtros: [],
      paises: [
        "Afganistán",
        "Akrotiri",
        "Albania",
        "Alemania",
        "Andorra",
        "Angola",
        "Anguila",
        "Antártida",
        "Antigua y Barbuda",
        "Antillas Neerlandesas",
        "Arabia Saudí",
        "Arctic Ocean",
        "Argelia",
        "Argentina",
        "Armenia",
        "Aruba",
        "Ashmore andCartier Islands",
        "Atlantic Ocean",
        "Australia",
        "Austria",
        "Azerbaiyán",
        "Bahamas",
        "Bahráin",
        "Bangladesh",
        "Barbados",
        "Bélgica",
        "Belice",
        "Benín",
        "Bermudas",
        "Bielorrusia",
        "Birmania Myanmar",
        "Bolivia",
        "Bosnia y Hercegovina",
        "Botsuana",
        "Brasil",
        "Brunéi",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Bután",
        "Cabo Verde",
        "Camboya",
        "Camerún",
        "Canadá",
        "Chad",
        "Chile",
        "China",
        "Chipre",
        "Clipperton Island",
        "Colombia",
        "Comoras",
        "Congo",
        "Coral Sea Islands",
        "Corea del Norte",
        "Corea del Sur",
        "Costa de Marfil",
        "Costa Rica",
        "Croacia",
        "Cuba",
        "Dhekelia",
        "Dinamarca",
        "Dominica",
        "Ecuador",
        "Egipto",
        "El Salvador",
        "El Vaticano",
        "Emiratos Árabes Unidos",
        "Eritrea",
        "Eslovaquia",
        "Eslovenia",
        "España",
        "Estados Unidos",
        "Estonia",
        "Etiopía",
        "Filipinas",
        "Finlandia",
        "Fiyi",
        "Francia",
        "Gabón",
        "Gambia",
        "Gaza Strip",
        "Georgia",
        "Ghana",
        "Gibraltar",
        "Granada",
        "Grecia",
        "Groenlandia",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Ecuatorial",
        "Guinea-Bissau",
        "Guyana",
        "Haití",
        "Honduras",
        "Hong Kong",
        "Hungría",
        "India",
        "Indian Ocean",
        "Indonesia",
        "Irán",
        "Iraq",
        "Irlanda",
        "Isla Bouvet",
        "Isla Christmas",
        "Isla Norfolk",
        "Islandia",
        "Islas Caimán",
        "Islas Cocos",
        "Islas Cook",
        "Islas Feroe",
        "Islas Georgia del Sur y Sandwich del Sur",
        "Islas Heard y McDonald",
        "Islas Malvinas",
        "Islas Marianas del Norte",
        "IslasMarshall",
        "Islas Pitcairn",
        "Islas Salomón",
        "Islas Turcas y Caicos",
        "Islas Vírgenes Americanas",
        "Islas Vírgenes Británicas",
        "Israel",
        "Italia",
        "Jamaica",
        "Jan Mayen",
        "Japón",
        "Jersey",
        "Jordania",
        "Kazajistán",
        "Kenia",
        "Kirguizistán",
        "Kiribati",
        "Kuwait",
        "Laos",
        "Lesoto",
        "Letonia",
        "Líbano",
        "Liberia",
        "Libia",
        "Liechtenstein",
        "Lituania",
        "Luxemburgo",
        "Macao",
        "Macedonia",
        "Madagascar",
        "Malasia",
        "Malaui",
        "Maldivas",
        "Malí",
        "Malta",
        "Man, Isle of",
        "Marruecos",
        "Mauricio",
        "Mauritania",
        "Mayotte",
        "México",
        "Micronesia",
        "Moldavia",
        "Mónaco",
        "Mongolia",
        "Montserrat",
        "Mozambique",
        "Namibia",
        "Nauru",
        "Navassa Island",
        "Nepal",
        "Nicaragua",
        "Níger",
        "Nigeria",
        "Niue",
        "Noruega",
        "Nueva Caledonia",
        "Nueva Zelanda",
        "Omán",
        "Pacific Ocean",
        "Países Bajos",
        "Pakistán",
        "Palaos",
        "Panamá",
        "Papúa-Nueva Guinea",
        "Paracel Islands",
        "Paraguay",
        "Perú",
        "Polinesia Francesa",
        "Polonia",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reino Unido",
        "República Centroafricana",
        "República Checa",
        "República Democrática del Congo",
        "República Dominicana",
        "Ruanda",
        "Rumania",
        "Rusia",
        "Sáhara Occidental",
        "Samoa",
        "Samoa Americana",
        "San Cristóbal y Nieves",
        "San Marino",
        "San Pedro y Miquelón",
        "San Vicente y las Granadinas",
        "Santa Helena",
        "Santa Lucía",
        "Santo Tomé y Príncipe",
        "Senegal",
        "Seychelles",
        "Sierra Leona",
        "Singapur",
        "Siria",
        "Somalia",
        "Southern Ocean",
        "Spratly Islands",
        "Sri Lanka",
        "Suazilandia",
        "Sudáfrica",
        "Sudán",
        "Suecia",
        "Suiza",
        "Surinam",
        "Svalbard y Jan Mayen",
        "Tailandia",
        "Taiwán",
        "Tanzania",
        "Tayikistán",
        "TerritorioBritánicodel Océano Indico",
        "Territorios Australes Franceses",
        "Timor Oriental",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad y Tobago",
        "Túnez",
        "Turkmenistán",
        "Turquía",
        "Tuvalu",
        "Ucrania",
        "Uganda",
        "Unión Europea",
        "Uruguay",
        "Uzbekistán",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Wake Island",
        "Wallis y Futuna",
        "West Bank",
        "World",
        "Yemen",
        "Yibuti",
        "Zambia",
        "Zimbabue",
      ],
    };
  },
  computed: {
    isedit() {
      if (this.$route.params.id) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    cancelar() {
      this.$router.replace({ name: "cmtprocesos" });
    },
    async saveprocesos() {
      try {
        if (!this.proceso.cargo) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar el nombre del cargo",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.proceso.area) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar el nombre del área",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.proceso.gocupcmt) {
          this.$store.dispatch("notify", {
            message: "Debe seleccionar un grupo ocupacional",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.proceso.pais) {
          this.$store.dispatch("notify", {
            message: "Debe seleccionar un país",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.proceso.ciudad) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar la ciudad",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.proceso.perfil) {
          this.$store.dispatch("notify", {
            message: "Debe seleccionar un perfil por defecto",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.proceso.activo) {
          this.$store.dispatch("notify", {
            message: "Debe seleccionar una opcion en la categoría activo",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }

        if (this.isedit) {
          await apiServices.post(`/editprocesscmt`, { proceso: this.proceso });
          this.$router.replace({ name: "cmtprocesos" });
        } else {
          await apiServices.post(`/newprocesscmt`, { proceso: this.proceso });
          this.$router.replace({ name: "cmtprocesos" });
        }
      } catch (err) {
        console.log(err);
      }
    },
    changeperfil() {
      const _this = this;
      for (let index = 0; index < this.filtros.length; index++) {
        if (_this.proceso.perfil1 === _this.filtros[index]._id) {
          _this.proceso.perfil = _this.filtros[index];
          break;
        }
      }
    },
    async findbyId() {
      try {
        const result = await apiServices.get(
          `/getprocessbyid/${this.$route.params.id}`
        );
        if (result.data) {
          this.proceso = result.data;
          if (!this.proceso.perfil) {
            this.proceso.perfil1 = "";
          } else {
            this.proceso.perfil1 = this.proceso.perfil._id;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async findgruposocupacionales() {
      try {
        const result = await apiServices.get(`/getgrupocup`);
        if (result.data) {
          this.gocup = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async findfiltroscmt() {
      try {
        const _this = this;
        const result = await apiServices.get(`/getfiltrocmt`);
        if (result.data) {
          this.filtros = [];
          this.filtros.push({
            _id: "",
            name: "Ninguno",
          });
          for (let index in result.data) {
            const perfil = result.data[index];
            const d = {
              _id: perfil._id,
              name: perfil.nombre,
            };
            _this.filtros.push(d);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.findbyId();
    }
    this.findgruposocupacionales();
    this.findfiltroscmt();
  },
};
</script>