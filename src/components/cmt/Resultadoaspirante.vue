<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8">
          <h1 class="title is-4">
            Perfil motivacional de {{ aspirante.nombreUno }}
            {{ aspirante.nombreDos }} {{ aspirante.apellidoUno }}
            {{ aspirante.apellidoDos }}
          </h1>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button class="button is-info" @click="print">
                <span class="icon">
                  <span class="material-icons"> print </span>
                </span>
                <span>Imprimir</span>
              </button>
            </div>
            <div class="control">
              <button class="button is-link" @click="iraspirantes()">
                <span class="icon">
                  <span class="material-icons"> arrow_back_ios </span>
                </span>
                <span>Volver a Aspirantes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="box">
            <h1 class="title is-5">Condiciones Motivacionales Internas</h1>
            <y-graph
              :datagraph="datagraph1"
              :height="50"
              :cambio="cambio1"
            ></y-graph>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="box">
            <h1 class="title is-5">
              Medios preferidos para obtener retribuciones deseadas en el
              trabajo
            </h1>
            <y-graph
              :datagraph="datagraph2"
              :height="50"
              :cambio="cambio2"
            ></y-graph>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="box">
            <h1 class="title is-5">Condiciones Motivacionales Externas</h1>
            <y-graph
              :datagraph="datagraph3"
              :height="50"
              :cambio="cambio3"
            ></y-graph>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="box">
            <h1 class="title is-5">Factores de segundo orden</h1>
            <y-graph
              :datagraph="datagraph4"
              :height="50"
              :cambio="cambio4"
            ></y-graph>
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
import yGraph from "@/components/dashboard/Graph1.vue";
import yFooter from "@/components/core/Footer.vue";
export default {
  data() {
    return {
      aspirante: {},
      grupocup: {},
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
      dataEstandar: {},
      datagraph1: {},
      datagraph2: {},
      datagraph3: {},
      datagraph4: {},
      cambio1: 0,
      cambio2: 0,
      cambio3: 0,
      cambio4: 0,
    };
  },
  computed: {
    ...mapState(["isOculto", "isMovil"]),
  },
  methods: {
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
    iraspirantes() {
      this.$router.replace({
        name: "listaspirantescmt",
        params: { procesoid: this.aspirante.procesocmt._id },
      });
    },
    async findDataAspirante() {
      try {
        const _this = this;
        const aspiranteid = this.$route.params.aspiranteid;
        const result = await apiServices.get(
          `/dataaspirantecmt/${aspiranteid}`
        );
        if (result.data) {
          this.aspirante = result.data.aspirante;
          this.grupocup = JSON.parse(JSON.stringify(result.data.grupocup));
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
          this.calculaEstandar();
          this.grafica();
        }
      } catch (err) {
        console.log(err);
      }
    },
    calculaEstandar() {
      const _this = this;
      for (let index = 0; index < this.vName.length; index++) {
        let abv = _this.vNameAbv[index].toLowerCase();
        if (abv === "a-r") abv = "ar";
        const PD = parseFloat(
          _this.aspirante.resultadosBrutos[_this.vName[index]]
        );
        const abvdesv = `${abv}Des`;
        const abvmed = `${abv}Med`;
        const desv = _this.grupocup[abvdesv];
        const prom = _this.grupocup[abvmed];
        let PE = (10 / desv) * PD - ((10 / desv) * prom - 50);
        _this.dataEstandar[_this.vName[index]] = PE;
      }
    },
    grafica() {
      const _this = this;
      const dataparagrafica = {
        typeGraphic: "horizontalBar", // typeGraphic: "horizontalBar",bar
        options: {
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  steps: 10,
                },
                gridLines: {
                  lineWidth: [1, 1, 1, 1, 5, 1, 5, 1, 1, 1],
                  color: [
                    "#d5d5d5",
                    "#d5d5d5",
                    "#d5d5d5",
                    "#d5d5d5",
                    "#d5d5d5",
                    "#d5d5d5",
                    "#d5d5d5",
                    "#d5d5d5",
                    "#d5d5d5",
                    "#d5d5d5",
                  ],
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  lineWidth: 0,
                  color: "#FF0000",
                },
              },
            ],
          },
          legend: { position: "bottom", display: false },
        },
        colors: ["#36b8ba"],
        datasetOverride: [],
        series: ["Valor"],
        labels: ["Girardota", "Copacabana", "Rionegro", "Medellin", "Bello"],
        data: [[65.6, 57.1, 63.4, 58, 62.6]],
      };
      const intercambio = {
        "                      Auto-Realización": "Auto-Realización",
        "               Contenido de trabajo": "Contenido de trabajo",
        "               Orientación a la tarea": "Orientación a la tarea",
      };
      this.datagraph1 = JSON.parse(JSON.stringify(dataparagrafica));
      this.datagraph2 = JSON.parse(JSON.stringify(dataparagrafica));
      this.datagraph3 = JSON.parse(JSON.stringify(dataparagrafica));
      this.datagraph4 = JSON.parse(JSON.stringify(dataparagrafica));

      this.datagraph1.labels = [
        "Logro",
        "Poder",
        "Afiliación",
        "                      Auto-Realización",
        "Reconocimiento",
      ];
      this.datagraph2.labels = [
        "Dedicación a la tarea",
        "Aceptación autoridad",
        "Aceptación normas y valores",
        "Requisición",
        "Expectación",
      ];
      this.datagraph3.labels = [
        "Supervisión",
        "Grupo de trabajo",
        "               Contenido de trabajo",
        "Salario",
        "Promoción",
      ];
      this.datagraph4.labels = [
        "Orientación al éxito",
        "               Orientación a la tarea",
        "Adaptabilidad social",
        "Internalidad",
        "Externalidad",
      ];
      const dat1 = [];
      const dat2 = [];
      const dat3 = [];
      const dat4 = [];

      _this.datagraph1.data = [];
      _this.datagraph1.colors = ["#ffd0b9"];
      _this.datagraph2.data = [];
      _this.datagraph2.colors = ["#ffae86"];
      _this.datagraph3.data = [];
      _this.datagraph3.colors = ["#FF8F57"];
      _this.datagraph4.data = [];
      _this.datagraph4.colors = ["#fa7026"];

      for (let index in this.datagraph1.labels) {
        const label = _this.datagraph1.labels[index];
        dat1.push(
          intercambio[label]
            ? _this.dataEstandar[intercambio[label]]
            : _this.dataEstandar[label]
        );
      }
      _this.datagraph1.data.push(dat1);

      for (let index in this.datagraph2.labels) {
        const label = _this.datagraph2.labels[index];
        dat2.push(
          intercambio[label]
            ? _this.dataEstandar[intercambio[label]]
            : _this.dataEstandar[label]
        );
      }
      _this.datagraph2.data.push(dat2);

      for (let index in this.datagraph3.labels) {
        const label = _this.datagraph3.labels[index];
        dat3.push(
          intercambio[label]
            ? _this.dataEstandar[intercambio[label]]
            : _this.dataEstandar[label]
        );
      }
      _this.datagraph3.data.push(dat3);

      for (let index in this.datagraph4.labels) {
        const label = _this.datagraph4.labels[index];
        dat4.push(
          intercambio[label]
            ? _this.dataEstandar[intercambio[label]]
            : _this.dataEstandar[label]
        );
      }
      _this.datagraph4.data.push(dat4);

      _this.cambio1++;
      _this.cambio2++;
      _this.cambio3++;
      _this.cambio4++;
    },
  },
  created() {
    this.findDataAspirante();
  },
  components: {
    yGraph,
    yFooter,
  },
};
</script>