<template>
  <y-vista :vista="vista" :idfrs="idfrs"></y-vista>
</template>

<script>
import apiServices from "@/services/yungol-services";
import yVista from "@/components/informes/Vista.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      vista: [],
      idinforme: null,
      idfrs: null,
    };
  },
  computed: {
    ...mapState(["idtoken", "modalordengraph", "tokenUser"]),
    routestateid() {
      return this.$route.params.id;
    },
    datagraphmodificada() {
      return this.modalordengraph.result;
    },
    onlycmt() {
      const _this = this;
      const claims = [
        "admin",
        "cliente",
        "frs",
        "lider",
        "liderl",
        "ghumana",
        "cmt",
      ];
      let claimsresult = [];
      let iscmt = false;
      for (let index in claims) {
        if (claims[index] === "cmt" && _this.tokenUser[claims[index]]) {
          iscmt = true;
        }
        if (_this.tokenUser[claims[index]]) {
          claimsresult.push(claims[index]);
        }
      }
      if (iscmt && claimsresult.length === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    color(c) {
      const size = {
        "col-md-12": "is-12",
        "col-md-4": "is-4",
        "col-md-7": "is-7",
        "col-md-5": "is-5",
        "col-md-6": "is-6",
      };
      return size[c];
    },
    async traeData(_this) {
      let result;
      try {
        if (_this.$route.params.id) {
          result = await apiServices.get(`/informe/${_this.$route.params.id}`);
        } else {
          result = await apiServices.get(`/informeprincipal`);
        }
        _this.idfrs = result.data.informes;
        _this.idinforme = result.data._id;
        _this.vista = result.data.blocks;
      } catch (err) {
        console.log(err);
      }
    },
    async editData() {
      const _this = this;
      try {
        const data = {
          blocks: this.vista,
          id: _this.idinforme,
        };
        await apiServices.post(`/editinforme`, data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    idtoken(newv, oldv) {
      if (newv) {
        if (this.onlycmt) {
          this.$router.replace({ name: "iniciocmt" });
        } else {
          this.traeData(this);
        }
      }
    },
    routestateid(nv, ov) {
      this.traeData(this);
    },
    datagraphmodificada(nv, ov) {
      if (nv.coordenadas) {
        const _this = this;
        _this.vista.forEach((e) => {
          if (e.id === nv.coordenadas.iditem) {
            e[`columna${nv.coordenadas.columna}`].forEach((e1) => {
              if (e1.id === nv.coordenadas.idsubitem) {
                e1.data = nv.data;
              }
            });
          }
        });
        _this.editData();
      }
    },
  },
  created() {
    if (this.idtoken) {
      if (this.onlycmt) {
        this.$router.replace({ name: "iniciocmt" });
      } else {
        this.traeData(this);
      }
    }
  },
  components: {
    yVista,
  },
};
</script>