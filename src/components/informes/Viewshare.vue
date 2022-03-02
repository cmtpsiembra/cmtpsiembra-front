<template>
  <div>
    <section class="section" v-if="!isCorrect">
      <div class="container">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-large" v-model="password" @keyup.enter="enviar" type="password" placeholder="Contraseña" />
          </div>
          <div class="control">
            <a class="button is-primary is-large" @click="enviar">Enviar</a>
          </div>
        </div>
      </div>
    </section>
    <y-vista v-if="isCorrect" :vista="vista"></y-vista>
  </div>
</template>

<script>
import apiServices from "@/services/yungol-services";
import yVista from "@/components/informes/Vista.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      vista: [],
      isCorrect: false,
      password: ''
    };
  },
  computed: {
    ...mapState(["idtoken"]),
    routestateid() {
      return this.$route.params.id;
    }
  },
  methods: {
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
    async enviar() {
      const _this = this;
      let result;

      try {
        if (_this.$route.params.id) {
          const data = {
            id: _this.$route.params.id,
            password: _this.password
          };
          result = await apiServices.post(`/informebyidwithpassword`, data);
        }
        _this.vista = result.data.blocks;
        if (_this.vista.length > 0) {
          _this.isCorrect = true;
        } else {
          _this.isCorrect = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async traeData(_this) {
      let result;
      try {
        if (_this.$route.params.id) {
          result = await apiServices.get(`/informe/${_this.$route.params.id}`);
        } else {
          result = await apiServices.get(`/informeprincipal`);
        }
        _this.vista = result.data.blocks;
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    idtoken(newv, oldv) {
      if (newv) {
        this.traeData(this);
      }
    },
    routestateid(nv, ov) {
      this.traeData(this);
    }
  },
  created() {
    if (this.idtoken) {
      this.traeData(this);
    }
  },
  components: {
    yVista
  }
};
</script>