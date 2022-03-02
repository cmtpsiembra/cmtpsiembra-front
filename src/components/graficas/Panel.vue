<template>
  <div class>
    <nav class="panel margin-top">
      <p class="panel-heading">
        <strong>{{ panelSelected.nombre }}</strong>
      </p>
      <!-- <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-large" v-model="search" type="text" placeholder="Buscar" />
          <span class="icon is-small is-left">
            <i class="material-icons">search</i>
          </span>
        </p>
      </div>-->
      <p class="panel-tabs">
        <a
          @click="selPanel(item)"
          v-bind:class="{ 'is-active': item.active }"
          v-for="(item, index) in panelTabs"
          :key="index"
          >{{ item.nombre }}</a
        >
      </p>
      <div v-if="panelSelected.cod === 'informe'" class="panel-top">
        <a
          class="panel-block"
          v-for="(item, index) in filteredItems"
          :key="index"
        >
          <div class="field">
            <input
              class="is-checkradio is-info"
              type="radio"
              :id="item.cod"
              :value="item"
              v-model="radioSelected"
            />
            <label :for="item.cod">{{ item.nombre }}</label>
          </div>
        </a>
      </div>
      <div v-if="panelSelected.cod === 'estudios'" class="panel-top">
        <a class="panel-block" v-for="(item, index) in estudios" :key="index">
          <div class="field">
            <input
              class="is-checkradio is-info"
              type="radio"
              :id="index"
              :value="item"
              v-model="estudioSelected"
            />
            <label :for="index" class="is-capitalized">{{
              item.nombre | agregarTilde()
            }}</label>
          </div>
        </a>
        <div class="panel-block">
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="datoSelected" @change="selectDato()">
                <option
                  v-for="(option, ind) in dato"
                  v-bind:value="option"
                  v-bind:key="ind"
                >
                  {{ option.nombre }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <!-- <div class="panel-block">
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
                  <span class="file-label">Archivo</span>
                </span>
              </label>
            </div>
          </div>
        </div>-->
        <!-- <div class="panel-block">
          <div class="field has-addons">
            <div class="control">
              <input v-model="nombreexcel" class="input is-fullwidth" type="text" />
            </div>
            <div class="control">
              <a @click="guardaexcel" class="button is-info">Guardar</a>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <table class="table is-fullwidth">
            <tr>
              <th>Columna</th>
              <th>Grupo</th>
              <th>Variable</th>
            </tr>
            <tr v-for="(it,ind) in columnasexcel" :key="ind">
              <td>{{it.codigo}}</td>
              <td>
                <div class="field">
                  <input
                    v-model="it.clasif"
                    class="is-checkradio is-info"
                    type="radio"
                    :id="it.codigo+'1'"
                    value="grupo"
                  />
                  <label :for="it.codigo+'1'" class="is-capitalized"></label>
                </div>
              </td>
              <td>
                <div class="field">
                  <input
                    v-model="it.clasif"
                    class="is-checkradio is-info"
                    type="radio"
                    :id="it.codigo+'2'"
                    value="variable"
                  />
                  <label :for="it.codigo+'2'" class="is-capitalized"></label>
                </div>
              </td>
            </tr>
          </table>
        </div>-->
      </div>
      <div
        v-if="panelSelected.cod === 'grupos' && !dataexcelSelected"
        class="panel-top"
      >
        <div class="panel-top">
          <button class="button is-info" @click="combinar">Combinar</button>
          <button class="button is-info" @click="crear">Crear</button>
        </div>
        <div class="panel-top" v-for="(gr, grv) in nameGroups" :key="grv">
          <a class="panel-block" @click="groupSel(gr, nameGroups)">
            <span>
              <i class="material-icons icon-lista">keyboard_arrow_down</i>
            </span>
            <span class="is-capitalized">{{ gr.nombre }}</span>
          </a>
          <div v-show="gr.selected" class="panel-top">
            <div
              class="panel-block"
              v-for="(sgr, index1) in groups[gr.nombre]"
              :key="index1"
            >
              <div class="columns">
                <div class="column">
                  <input
                    class="is-checkradio"
                    type="checkbox"
                    :id="'sgr' + grv + 'k' + index1"
                    @change="selectSubgrupo(sgr)"
                    v-model="sgr.check"
                  />
                  <label :for="'sgr' + grv + 'k' + index1">{{
                    sgr.SubGrupo
                  }}</label>
                </div>
                <!-- <div class="column is-2">
                  <input
                    :id="'swr'+gr.id+index1"
                    type="checkbox"
                    class="switch"
                    @change="selectSubgrupo(sgr)"
                    v-model="sgr.check2"
                  />
                  <label :for="'swr'+gr.id+index1"></label>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="panelSelected.cod === 'variables'" class="panel-top">
        <a class="panel-block" v-for="(vari, index) in variables" :key="index">
          <div class="field">
            <input
              class="is-checkradio"
              type="checkbox"
              :id="'var' + index"
              @change="selectVariable(vari)"
              v-model="vari.check"
            />
            <label :for="'var' + index">{{
              nombreVariable(vari.codigo)
            }}</label>
          </div>
        </a>
      </div>
      <!-- <div class="panel-block">
        <button class="button is-info is-large is-fullwidth">Borrar todos los filtros</button>
      </div>-->
    </nav>
    <modalcombinar
      :show="showData"
      @showmodalgraph="showmodalgraph"
      :groups="nameGr"
      @combina="combina"
    ></modalcombinar>
    <modalcrear
      :show="showCrear"
      :variablescrear="variablescrear"
      :datoSelected="datoSelected"
      @showmodalgraph="showmodalgraph1"
      @crea="crea"
    ></modalcrear>
  </div>
</template>

<script>
import functions from "@/helpers/functions";
import XLSX from "xlsx";
import { mapState } from "vuex";
import modalcombinar from "@/components/modals/Modalcombinar.vue";
import modalcrear from "@/components/modals/Modalcrear.vue";

import apiServices from "@/services/yungol-services";

export default {
  data() {
    return {
      showData: false,
      showCrear: false,
      variablescrear: [],
      nameGr: [],
      dataexcelSelected: false,
      columnasexcel: null,
      dataexcel: null,
      nombreexcel: null,
      datoSelected: null,
      dato: [],
      panelTabs: [
        { nombre: "1. Informe", cod: "informe", active: true },
        { nombre: "2. Estudios", cod: "estudios", active: false },
        { nombre: "3. Grupos", cod: "grupos", active: false },
        { nombre: "4. Variables", cod: "variables", active: false },
      ],
      dataVisible: [],
      panelSelected: { nombre: "1. Informe", cod: "informe", active: true },
      radioSelected: {},
      estudioSelected: {},
      search: "",
      estudios: [],
      groups: {},
      nameGroups: [],
      groups1: {},
      nameGroups1: [],
      variables: [],
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
        sentra_a: "Sentido  en el trabajo",
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
    };
  },
  computed: {
    ...mapState(["tokenUser", "idtoken"]),
    filteredItems: function () {
      let d = [];
      d = functions.filterItems(this.search, this.dataVisible, [
        { cod: "nombre" },
        { cod: "nombre1" },
      ]);
      return d;
    },
  },
  props: {
    informes: {
      type: Array,
    },
    data: {
      type: Object,
    },
    estado: {
      type: Number,
    },
  },
  methods: {
    async traeCombinado(_this, d) {
      let result;
      try {
        result = await apiServices.post(
          `/informes/combinar/${this.radioSelected.cod}`,
          d
        );
        this.showData = false;
        this.$emit("datacombinada", result.data);
      } catch (err) {
        console.log(err);
      }
    },
    showmodalgraph() {
      if (this.showData) {
        this.showData = false;
      } else {
        this.showData = true;
      }
    },
    showmodalgraph1() {
      if (this.showCrear) {
        this.showCrear = false;
      } else {
        this.showCrear = true;
      }
    },
    combina(d) {
      this.traeCombinado(this, d);
    },
    crea(d) {
      const dat = {
        rows: [],
      };
      dat.rows.push(d);
      this.showCrear = false;
      this.$emit("datacombinada", dat);
    },
    combinar() {
      const _this = this;
      this.showData = true;
      this.nameGr = [];
      this.nameGroups.forEach(function (k) {
        const d = {
          id: k.id,
          nombre: k.nombre,
          selected: false,
        };
        _this.nameGr.push(d);
      });
    },
    crear() {
      const _this = this;
      this.showCrear = true;
      this.variablescrear = ["Grupo", "SubGrupo"];

      this.estudioSelected.variables.forEach(function (k) {
        const d = k;
        _this.variablescrear.push(d);
      });
    },
    nombreVariable(n) {
      if (this.nombreVariables[n]) {
        return this.nombreVariables[n];
      } else {
        return n;
      }
    },
    guardaexcel() {
      const d = {
        nombre: this.nombreexcel,
        variables: [],
        isexcel: true,
      };
      this.columnasexcel.forEach(function (k) {
        if (k.clasif === "variable") {
          d.variables.push(k.codigo);
        }
      });
      this.estudios.push(d);
    },
    onFileChange(e) {
      const _this = this;
      var files = e.target.files;
      if (files.length) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var contents = e.target.result;
          var wb = XLSX.read(contents, {
            type: "binary",
          });
          // Toma la primera hoja
          var wsname = wb.SheetNames[0];
          var ws = wb.Sheets[wsname];
          /* toma la primera fila y genera los nombres de las columnas */
          var aoa = XLSX.utils.sheet_to_json(ws, {
            header: 1,
            raw: false,
          });
          var cols = [];
          for (var i = 0; i < aoa[0].length; ++i)
            cols[i] = {
              field: aoa[0][i],
            };
          /* se genera el resto de los datos */
          var data = [];
          for (var r = 1; r < aoa.length; ++r) {
            data[r - 1] = {};
            for (i = 0; i < aoa[r].length; ++i) {
              if (aoa[r][i] === null) continue;
              data[r - 1][aoa[0][i]] = aoa[r][i];
            }
          }
          _this.dataexcel = data;
          _this.columnasexcel = [];
          Object.keys(data[0]).forEach(function (k, v) {
            const d = {
              codigo: k,
            };
            if (isNaN(parseInt(data[0][k]))) {
              d.clasif = "grupo";
            } else {
              d.clasif = "variable";
            }
            _this.columnasexcel.push(d);
          });
        };
        reader.readAsBinaryString(files[0]);
      }
    },
    selectDato() {
      this.$emit("datoSelected", this.datoSelected);
    },
    selectSubgrupo(sgr) {
      this.$emit("groupSelected", sgr);
    },
    selectSubgrupo1(sgr) {
      this.$emit("groupSelected", this.groups1);
    },
    selectVariable(vari) {
      console.log("hice check en ", vari);
      this.$emit("variableSelected", this.variables);
    },
    groupSel(g, namegroups) {
      namegroups.forEach(function (k, v) {
        if (k.id === g.id) {
          if (k.selected) {
            k.selected = false;
          } else {
            k.selected = true;
          }
        } else {
          k.selected = false;
        }
      });
    },
    selPanel(i) {
      const _this = this;
      this.panelTabs.forEach(function (k) {
        if (k.cod === i.cod) {
          k.active = true;
          _this.panelSelected = k;
        } else {
          k.active = false;
        }
      });
    },
    cargaInformes(data, _this) {
      _this.dataVisible = [];
      data.forEach(function (k) {
        const d = {
          cod: k._id,
          nombre: `${k.text}`,
          nombre1: `${k.text} - ${k.cliente.nombre}`,
          selected: false,
        };
        _this.dataVisible.push(d);
      });
    },
    transformdata(dat) {
      const _this = this;
      this.estudios = dat.pruebas;
      this.groups = {};
      this.nameGroups = [];
      dat.rows.forEach(function (item) {
        let guion = item.SubGrupo.indexOf("-");
        let caracter = "a";
        if (guion === 1) {
          caracter = item.SubGrupo.substr(0, 1);
        } else if (guion > 1) {
          caracter = item.SubGrupo.substr(guion + 1, 1);
        }
        if (!_this.groups[item.Grupo]) {
          _this.groups[item.Grupo] = [];
          if (item.SubGrupo !== "0" && caracter !== "0") {
            item.check = false;
            item.check2 = false;
            _this.groups[item.Grupo].push(item);
          }
        } else {
          if (item.SubGrupo !== "0" && caracter !== "0") {
            item.check = false;
            item.check2 = false;
            _this.groups[item.Grupo].push(item);
          }
        }
      });
      Object.keys(this.groups).forEach(function (k, v) {
        const d = {
          id: v,
          nombre: k,
          selected: false,
        };
        _this.nameGroups.push(d);
      });
    },
  },
  watch: {
    estado(nv, ov) {
      this.transformdata(this.data);
    },
    informes(nv, ov) {
      if (nv) {
        this.cargaInformes(nv, this);
      }
    },
    radioSelected(nv, ov) {
      if (nv) {
        this.$emit("traedata", nv.cod);
      }
    },
    estudioSelected(nv, ov) {
      const varDatos0 = Object.keys(this.data.rows[0]);
      const varDatos1 = Object.keys(this.data.rows[1]);
      const varDatos2 = Object.keys(this.data.rows[2]);

      let varDatos = [];
      varDatos0.forEach(function (k) {
        if (varDatos.indexOf(k) === -1) {
          varDatos.push(k);
        }
      });
      varDatos1.forEach(function (k) {
        if (varDatos.indexOf(k) === -1) {
          varDatos.push(k);
        }
      });
      varDatos2.forEach(function (k) {
        if (varDatos.indexOf(k) === -1) {
          varDatos.push(k);
        }
      });
      this.$emit("estudiosel", nv);
      const _this = this;
      this.variables = [];
      _this.dato = [];
      if (nv.isexcel) {
        _this.dato.push({
          d: "sum",
          nombre: "Suma",
        });

        nv.variables.forEach(function (k) {
          const d = {
            codigo: k,
            check: false,
          };
          _this.variables.push(d);
        });

        let gruposkey = [];
        let datoskey = [];
        const columnas = Object.keys(_this.dataexcel[0]);
        columnas.forEach(function (k, v) {
          if (nv.variables.indexOf(k) === -1) {
            gruposkey.push(k);
          } else {
            datoskey.push(k);
          }
        });
        let grupos = {};
        _this.groups1 = {};
        gruposkey.forEach(function (k, v) {
          _this.groups1[k] = [];
          grupos[k] = {
            subgrupos: [],
            sub: {},
          };
        });
        _this.dataexcel.forEach(function (k, v) {
          gruposkey.forEach(function (k1, v1) {
            if (grupos[k1].subgrupos.indexOf(k[k1]) === -1) {
              grupos[k1].subgrupos.push(k[k1]);
              grupos[k1].sub[k[k1]] = [];
              grupos[k1].sub[k[k1]].push(k);
              grupos[k1].total = {};
            } else {
              grupos[k1].sub[k[k1]].push(k);
            }
          });
        });
        gruposkey.forEach(function (k, v) {
          const d = {
            id: v,
            nombre: k,
            selected: false,
          };
          _this.nameGroups1.push(d);
          grupos[k].subgrupos.forEach(function (k1, v1) {
            grupos[k].total[k1] = {
              var: {},
              vars: [],
            };
            grupos[k].sub[k1].forEach(function (k2, v2) {
              datoskey.forEach(function (k3, v3) {
                if (grupos[k].total[k1].vars.indexOf(k3) === -1) {
                  grupos[k].total[k1].vars.push(k3);
                  grupos[k].total[k1].var[k3] = 0;
                  grupos[k].total[k1].var[k3] += parseFloat(k2[k3]);
                } else {
                  grupos[k].total[k1].var[k3] += parseFloat(k2[k3]);
                }
              });
            });
          });
        });
        gruposkey.forEach(function (k, v) {
          grupos[k].subgrupos.forEach(function (k1, v1) {
            _this.groups1[k][v1] = {};
            _this.groups1[k][v1].Grupo = k;
            _this.groups1[k][v1].SubGrupo = k1;
            _this.groups1[k][v1].check = false;
            _this.groups1[k][v1].check2 = false;
            grupos[k].total[k1].vars.forEach(function (k2, v2) {
              _this.groups1[k][v1][k2] = { sum: grupos[k].total[k1].var[k2] };
            });
          });
        });
        _this.dataexcelSelected = true;
      } else {
        _this.dataexcelSelected = false;
        nv.variables.forEach(function (k) {
          const d = {
            codigo: k,
            check: false,
          };
          if (varDatos.indexOf(k) !== -1) {
            _this.variables.push(d);
          }
          if (nv.nombre === "clima") {
            if (_this.tokenUser.cliente) {
              if (_this.data.items.clima.e) {
                _this.dato.push({
                  d: "e",
                  nombre: "Estandarizadas",
                });
              }
              if (_this.data.items.clima.pm) {
                _this.dato.push({
                  d: "pm",
                  nombre: "Porcentajes",
                });
              }
              if (_this.data.items.clima.m) {
                _this.dato.push({
                  d: "m",
                  nombre: "Directa",
                });
              }
            } else {
              _this.dato = [
                {
                  d: "e",
                  nombre: "Estandarizadas",
                },
                {
                  d: "pm",
                  nombre: "Porcentajes",
                },
                {
                  d: "m",
                  nombre: "Directa",
                },
              ];
            }
          }
          if (nv.nombre === "beneficios") {
            if (_this.tokenUser.cliente) {
              if (_this.data.items.beneficios.e) {
                _this.dato.push({
                  d: "e",
                  nombre: "Estandarizadas",
                });
              }
              if (_this.data.items.beneficios.pm) {
                _this.dato.push({
                  d: "pm",
                  nombre: "Porcentajes",
                });
              }
              if (_this.data.items.beneficios.m) {
                _this.dato.push({
                  d: "m",
                  nombre: "Directa",
                });
              }
            } else {
              _this.dato = [
                {
                  d: "e",
                  nombre: "Estandarizadas",
                },
                {
                  d: "pm",
                  nombre: "Porcentajes",
                },
                {
                  d: "m",
                  nombre: "Directa",
                },
              ];
            }
          }
          if (nv.nombre === "compromiso") {
            if (_this.tokenUser.cliente) {
              if (_this.data.items.compromiso.me) {
                _this.dato.push({
                  d: "me",
                  nombre: "Estandarizadas",
                });
              }
              if (_this.data.items.compromiso.m) {
                _this.dato.push({
                  d: "m",
                  nombre: "Directa",
                });
              }
            } else {
              _this.dato = [
                {
                  d: "me",
                  nombre: "Estandarizadas",
                },
                {
                  d: "m",
                  nombre: "Directa",
                },
              ];
            }
          }
          if (nv.nombre === "felicidad") {
            _this.dato = [
              {
                d: "m",
                nombre: "Sin Selección",
              },
            ];
          }
          if (nv.nombre === "demograficos") {
            _this.dato = [
              {
                d: "c",
                nombre: "Conteo",
              },
            ];
          }
        });
      }

      _this.datoSelected = _this.dato[0];
      _this.$emit("datoSelected", _this.datoSelected);
    },
  },
  components: {
    modalcombinar,
    modalcrear,
  },
};
</script>


<style lang="scss" scoped>
.icon-lista {
  vertical-align: bottom;
}
.panel-top {
  border-top: 1px solid #ffffff;
}
.is-checkradio[type="radio"]:checked + label::before,
.is-checkradio[type="radio"]:checked + label:before,
.is-checkradio[type="checkbox"]:checked + label::before,
.is-checkradio[type="checkbox"]:checked + label:before {
  border: 0.15rem solid #dbdbdb;
}
.is-checkradio[type="checkbox"] + label::after,
.is-checkradio[type="checkbox"] + label:after {
  border-width: 0.15rem;
}
</style>

