<template>
  <section>
    <div>
      <section class="section">
        <div class="container">
          <h1 class="title">Datos para FRS</h1>
          <h2 class="subtitle">
            En este menú podra cargar los datos de Factores de Riesgo
            Psicosocial.
          </h2>
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
          <!-- <button class="button is-info" @click="traeData">Boton para borrar... trae data</button> -->
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
        <section class="hero is-primary is-medium">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">{{ empresa.nombre }}</h1>
              <h2 class="subtitle">Factores de Riesgo Psicosocial</h2>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="container">
            <h1 class="title is-4">Perfil Socio Demográfico</h1>
            <div
              class="columns"
              v-for="(k, v) in demograficos.list.arraycolumns"
              :key="v"
            >
              <div class="column">
                <div class="box">
                  <h1 class="subtitle is-6">
                    {{ demograficos.list.modificado[v * 2] }}
                  </h1>
                  <y-graph
                    :datagraph="demograficos[demograficos.list.original[v * 2]]"
                    :cambio="0"
                  ></y-graph>
                </div>
              </div>
              <div class="column">
                <div class="box" v-if="demograficos.list.modificado[v * 2 + 1]">
                  <h1 class="subtitle is-6">
                    {{ demograficos.list.modificado[v * 2 + 1] }}
                  </h1>
                  <y-graph
                    :datagraph="
                      demograficos[demograficos.list.original[v * 2 + 1]]
                    "
                    :cambio="0"
                  ></y-graph>
                </div>
              </div>
            </div>
            <hr />
            <h1 class="title is-4">FACTORES PSICOSOCIALES</h1>
            <div class="box">
              <div class="buttons is-centered">
                <span
                  v-for="(k, v) in riesgos.numeros"
                  :key="v"
                  class="button is-light tooltip"
                  :data-tooltip="traetitulo(k)"
                  @click="rotagrafica(k)"
                  >{{ k }}</span
                >
              </div>
              <div v-if="datafactores">
                <h1 class="subtitle is-6">{{ titulo }}</h1>
                <y-graph :datagraph="datafactores" :cambio="cambio"></y-graph>
                <div class="table-container">
                  <table class="table">
                    <tr>
                      <td>Nivel</td>
                      <td v-for="(k, v) in datafactores.labels" :key="v">
                        {{ k }}
                      </td>
                    </tr>
                    <tr v-for="(k, v) in datafactores.data" :key="v">
                      <td>
                        <span>
                          <i
                            class="material-icons icon-lista"
                            :style="{ color: datafactores.colors[v] }"
                            >crop_din</i
                          >
                        </span>
                        {{ datafactores.series[v] }}
                      </td>
                      <td v-for="(k1, v1) in k" :key="v1">
                        {{ datafactores.data1[v][v1] }} | {{ k1 }}%
                      </td>
                    </tr>
                  </table>
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
      graficasaguardar: [],
      cambio: 0,
      datafactores: null,
      titulo: null,
      frsupload: {
        nombre: "",
        url: "",
      },
      demograficos: {
        list: {
          original: [],
          modificado: [],
          length: 0,
          lengthmitad: 0,
          arraycolumns: [],
        },
      },
      riesgos: {
        numeros: [],
      },
      horizontal: false,
    };
  },
  computed: {
    ...mapState(["idtoken", "empresa"]),
  },
  methods: {
    rotagrafica(k) {
      if (this.horizontal) {
        this.horizontal = false;
        this.creaFactores(k, "horizontalBar");
      } else {
        this.horizontal = true;
        this.creaFactores(k);
      }
    },
    async savefrs() {
      const _this = this;
      try {
        const result = await apiServices.post(`/savefrs`, _this.frsupload);
        if (result.data) {
          await this.guardarGrafica2(result.data._id); // Aqui utiliza la funcion
          const plantilla = await apiServices.post(`/createreportfrs`, {
            _id: result.data._id,
            name: _this.frsupload.nombre,
          });
          _this.data = null;
          _this.frsupload.nombre = "";
          _this.frsupload.url = "";
          console.log("plantilla", plantilla);
          this.$store.dispatch("notify", {
            message: "Perfecto!. Informe Guardado.",
          });
        }
      } catch (err) {
        console.log("ocurrio un error", err);
      }
    },
    async guardarGrafica2(id) {
      // aqui creamos la funcion
      const _this = this;
      let result;
      const promises = [];
      try {
        _this.graficasaguardar.forEach((grafica) => {
          // grafica es cada una de las graficas que vamos a guardar pero cuando las creaste no tenian la propiedad viewfrs
          grafica.viewfrs = id;
          promises.push(apiServices.post(`/partes`, grafica));
        });
        result = await Promise.all(promises);
        if (result.data) {
          this.$store.dispatch("notify", {
            message: "Perfecto!. Todas las graficas fueron guardadas.",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    traetitulo(k) {
      const length = this.riesgos[k].original.length;
      return this.riesgos[k].modificado[length - 1];
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
          (snapshot) => {
            const porcentaje =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (porcentaje > 10) {
              _this.avaceupload = porcentaje;
            }
          },
          (err) => {
            console.log("error subiendo el archivo", err);
          },
          async () => {
            try {
              const url = await task.snapshot.ref.getDownloadURL();
              _this.avaceupload = 0;
              _this.frsupload.url = url;
              const data = {
                url: url,
              };
              const result = await apiServices.post(`/leefileexcel`, data);
              if (result.data) {
                _this.data = result.data;
                _this.data.grupos.forEach((k) => {
                  if (k.substr(0, 4) === "DEM-") {
                    _this.demograficos.list.original.push(k);
                    _this.demograficos.list.modificado.push(
                      k.substr(6, k.length)
                    );
                    _this.demograficos.list.length =
                      _this.demograficos.list.original.length;
                    _this.demograficos.list.lengthmitad = Math.ceil(
                      _this.demograficos.list.length / 2
                    );
                    _this.demograficos.list.arraycolumns = [];
                    for (
                      let i = 0;
                      i < _this.demograficos.list.lengthmitad;
                      i++
                    ) {
                      _this.demograficos.list.arraycolumns.push(i);
                    }
                  }
                  if (k.substr(0, 4) === "RGO-") {
                    if (_this.riesgos.numeros.indexOf(k.substr(4, 2)) === -1) {
                      _this.riesgos.numeros.push(k.substr(4, 2));
                      _this.riesgos[k.substr(4, 2)] = {
                        original: [],
                        modificado: [],
                      };
                      _this.riesgos[k.substr(4, 2)].original.push(k);
                      _this.riesgos[k.substr(4, 2)].modificado.push(
                        k.substr(7, k.length)
                      );
                    } else {
                      _this.riesgos[k.substr(4, 2)].original.push(k);
                      _this.riesgos[k.substr(4, 2)].modificado.push(
                        k.substr(7, k.length)
                      );
                    }
                  }
                });
                _this.riesgos.numeros.sort();
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
          "https://firebasestorage.googleapis.com/v0/b/cincel-83343.appspot.com/o/excel%2F1587154396097-DURATEX%20FPS%202020%20-%20DATOS%202018%20y%202020.xlsx?alt=media&token=fa9fa494-311c-4f6d-b09d-c4f8675185e8",
      };
      try {
        const result = await apiServices.post(`/leefileexcel`, data);
        if (result.data) {
          _this.data = result.data;
          _this.data.grupos.forEach((k) => {
            if (k.substr(0, 4) === "DEM-") {
              _this.demograficos.list.original.push(k);
              _this.demograficos.list.modificado.push(k.substr(6, k.length));
              _this.demograficos.list.length =
                _this.demograficos.list.original.length;
              _this.demograficos.list.lengthmitad = Math.ceil(
                _this.demograficos.list.length / 2
              );
              _this.demograficos.list.arraycolumns = [];
              for (let i = 0; i < _this.demograficos.list.lengthmitad; i++) {
                _this.demograficos.list.arraycolumns.push(i);
              }
            }
            if (k.substr(0, 4) === "RGO-") {
              if (_this.riesgos.numeros.indexOf(k.substr(4, 2)) === -1) {
                _this.riesgos.numeros.push(k.substr(4, 2));
                _this.riesgos[k.substr(4, 2)] = {
                  original: [],
                  modificado: [],
                };
                _this.riesgos[k.substr(4, 2)].original.push(k);
                _this.riesgos[k.substr(4, 2)].modificado.push(
                  k.substr(7, k.length)
                );
              } else {
                _this.riesgos[k.substr(4, 2)].original.push(k);
                _this.riesgos[k.substr(4, 2)].modificado.push(
                  k.substr(7, k.length)
                );
              }
            }
          });
          _this.riesgos.numeros.sort();
          this.transformData();
          this.frsupload.url = data.url;
        }
      } catch (err) {
        console.log("ocurrio un error", err);
      }
    },
    selGrupo(d) {
      this.dataSel = this.data[d];
    },
    creapie(d) {
      // const _this = this;
      console.log("el el en el pie es ", d);
      const data = {
        data: [],
        labels: [],
        series: [],
        options: {
          legend: {
            display: true,
            position: "right",
          },
        },
        typeGraphic: "pie",
      };
      data.data.push([]);
      d.forEach((el) => {
        if (el.SubGrupo) {
          data.data[0].push(el.countData.sum);
          data.labels.push(el.SubGrupo);
        }
      });
      const grafica1 = {
        datos: data,
        viewfrs: "",
        tipografica: data.typeGraphic,
        nombre: d[0].Grupo.substr(6, d[0].Grupo.length),
      };
      this.graficasaguardar.push(grafica1);
      console.log("esta es mi grafica johan a guardar", this.graficasaguardar);
      return data;
    },
    creaHorizontalBar(d, colors) {
      // const _this = this;
      const data = {
        data: [],
        labels: [],
        series: ["Personas"],
        colors: colors,
        datasetOverride: [],
        options: {
          legend: {
            display: false,
            position: "right",
          },
        },
        typeGraphic: "horizontalBar",
      };
      data.data.push([]);
      d.forEach((el) => {
        if (el.SubGrupo) {
          data.data[0].push(el.countData.sum);
          data.labels.push(el.SubGrupo);
        }
      });
      const grafica1 = {
        datos: data,
        viewfrs: "",
        tipografica: data.typeGraphic,
        nombre: d[0].Grupo.substr(6, d[0].Grupo.length),
      };
      this.graficasaguardar.push(grafica1);
      console.log("esta es mi grafica johan a guardar", this.graficasaguardar);
      return data;
    },
    creaBar(d, colors) {
      // const _this = this;
      const data = {
        data: [],
        labels: [],
        series: ["Personas"],
        colors: colors,
        datasetOverride: [],
        options: {
          legend: {
            display: false,
            position: "right",
          },
          scales: {
            yAxes: [
              {
                ticks: { beginAtZero: true },
              },
            ],
          },
        },
        typeGraphic: "bar",
      };
      data.data.push([]);
      d.forEach((el) => {
        if (el.SubGrupo) {
          data.data[0].push(el.countData.sum);
          data.labels.push(el.SubGrupo);
        }
      });
      const grafica1 = {
        datos: data,
        viewfrs: "",
        tipografica: data.typeGraphic,
        nombre: d[0].Grupo.substr(6, d[0].Grupo.length),
      };
      this.graficasaguardar.push(grafica1);
      console.log("esta es mi grafica johan a guardar", this.graficasaguardar);
      return data;
    },
    creaFactores(frp, typeGraphic) {
      const _this = this;
      let typeGraphic1;
      let series;
      if (typeGraphic) {
        typeGraphic1 = typeGraphic;
      } else {
        typeGraphic1 = "bar";
      }
      let arraydata = [];
      _this.riesgos[frp].original.forEach(function (k) {
        arraydata.push(_this.data[k]);
      });
      const length = _this.riesgos[frp].original.length;
      _this.titulo = _this.riesgos[frp].modificado[length - 1];
      const listseries = {
        default: {
          enum: {
            "Sin riesgo o riesgo despreciable": 0,
            "Riesgo bajo": 1,
            "Riesgo medio": 2,
            "Riesgo alto": 3,
            "Riesgo muy alto": 4,
          },
          lista: [
            "Sin riesgo o riesgo despreciable",
            "Riesgo bajo",
            "Riesgo medio",
            "Riesgo alto",
            "Riesgo muy alto",
          ],
        },
        default1: {
          enum: {
            "Sin riesgo o riesgo bajo": 0,
            "Riesgo bajo": 1,
            "Riesgo medio": 2,
            "Riesgo alto": 3,
            "Riesgo muy alto": 4,
          },
          lista: [
            "Sin riesgo o riesgo bajo",
            "Riesgo bajo",
            "Riesgo medio",
            "Riesgo alto",
            "Riesgo muy alto",
          ],
        },
        frecuente: {
          enum: {
            "Poco frecuente": 0,
            "Medianamente frecuente": 1,
            Frecuente: 2,
            "Muy frecuente": 3,
            ".": 4,
          },
          lista: [
            "Poco frecuente",
            "Medianamente frecuente",
            "Frecuente",
            "Muy frecuente",
            ".",
          ],
        },
        satisfaccion: {
          enum: {
            "Satisfacción muy alta": 0,
            "Satisfacción alta": 1,
            "Satisfacción baja": 2,
            "Insatisfacción alta": 3,
            "Insatisfacción muy alta": 4,
          },
          lista: [
            "Satisfacción muy alta",
            "Satisfacción alta",
            "Satisfacción baja",
            "Insatisfacción alta",
            "Insatisfacción muy alta",
          ],
        },
        burnout: {
          enum: {
            "Presentación muy baja de síntomas o sin presencia de ellos": 0,
            ".": 1,
            "Presentación media de síntomas": 2,
            "Presentación alta de síntomas": 3,
            "Presentación muy alta de síntomas": 4,
          },
          lista: [
            "Presentación muy baja de síntomas o sin presencia de ellos",
            ".",
            "Presentación media de síntomas",
            "Presentación alta de síntomas",
            "Presentación muy alta de síntomas",
          ],
        },
        critico: {
          enum: {
            "Caso no crítico": 0,
            ".": 1,
            "Caso medianamente crítico": 2,
            "Caso crítico": 3,
            "Caso muy crítico": 4,
          },
          lista: [
            "Caso no crítico",
            ".",
            "Caso medianamente crítico",
            "Caso crítico",
            "Caso muy crítico",
          ],
        },
        protector: {
          enum: {
            "Factor protector": 0,
            "Sin riesgo o riesgo bajo": 1,
            "Riesgo medio": 2,
            "Riesgo alto": 3,
            "Riesgo muy alto": 4,
          },
          lista: [
            "Factor protector",
            "Sin riesgo o riesgo bajo",
            "Riesgo medio",
            "Riesgo alto",
            "Riesgo muy alto",
          ],
        },
        estres: {
          enum: {
            "Muy bajo": 0,
            Bajo: 1,
            Medio: 2,
            Alto: 3,
            "Muy alto": 4,
          },
          lista: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
        },
      };
      const seriescontrol = [];

      const colors = ["#239B56", "#ABEBC6", "#FFF300", "#FFC14D", "#FF3A00"];
      const data = {
        data: [[], [], [], [], []],
        data1: [[], [], [], [], []],
        labels: [],
        colors: colors,
        datasetOverride: [],
        options: {
          legend: {
            display: true,
            position: "bottom",
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  steps: 10,
                },
              },
            ],
            yAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  steps: 10,
                },
              },
            ],
          },
        },
        typeGraphic: typeGraphic1,
      };

      let totales = {};
      arraydata.forEach(function (k, v) {
        totales[k[0].Grupo] = 0;
        data.labels.push(k[0].Grupo.substr(7, k[0].Grupo.length));
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
        k.forEach(function (k1, v1) {
          if (k1.SubGrupo) {
            totales[k[0].Grupo] += k1.countData.sum;
            if (seriescontrol.indexOf(k1.SubGrupo) === -1) {
              seriescontrol.push(k1.SubGrupo);
              console.log("el grupo es", k1.Grupo);
            }
          }
        });
      });
      console.log("el seriescontrol es", seriescontrol);
      let controldefault = 0;
      let controlfrecuente = 0;
      let controlsatisfaccion = 0;
      let controlburnout = 0;
      let controlcritico = 0;
      let controlprotector = 0;
      let controldefault1 = 0;
      let controlestres = 0;

      seriescontrol.forEach(function (k) {
        if (k) {
          if (listseries.default.lista.indexOf(k) === -1) {
            console.log("el que no encuentra de default es", k);
            controldefault = 1;
          }
          if (listseries.frecuente.lista.indexOf(k) === -1) {
            console.log("el que no encuentra de frecuente es", k);
            controlfrecuente = 1;
          }
          if (listseries.satisfaccion.lista.indexOf(k) === -1) {
            console.log("el que no encuentra de satisfaccion es", k);
            controlsatisfaccion = 1;
          }
          if (listseries.burnout.lista.indexOf(k) === -1) {
            console.log("el que no encuentra de burnout es", k);
            controlburnout = 1;
          }
          if (listseries.critico.lista.indexOf(k) === -1) {
            console.log("el que no encuentra de critico es", k);
            controlcritico = 1;
          }
          if (listseries.protector.lista.indexOf(k) === -1) {
            console.log("el que no encuentra de protector es", k);
            controlprotector = 1;
          }
          if (listseries.default1.lista.indexOf(k) === -1) {
            console.log("el que no encuentra de default1 es", k);
            controldefault1 = 1;
          }
          if (listseries.estres.lista.indexOf(k) === -1) {
            console.log("el que no encuentra de default1 es", k);
            controlestres = 1;
          }
        }
      });
      console.log("el controldefault es", controldefault);
      console.log("el controlfrecuente es", controlfrecuente);
      console.log("el controlsatisfaccion es", controlsatisfaccion);
      console.log("el controlburnout es", controlburnout);
      console.log("el controlcritico es", controlcritico);
      console.log("el controlprotector es", controlprotector);
      console.log("el controldefault1 es", controldefault1);
      console.log("el controldefault1 es", controlestres);

      if (controldefault === 0) {
        series = listseries.default.enum;
        data.series = listseries.default.lista;
      } else if (controlfrecuente === 0) {
        series = listseries.frecuente.enum;
        data.series = listseries.frecuente.lista;
      } else if (controlsatisfaccion === 0) {
        series = listseries.satisfaccion.enum;
        data.series = listseries.satisfaccion.lista;
      } else if (controlburnout === 0) {
        series = listseries.burnout.enum;
        data.series = listseries.burnout.lista;
      } else if (controlcritico === 0) {
        series = listseries.critico.enum;
        data.series = listseries.critico.lista;
      } else if (controlprotector === 0) {
        series = listseries.protector.enum;
        data.series = listseries.protector.lista;
      } else if (controldefault1 === 0) {
        series = listseries.default1.enum;
        data.series = listseries.default1.lista;
      } else if (controlestres === 0) {
        series = listseries.estres.enum;
        data.series = listseries.estres.lista;
      }

      console.log("series", series);
      arraydata.forEach(function (k, v) {
        k.forEach(function (k1, v1) {
          if (k1.SubGrupo) {
            data.data1[series[k1.SubGrupo]][v] += k1.countData.sum;
            data.data[series[k1.SubGrupo]][v] =
              Math.round(
                (data.data1[series[k1.SubGrupo]][v] / totales[k[0].Grupo]) *
                  100 *
                  100
              ) / 100;
          }
        });
      });
      this.datafactores = data;
      this.cambio++;
    },
    transformData() {
      const _this = this;
      this.demograficos.list.original.forEach(function (k, v) {
        const colors = [
          ["#10ddc2"],
          ["#f76262"],
          ["#aee7e8"],
          ["#28c3d4"],
          ["#fbc99d"],
          ["#10ddc2"],
          ["#f76262"],
          ["#aee7e8"],
          ["#28c3d4"],
          ["#fbc99d"],
          ["#10ddc2"],
          ["#f76262"],
          ["#aee7e8"],
          ["#28c3d4"],
          ["#fbc99d"],
          ["#10ddc2"],
          ["#f76262"],
          ["#aee7e8"],
          ["#28c3d4"],
          ["#fbc99d"],
          ["#10ddc2"],
          ["#f76262"],
          ["#aee7e8"],
          ["#28c3d4"],
          ["#fbc99d"],
          ["#10ddc2"],
          ["#f76262"],
          ["#aee7e8"],
          ["#28c3d4"],
          ["#fbc99d"],
        ];
        if (k.substr(4, 1) === "T") {
          _this.demograficos[k] = _this.creapie(_this.data[k]);
        } else if (k.substr(4, 1) === "B") {
          _this.demograficos[k] = _this.creaBar(_this.data[k], colors[v]);
        } else if (k.substr(4, 1) === "H") {
          _this.demograficos[k] = _this.creaHorizontalBar(
            _this.data[k],
            colors[v]
          );
        } else {
          _this.demograficos[k] = _this.creaBar(_this.data[k], colors[v]);
        }
      });
      this.creaFactores("01");
    },
  },
  components: {
    yGraph,
  },
};
</script>

<style lang='scss' scoped>
.icon-lista {
  vertical-align: bottom;
}
</style>