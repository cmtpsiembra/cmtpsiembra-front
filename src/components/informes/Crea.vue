<template>
  <div>
    <button class="button is-primary is-large botontop" @click="addblock">
      <span class="icon">
        <i class="material-icons">add</i>
      </span>
    </button>
    <button
      v-show="blocks.length > 0"
      class="button is-link is-large botontop1"
      @click="guardarInforme"
    >
      <span class="icon">
        <i class="material-icons">save</i>
      </span>
    </button>
    <section class="section">
      <div class="container">
        <div v-show="hayBorrador" class="columns">
          <div class="column">
            <div class="notification is-info">
              <h1 class="title">Existe un borrador</h1>
              <h1 class="subtitle">Existe un borrador que no ha sido guardado, ¿desea cargarlo?</h1>
              <button
                class="button is-info is-inverted is-outlined is-large"
                @click="cargarborrador"
              >Si</button>
              <button
                class="button is-info is-inverted is-outlined is-large"
                @click="hayBorrador = false, borrador = null"
              >No</button>
              <button
                class="button is-info is-inverted is-outlined is-large"
                @click="eliminarborrador"
              >Eliminar borrador</button>
            </div>
          </div>
        </div>
        <!-- aqui van los bloques -->
        <div v-for="(item, index) in blocks" :key="index">
          <div class="columns has-background-light">
            <div class="column" v-if="item.tColumna1" :class="color(item.tColumna1)">
              <div v-for="(subitem, subindex) in item.columna1" :key="subindex">
                <button
                  class="button is-light buttonedit"
                  @click="editItem(item,subitem,'columna1')"
                >
                  <span class="icon">
                    <i class="material-icons">edit</i>
                  </span>
                </button>
                <button
                  class="button is-light buttondelete"
                  @click="deleteItem(item,subitem,'columna1')"
                >
                  <span class="icon">
                    <i class="material-icons">delete_forever</i>
                  </span>
                </button>
                <y-subitem :subitem="subitem" :columna="1" :iditem="item.id"></y-subitem>
              </div>
              <div class="buttons has-addons is-centered">
                <button class="button is-success buttonadd" @click="addContenido(item,'columna1')">
                  <span class="icon">
                    <i class="material-icons">add</i>
                  </span>
                </button>
                <button
                  v-show="!mostrarBorrarbloque(item)"
                  class="button is-danger buttonadd"
                  @click="deleteBloque(item)"
                >
                  <span class="icon">
                    <i class="material-icons">remove</i>
                  </span>
                </button>
              </div>
            </div>
            <div class="column" v-if="item.tColumna2" :class="color(item.tColumna2)">
              <div v-for="(subitem, subindex) in item.columna2" :key="subindex">
                <button
                  class="button is-light buttonedit"
                  @click="editItem(item,subitem,'columna2')"
                >
                  <span class="icon">
                    <i class="material-icons">edit</i>
                  </span>
                </button>
                <button
                  class="button is-light buttondelete"
                  @click="deleteItem(item,subitem,'columna2')"
                >
                  <span class="icon">
                    <i class="material-icons">delete_forever</i>
                  </span>
                </button>
                <y-subitem :subitem="subitem" :columna="2" :iditem="item.id"></y-subitem>
              </div>
              <div class="buttons has-addons is-centered">
                <button class="button is-success buttonadd" @click="addContenido(item,'columna2')">
                  <span class="icon">
                    <i class="material-icons">add</i>
                  </span>
                </button>
              </div>
            </div>
            <div class="column" v-if="item.tColumna3" :class="color(item.tColumna3)">
              <div v-for="(subitem, subindex) in item.columna3" :key="subindex">
                <button
                  class="button is-light buttonedit"
                  @click="editItem(item,subitem,'columna3')"
                >
                  <span class="icon">
                    <i class="material-icons">edit</i>
                  </span>
                </button>
                <button
                  class="button is-light buttondelete"
                  @click="deleteItem(item,subitem,'columna3')"
                >
                  <span class="icon">
                    <i class="material-icons">delete_forever</i>
                  </span>
                </button>
                <y-subitem :subitem="subitem" :columna="3" :iditem="item.id"></y-subitem>
              </div>
              <div class="buttons has-addons is-centered">
                <button class="button is-success buttonadd" @click="addContenido(item,'columna3')">
                  <span class="icon">
                    <i class="material-icons">add</i>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div class="buttons has-addons is-centered">
            <button class="button is-light buttonbloque" @click="addblock1(item)">
              <span class="icon">
                <i class="material-icons">add</i>
              </span>&nbsp; Agregar Bloque
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// import apiServices from "@/services/yungol-services";
import ySubitem from "@/components/informes/Subitem.vue";
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
export default {
  data() {
    return {
      informes: [],
      // informeSelected: {},
      isplantilla: "",
      blocks: [],
      hayBorrador: false,
      borrador: null,
      idinforme: null,
      isfrs: false
    };
  },
  computed: {
    ...mapState(["idtoken", "resultinfomodal", "modalordengraph"]),
    routestateid() {
      return this.$route.params.id;
    },
    datagraphmodificada() {
      return this.modalordengraph.result;
    }
  },
  methods: {
    async traeData(_this) {
      let route;
      if (_this.$route.params.tipo === "plantilla") {
        route = "plantilla";
      } else {
        route = "informe";
      }
      let result;
      try {
        result = await apiServices.get(`/${route}/${_this.$route.params.id}`);
        _this.isfrs = result.data.isfrs;
        _this.blocks = result.data.blocks;
        _this.idinforme = result.data.informes;
      } catch (err) {
        console.log(err);
      }
    },
    async editData(_this) {
      let route;
      if (_this.$route.params.tipo === "plantilla") {
        route = "editplantilla";
      } else {
        route = "editinforme";
      }
      const data = {
        blocks: this.blocks,
        id: _this.$route.params.id
      };
      try {
        await apiServices.post(`/${route}`, data);
        this.blocks = [];
        this.eliminarborrador();
        // this.$router.push({ path: 'plantillalist' });
        if (_this.$route.params.tipo === "plantilla") {
          this.$router.replace("/plantillalist");
        } else {
          this.$router.replace("/carpetaslist");
        }
      } catch (err) {
        console.log(err);
      }
    },
    guardarInforme() {
      if (this.$route.params.id) {
        this.editData(this);
      } else {
        this.$store.commit("showmodalinforme", {
          title: "Guardar Informe",
          fuente: "guardar",
          data: {
            blocks: this.blocks,
            // informeSelected: this.informeSelected
          }
        });
      }
    },
    async guardaInforme(_this, data) {
      let result;
      let ruta;
      if (data.tipo === "plantilla") {
        ruta = "/createplantilla";
      } else {
        ruta = "/createinforme";
      }
      try {
        result = await apiServices.post(ruta, data);
        this.$store.dispatch("notify", {
          message: `Perfecto. ${result.data.title} fue creado con éxito.`
        });
        this.blocks = [];
        this.eliminarborrador();
      } catch (err) {
        console.log(err);
      }
    },
    eliminarborrador() {
      localStorage.removeItem("borrador");
      this.hayBorrador = false;
      this.borrador = null;
    },
    cargarborrador() {
      this.blocks = this.borrador.blocks;
      this.hayBorrador = false;
    },
    deleteItem(bloque, subitem, columna) {
      const p = {};
      this.blocks.forEach(function(k, i) {
        if (k.id === bloque.id) {
          p.bloque = i;
        }
      });
      this.blocks[p.bloque][columna].forEach(function(k, i) {
        if (k.id === subitem.id) {
          p.subitem = i;
        }
      });
      this.blocks[p.bloque][columna].splice(p.subitem, 1);
    },
    deleteBloque(i) {
      const _this = this;
      this.blocks.forEach(function(k, v) {
        if (k.id === i.id) {
          _this.blocks.splice(v, 1);
        }
      });
    },
    mostrarBorrarbloque(i) {
      let control = false;
      if (i.columna2) {
        if (i.columna2.length > 0) {
          control = true;
        }
      }
      if (i.columna3) {
        if (i.columna3.length > 0) {
          control = true;
        }
      }
      if (i.columna1.length > 0) {
        control = true;
      }
      return control;
    },
    color(c) {
      const size = {
        "col-md-12": "is-12",
        "col-md-4": "is-4",
        "col-md-7": "is-7",
        "col-md-5": "is-5",
        "col-md-6": "is-6"
      };
      return size[c];
    },
    async traeInformes(_this) {
      let result;
      let result1;
      try {
        result = await apiServices.get(`/informeslist`);
        result1 = await apiServices.get(`/frslist`);

        _this.informes = result.data;
        result1.data.forEach(function(k, v) {
          const d = {
            isfrs: true,
            _id: k._id,
            nombre: k.nombre
          };
          _this.informes.push(d);
        });
        if (this.$route.params.id && this.$route.params.tipo === "informe") {
          _this.informes.forEach(function(k) {
            k.isinforme = true;
            if (k._id.toString() === _this.idinforme.toString()) {
              _this.informeSelected = k;
            }
          });
        } else {
          _this.informeSelected = _this.informes[0];
        }
      } catch (err) {
        console.log(err);
      }
    },
    addblock() {
      this.$store.commit("showmodalinforme", {
        title: "Agregar Bloque",
        fuente: "selBloque",
        data: {
          informes: this.informes,
          // informeSelected: this.informeSelected
        }
      });
    },
    addblock1(c) {
      this.$store.commit("showmodalinforme", {
        title: "Agregar Bloque",
        fuente: "selBloqueEmbed",
        isfrs: this.isfrs,
        data: {
          c
        }
      });
    },
    addContenido(c, i) {
      this.$store.commit("showmodalinforme", {
        title: "Agregar contenido al bloque",
        fuente: "contenido",
        data: {
          c,
          i
        },
        // informe: this.informeSelected
      });
    },
    editItem(c, s, i) {
      if (s.tipo === "timeline") {
        const item = {
          type: s.tipo,
          timeline: s.timeline
        };
        this.$store.commit("showmodalinforme", {
          isEdit: true,
          title: "Agregar contenido al bloque",
          fuente: "contenido",
          data: {
            c,
            i,
            s
          },
          item: item,
          // informe: this.informeSelected
        });
      } else {
        const item = {
          type: s.tipo,
          title: s.data.title,
          subtitle: s.data.subtitle,
          texto: s.data.texto,
          titulo: s.data.titulo,
          subtitulo: s.data.subtitulo
        };
        if (s.tipo === "title") {
          item.title = s.data.texto;
          item.color = s.data.color["background-color"];
        }

        this.$store.commit("showmodalinforme", {
          isEdit: true,
          title: "Agregar contenido al bloque",
          fuente: "contenido",
          data: {
            c,
            i,
            s
          },
          item: item,
          // informe: this.informeSelected
        });
      }
    }
  },
  created() {
    this.blocks = [];
    if (this.$route.params.id) {
      if (this.idtoken) {
        this.traeData(this);
        this.traeInformes(this);
      }
    } else {
      if (this.idtoken) {
        this.traeInformes(this);
      }
      let temporal = localStorage.getItem("borrador");
      temporal = JSON.parse(temporal);
      if (temporal && temporal.blocks.length > 0) {
        this.hayBorrador = true;
        this.borrador = temporal;
      }
    }
  },
  watch: {
    idtoken(nv, ov) {
      if (nv) {
        if (this.$route.params.id) {
          if (this.idtoken) {
            this.traeData(this);
          }
        }
        this.traeInformes(this);
      }
    },
    routestateid(nv, ov) {
      this.blocks = [];
    },
    datagraphmodificada(nv, ov) {
      if (nv.coordenadas) {
        const _this = this;
        _this.blocks.forEach(e => {
          if (e.id === nv.coordenadas.iditem) {
            e[`columna${nv.coordenadas.columna}`].forEach(e1 => {
              if (e1.id === nv.coordenadas.idsubitem) {
                e1.data = nv.data;
              }
            });
          }
        });
        // _this.editData(_this);
      }
    },
    resultinfomodal(nv, ov) {
      let t1 = 0;
      let t = {};
      let d = {};
      d.tipo = nv.data.type;
      d.id = Date.now() + Math.random();
      let bl = {};
      const _this = this;
      if (nv.fuente === "selBloque") {
        // this.informeSelected = nv.data.informeSelected;
        // si viene del modal de bloques
        if (nv.data.bloquesel === "plantilla") {
          this.blocks = nv.data.data.blocks;
        }
        if (nv.data.bloquesel === "una") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-12",
            tColumna2: false,
            tColumna3: false,
            columna1: [],
            columna2: false,
            columna3: false
          };
          this.blocks.push(bl);
        }
        if (nv.data.bloquesel === "izq") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-7",
            tColumna2: "col-md-5",
            tColumna3: false,
            columna1: [],
            columna2: [],
            columna3: false
          };
          this.blocks.push(bl);
        }
        if (nv.data.bloquesel === "cent") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-6",
            tColumna2: "col-md-6",
            tColumna3: false,
            columna1: [],
            columna2: [],
            columna3: false
          };
          this.blocks.push(bl);
        }
        if (nv.data.bloquesel === "der") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-5",
            tColumna2: "col-md-7",
            tColumna3: false,
            columna1: [],
            columna2: [],
            columna3: false
          };
          this.blocks.push(bl);
        }
        if (nv.data.bloquesel === "tres") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-4",
            tColumna2: "col-md-4",
            tColumna3: "col-md-4",
            columna1: [],
            columna2: [],
            columna3: []
          };
          this.blocks.push(bl);
        }
      }
      if (nv.fuente === "selBloqueEmbed") {
        this.blocks.forEach(function(k, v) {
          if (k.id === nv.data.idbloque) {
            t1 = v + 1;
          }
        });
        // si viene del modal de bloques
        if (nv.data.bloquesel === "plantilla") {
          // this.blocks = nv.data.data.blocks;
          nv.data.data.blocks.forEach(function(k, v) {
            k.id = Date.now() + Math.random();
            t = {};
            const keys1 = Object.keys(k);
            keys1.forEach(function(k1) {
              if (k1 !== "$$hashKey") {
                t[k1] = k[k1];
              }
            });
            _this.blocks.splice(t1 + v, 0, t);
          });
        }
        if (nv.data.bloquesel === "una") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-12",
            tColumna2: false,
            tColumna3: false,
            columna1: [],
            columna2: false,
            columna3: false
          };
          this.blocks.splice(t1, 0, bl);
        }
        if (nv.data.bloquesel === "izq") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-7",
            tColumna2: "col-md-5",
            tColumna3: false,
            columna1: [],
            columna2: [],
            columna3: false
          };
          this.blocks.splice(t1, 0, bl);
        }
        if (nv.data.bloquesel === "cent") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-6",
            tColumna2: "col-md-6",
            tColumna3: false,
            columna1: [],
            columna2: [],
            columna3: false
          };
          this.blocks.splice(t1, 0, bl);
        }
        if (nv.data.bloquesel === "der") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-5",
            tColumna2: "col-md-7",
            tColumna3: false,
            columna1: [],
            columna2: [],
            columna3: false
          };
          this.blocks.splice(t1, 0, bl);
        }
        if (nv.data.bloquesel === "tres") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-4",
            tColumna2: "col-md-4",
            tColumna3: "col-md-4",
            columna1: [],
            columna2: [],
            columna3: []
          };
          this.blocks.splice(t1, 0, bl);
        }
        if (nv.data.bloquesel === "demograficos") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-6",
            tColumna2: "col-md-6",
            tColumna3: false,
            columna1: [],
            columna2: [],
            columna3: false,
            isdemograficos: true
          };
          this.blocks.splice(t1, 0, bl);
        }
        if (nv.data.bloquesel === "graficador") {
          bl = {
            id: Date.now() + Math.random(),
            tColumna1: "col-md-12",
            tColumna2: false,
            tColumna3: false,
            columna1: [],
            columna2: false,
            columna3: false,
            isgraficador: true
          };
          this.blocks.splice(t1, 0, bl);
        }
      }
      if (nv.fuente === "contenido") {
        if (nv.data.type === "titulo") {
          d.data = {
            titulo: nv.data.item.titulo,
            subtitulo: nv.data.item.subtitulo
          };
        }
        if (nv.data.type === "title") {
          d.data = {
            texto: nv.data.item.title,
            color: {
              "background-color": nv.data.item.color,
              color: "white",
              padding: "10px"
            }
          };
        }
        if (nv.data.type === "card") {
          d.data = {
            title: nv.data.item.title,
            subtitle: nv.data.item.subtitle,
            texto: nv.data.item.texto
          };
        }
        if (nv.data.type === "graphic") {
          d.data = nv.data.item.data;
        }
        if (nv.data.type === "images") {
          d.data = {
            img: nv.data.item.img
          };
        }
        if (nv.data.type === "files") {
          d.data = {
            file: []
          };
          d.data.file.push(nv.data.item.file);
        }
        if (nv.data.type === "timeline") {
          if (nv.isEdit) {
            const p = {};
            this.blocks.forEach(function(k, i) {
              if (k.id === nv.data.res.c.id) {
                p.bloque = i;
              }
            });
            this.blocks[p.bloque][nv.data.res.i].forEach(function(k, i) {
              if (k.id === nv.data.res.s.id) {
                p.subitem = i;
              }
            });
            this.blocks[p.bloque][nv.data.res.i][p.subitem].timeline.forEach(
              function(k, i) {
                if (k.id === nv.data.item.idtime) {
                  p.timeline = i;
                }
              }
            );
            this.blocks[p.bloque][nv.data.res.i][p.subitem].timeline[
              p.timeline
            ].data.texto = nv.data.item.texto;
            this.blocks[p.bloque][nv.data.res.i][p.subitem].timeline[
              p.timeline
            ].data.title = nv.data.item.title;
          } else {
            const timeline = {
              id: Date.now() + Math.random(),
              classIcon: "warning",
              icon: "",
              data: {
                texto: nv.data.item.texto,
                title: nv.data.item.title
              },
              tipo: "card"
            };
            this.blocks.forEach(function(k, v) {
              if (k.id === nv.data.res.c.id) {
                if (k[nv.data.res.i].length === 0) {
                  // si la columna del bloque no tiee contenido entonces crea la timeline
                  d.timeline = [];
                  d.id = Date.now() + Math.random();
                  d.tipo = "timeline";
                  d.timeline.push(timeline);
                  k[nv.data.res.i].push(d);
                } else if (
                  k[nv.data.res.i][k[nv.data.res.i].length - 1].tipo ===
                  "timeline"
                ) {
                  k[nv.data.res.i][k[nv.data.res.i].length - 1].timeline.push(
                    timeline
                  );
                } else {
                  d.timeline = [];
                  d.id = Date.now() + Math.random();
                  d.tipo = "timeline";
                  d.timeline.push(timeline);
                  k[nv.data.res.i].push(d);
                }
              }
            });
          }
        } else {
          if (nv.isEdit) {
            const p = {};
            this.blocks.forEach(function(k, i) {
              if (k.id === nv.data.res.c.id) {
                p.bloque = i;
              }
            });
            this.blocks[p.bloque][nv.data.res.i].forEach(function(k, i) {
              if (k.id === nv.data.res.s.id) {
                p.subitem = i;
              }
            });
            this.blocks[p.bloque][nv.data.res.i][p.subitem].tipo = d.tipo;
            this.blocks[p.bloque][nv.data.res.i][p.subitem].data = d.data;
          } else {
            this.blocks.forEach(function(k, v) {
              if (k.id === nv.data.res.c.id) {
                k[nv.data.res.i].push(d);
              }
            });
          }
        }
      }

      const subida = {};
      subida.blocks = [];
      this.blocks.forEach(function(k) {
        const t = {};
        var keys = Object.keys(k);
        keys.forEach(function(k1) {
          if (k1 !== "$$hashKey") {
            t[k1] = k[k1];
          }
        });
        subida.blocks.push(t);
      });
      localStorage.setItem("borrador", JSON.stringify(subida));
      if (nv.fuente === "guardar") {
        const data = {
          carpeta: nv.data.carpeta,
          title: nv.data.title,
          tipo: nv.data.tipo,
          blocks: this.blocks,
          // informes: nv.data.informeSelected._id
        };
        this.guardaInforme(this, data);
      }
    }
  },
  components: {
    ySubitem
  }
};
</script>
<style lang="scss" scoped>
.menutop {
  bottom: 10px;
  right: 10px;
  position: fixed;
  z-index: 30;
  box-shadow: 5px 0px 13px 3px rgba(0, 0, 0, 0.1);
}
.botontop {
  top: 100px;
  right: 20px;
  position: fixed;
  z-index: 30;
  box-shadow: 5px 0px 13px 3px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}
.botontop1 {
  top: 160px;
  right: 20px;
  position: fixed;
  z-index: 30;
  box-shadow: 5px 0px 13px 3px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}
.buttonadd {
  box-shadow: 5px 0px 13px 3px rgba(0, 0, 0, 0.1);
}
.buttonedit {
  position: absolute;
  z-index: 20;
  margin-top: -5px;
  margin-left: -10px;
  border-radius: 50%;
  box-shadow: 5px 0px 13px 3px rgba(0, 0, 0, 0.1);
}
.buttondelete {
  position: absolute;
  z-index: 20;
  margin-top: -5px;
  margin-left: 28px;
  border-radius: 50%;
  box-shadow: 5px 0px 13px 3px rgba(0, 0, 0, 0.1);
}
.buttonbloque {
  box-shadow: 5px 0px 13px 3px rgba(0, 0, 0, 0.1);
}
</style>