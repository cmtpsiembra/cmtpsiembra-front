<template>
  <div>
    <div class="hero">
      <router-link :to="{ name: 'landing'}" class="ybrand">
        <img src="@/assets/logo.png" width="159px" />
      </router-link>
      <router-link class="yempresa" :to="{ name: 'empresas'}">
        <span @click="clicCel">
          <i class="material-icons icon-lista">location_city</i>
          <small>{{empresa.nombre | textempresa()}}</small>
        </span>
      </router-link>
      <div class="menu-overflow" v-bind:style="styleObject1" id="style-1">
        <aside class="menu menu-sidebar" >
          <div class="margin-top" v-for="k in menu " :key="k.$index" @click="clicCel">
            <p class="menu-label">{{k.titulo}}</p>
            <ul class="menu-list">
              <li v-for="k1 in k.menus" :key="k1.$index">
                <router-link :to="{ name: k1.ruta}" class="has-vcentered-content">
                  <span>
                    <i v-show="k1.icon" class="material-icons icon-lista">{{k1.icon}}</i>
                  </span>
                  <span class="text-lista">&nbsp; {{k1.title}}</span>
                  <span class="icon is-pulled-right" v-show="k1.subcategorias">
                    <i class="material-icons" v-show="!k1.mostrar">expand_more</i>
                    <i class="material-icons" v-show="k1.mostrar">expand_less</i>
                  </span>
                </router-link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
    <nav v-if="isAuthenticated" class="navbar yfootSide">
      <div class="navbar-brand">
        <router-link v-show="isAuthenticated" :to="{ name: 'perfil' }" class="navbar-item">
          <i class="material-icons">face</i>&nbsp; Perfil
        </router-link>
        <router-link v-show="isAuthenticated" :to="{ name: 'logout' }" class="navbar-item">
          <i class="material-icons">meeting_room</i>&nbsp; Salir
        </router-link>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapState } from "vuex";
import rutas from "@/routes";
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      menu: []
    };
  },
  props: {
    isVisible: {
      type: Boolean
    },
    isMovil: {
      type: Boolean
    }
  },
  computed: {
    ...mapState(["isAuthenticated", "empresa", "tokenUser","windowheight"]),
    styleObject() {
      let d = {};
      if (this.isMovil) {
        d = {};
      } else {
        d.position = "fixed";
        d.top = 0;
      }
      return d;
    },
    styleObject1() {
      let d = {};
      const w = this.windowheight - 190;
      d.height =  `${w}px`;
      return d;
    }
  },
  watch: {
    tokenUser(oldv, newv) {
      this.constuyeMenu();
    },
    isMovil() {
      console.log(this.isMovil);
    }
  },
  methods: {
    logout() {
      this.$router.push("landing");
      firebase
        .auth()
        .signOut()
        .then(function() {
          localStorage.removeItem("isLogged");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clicCel() {
      if (this.isMovil) {
        this.$store.commit("ocultarSide");
      }
    },
    constuyeMenu() {
      this.menu = [];
      const menu = {
        sections: []
      };
      rutas.options.routes.forEach(k => {
        if (this.tokenUser) {
          if (k.menu) {
            let control = false;
            k.menu.scope.forEach(k1 => {
              if (this.tokenUser[k1]) {
                control = true;
              }
            });
            if (control) {
              if (menu.sections.indexOf(k.menu.section) === -1) {
                menu.sections.push(k.menu.section);
                menu[k.menu.section] = {
                  titulo: k.menu.section,
                  menus: []
                };
                if (k.meta.isPublic) {
                  menu[k.menu.section].menus.push({
                    title: k.menu.title,
                    ruta: k.name,
                    icon: k.menu.icon
                  });
                }
                if (!k.meta.isPublic && this.isAuthenticated) {
                  menu[k.menu.section].menus.push({
                    title: k.menu.title,
                    ruta: k.name,
                    icon: k.menu.icon
                  });
                }
              } else {
                if (k.meta.isPublic) {
                  menu[k.menu.section].menus.push({
                    title: k.menu.title,
                    ruta: k.name,
                    icon: k.menu.icon
                  });
                }
                if (!k.meta.isPublic && this.isAuthenticated) {
                  menu[k.menu.section].menus.push({
                    title: k.menu.title,
                    ruta: k.name,
                    icon: k.menu.icon
                  });
                }
              }
            }
          }
        }
      });
      menu.sections.forEach(k => {
        if (menu[k].menus.length > 0) {
          this.menu.push(menu[k]);
        }
      });
    }
  },
  mounted() {
    this.constuyeMenu();
  }
};
</script>

<style lang='scss' scoped>
@import "../../scss/main.scss";
.menu-overflow {
  overflow: auto;
}
#style-1::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
	// border-radius: 3px;
	background-color: $dark;
}
#style-1::-webkit-scrollbar
{
	width: 6px;
	background-color: $dark;
}
#style-1::-webkit-scrollbar-thumb
{
	// border-radius: 3px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #fff;
}
.menu-sidebar {
  margin-left: 10px;
  margin-right: 10px;
}
.menu-list a {
  color: $light;
}
.menu-label {
  color: $light;
}
.menu-list a.router-link-active {
  background-color: $primary;
  color: #ffffff;
}
.text-lista {
  vertical-align: 0.15em;
}
.navbar-item {
  color: $light;
}
.yfootSide {
  background-color: $dark !important;
  width: 200px;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 30;
  bottom: 0;
  // border-right: 1px solid rgba(0,0,0,.07);
}
.navbar {
  min-width: 100px;
}
.ybuttonExit {
  border-radius: 2px;
}
.ybrand {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 18px;
  background-color: $dark;
}
a.yempresa {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  color: #f5f5f5;
  border-radius: 0;
  border-bottom-color: #dbdbdb;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  :hover {
    color: #ff7e67;
  }
}
.icon-lista {
  vertical-align: bottom;
}
</style>


