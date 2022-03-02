<template>
  <section class="section">
    <h1 class="title">Relaciones</h1>
    <div class="field">
      <div class="field-body">
        <div class="field">
          <button class="button" @click="showEmployee=true">
            <span class="icon">
              <i class="material-icons">list_alt</i>
            </span>
            <span class="title is-5">Evaluado</span>
          </button>
          <div class="box" v-if="mEmployee== true" style="margin-top:16px;">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{relacion.evaluado.nombre}}</strong>
                    <small>{{relacion.evaluado.email}}</small>
                    <br />
                    {{relacion.evaluado.cargo}}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="field">
          <button class="button" @click="showEvaluator=true">
            <span class="icon">
              <i class="material-icons">list_alt</i>
            </span>
            <span class="title is-5">Evaluador</span>
          </button>
          <div class="box" v-if="mEvaluator== true" style="margin-top:16px;">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{relacion.evaluador.nombre}}</strong>
                    <small>{{relacion.evaluador.email}}</small>
                    <br />
                    {{relacion.evaluador.cargo}}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
    <div class="field">
      <div class="file is-primary">
        <button class="button is-info" style="margin-right:10px;" @click="crearrelacion">Crear</button>
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
            <span class="file-label">Cargar Relaciones .xlsx</span>
          </span>
        </label>
        <button
          class="button is-link"
          style="margin-left:10px; margin-right: 10px;"
          @click="showExamplerela"
        >
          <span class="icon">
            <i class="material-icons">cloud_download</i>
          </span>
          <span>Plantilla de Relaciones</span>
        </button>
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            accept=".xls, .xlsx"
            @change="onFileChange1"
            name="resume"
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="material-icons">cloud_upload</i>
            </span>
            <span class="file-label">Cargar Respuestas .xlsx</span>
          </span>
        </label>
        <button class="button is-link" style="margin-left:10px;" @click="downplantilla">
          <span class="icon">
            <i class="material-icons">cloud_download</i>
          </span>
          <span>Plantilla de Respuestas</span>
        </button>

        <button class="button is-info" style="margin-left:10px;" @click="sendall">
          <span class="icon">
            <i class="material-icons">email</i>
          </span>
          <span>Enviar Todos</span>
        </button>
      </div>
    </div>
    <progress
      v-show="avaceupload > 0"
      class="progress is-info is-small"
      :value="avaceupload"
      max="100"
    ></progress>
    <div class="field is-centered is-grouped">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input is-normal is-focused"
          type="text"
          v-model="search"
          placeholder="Buscar Empleado"
        />
        <span class="icon is-medium is-left">
          <i class="material-icons">search</i>
        </span>
      </p>
    </div>
    <table class="table">
      <tr>
        <th></th>
        <th>Evaluado</th>
        <th>Evaluador</th>
        <th>Relación</th>
        <th>Controles</th>
        <th>Status</th>
      </tr>
      <tr v-for="(k,v) in filteredItems" :key="v">
        <td>{{v+1}}</td>
        <td>
          <span class="title is-5">{{k.evaluado.nombre}}</span>
          <br />
          <span class="subtitle is-6">{{k.evaluado.email}}</span>
        </td>
        <td>
          <span class="title is-5">{{k.evaluador.nombre}}</span>
          <br />
          <span class="subtitle is-6">{{k.evaluador.email}}</span>
        </td>
        <td>{{k.relacion| agregaTilde()}}</td>
        <td>
          <div class="buttons">
            <button class="button is-danger" @click="eliminar(k)">
              <span class="icon">
                <i class="material-icons">delete_forever</i>
              </span>
            </button>
            <button class="button is-info" @click="enviarcorreo(k)">
              <span class="icon">
                <i class="material-icons">email</i>
              </span>
            </button>
            <button class="button is-link" @click="downloadresponses(k.responses)">
              <span class="icon">
                <i class="material-icons">cloud_download</i>
              </span>
            </button>
            <button class="button is-link" @click="linkencuesta(k._id)">
              <span class="icon">
                <i class="material-icons">share</i>
              </span>
            </button>
          </div>
        </td>
        <td>
          <span class="is-capitalized" :class="colortexto(k.status)">{{k.status}}</span>
        </td>
      </tr>
    </table>
    <modalexamplerela :show="showData" @showmodalexamplerela="showmodalexamplerela"></modalexamplerela>
    <modalemployee
      :show="showEmployee"
      @showSelectEmployee="showSelectEmployee"
      @evaluatedEmployee="evaluatedEmployee"
    ></modalemployee>
    <modalevaluator
      :show="showEvaluator"
      @showSelectEvaluator="showSelectEvaluator"
      @evaluatorEmployee="evaluatorEmployee"
    ></modalevaluator>
  </section>
</template>

<script>
import XLSX from "xlsx";
import apiServices from "@/services/yungol-services";
import modalemployee from "@/components/modals/Modalemployee.vue";
import modalevaluator from "@/components/modals/Modalevaluator.vue";
import modalexamplerela from "@/components/modals/Modalexamplerela.vue";
import { mapState } from "vuex";
const filterItems = (query, data) => {
  return data.filter(el => {
    const texto =
      el.evaluado.nombre +
      el.evaluado.email +
      el.evaluador.nombre +
      el.evaluador.email +
      el.relacion +
      el.status;
    if (texto.toLowerCase().indexOf(query.toLowerCase()) > -1) {
      return el;
    }
  });
};
export default {
  data() {
    return {
      mEmployee: false,
      mEvaluator: false,
      showEmployee: false,
      showEvaluator: false,
      showData: false,
      avaceupload: 0,
      fupload: {
        url: ""
      },
      relacion: {
        evaluado: {},
        evaluador: {},
        relacion: ""
      },
      search: "",
      evaluados: [],
      evaluadores: [],
      relaciones: [],
      dataToExport: []
    };
  },
  props: {
    proceso: {
      type: Object
    }
  },
  computed: {
    ...mapState(["idtoken", "modalnotification"]),
    filteredItems: function() {
      return filterItems(this.search, this.relaciones);
    },
    resultnotification() {
      return this.modalnotification.result.aceptar;
    }
  },
  methods: {
    async downplantilla() {
      try {
        const result = await apiServices.post(
          `/plantillarespuestaslider`,
          { procesoid: this.proceso._id },
          { responseType: "blob" }
        );
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement("a");
        link.href = url;
        let ahora = new Date();
        ahora = ahora.toISOString();
        link.setAttribute(`download`, `plantillarespuestas${ahora}.xlsx`); // or any other extension
        document.body.appendChild(link);
        link.click();
      } catch (err) {}
    },
    linkencuesta: function(d) {
      alert(
        "El link de la encuesta es https://app.cincel.com.co/encuesta/" + d
      );
    },

    downloadresponses(d) {
      if(d){
        this.dataToExport = [];
        this.dataToExport.push(d);
        let data = XLSX.utils.json_to_sheet(this.dataToExport);
        const workbook = XLSX.utils.book_new();
        const filename = "Respuestas";
        XLSX.utils.book_append_sheet(workbook, data, filename);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      }
    },
    showExamplerela() {
      this.showData = true;
    },
    showmodalexamplerela() {
      if (this.showData) {
        this.showData = false;
      } else {
        this.showData = true;
      }
    },
    showSelectEmployee() {
      if (this.showEmployee) {
        this.showEmployee = false;
      } else {
        this.showEmployee = true;
      }
    },
    showSelectEvaluator() {
      this.showEvaluator
        ? (this.showEvaluator = false)
        : (this.showEvaluator = true);
    },
    evaluatedEmployee(evaluatedEmployee) {
      this.relacion.evaluado = evaluatedEmployee;
      this.mEmployee = true;
      this.showEvaluator = true;
      
    },
    evaluatorEmployee(evaluatorEmployee) {
      this.relacion.evaluador = evaluatorEmployee;
      this.mEvaluator = true;
    },
    async sendall() {
      let result;
      const d = {
        proceso: this.proceso._id
      };
      try {
        result = await apiServices.post(`/enviarcorreolote`, d);
        // this.datafile = result.data;
        if (result.data) {
          this.$store.dispatch("notify", {
            message: "Correos enviados."
          });
        }
        this.traerelaciones();
      } catch (error) {
        console.log(error);
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
              _this.fupload.url = url;
              const data = {
                url: url,
                proceso: this.proceso._id
              };
              const result = await apiServices.post(
                `/saverelacioneslote`,
                data
              );
              if (result.data) {
                this.traerelaciones();
              }
            } catch (err) {
              console.log("ocurrio un error", err);
            }
          }
        );
      }
    },
    onFileChange1(e) {
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
              _this.fupload.url = url;
              const data = {
                url: url,
                proceso: this.proceso._id
              };
              const result = await apiServices.post(
                `/saveresponseslote`,
                data
              );
              if (result.data) {
                this.traerelaciones();
              }
            } catch (err) {
              console.log("ocurrio un error", err);
            }
          }
        );
      }
    },
    textoenvio(p) {
      if (p === "creado") {
        return "Enviar";
      } else {
        return "Re Enviar";
      }
    },
    async enviarcorreo(item) {
      let result;
      const d = {
        id: item._id
      };
      try {
        result = await apiServices.post(`/enviarcorreo`, d);
        // this.datafile = result.data;
        if (result.data) {
          this.$store.dispatch("notify", {
            message: "Correo enviado con éxito."
          });
        }
        this.traerelaciones();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteRelacion(_this, id) {
      try {
        const result = await apiServices.delete(`/relacion/${id}`);
        if (result.data) {
          _this.traerelaciones();
        }
      } catch (err) {
        console.log("ocurrio un error", err);
      }
    },
    eliminar(inf) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Cuidado !",
          message: "Realmente desea eliminar la relación?",
          clase: "is-danger",
          data: inf._id
        }
      });
    },
    colortexto(p) {
      if (p === "enviado") {
        return "has-text-info";
      } else if (p === "creado") {
        return "has-text-grey";
      } else {
        return "has-text-success";
      }
    },
    async crearrelacion() {
      let result;
      this.relacion.proceso = this.proceso._id;
      if (this.relacion.evaluado.email === this.relacion.evaluador.email) {
        this.relacion.relacion = "Autoevaluacion";
      } else {
        this.relacion.relacion = "Colaborador";
      }
      try {
        result = await apiServices.post(`/createliderrelacion`, this.relacion);
        if (result.data) {
          this.$store.dispatch("notify", {
            message: "Perfecto!. Relacion Creada."
          });
          this.traerelaciones();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async traeempleados() {
      const _this = this;
      _this.evaluados = [];
      _this.evaluadores = [];
      let result;
      try {
        result = await apiServices.get(`/listliderempleados`);
        if (result.data) {
          this.evaluados.push({
            _id: 1,
            nombre: "Evaluado"
          });
          this.evaluadores.push({
            _id: 1,
            nombre: "Evaluador"
          });
          result.data.forEach(el => {
            _this.evaluados.push(el);
            _this.evaluadores.push(el);
          });
          _this.relacion.evaluado = _this.evaluados[0];
          _this.relacion.evaluador = _this.evaluadores[0];
        }
      } catch (err) {
        console.log(err);
      }
    },
    async traerelaciones() {
      this.mEvaluator = false;
      this.mEmployee = false;
      this.relaciones = [];
      let result;
      try {
        result = await apiServices.get(
          `/listliderrelacion/${this.proceso._id}`
        );
        if (result.data) {
          this.relaciones = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    resultnotification(nv, ov) {
      if (nv) {
        this.deleteRelacion(this, this.modalnotification.result.data);
      }
    }
  },
  created() {
    this.traeempleados();
    this.traerelaciones();
  },
  components: {
    modalexamplerela,
    modalemployee,
    modalevaluator
  }
};
</script>