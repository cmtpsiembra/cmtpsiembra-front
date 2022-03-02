<template>
  <section>
    <div>
      <section class="section">
        <div class="container">
          <h1 class="title">Datos para FRS</h1>
          <h2 class="subtitle">En este menú podra cargar los datos de Factores de Riesgo Psicosocial.</h2>
          <div class="field">
            <div class="file is-primary">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  accept=".xls, .xlsx"
                  @change="onFileChange"
                  name="resume"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="material-icons">cloud_upload</i>
                  </span>
                  <span class="file-label">&nbsp; Archivo</span>
                </span>
              </label>
            </div>
          </div>
          <div v-if="data" class="field is-grouped">
            <p class="control is-expanded">
              <input
                class="input is-large"
                type="text"
                placeholder="Nombre del Informe"
                v-model="frsupload.nombre"
              />
            </p>
            <p class="control">
              <a class="button is-info is-large" @click="savefrs()">Guardar</a>
            </p>
          </div>
          <progress
            v-show="avaceupload > 0"
            class="progress is-info is-small"
            :value="avaceupload"
            max="100"
          ></progress>
        </div>
      </section>

      <div v-if="data">
        <!-- <section class="section">
          <button
            v-for="(k,v) in data.grupos"
            :key="v"
            class="button is-light is-small"
            @click="selGrupo(k)"
          >{{k}}</button>
          
            <table class="table">
              <tr>
                <td>Grupo</td>
                <td>Valor</td>
              </tr>
              <tr v-for="(k,v) in dataSel" :key="v">
                <td>{{k.SubGrupo}}</td>
                <td>{{k.countData.sum}}</td>
              </tr>
            </table>
          
        </section>-->

        <section class="hero is-primary is-medium">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">{{empresa.nombre}}</h1>
              <h2 class="subtitle">Factores de Riesgo Psicosocial</h2>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="container">
            <h1 class="title is-4">Perfil Socio Demográfico</h1>
            <div class="columns">
              <div v-if="dataSave.sexo" class="column">
                <div class="box">
                  <h1 class="subtitle is-6">Género</h1>
                  <y-graph :datagraph="dataSave.sexo" :cambio="0"></y-graph>
                </div>
              </div>
              <div v-if="dataSave.edad" class="column">
                <div class="box">
                  <h1 class="subtitle is-6">Edad</h1>
                  <y-graph :datagraph="dataSave.edad" :cambio="0"></y-graph>
                </div>
              </div>
            </div>
            <div class="columns">
              <div v-if="dataSave.nivelEducativo" class="column">
                <div class="box">
                  <h1 class="subtitle is-6">Nivel Educativo</h1>
                  <y-graph :datagraph="dataSave.nivelEducativo" :cambio="0"></y-graph>
                </div>
              </div>
              <div v-if="dataSave.estadoCivil" class="column">
                <div class="box">
                  <h1 class="subtitle is-6">Estado Civil</h1>
                  <y-graph :datagraph="dataSave.estadoCivil" :cambio="0"></y-graph>
                </div>
              </div>
            </div>
            <div class="columns">
              <div v-if="dataSave.cabezaFamilia" class="column">
                <div class="box">
                  <h1 class="subtitle is-6">Cabeza de Familia</h1>
                  <y-graph :datagraph="dataSave.cabezaFamilia" :cambio="0"></y-graph>
                </div>
              </div>
              <div v-if="dataSave.personasCargo" class="column">
                <div class="box">
                  <h1 class="subtitle is-6">Personas a Cargo</h1>
                  <y-graph :datagraph="dataSave.personasCargo" :cambio="0"></y-graph>
                </div>
              </div>
            </div>
            <div class="columns">
              <div v-if="dataSave.tipoVivienda" class="column">
                <div class="box">
                  <h1 class="subtitle is-6">Tipo de Vivienda</h1>
                  <y-graph :datagraph="dataSave.tipoVivienda" :cambio="0"></y-graph>
                </div>
              </div>
              <div v-if="dataSave.estratoVivienda" class="column">
                <div class="box">
                  <h1 class="subtitle is-6">Estrato Vivienda</h1>
                  <y-graph :datagraph="dataSave.estratoVivienda" :cambio="0"></y-graph>
                </div>
              </div>
            </div>
            <div class="columns">
              <div v-if="dataSave.casosCriticos" class="column is-6">
                <div class="box">
                  <h1 class="subtitle is-6">Casos Críticos</h1>
                  <y-graph :datagraph="dataSave.casosCriticos" :cambio="0"></y-graph>
                </div>
              </div>
            </div>
            <hr />
            <h1 class="title is-4">FACTORES PSICOSOCIALES</h1>
            <div class="columns">
              <div class="column">
                <div class="box">
                  <div class="buttons is-centered">
                    <span
                      class="button is-light tooltip"
                      data-tooltip="Total Factores"
                      @click="creaFactores('totalfactores')"
                    >1</span>
                    <span
                      class="button is-light tooltip"
                      data-tooltip="Condiciones Intralaborales"
                      @click="creaFactores('intralaborales')"
                    >2</span>
                    <span
                      class="button is-light tooltip"
                      data-tooltip="Liderazgo y Relaciones"
                      @click="creaFactores('liderazgorelaciones')"
                    >3</span>
                    <span
                      class="button is-light tooltip"
                      data-tooltip="Control Sobre el Trabajo"
                      @click="creaFactores('controlsobreltrabajo','horizontalBar')"
                    >4</span>
                    <span
                      class="button is-light tooltip"
                      data-tooltip="Demandas del Trabajo"
                      @click="creaFactores('demandasdeltrabajo','horizontalBar')"
                    >5</span>
                    <span
                      class="button is-light tooltip"
                      data-tooltip="Recompensas"
                      @click="creaFactores('recompensas')"
                    >6</span>
                    <span
                      class="button is-light tooltip"
                      data-tooltip="Condiciones Extralaborales"
                      @click="creaFactores('extralaborales','horizontalBar')"
                    >7</span>
                    <span
                      class="button is-light tooltip"
                      data-tooltip="Indicadores Individaules"
                      @click="creaFactores('individuales','horizontalBar')"
                    >8</span>
                  </div>
                  <div v-if="datafactores">
                    <h1 class="subtitle is-6">{{titulo}}</h1>
                    <y-graph :datagraph="datafactores" :cambio="cambio"></y-graph>
                    <table class="table">
                      <tr>
                        <td>Nivel</td>
                        <td v-for="(k,v) in datafactores.labels" :key="v">{{k}}</td>
                      </tr>
                      <tr v-for="(k,v) in datafactores.data" :key="v">
                        <td>
                          <span>
                            <i
                              class="material-icons icon-lista"
                              :style="{'color':datafactores.colors[v]}"
                            >crop_din</i>
                          </span>
                          {{datafactores.series[v]}}
                        </td>
                        <td v-for="(k1,v1) in k" :key="v1">{{datafactores.data1[v][v1]}} | {{k1}}%</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
import yGraph from "@/components/dashboard/Graph.vue";
export default {
  data() {
    return {
      avaceupload: 0,
      data: null,
      dataSel: null,
      dataSave: {},
      cambio: 0,
      datafactores: null,
      titulo: null,
      frsupload: {
        nombre: "",
        url: ""
      },
      demograficos:{}
    };
  },
  computed: {
    ...mapState(["idtoken", "empresa"])
  },
  methods: {
    async savefrs() {
      const _this = this;
      try {
        const result = await apiServices.post(`/savefrs`, _this.frsupload);
        if (result.data) {
          _this.data = null;
          _this.frsupload.nombre = "";
          _this.frsupload.url = "";
          this.$store.dispatch("notify", {
            message: "Perfecto!. Informe Guardado."
          });
        }
      } catch (err) {
        console.log("ocurrio un error", err);
      }
    },
    onFileChange(e) {
      const _this = this;
      let task;
      const files = e.target.files;
      if (files.length) {
        const file = files[0];
        task = _this.$fire.refexcel(file);
        _this.avaceupload = 10;
        task.on(
          "state_changed",
          snapshot => {
            const porcentaje =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (porcentaje > 10) {
              _this.avaceupload = porcentaje;
            }
          },
          err => {
            console.log("error subiendo el archivo", err);
          },
          async () => {
            try {
              const url = await task.snapshot.ref.getDownloadURL();
              _this.avaceupload = 0;
              _this.frsupload.url = url;
              const data = {
                url: url
              };
              const result = await apiServices.post(`/leefileexcel`, data);
              if (result.data) {
                _this.data = result.data;
                this.transformData();
              }
            } catch (err) {
              console.log("ocurrio un error", err);
            }
          }
        );
      }
    },
    async traeData() {
      const _this = this;
      const data = {
        url:
          "https://firebasestorage.googleapis.com/v0/b/cincel-83343.appspot.com/o/excel%2F1585312876186-prueba%20frs.xlsx?alt=media&token=4773dee8-47f1-431c-aa33-95ef613e1f19"
      };
      try {
        const result = await apiServices.post(`/leefileexcel`, data);
        if (result.data) {
          _this.data = result.data;
          console.log('la data es',_this.data);
          this.transformData();
        }
      } catch (err) {
        console.log("ocurrio un error", err);
      }
    },
    selGrupo(d) {
      this.dataSel = this.data[d];
    },
    creapie(d) {
      const data = {
        data: [],
        labels: [],
        series: [],
        options: {
          legend: {
            display: true,
            position: "right"
          }
        },
        typeGraphic: "pie"
      };
      data.data.push([]);
      d.forEach(el => {
        console.log('el el en el pie es',el);
        data.data[0].push(el.countData.sum);
        data.labels.push(el.SubGrupo);
      });
      return data;
    },
    creaHorizontalBar(d, colors) {
      const data = {
        data: [],
        labels: [],
        series: ["Personas"],
        colors: colors,
        datasetOverride: [],
        options: {
          legend: {
            display: false,
            position: "right"
          }
        },
        typeGraphic: "horizontalBar"
      };
      data.data.push([]);
      d.forEach(el => {
        data.data[0].push(el.countData.sum);
        data.labels.push(el.SubGrupo);
      });
      return data;
    },
    creaBar(d, colors) {
      const data = {
        data: [],
        labels: [],
        series: ["Personas"],
        colors: colors,
        datasetOverride: [],
        options: {
          legend: {
            display: false,
            position: "right"
          },
          scales: {
            yAxes: [
              {
                ticks: { beginAtZero: true }
              }
            ]
          }
        },
        typeGraphic: "bar"
      };
      data.data.push([]);
      d.forEach(el => {
        data.data[0].push(el.countData.sum);
        data.labels.push(el.SubGrupo);
      });
      return data;
    },
    creaFactores(frp, typeGraphic) {
      let typeGraphic1;
      if (typeGraphic) {
        typeGraphic1 = typeGraphic;
      } else {
        typeGraphic1 = "bar";
      }
      let arraydata;
      if (frp === "totalfactores") {
        arraydata = [
          this.data["TOTAL FRP INTRALABORALES"],
          this.data["TOTAL FRP EXTRALABORALES"],
          this.data["INDICADOR CONDICIONES INDIVIDUALES"]
        ];
        this.titulo =
          "TOTALES FRP - PORCENTAJE DE PERSONAS EN CADA NIVEL DE RIESGO";
      }
      if (frp === "intralaborales") {
        arraydata = [
          this.data["LIDERAZGO Y RELACIONES SOCIALES EN EL TRABAJO"],
          this.data["CONTROL SOBRE EL TRABAJO"],
          this.data["DEMANDAS DEL TRABAJO"],
          this.data["RECOMPENSAS"]
        ];
        this.titulo = "CONDICIONES INTRALABORALES";
      }
      if (frp === "liderazgorelaciones") {
        arraydata = [
          this.data["Características del Liderazgo"],
          this.data["Relaciones Sociales"],
          this.data["Retroalimentación del Desempeño"],
          this.data["Relación con los Colaboradores"],
          this.data["LIDERAZGO Y RELACIONES SOCIALES EN EL TRABAJO"]
        ];
        this.titulo = "Liderazgo y Relaciones";
      }
      if (frp === "controlsobreltrabajo") {
        arraydata = [
          this.data["Claridad de Rol"],
          this.data["Capacitación"],
          this.data["Participación y manejo del cambio"],
          this.data["Oportunidades uso y dllo habilidades y conocimientos"],
          this.data["Control y Autonomía sobre el trabajo"],
          this.data["CONTROL SOBRE EL TRABAJO"]
        ];
        this.titulo = "Control Sobre el Trabajo";
      }
      if (frp === "demandasdeltrabajo") {
        arraydata = [
          this.data["Demandas ambientales y de esfuerzo físico"],
          this.data["Demandas emocionales"],
          this.data["Demandas cuantitativas"],
          this.data["Influencia trabajo entorno extralaboral"],
          this.data["Demandas de carga mental"],
          this.data["Consistencia de Rol"],
          this.data["Demandas de la Jornada de Trabajo"],
          this.data["DEMANDAS DEL TRABAJO"]
        ];
        this.titulo = "Control Sobre el Trabajo";
      }
      if (frp === "recompensas") {
        arraydata = [
          this.data["Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza"],
          this.data["Reconocimiento y Compensación"],
          this.data["RECOMPENSAS"]
        ];
        this.titulo = "Control Sobre el Trabajo";
      }
      if (frp === "extralaborales") {
        arraydata = [
          this.data["Tiempo Fuera del Trabajo"],
          this.data["Relaciones Familiares"],
          this.data["Comunicación y relaciones interpersonales"],
          this.data["Situación económica del grupo familiar"],
          this.data["Características de la vivienda y de su entorno"],
          this.data["Influencia del entorno extralaboral sobre el trabajo"],
          this.data["Desplazamiento vivienda-trabajo-vivienda"],
          this.data["TOTAL FRP EXTRALABORALES"]
        ];
        this.titulo = "Condiciones Extralaborales";
      }
      if (frp === "individuales") {
        arraydata = [
          this.data["Autoestima"],
          this.data["Autoeficacia"],
          this.data["Desarrollo Psicológico"],
          this.data["Equilibrio Emocional"],
          this.data["INDICADOR CONDICIONES INDIVIDUALES"]
        ];
        this.titulo = "Condiciones Individuales";
      }
      const colors = ["#239B56", "#ABEBC6", "#FFF300", "#FFC14D", "#FF3A00"];
      const series = {
        "Sin riesgo o riesgo despreciable": 0,
        "Riesgo bajo": 1,
        "Riesgo medio": 2,
        "Riesgo alto": 3,
        "Riesgo muy alto": 4
      };
      const data = {
        data: [[], [], [], [], []],
        data1: [[], [], [], [], []],
        labels: [],
        series: [
          "Sin riesgo o riesgo despreciable",
          "Riesgo bajo",
          "Riesgo medio",
          "Riesgo alto",
          "Riesgo muy alto"
        ],
        colors: colors,
        datasetOverride: [],
        options: {
          legend: {
            display: true,
            position: "bottom"
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  steps: 10
                }
              }
            ],
            yAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  steps: 10
                }
              }
            ]
          }
        },
        typeGraphic: typeGraphic1
      };
      let totales = {};
      arraydata.forEach(function(k, v) {
        totales[k[0].Grupo] = 0;
        data.labels.push(k[0].Grupo);
        data.data1[0].push(0);
        data.data1[1].push(0);
        data.data1[2].push(0);
        data.data1[3].push(0);
        data.data1[4].push(0);
        data.data[0].push(0);
        data.data[1].push(0);
        data.data[2].push(0);
        data.data[3].push(0);
        data.data[4].push(0);
        k.forEach(function(k1, v1) {
          totales[k[0].Grupo] += k1.countData.sum;
        });
      });
      arraydata.forEach(function(k, v) {
        k.forEach(function(k1, v1) {
          data.data1[series[k1.SubGrupo]][v] += k1.countData.sum;
          data.data[series[k1.SubGrupo]][v] =
            Math.round(
              (data.data1[series[k1.SubGrupo]][v] / totales[k[0].Grupo]) *
                100 *
                100
            ) / 100;
        });
      });
      this.datafactores = data;
      this.cambio++;
    },
    transformData() {
      this.dataSave.sexo = this.creapie(this.data["SEXO"]);
      this.dataSave.edad = this.creaHorizontalBar(this.data["EDAD"], [
        "#10ddc2"
      ]);
      this.dataSave.estadoCivil = this.creaHorizontalBar(
        this.data["ESTADO CIVIL"],
        ["#f76262"]
      );
      this.dataSave.nivelEducativo = this.creapie(
        this.data["NIVEL  EDUCATIVO"]
      );
      this.dataSave.cabezaFamilia = this.creaBar(
        this.data["CABEZA DE FAMILIA"],
        ["#aee7e8"]
      );
      this.dataSave.personasCargo = this.creaBar(
        this.data["PERSONAS A CARGO"],
        ["#28c3d4"]
      );
      this.dataSave.tipoVivienda = this.creapie(this.data["TIPO DE VIVIENDA"]);
      this.dataSave.estratoVivienda = this.creaHorizontalBar(
        this.data["ESTRATO VIVIENDA"],
        ["#fbc99d"]
      );
      this.dataSave.casosCriticos = this.creapie(this.data["CASOS CRÍTICOS"]);
      this.creaFactores("totalfactores");
    }
  },
  components: {
    yGraph
  }
};
</script>

<style lang='scss' scoped>
.icon-lista {
  vertical-align: bottom;
}
</style>