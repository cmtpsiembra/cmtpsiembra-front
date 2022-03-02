<template>
  <section class="section">
    <h1 class="title">Empleados</h1>

    <div class="field">
      <div class="file is-primary is-large">
        <button
          class="button is-info is-large"
          style="margin-right:10px;"
          @click="creareditarempleado"
        >
          <span class="icon">
            <i class="material-icons">add_circle</i>
          </span>
          <span>{{textboton}}</span>
        </button>
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            accept=".xls, .xlsx"
            @change="onFileChange"
            name="resume"
          />
          <span class="file-cta" v-if="createState">
            <span class="file-icon">
              <i class="material-icons">cloud_upload</i>
            </span>
            <span class="file-label">Cargar</span>
          </span>
        </label>

        <button
          class="button is-link is-large"
          style="margin-left:10px;"
          v-if="createState"
          @click="showExampleempl"
        >
          <span class="icon">
            <i class="material-icons">cloud_download</i>
          </span>
          <span>Plantilla</span>
        </button>
      </div>
    </div>
    <div class="field" v-if="createState == true">
      <div class="field">
        <div class="field">
          <span
            class="subtitle"
          >Introduce la siguiente informacion para crear un empleado o carga un archivo</span>
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="empleado.email" class="input is-large" type="email" placeholder="Correo" />
          <span class="icon is-small is-left">
            <i class="material-icons">email</i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="empleado.nombre" class="input is-large" type="text" placeholder="Nombre" />
          <span class="icon is-small is-left">
            <i class="material-icons">face</i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="empleado.cargo" class="input is-large" type="text" placeholder="Cargo" />
          <span class="icon is-small is-left">
            <i class="material-icons">directions_walk</i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input
            v-model="empleado.dependencia"
            class="input is-large"
            type="text"
            placeholder="Dependencia"
          />
          <span class="icon is-small is-left">
            <i class="material-icons">home_work</i>
          </span>
        </div>
      </div>
    </div>
    <progress
      v-show="avaceupload > 0"
      class="progress is-info is-small"
      :value="avaceupload"
      max="100"
    ></progress>

    <hr />
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
        <th>Correo</th>
        <th>Nombre</th>
        <th>Cargo</th>
        <th>Dependencia</th>
        <th>Controles</th>
      </tr>
      <tr v-for="(k,v) in filteredItems" :key="v">
        <td>{{v+1}}</td>
        <td>{{k.email}}</td>
        <td>{{k.nombre}}</td>
        <td>{{k.cargo}}</td>
        <td>{{k.dependencia}}</td>
        <td>
          <button class="button is-light" @click="edit(k)">
            <span class="icon">
              <i class="material-icons">edit</i>
            </span>
          </button>
          <button class="button is-danger" @click="eliminar(k)">
            <span class="icon">
              <i class="material-icons">delete_forever</i>
            </span>
          </button>
        </td>
      </tr>
    </table>
    <modalexampleempl :show="showData" @showmodalexampleempl="showmodalexampleempl"></modalexampleempl>
  </section>
</template>

<script>
import apiServices from "@/services/yungol-services";
import modalexampleempl from "@/components/modals/Modalexampleempl.vue";
import { mapState } from "vuex";
const filterItems = (query, data) => {
  return data.filter(el => {
    const texto = el.email + el.nombre + el.cargo + el.dependencia + el.proceso;
    if (texto.toLowerCase().indexOf(query.toLowerCase()) > -1) {
      return el;
    }
  });
};
export default {
  data() {
    return {
      createState: false,
      showData: false,
      avaceupload: 0,
      fupload: {
        url: ""
      },
      empleado: {
        email: "",
        nombre: "",
        cargo: "",
        dependencia: "",
        proceso: "",
        _id: null
      },
      search: "",
      listempleados: []
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
      return filterItems(this.search, this.listempleados);
    },
    resultnotification() {
      return this.modalnotification.result.aceptar;
    },
    textboton() {
      console.log(this.empleado);
      if (this.empleado._id) {
        return "Editar";
      } else {
        return "Crear";
      }
    }
  },
  methods: {
    showExampleempl() {
      this.showData = true;
    },
    showmodalexampleempl() {
      if (this.showData) {
        this.showData = false;
      } else {
        this.showData = true;
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
                url: url
              };
              const result = await apiServices.post(`/saveempleadoslote`, data);
              if (result.data) {
                this.traeempleados();
              }
            } catch (err) {
              console.log("ocurrio un error", err);
            }
          }
        );
      }
    },
    edit(d) {
      console.log("el empleado es", d);
      this.empleado.email = d.email;
      this.empleado.nombre = d.nombre;
      this.empleado.cargo = d.cargo;
      this.empleado.dependencia = d.dependencia;
      this.empleado.proceso = d.proceso;
      this.empleado._id = d._id;
    },
    async deleteEmpleado(_this, id) {
      try {
        const result = await apiServices.delete(`/empleado/${id}`);
        if (result.data) {
          if (result.data.message === "eliminar relaciones") {
            this.$store.dispatch("notify", {
              message:
                "No se elimino el Empleado. Debe eliminar primero las relaciones.",
              type: "is-warning",
              duration: 4000,
              position: "top-center"
            });
          }
          this.traeempleados();
        }
      } catch (err) {
        console.log("ocurrio un error", err);
      }
    },
    eliminar(inf) {
      this.$store.commit("changenotificationmodal", {
        info: {
          title: "Cuidado !",
          message: "Realmente desea eliminar el empleado?",
          clase: "is-danger",
          data: inf._id
        }
      });
    },
    async creareditarempleado() {
      this.createState = true;
      let result;
      this.empleado.proceso = this.proceso._id;
      try {
        if (this.empleado._id) {
          result = await apiServices.put(`/editliderempleado`, this.empleado);
        } else if (this.createState === true && this.empleado.email !== "") {
          result = await apiServices.post(
            `/createliderempleado`,
            this.empleado
          );
        }

        if (result.data) {
          this.$store.dispatch("notify", {
            message: "Perfecto!. Empleado Creado."
          });
          this.empleado = {
            email: "",
            nombre: "",
            cargo: "",
            dependencia: "",
            proceso: "",
            _id: null
          };
          this.traeempleados();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async traeempleados() {
      this.listempleados = [];
      let result;
      try {
        result = await apiServices.get(`/listliderempleados`);
        if (result.data) {
          this.listempleados = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    resultnotification(nv, ov) {
      if (nv) {
        this.deleteEmpleado(this, this.modalnotification.result.data);
      }
    }
  },
  created() {
    this.traeempleados();
  },
  components: {
    modalexampleempl
  }
};
</script>