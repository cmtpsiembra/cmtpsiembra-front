<template>
  <div id="app">
    <button
      v-if="isAuthenticated"
      class="button is-outlined ybuttonFloat"
      @click="ocultarSide"
      v-bind:style="styleButtonFloat"
    >
      <span class="icon is-small">
        <i class="material-icons">menu</i>
      </span>
    </button>
    <div class="columns">
      <div v-if="isAuthenticated" class="ysidebar ycolumn" v-bind:style="styleObjectSide">
        <y-sidebar :isMovil="isMovil" :isVisible="isVisible" @select="activar"></y-sidebar>
      </div>
      <div class="ycontent ycolumn" v-bind:style="styleObject">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <div class="pageloader" v-bind:class="{ 'is-active': loading }">
      <span class="title"></span>
    </div>
    <div class="preloader" v-bind:class="{ 'is-active': loading1 }" v-bind:style="styleObjectloading">
      <img src="@/assets/loadingcincel.svg"/>
    </div>
    <y-modal></y-modal>
    <y-modalinforme></y-modalinforme>
    <y-modalnotification></y-modalnotification>
    <y-modalordengraph></y-modalordengraph>
  </div>
</template>

<script>
import ySidebar from "@/components/core/Sidebar.vue";
import yModal from "@/components/modals/Modal.vue";
import { mapState } from "vuex";
import yModalinforme from "@/components/modals/Modalinforme.vue";
import yModalnotification from "@/components/modals/Modalnotification.vue";
import yModalordengraph from "@/components/modals/Modalordengraph.vue";

export default {
  name: "app",
  data() {
    return {
      menu: [],
      isVisible: true,
      isMovil: false,
      fullwidth: false,
      width: null
    };
  },
  computed: {
    ...mapState(["isAuthenticated", "user", "empresa", "loading", "loading1", "isOculto"]),
    styleObject() {
      let d = {};
      if (this.isAuthenticated) {
        if (this.isMovil) {
          d["margin-left"] = 0;
          d["transition"] = "0.3s all ease";
        } else {
          if (this.isOculto) {
            d["margin-left"] = "196px";
            d["transition"] = "0.3s all ease";
          } else {
            d["margin-left"] = 0;
            d["transition"] = "0.3s all ease";
          }
        }
      } else {
        d["margin-left"] = 0;
        d["transition"] = "0.3s all ease";
      }
      return d;
    },
    styleObjectloading() {
      let d = {};
      if (this.isAuthenticated) {
        if (this.isMovil) {
          d["margin-left"] = 0;
          d["width"] = this.width+'px';
        } else {
          if (this.isOculto) {
            d["margin-left"] = "196px";
            d["width"] = (this.width - 196)+'px';
          } else {
            d["margin-left"] = 0;
            d["width"] = this.width+'px';
          }
        }
      } else {
        d["margin-left"] = 0;
        d["width"] = this.width+'px';
      }
      return d;
    },
    styleObjectSide() {
      let d = {};
      if (this.isOculto) {
        d["margin-left"] = "0";
        d["transition"] = "0.3s all ease";
      } else {
        d["margin-left"] = "-201px";
        d["transition"] = "0.3s all ease";
      }
      return d;
    },
    styleButtonFloat() {
      let d = {};
      if (this.isOculto) {
        d["margin-left"] = "214px";
        d["transition"] = "0.3s all ease";
      } else {
        d["margin-left"] = "14px";
        d["transition"] = "0.3s all ease";
      }
      return d;
    }
  },
  methods: {
    functionWidth(n) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.width = w;
      this.$store.commit('changeheight',h);
      this.$store.commit('changewidth',w);
      if (w < 769) {
        n.isMovil = true;
        this.$store.commit("changemovil", true);
      } else {
        n.isMovil = false;
        this.$store.commit("changemovil", false);
      }
    },
    activar: function(a) {
      if (a.mostrar) {
        a.mostrar = false;
      } else {
        a.mostrar = true;
      }
      a.active = true;
      this.menu.forEach(function(k) {
        k.menus.forEach(function(k1) {
          if (a !== k1) {
            k1.active = false;
          }
          if (k1.subcategorias) {
            k1.subcategorias.forEach(function(k2) {
              if (a !== k2) {
                k2.active = false;
              }
            });
          }
        });
      });
    },
    mostrarBurger: function() {
      if (this.isVisible) {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    },
    ocultarSide() {
      console.log("le dio click");
      this.$store.commit("ocultarSide");
    },
    myEventHandler(e) {
      this.functionWidth(this);
    }
  },
  mounted: function() {
    this.muestraMenu = true;
    this.functionWidth(this);
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
    if (this.$store.state.isLogged) {
      this.$store.dispatch("refreshAuth");
    }
  },
  destroyed: function() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  components: {
    // yFooter,
    ySidebar,
    yModal,
    yModalinforme,
    yModalnotification,
    yModalordengraph
  }
};
</script>

<style lang='scss'>

@import "./scss/main.scss";

@media print {
  .ysidebar {
    display: none !important;
  }
  .ybuttonFloat {
    display: none !important;
  }
  .pageloader {
    display: none !important;
  }
}
.ysidebar {
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 200px;
  background-color: $dark;
  min-height: 100vh;
  box-shadow: 5px 0px 13px 3px rgba(0, 0, 0, 0.1);
  //box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  // border-right: 1px solid rgba(0, 0, 0, 0.07);
}
.ycontent {
  // margin-left: 240px;
  margin-top: 12px;
  background-color: #ffffff;
  min-height: 100vh;
}
.ycolumn {
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
}
.ybuttonFloat {
  top: 10px;
  position: fixed;
  z-index: 31;
  margin-left: 214px;
  box-shadow: 5px 0px 13px 3px rgba(0, 0, 0, 0.1);
}
.preloader {
  align-items: center;
  background: rgba(255, 255, 255,0.7);
  display: none;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  z-index: 29;
}
.preloader.is-active {
  display: flex;
}
</style>
