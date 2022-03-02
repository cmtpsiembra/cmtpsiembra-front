<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Estadísticos</h1>
          <h2 class="subtitle">{{data.nombre}}</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="section" v-for="(prueba, index) in data.pruebas" :key="index">
        <h1 class="title is-4 is-uppercase">{{prueba.nombre}}</h1>
        <div class="table-container">
          <table class="table is-bordered is-striped">
            <tr>
              <th>Grupo</th>
              <th v-for="(variable, index) in prueba.variables" :key="index">{{variable}}</th>
            </tr>
            <tr v-for="(grupo, index) in grupos" :key="index">
              <td class="is-capitalized">{{grupo}}</td>
              <td
                v-for="(variable, index) in prueba.variables"
                :key="index"
                :class="classtd(grupos1[grupo].estadistico[variable])"
                @click="muestraRes(variable,grupo)"
                class="hand"
              >
                <span
                  v-if="grupos1[grupo].estadistico[variable]"
                >{{grupos1[grupo].estadistico[variable].diferencia ? 'Si': 'No'}}</span>
                <span v-if="!grupos1[grupo].estadistico[variable]">N/P</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <y-modalestadisticos :show="show" :data="datamodal" @close="close()"></y-modalestadisticos>
  </div>
</template>

<script>
import yModalestadisticos from "@/components/modals/ModalEstadisticos.vue";
import apiServices from "@/services/yungol-services";
const Pi = Math.PI;
const PiD2 = Pi / 2;

function statCom(q, i, j, b) {
  var zz = 1;
  var z = zz;
  var k = i;
  while (k <= j) {
    zz = (zz * q * k) / (k - b);
    z = z + zz;
    k = k + 2;
  }
  return z;
}

function fishF(f, n1, n2) {
  var fn1 = Math.floor(n1);
  var cn1 = Math.ceil(n1);
  var fn2 = Math.floor(n2);
  var cn2 = Math.ceil(n2);
  if ((fn1 !== n1) | (fn2 !== n2)) {
    var fff = Math.log(fishF(f, fn1, fn2));
    var ffc = Math.log(fishF(f, fn1, cn2));
    var fcf = Math.log(fishF(f, cn1, fn2));
    var fcc = Math.log(fishF(f, cn1, cn2));
    return Math.exp(
      (cn1 - n1) * (cn2 - n2) * fff +
        (n1 - fn1) * (cn2 - n2) * fcf +
        (cn1 - n1) * (n2 - fn2) * ffc +
        (n1 - fn1) * (n2 - fn2) * fcc
    );
  }
  var x = n2 / (n1 * f + n2);
  if (n1 % 2 === 0) {
    return statCom(1 - x, n2, n1 + n2 - 4, n2 - 2) * Math.pow(x, n2 / 2);
  }
  if (n2 % 2 === 0) {
    return 1 - statCom(x, n1, n1 + n2 - 4, n1 - 2) * Math.pow(1 - x, n1 / 2);
  }
  var th = Math.atan(Math.sqrt((n1 * f) / n2));
  var a = th / PiD2;
  var sth = Math.sin(th);
  var cth = Math.cos(th);
  if (n2 > 1) {
    a = a + (sth * cth * statCom(cth * cth, 2, n2 - 3, -1)) / PiD2;
  }
  if (n1 === 1) {
    return 1 - a;
  }
  var c =
    (4 *
      statCom(sth * sth, n2 + 1, n1 + n2 - 4, n2 - 2) *
      sth *
      Math.pow(cth, n2)) /
    Pi;
  if (n2 === 1) {
    return 1 - a + c / 2;
  }
  var k = 2;
  while (k <= (n2 - 1) / 2) {
    c = (c * k) / (k - 0.5);
    k = k + 1;
  }
  return 1 - a + c;
}
function afishF(p, n1, n2) {
  var v = 0.5;
  var dv = 0.5;
  var f = 0;
  while (dv > 1e-10) {
    f = 1 / v - 1;
    dv = dv / 2;
    if (fishF(f, n1, n2) > p) {
      v = v - dv;
    } else {
      v = v + dv;
    }
  }
  return f;
}
function studT(t, n) {
  var fn = Math.floor(n);
  var cn = Math.ceil(n);
  if (fn !== n) {
    var tf = Math.log(studT(t, fn));
    var tc = Math.log(studT(t, cn));
    return Math.exp((cn - n) * tf + (n - fn) * tc);
  }
  t = Math.abs(t);
  var w = t / Math.sqrt(n);
  var th = Math.atan(w);
  if (n === 1) {
    return 1 - th / PiD2;
  }
  var sth = Math.sin(th);
  var cth = Math.cos(th);
  if (n % 2 === 1) {
    return 1 - (th + sth * cth * statCom(cth * cth, 2, n - 3, -1)) / PiD2;
  } else {
    return 1 - sth * statCom(cth * cth, 1, n - 3, -1);
  }
}

function aStudT(p, n) {
  var v = 0.5;
  var dv = 0.5;
  var t = 0;
  while (dv > 1e-6) {
    t = 1 / v - 1;
    dv = dv / 2;
    if (studT(t, n) > p) {
      v = v - dv;
    } else {
      v = v + dv;
    }
  }
  return t;
}

function calcFr(num, den, pr) {
  return afishF(pr, num, den);
}
function calcTr(gl) {
  return aStudT(0.05, gl);
}

function calcT(t, gl) {
  return studT(t, gl);
}
export default {
  data() {
    return {
      show: false,
      datamodal: {},
      data: {},
      grupos: [],
      grupos1: {},
      tabla: [],
      tabla1: [],
      nombreVariables: {
        apjef: "Apoyo del Jefe",
        claor: "Claridad Organizacional",
        train: "Trato Interpersonal",
        disre: "Recursos",
        aop: "Apoyo Organizacional",
        esta: "Estabilidad",
        retri: "Retribución",
        coher: "Coherencia",
        senpe: "Pertenencia",
        tequi: "Trabajo en Equipo",
        cc: "Clima",
        coop: "Cooperación",
        respo: "Responsabilidad",
        respe: "Respeto",
        est: "Estímulo",
        apoy: "Apoyo",
        parti: "Participación",
        ig: "Imagen Gerencial",
        ie: "Imagen de la Empresa",
        cvrel: "Imagen Relaciones",
        eng: "Engagement",
        cafec: "Compromiso Afectivo",
        ccont: "Compromiso de Continuidad",
        cnorm: "Compromiso Normativo",
        perfil: "Perfil",
        eaptra_a: "Estado Afectivo Positivo en el trabajo",
        gratra_a: "Gratificación en el trabajo",
        sentra_a: "Sentido  en el trabajo",
        eapvid_a: "Estado Afectivo Positivo en la Vida",
        gravid_a: "Gratificación en la Vida",
        senvid_a: "Sentido en la Vida",
        f_tra_a: "Felicidad en el trabajo",
        f_vid_a: "Felicidad en la Vida",
        eaptra_b: "Estado Afectivo Positivo en el trabajo.",
        gratra_b: "Gratificación en el trabajo.",
        sentra_b: "Sentido  en el trabajo.",
        eapvid_b: "Estado Afectivo Positivo en la Vida.",
        gravid_b: "Gratificación en la Vida.",
        senvid_b: "Sentido en la Vida.",
        f_tra_b: "Felicidad en el trabajo.",
        f_vid_b: "Felicidad en la Vida.",
        benef: "Beneficios",
        satis: "Satisfacción",
        demograficos: "Demográficos"
      }
    };
  },
  computed: {},
  methods: {
    close() {
      this.show = false;
    },
    muestraRes(var1, grupo) {
      const datosStudent = [];
      const datosStudent1 = {};
      const c = {};
      c.grupos = [];
      c.grupo = grupo;
      c.variable = var1;
      this.data.rows.forEach(function(k) {
        if (k.Grupo === grupo) {
          datosStudent.push(k);
          datosStudent1[k.SubGrupo] = {};
          datosStudent1[k.SubGrupo].propio = k[var1];
          datosStudent1[k.SubGrupo].subgrupos = [];
          c.grupos.push(k.SubGrupo);
        }
      });
      c.grupos.forEach(function(k) {
        c.grupos.forEach(function(k1) {
          if (k !== k1) {
            datosStudent1[k].subgrupos.push(k1);
            datosStudent1[k][k1] = {};
            datosStudent1[k][k1].tstudent = {};
            datosStudent1[k][k1].tstudent.n1 = datosStudent1[k].propio
              ? datosStudent1[k].propio.c
              : 0;
            datosStudent1[k][k1].tstudent.n2 = datosStudent1[k1].propio
              ? datosStudent1[k1].propio.c
              : 0;
            datosStudent1[k][k1].tstudent.m1 = datosStudent1[k].propio
              ? datosStudent1[k].propio.e
              : 0;
            datosStudent1[k][k1].tstudent.m2 = datosStudent1[k1].propio
              ? datosStudent1[k1].propio.e
              : 0;
            datosStudent1[k][k1].tstudent.desv1 = datosStudent1[k].propio
              ? datosStudent1[k].propio.desv
              : 0;
            datosStudent1[k][k1].tstudent.desv2 = datosStudent1[k1].propio
              ? datosStudent1[k1].propio.desv
              : 0;
            if (datosStudent1[k].propio && datosStudent1[k1].propio) {
              datosStudent1[k][k1].tstudent.gl =
                datosStudent1[k].propio.c + datosStudent1[k1].propio.c - 2;
              datosStudent1[k][k1].tstudent.t =
                (datosStudent1[k][k1].tstudent.m1 -
                  datosStudent1[k][k1].tstudent.m2) /
                Math.pow(
                  Math.pow(datosStudent1[k][k1].tstudent.desv1, 2) /
                    datosStudent1[k][k1].tstudent.n1 +
                    Math.pow(datosStudent1[k][k1].tstudent.desv2, 2) /
                      datosStudent1[k][k1].tstudent.n2,
                  0.5
                );
              datosStudent1[k][k1].tstudent.critico = calcTr(
                datosStudent1[k][k1].tstudent.n1 +
                  datosStudent1[k][k1].tstudent.n2 -
                  2
              );
              datosStudent1[k][k1].tstudent.significancia = calcT(
                datosStudent1[k][k1].tstudent.t,
                datosStudent1[k][k1].tstudent.gl
              );
            }
          }
        });
      });
      c.estadistico = datosStudent1;
      console.log("data para modal es ", c);
      if (this.show) {
        this.show = false;
        this.datamodal = {};
      } else {
        this.datamodal = c;
        this.show = true;
      }
      // $("#modalPartialData1").modal("show");
      // vm.dataModal = c;
      // console.log(vm.dataModal);
    },
    classtd(n) {
      if (n && n.diferencia) {
        return {
          "is-primary": true
        };
      }
    },
    async getestadistics() {
      const _this = this;
      try {
        const result = await apiServices.get(
          `/estadisticos/${_this.$route.params.procesoid}`
        );
        if (result.data) {
          _this.data = result.data;
          // _this.grupos = _this.data.rows.reduce(
          //   function(a, b) {
          //     a[b.Grupo] = (a[b.Grupo] || 0) + 1;
          //     if (a.list.indexOf(b.Grupo) === -1) {
          //       a.list.push(b.Grupo);
          //     }
          //     return a;
          //   },
          //   {
          //     list: []
          //   }
          // );
          const dato1 = _this.data.rows[0];
          const keys = Object.keys(dato1);
          const keysDatos = [];
          keys.forEach(function(k) {
            const t = {};
            if (
              k !== "Grupo" &&
              k !== "SubGrupo" &&
              k !== "anova" &&
              k !== "tstudent"
            ) {
              t[k] = Object.keys(dato1[k]);
              t.nombre = k;
              keysDatos.push(t);
            }
          });
          _this.data.rows.forEach(function(k, v) {
            if (!k.esStudent) {
              if (_this.grupos.indexOf(k.Grupo) === -1) {
                _this.grupos1[k.Grupo] = {};
                _this.grupos1[k.Grupo].subgrupos = [];
                _this.grupos1[k.Grupo].anovasnodif = {};
                _this.grupos1[k.Grupo].anovasnodifvar = [];
                _this.grupos1[k.Grupo].anovasdif = {};
                _this.grupos1[k.Grupo].anovasdifvar = [];
                _this.grupos1[k.Grupo].estadistico = {};
                _this.grupos1[k.Grupo].tstudent = {};
                _this.grupos.push(k.Grupo);
              }
              _this.grupos1[k.Grupo].subgrupos.push(k.SubGrupo);
              const t1 = {};
              t1.Grupo = k.Grupo;
              t1.SubGrupo = k.SubGrupo;
              keysDatos.forEach(function(k1) {
                k1[k1.nombre].forEach(function(k2) {
                  if (k[k1.nombre]) {
                    t1[k1.nombre + "_" + k2] = k[k1.nombre][k2];
                  }
                });
              });
              _this.tabla.push(t1);
              if (v < 3) {
                _this.tabla1.push(t1);
              }
            }
          });
          _this.calcularEstdisticos();
        }
      } catch (err) {
        console.log(err);
      }
    },
    calcularEstdisticos() {
      const _this = this;
      this.data.rows.forEach(function(k) {
        let grupo = [];
        if (grupo.indexOf(k.Grupo) === -1) {
          if (k.anova) {
            grupo.push(k.Grupo);
            const keysanova = Object.keys(k.anova);
            if (_this.grupos1[k.Grupo].subgrupos.length > 2) {
              keysanova.forEach(function(k1, v1) {
                const a = {};
                a.Grupo = k.Grupo;
                a.SubGrupo = k.SubGrupo;
                a[k1] = k.anova[k1];
                a.variable = k1;
                k.anova[k1].critico = calcFr(
                  k.anova[k1].gradLibNum,
                  k.anova[k1].gradLibDen,
                  0.05
                );
                if (k.anova[k1].fisher > k.anova[k1].critico) {
                  _this.grupos1[k.Grupo].anovasdif[k1] = k.anova[k1];
                  if (_this.grupos1[k.Grupo].anovasdifvar.indexOf(k1) === -1) {
                    _this.grupos1[k.Grupo].anovasdifvar.push(k1);
                    a.diferencia = true;
                    _this.grupos1[k.Grupo].estadistico[k1] = a;
                  }
                } else {
                  _this.grupos1[k.Grupo].anovasnodif[k1] = k.anova[k1];
                  if (
                    _this.grupos1[k.Grupo].anovasnodifvar.indexOf(k1) === -1
                  ) {
                    _this.grupos1[k.Grupo].anovasnodifvar.push(k1);
                    a.diferencia = false;
                    _this.grupos1[k.Grupo].estadistico[k1] = a;
                  }
                }
              });
            } else if (_this.grupos1[k.Grupo].subgrupos.length === 2) {
              // aqui se pone el codigo para la tstudent
            }
          }
        }
      });
    }
  },
  created() {
    this.getestadistics();
  },
  components: {
    yModalestadisticos
  }
};
</script>