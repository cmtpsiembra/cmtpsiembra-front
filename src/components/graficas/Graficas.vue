<template>
  <section>
    <div class="container">
      <div class="columns">
        <div class="column">
          <y-graphiccreator
            :grupos="grupos"
            :variables="variables"
            :control="control"
            @changedata="changedata"
          ></y-graphiccreator>
          <div class="container">
            <div class="field is-grouped">
              <p class="control is-expanded">
                <input
                  class="input is-large"
                  v-model="nombre"
                  type="text"
                  placeholder="Nombre de la gráfica"
                />
              </p>
              <p class="control">
                <button class="button is-info is-large" @click="guardarGrafica">
                  Guardar
                </button>
              </p>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <y-panel
            :informes="informes"
            :data="data"
            :estado="estado"
            @traedata="cargarDatos"
            @estudiosel="estudiosel"
            @groupSelected="groupSelected"
            @variableSelected="variableSelected"
            @datoSelected="datoSelected"
            @datacombinada="refreshData"
          ></y-panel>
          <!-- <y-autocomplete :placeholder="'Informe'" :items="data"></y-autocomplete> -->
        </div>
      </div>
      <section class="section">
        <div class="container">
          <span>
            <img width="100%" src="@/assets/message.png" alt="Logo" />
          </span>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import apiServices from "@/services/yungol-services";
import yPanel from "@/components/graficas/Panel.vue";
import yGraphiccreator from "@/components/graficas/Graphiccreator.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      showData: false,
      informes: null,
      data: null,
      estado: 0,
      estudios: null,
      estudio: null,
      items: [
        { id: 0, text: "Texto1" },
        { id: 1, text: "Texto2" },
        { id: 2, text: "Texto3" },
        { id: 3, text: "Texto4" },
        { id: 4, text: "Texto5" },
        { id: 5, text: "Texto6" },
      ],
      grupos: [],
      orden: [],
      variables: [],
      result: {
        dato: null,
        group: null,
        variable: null,
      },
      nombreVariables: {
        apjef: "Jefe",
        claor: "Claridad",
        train: "Trato",
        disre: "Recursos",
        aop: "Apoyo Org.",
        esta: "Estabilidad",
        retri: "Retribución",
        coher: "Coherencia",
        senpe: "Pertenencia",
        tequi: "Equipo",
        cc: "Clima",
        coop: "Cooperación",
        respo: "Responsabilidad",
        respe: "Respeto",
        est: "Estímulo",
        apoy: "Apoyo",
        parti: "Participación",
        ig: "Imagen Gerencial",
        ie: "Imagen Empresa",
        cvrel: "Imagen Relaciones",
        eng: "Engagement",
        cafec: "Compromiso Afectivo",
        ccont: "Compromiso de Continuidad",
        cnorm: "Compromiso Normativo",
        perfil: "Perfil",
        eaptra_a: "Disfrute en el trabajo",
        gratra_a: "Gratificación en el trabajo",
        sentra_a: "Sentido en el trabajo",
        eapvid_a: "Estado Afectivo Positivo en la Vida",
        gravid_a: "Gratificación en la Vida",
        senvid_a: "Sentido en la Vida",
        f_tra_a: "Felicidad en el trabajo",
        f_vid_a: "Felicidad en la Vida",
        vida_a: "",
        eaptra_b: "Disfrute en el trabajo.",
        gratra_b: "Gratificación en el trabajo.",
        sentra_b: "Sentido  en el trabajo.",
        eapvid_b: "Estado Afectivo Positivo en la Vida.",
        gravid_b: "Gratificación en la Vida.",
        senvid_b: "Sentido en la Vida.",
        f_tra_b: "Felicidad en el trabajo.",
        f_vid_b: "Felicidad en la Vida.",
        benef: "Beneficios",
        satis: "Satisfacción",
        demograficos: "Demográficos",
      },
      control: 0,
      dataAguardar: {},
      nombre: "",
    };
  },
  computed: {
    ...mapState(["idtoken", "empresa"]),
  },
  methods: {
    refreshData(d) {
      const _this = this;
      d.rows.forEach(function (k) {
        _this.data.rows.push(k);
      });
      _this.estado++;
    },
    async guardarGrafica() {
      const _this = this;
      if (!this.nombre) {
        this.$store.dispatch("notify", {
          message: "Debe agregarle un nombre a la gráfica",
          type: "is-warning",
          position: "top-center",
          duration: 5000,
        });
        return false;
      }
      const dataGuardar = {
        datos: {
          data: _this.dataAguardar.data,
          labels: _this.dataAguardar.labels,
          series: _this.dataAguardar.series,
          datasetOverride: _this.dataAguardar.datasetOverride,
          options: _this.dataAguardar.options,
          colors: _this.dataAguardar.colors,
        },
        informe: _this.data._id,
        tipografica: _this.dataAguardar.typeGraphic,
        nombre: _this.nombre,
        cliente: _this.empresa._id,
      };
      if (
        _this.estudio.nombre === "felicidad" ||
        _this.estudio.nombre === "compromiso"
      ) {
        dataGuardar.datos.isporcentaje = true;
      }
      let result;
      try {
        result = await apiServices.post(`/partes`, dataGuardar);
        if (result.data) {
          this.$store.dispatch("notify", {
            message: "Perfecto!. Gráfica guardada.",
          });
        }
        this.nombre = "";
      } catch (err) {
        console.log(err);
      }
    },
    estudiosel(p) {
      this.estudio = p;
    },
    datoSelected(p) {
      this.result.dato = p;
      this.control++;
    },
    transformaDatosFelicidad() {
      this.grupos = [];
      this.variables = [];
      const _this = this;
      const datacheck = [];
      const grupos = [];
      const gruposFelicidad = [
        {
          cod: "mb",
          nombre: "Muy Bajo",
        },
        {
          cod: "baj",
          nombre: "Bajo",
        },
        {
          cod: "med",
          nombre: "Medio",
        },
        {
          cod: "alt",
          nombre: "Alto",
        },
      ];
      this.data.rows.forEach(function (k) {
        if (k.check) {
          datacheck.push(k);
          grupos.push(k.SubGrupo);
        }
      });
      if (datacheck.length > 0) {
        gruposFelicidad.forEach(function (k2) {
          const d = {
            Grupo: "Felicidad",
            SubGrupo: k2.nombre,
          };
          datacheck.forEach(function (k) {
            const variables = Object.keys(k);
            _this.estudio.variables.forEach(function (k1) {
              if (variables.indexOf(k1) !== -1) {
                if (k[k1][k2.cod]) {
                  d[k.SubGrupo + " - " + _this.nombreVariables[k1]] = {
                    sum: k[k1][k2.cod],
                  };
                } else {
                  d[k.SubGrupo + " - " + _this.nombreVariables[k1]] = {
                    sum: 0,
                  };
                }
              }
            });
          });
          _this.grupos.push(d);
        });
      }
      const variables1 = [];
      if (this.result.variable) {
        this.result.variable.forEach(function (k) {
          if (k.check) {
            variables1.push(k.codigo);
          }
        });
        variables1.forEach(function (k) {
          grupos.forEach(function (k1) {
            const d = {
              check: true,
              cod: k1 + " - " + _this.nombreVariables[k],
            };
            _this.variables.push(d);
          });
        });
      }
    },
    transformaDatosCompromiso() {
      this.grupos = [];
      this.variables = [];
      const _this = this;
      const datacheck = [];
      const grupos = [];
      const gruposCompromiso = [
        { cod: "r1", nombre: "Completamente Comprometido" },
        { cod: "r2", nombre: "Afectivo Dominante" },
        { cod: "r3", nombre: "Afectivo - Normativo Dominante" },
        { cod: "r4", nombre: "Afectivo - Continuidad Dominante" },
        { cod: "r5", nombre: "Neutral" },
        { cod: "r6", nombre: "Normativo Dominante" },
        { cod: "r7", nombre: "Continuidad Normativo Dominante" },
        { cod: "r8", nombre: "Continuidad Dominante" },
        { cod: "r9", nombre: "No Comprometido" },
      ];
      this.data.rows.forEach(function (k) {
        if (k.check) {
          datacheck.push(k);
          grupos.push(k.SubGrupo);
        }
      });
      if (datacheck.length > 0) {
        gruposCompromiso.forEach(function (k2) {
          const d = {
            Grupo: "Compromiso",
            SubGrupo: k2.nombre,
          };
          datacheck.forEach(function (k) {
            const variables = Object.keys(k);
            _this.estudio.variables.forEach(function (k1) {
              if (k1 === "perfil") {
                if (variables.indexOf(k1) !== -1) {
                  if (k[k1][k2.cod]) {
                    d[k.SubGrupo] = {
                      sum: k[k1][k2.cod],
                    };
                  } else {
                    d[k.SubGrupo] = {
                      sum: 0,
                    };
                  }
                }
              }
            });
          });
          _this.grupos.push(d);
        });
      }

      const variables1 = [];
      if (this.result.variable) {
        this.result.variable.forEach(function (k) {
          if (k.check) {
            variables1.push(k.codigo);
          }
        });
        variables1.forEach(function (k) {
          if (k === "perfil") {
            grupos.forEach(function (k1) {
              const d = {
                check: true,
                cod: k1,
              };
              _this.variables.push(d);
            });
          }
        });
      }
    },
    transformaDatosResto() {
      this.variables = [];
      const _this = this;
      this.grupos = [];
      const grupos1 = [];
      const series = [];
      this.data.rows.forEach(function (k) {
        if (k.check) {
          if (_this.orden.indexOf(k.SubGrupo) === -1) {
            _this.orden.push(k.SubGrupo);
          }
          const d = {
            Grupo: k.Grupo,
            SubGrupo: k.SubGrupo,
          };
          _this.estudio.variables.forEach(function (k1) {
            if (k[k1] && k[k1][_this.result.dato.d]) {
              d[_this.nombreVariables[k1]] = {
                sum: k[k1][_this.result.dato.d],
              };
            } else {
              d[_this.nombreVariables[k1]] = {
                sum: 0,
              };
            }
          });
          grupos1.push(d);
          series.push(k.SubGrupo);
        }
      });
      this.orden.forEach(function (k, v) {
        if (series.indexOf(k) === -1) {
          _this.orden.splice(_this.orden.indexOf(k), 1);
        }
      });
      this.orden.forEach(function (k) {
        grupos1.forEach(function (k1) {
          if (k === k1.SubGrupo) {
            _this.grupos.push(k1);
          }
        });
      });
      if (this.result.variable) {
        this.result.variable.forEach(function (k) {
          if (k.check) {
            const d = {
              check: true,
              cod: _this.nombreVariables[k.codigo],
            };
            _this.variables.push(d);
          }
        });
      }
    },
    groupSelected(p) {
      this.result.group = p;
      if (this.estudio.nombre === "felicidad") {
        this.transformaDatosFelicidad();
        // si el estudio es de felicidad hay que hacer una transformacion de datos
      } else if (this.estudio.nombre === "compromiso") {
        if (this.result.variable) {
          let isperfil = false;
          this.result.variable.forEach(function (k) {
            if (k.codigo === "perfil" && k.check) {
              isperfil = true;
            }
          });
          if (isperfil) {
            this.transformaDatosCompromiso();
          } else {
            this.transformaDatosResto();
          }
        }
      } else {
        // si no es de felicidad ni compromiso
        this.transformaDatosResto();
      }
      this.control++;
    },
    variableSelected(p) {
      this.result.variable = p;
      if (this.estudio.nombre === "felicidad") {
        this.transformaDatosFelicidad();
      } else if (this.estudio.nombre === "compromiso") {
        if (this.result.variable) {
          let isperfil = false;
          this.result.variable.forEach(function (k) {
            if (k.codigo === "perfil" && k.check) {
              isperfil = true;
            }
          });
          if (isperfil) {
            this.transformaDatosCompromiso();
          } else {
            this.transformaDatosResto();
          }
        }
      } else {
        this.transformaDatosResto();
      }
      this.control++;
    },
    async traeInformes(_this) {
      let result;
      try {
        result = await apiServices.get(`/informeslist`);
        _this.informes = result.data;
        _this.informes.forEach((e) => {
          e.text = e.nombre;
        });
      } catch (err) {
        console.log(err);
      }
    },
    async traeData(_this, informeid) {
      let result;
      try {
        result = await apiServices.get(`/informes/${informeid}`);
        _this.data = result.data;
        _this.estudios = result.data.pruebas;
        _this.estado++;
      } catch (err) {
        console.log(err);
      }
    },
    cargarDatos(d) {
      this.traeData(this, d);
    },
    changedata(d) {
      this.dataAguardar = d;
    },
    showmodalordengraph() {
      if (this.showData) {
        this.showData = false;
      } else {
        this.showData = true;
      }
    },
  },
  created() {
    if (this.idtoken) {
      this.traeInformes(this);
    }
  },
  watch: {
    idtoken(newv, oldv) {
      if (newv) {
        this.traeInformes(this);
      }
    },
  },
  components: {
    yPanel,
    yGraphiccreator,
  },
};
</script>

<style lang="scss" scoped>
.icon-lista {
  vertical-align: bottom;
}
</style>
