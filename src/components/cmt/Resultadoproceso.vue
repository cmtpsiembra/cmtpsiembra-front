<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-2">
          <div class="box">
            <h1 class="title is-6">Lista de Cédulas</h1>
            <div class="field has-addons">
              <p class="control">
                <button class="button is-small" @click="selectAspirants(true)">
                  <span>Todos</span>
                </button>
              </p>
              <p class="control">
                <button class="button is-small" @click="selectAspirants(false)">
                  <span>Ninguno</span>
                </button>
              </p>
            </div>

            <table style="width: 100%">
              <tbody>
                <tr v-for="(item, index) in aspirantes" :key="index">
                  <td :style="styletable(item)" class="tdtableaspirantes">
                    <label class="checkbox">
                      <input
                        v-model="item.select"
                        type="checkbox"
                        @click="chengeapirantselect"
                      />
                    </label>
                  </td>
                  <td
                    class="fontMono has-text-right tdtableaspirantes"
                    :style="styleaspirantetop(item)"
                    @mouseleave="showname(item)"
                    @mouseover="hidename(item)"
                  >
                    <small>{{ item.shownameorcedula | textcedula() }}</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="column is-10">
          <div class="box">
            <div class="columns">
              <div class="column is-1"><h1 class="title is-6">Top 10</h1></div>
              <div class="column">
                <div class="field is-grouped">
                  <div class="control">
                    <div class="select is-small">
                      <select @change="changefiltro()" v-model="filtroselected">
                        <option :value="null">Filtros</option>
                        <option
                          v-for="(item, index) in filtros"
                          :key="index"
                          :value="item"
                        >
                          {{ item.nombre }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <p class="control">
                    <button class="button is-light is-small" @click="print">
                      <span class="icon">
                        <span class="material-icons"> print </span>
                      </span>
                      <span>&nbsp;Imprmir</span>
                    </button>
                  </p>
                  <p class="control">
                    <a class="button is-dark is-small" @click="download">
                      <span class="icon">
                        <span class="material-icons"> file_download </span>
                      </span>
                      <span>&nbsp;Descargar</span>
                    </a>
                  </p>
                  <p class="control">
                    <a class="button is-primary is-small" @click="irprocesos()">
                      <span class="icon">
                        <span class="material-icons"> arrow_back_ios </span>
                      </span>
                      <span>Volver a procesos</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <y-graph
              :datagraph="datagraph"
              :height="50"
              :cambio="cambio"
            ></y-graph>
          </div>
          <div class="columns">
            <div class="column">
              <div class="box">
                <h1 class="title is-7">Condiciones motivacionales internas</h1>
                <div class="inputDiv">
                  <small class="namecategory">Logro (LOG):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['LOG']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Poder (POD):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['POD']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Afiliación (AFI):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['AFI']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Auto-Realización (A-R):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['A-R']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Reconocimiento (REC):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['REC']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div class="box">
                <h1 class="title is-7">Medio preferido para retribución</h1>
                <div class="inputDiv">
                  <small class="namecategory"
                    >Dedicación a la tarea (DT):</small
                  >
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['DT']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Aceptación Autoridad (AA):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['AA']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory"
                    >Aceptación Norma y Valores (ANV):</small
                  >
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['ANV']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Requisición (REQ):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['REQ']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Expectación (EXP):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['EXP']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div class="box">
                <h1 class="title is-7">Condiciones motivacionales externas</h1>
                <div class="inputDiv">
                  <small class="namecategory">Supervisión (SUP):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['SUP']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Grupo trabajo (GT):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['GT']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Contenido (CT):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['CT']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Salario (SAL):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['SAL']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Promoción (PRO):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['PRO']"
                    style="width: 100%"
                    type="range"
                    value="127"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div class="box">
                <h1 class="title is-7">Factores segundo orden</h1>
                <div class="inputDiv">
                  <small class="namecategory"
                    >Orientación al éxito (OEX):</small
                  >
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['OEX']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory"
                    >Orientación a la tarea (OTA):</small
                  >
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['OTA']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Adaptibilidad (ADP):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['ADP']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Internalidad (INT)</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['INT']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
                <div class="inputDiv">
                  <small class="namecategory">Externalidad (EXT):</small>
                  <br /><br />
                  <input
                    @change="changeslider"
                    v-model="slider['EXT']"
                    style="width: 100%"
                    type="range"
                    min="0"
                    max="255"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="box">
                <y-parallel
                  :datagraph="aspirantes"
                  :cambiop="cambiop"
                  @returndata="datareturned"
                ></y-parallel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <y-footer></y-footer>
  </section>
</template>

<script>
import { mapState } from "vuex";
import apiServices from "@/services/yungol-services";
import yGraph from "@/components/dashboard/Graph2.vue";
import yFooter from "@/components/core/Footer.vue";
import yParallel from "@/components/dashboard/Parcoordsv2.vue";
import functiongraph from "@/helpers/graph.js";
export default {
  data() {
    return {
      filtroselected: null,
      filtros: [],
      slider: {
        LOG: 127,
        POD: 127,
        AFI: 127,
        "A-R": 127,
        REC: 127,
        DT: 127,
        AA: 127,
        ANV: 127,
        REQ: 127,
        EXP: 127,
        SUP: 127,
        GT: 127,
        CT: 127,
        SAL: 127,
        PRO: 127,
        OEX: 127,
        OTA: 127,
        ADP: 127,
        INT: 127,
        EXT: 127,
      },
      dataforScore: [],
      datatop10: [],
      aspirantes: [],
      proceso: {},
      grupocup: {},
      datagraph: {},
      colors: [
        "#FFCE00",
        "#00bffe",
        "#FF8F57",
        "#3273DC",
        "#10ddc2",
        "#e85251",
        "#3273DC",
        "#23D160",
        "#ff3860",
        "#703ef5",
      ],
      cambio: 0,
      cambiop: 0,
      vName: [
        "Logro",
        "Poder",
        "Afiliación",
        "Auto-Realización",
        "Reconocimiento",
        "Dedicación a la tarea",
        "Aceptación autoridad",
        "Aceptación normas y valores",
        "Requisición",
        "Expectación",
        "Supervisión",
        "Grupo de trabajo",
        "Contenido de trabajo",
        "Salario",
        "Promoción",
        "Orientación al éxito",
        "Orientación a la tarea",
        "Adaptabilidad social",
        "Internalidad",
        "Externalidad",
      ],
      vName1: {
        Logro: "LOG",
        Poder: "POD",
        Afiliación: "AFI",
        "Auto-Realización": "A-R",
        Reconocimiento: "REC",
        "Dedicación a la tarea": "DT",
        "Aceptación autoridad": "AA",
        "Aceptación normas y valores": "ANV",
        Requisición: "REQ",
        Expectación: "EXP",
        Supervisión: "SUP",
        "Grupo de trabajo": "GT",
        "Contenido de trabajo": "CT",
        Salario: "SAL",
        Promoción: "PRO",
        "Orientación al éxito": "OEX",
        "Orientación a la tarea": "OTA",
        "Adaptabilidad social": "ADP",
        Internalidad: "INT",
        Externalidad: "EXT",
      },
      vNameAbv: [
        "LOG",
        "POD",
        "AFI",
        "A-R",
        "REC",
        "DT",
        "AA",
        "ANV",
        "REQ",
        "EXP",
        "SUP",
        "GT",
        "CT",
        "SAL",
        "PRO",
        "OEX",
        "OTA",
        "ADP",
        "INT",
        "EXT",
      ],
    };
  },
  computed: {
    ...mapState(["isOculto", "isMovil"]),
    routestateid() {
      return this.$route.params.liderid;
    },
    puntuaciontotal() {
      return this.dataLider.datos.relacion.ponderados.totalLiderd.t;
    },
    puntuaciontotal2() {
      return this.dataLider.datos.matricial.ponderados.totalLiderd.t;
    },
  },
  methods: {
    irprocesos() {
      this.$router.replace({ name: "cmtprocesos" });
    },
    async download() {
      try {
        let result;
        const procesoid = this.$route.params.procesoid;
        result = await apiServices.post(
          `/downdataaspirantes`,
          { procesoid },
          { responseType: "blob" }
        );
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(`download`, `test.xlsx`); // or any other extension
        document.body.appendChild(link);
        link.click();
      } catch (e) {
        console.log(e);
      }
    },
    print() {
      console.log("ejecuta imprimir");
      const _this = this;
      if (this.isOculto) {
        this.$store.commit("ocultarSide");
        setTimeout(() => {
          window.print();
          _this.$store.commit("ocultarSide");
        }, 200);
      } else {
        window.print();
      }
    },
    changefiltro() {
      const _this = this;
      if (this.filtroselected) {
        for (let index in this.vNameAbv) {
          const nameabv = _this.vNameAbv[index];
          _this.slider[nameabv] = _this.filtroselected.filtros[nameabv].peso;
        }
      } else {
        for (let index in this.vNameAbv) {
          const nameabv = _this.vNameAbv[index];
          _this.slider[nameabv] = 127;
        }
      }
      this.grafica();
    },
    changeslider() {
      const _this = this;
      setTimeout(function () {
        _this.grafica();
      }, 50);
    },
    styleaspirantetop(aspirante) {
      const _this = this;
      let returned;
      for (let index = 0; index < this.datatop10.length; index++) {
        if (aspirante._id === _this.datatop10[index]._id) {
          const color = functiongraph.hexToRgbA2(aspirante.color);
          returned = `background-color:${color}`;
          break;
        }
      }
      return returned;
    },
    styletable(aspirante) {
      const color = functiongraph.hexToRgbA2(aspirante.color);
      return `background-color:${color}`;
    },
    selectAspirants(valor) {
      const _this = this;
      for (let index = 0; index < this.aspirantes.length; index++) {
        _this.aspirantes[index].select = valor;
      }
      this.chengeapirantselect();
    },
    chengeapirantselect() {
      const _this = this;
      setTimeout(function () {
        _this.cambiop++;
        _this.dataforScore = [];
        _this.grafica();
      }, 50);
    },
    datareturned(data) {
      this.dataforScore = data.data;
      this.grafica();
    },
    calculaEstandar(d) {
      const _this = this;
      const returned = {};
      for (let index = 0; index < this.vName.length; index++) {
        let abv = _this.vNameAbv[index].toLowerCase();
        if (abv === "a-r") abv = "ar";
        const PD = parseFloat(d[_this.vName[index]]);
        const abvdesv = `${abv}Des`;
        const abvmed = `${abv}Med`;
        const desv = _this.grupocup[abvdesv];
        const prom = _this.grupocup[abvmed];
        let PE = (10 / desv) * PD - ((10 / desv) * prom - 50);
        returned[_this.vName[index]] = PE;
      }
      return returned;
    },
    score(aspirante) {
      const _this = this;
      let divider = 0;
      let valor = 0;
      for (let index in this.vNameAbv) {
        divider += parseFloat(_this.slider[this.vNameAbv[index]]);
      }
      for (let index in this.vNameAbv) {
        let nvar = _this.vNameAbv[index];
        valor +=
          parseFloat(aspirante[nvar] * _this.slider[this.vNameAbv[index]]) /
          divider;
      }
      return valor;
    },
    takecolor(index) {
      const lengthcolor = this.colors.length;
      let indexcalc = menos(index);
      function menos(d) {
        if (d >= lengthcolor) {
          return d - lengthcolor;
        } else {
          return d;
        }
      }
      if (indexcalc < lengthcolor) {
        return this.colors[indexcalc];
      } else {
        indexcalc = this.takecolor(indexcalc);
      }
    },
    grafica() {
      const _this = this;
      const dataparagrafica = {
        typeGraphic: "bar", // typeGraphic: "horizontalBar",bar
        options: {
          scales: {
            yAxes: [
              {
                // gridLines: {
                //   lineWidth: 0,
                //   color: "#FF0000",
                // },
                ticks: {
                  beginAtZero: true,
                  steps: 20,
                },
              },
            ],
          },
          legend: { position: "bottom", display: false },
        },
        colors: [
          "#FFCE00",
          "#00bffe",
          "#FF8F57",
          "#3273DC",
          "#10ddc2",
          "#e85251",
          "#3273DC",
          "#23D160",
          "#ff3860",
          "#703ef5",
        ],
        datasetOverride: [],
        series: ["Puntuación"],
        labels: [
          "Cedula1",
          "Cedula2",
          "Cedula3",
          "Cedula4",
          "Cedula5",
          "Cedula6",
          "Cedula7",
          "Cedula 8",
          "Cedula 9",
          "Cedula10",
        ],
        labels2: [],
        data: [[65.6, 57.1, 63.4, 58, 62.6, 55, 45, 67, 38, 50]],
      };
      const toGraph = [];
      if (this.dataforScore.length === 0) {
        this.dataforScore = [];
        for (let index in this.aspirantes) {
          const aspirante = _this.aspirantes[index];
          if (aspirante.select) {
            const d = {
              color: aspirante.color,
              _id: aspirante._id,
              name: aspirante.name,
              cedula: aspirante.cedula,
            };
            for (let index in aspirante.resultadoscalculados) {
              d[_this.vName1[index]] = aspirante.resultadoscalculados[index];
            }
            _this.dataforScore.push(d);
          }
        }
      }
      for (let index in this.dataforScore) {
        const aspirante = _this.dataforScore[index];
        const d = {
          _id: aspirante._id,
          color: aspirante.color,
          name: aspirante.name,
          cedula: aspirante.cedula,
          score: _this.score(aspirante),
        };
        toGraph.push(d);
      }

      toGraph.sort(function (a, b) {
        return b.score - a.score;
      });
      const toGraphOrder = [];
      dataparagrafica.labels = [];
      dataparagrafica.data = [[]];
      dataparagrafica.colors = [];
      for (let index = 0; index < toGraph.length; index++) {
        const aspirante = toGraph[index];
        toGraphOrder.push(aspirante);
        dataparagrafica.labels.push(aspirante.cedula);
        dataparagrafica.labels2.push(aspirante.name);
        dataparagrafica.data[0].push(aspirante.score);
        dataparagrafica.colors.push(aspirante.color);
        if (index === 9) {
          break;
        }
      }
      this.datatop10 = JSON.parse(JSON.stringify(toGraphOrder));
      this.datagraph = JSON.parse(JSON.stringify(dataparagrafica));
      this.cambio++;
    },
    hidename(aspirante) {
      aspirante.shownameorcedula = aspirante.cedula;
    },
    showname(aspirante) {
      aspirante.shownameorcedula = aspirante.name;
    },
    async findDataProceso() {
      try {
        const _this = this;
        const procesoid = this.$route.params.procesoid;
        const result = await apiServices.get(`/aspirantescmt2/${procesoid}`);
        if (result.data) {
          this.proceso = result.data.proceso;
          this.grupocup = JSON.parse(JSON.stringify(result.data.grupocup));
          this.filtros = result.data.filtros;
          const iterables = [
            "oexMed",
            "oexDes",
            "oexCan",
            "otaMed",
            "otaDes",
            "otaCan",
            "adpMed",
            "adpDes",
            "adpCan",
            "intMed",
            "intDes",
            "intCan",
            "extMed",
            "extDes",
            "extCan",
          ];
          let datagrupocup = JSON.parse(
            JSON.stringify(result.data.segundoorden)
          );
          for (let index in iterables) {
            const iterable = iterables[index];
            _this.grupocup[iterable] = datagrupocup[iterable];
          }
          for (let index in result.data.aspirantes) {
            const aspirante = result.data.aspirantes[index];
            const d = {
              color: _this.takecolor(index),
              _id: aspirante._id,
              select: true,
              cedula: aspirante.cedula,
              name: `${aspirante.nombreUno} ${
                aspirante.nombreDos ? aspirante.nombreDos : ""
              } ${aspirante.apellidoUno ? aspirante.apellidoUno : ""}`,
              resultadosBrutos: aspirante.resultadosBrutos,
              resultadoscalculados: _this.calculaEstandar(
                aspirante.resultadosBrutos
              ),
              shownameorcedula: `${aspirante.nombreUno} ${
                aspirante.nombreDos ? aspirante.nombreDos : ""
              } ${aspirante.apellidoUno ? aspirante.apellidoUno : ""}`,
            };
            _this.aspirantes.push(d);
          }
          this.cambiop++;
          this.grafica();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.findDataProceso();
  },
  components: {
    yGraph,
    yFooter,
    yParallel,
  },
};
</script>

<style lang="scss" scoped>
@media print {
  input[type="range"] {
    appearance: auto !important;
    display: block;
    width: 100%;
  }
}
.tdtableaspirantes {
  padding: 5px;
}
.namecategory {
  font-size: 11px;
}
.inputDiv {
  width: 100%;
  line-height: 12px;
  margin: 15px auto;
  // position: relative;
}

input[type="range"] {
  display: block;
  width: 100%;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"],
input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  // background-color: #00bffe;
  background-color: #274252;
  width: 20px;
  height: 20px;
  border: 3px solid rgb(255, 255, 255);
  border-radius: 50%;
  margin-top: -9px;
}

input[type="range"]::-moz-range-thumb {
  // background-color: #00bffe;
  background-color: #274252;
  width: 15px;
  height: 15px;
  border: 3px solid rgb(255, 255, 255);
  border-radius: 50%;
}

input[type="range"]::-ms-thumb {
  // background-color: #00bffe;
  background-color: #274252;
  width: 20px;
  height: 20px;
  border: 3px solid rgb(255, 255, 255);
  border-radius: 50%;
}

input[type="range"]::-webkit-slider-runnable-track {
  background-color: #b1b1b1;
  // background-color: #00bffe;
  height: 3px;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  outline: none;
}

input[type="range"]::-moz-range-track {
  background-color: #b1b1b1;
  // background-color: #00bffe;
  height: 3px;
}

input[type="range"]::-ms-track {
  background-color: #b1b1b1;
  // background-color: #00bffe;
  height: 3px;
}

input[type="range"]::-ms-fill-lower {
  background-color: HotPink;
}

input[type="range"]::-ms-fill-upper {
  background-color: black;
}
</style>