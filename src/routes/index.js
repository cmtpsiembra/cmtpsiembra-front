import Vue from "vue";
import Router from "vue-router";
import Empresas from "@/components/empresas/Empresas.vue";
import Createcompany from "@/components/empresas/Createcompany.vue";
import NotAllowed from "@/components/core/NotAllowed.vue";
import Login from "@/components/core/Login.vue";
import Perfil from "@/components/core/Perfil.vue";
import Landing from "@/components/core/Landing.vue";
import UserMenu from "@/components/users/UserMenu.vue";
import Users from "@/components/users/Users.vue";
import AddUser from "@/components/users/AddUser.vue";
import EditUser from "@/components/users/EditUser.vue";
import Logout from "@/components/core/Logout.vue";
import Iniciocmt from "@/components/cmt/Inicio.vue";
import Cmtprocesos from "@/components/cmt/Cmtprocesos.vue";
import Cmtprocesosr from "@/components/cmt/Cmtprocesosr.vue";
import Cmtconfiguracion from "@/components/cmt/Cmtconfiguracion.vue";
import Editcreateprocesscmt from "@/components/cmt/Editcreaprocess.vue";
import Aspirantscmt from "@/components/cmt/Aspirantscmt.vue";
import Listaspirantescmt from "@/components/cmt/Listaspirantscmt.vue";
import Resultadoaspirante from "@/components/cmt/Resultadoaspirante.vue";
import Resultadoproceso from "@/components/cmt/Resultadoproceso.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: (to) => {
      return {
        name: "landing",
        meta: {
          isPublic: true,
        },
      };
    },
  },
  {
    path: "/landing",
    name: "landing",
    component: Landing,
    meta: {
      isPublic: true,
    },
  },
  {
    path: "/notAllowed",
    component: NotAllowed,
    name: "notAllowed",
    meta: {
      isPublic: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      isPublic: true,
    },
  },
  {
    path: "/perfil",
    name: "perfil",
    component: Perfil,
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/empresas",
    component: Empresas,
    name: "empresas",
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/createcompany",
    component: Createcompany,
    name: "createcompany",
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/editcompany/:id",
    component: Createcompany,
    name: "editcompany",
    meta: {
      isAuthenticated: true,
    },
  },

  // ******* Aqui estan las rutas del CMT **********
  {
    path: "/cmt",
    component: Iniciocmt,
    menu: {
      section: "CMT",
      icon: "home",
      title: "Inicio",
      scope: ["cmt"],
    },
    name: "iniciocmt",
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/cmtprocesos",
    component: Cmtprocesos,
    menu: {
      section: "CMT",
      icon: "format_list_bulleted",
      title: "Procesos",
      scope: ["cmt"],
    },
    name: "cmtprocesos",
    meta: {
      isAuthenticated: true,
    },
  },

  {
    path: "/creaprocesscmt",
    component: Editcreateprocesscmt,
    name: "creaprocesscmt",
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/editprocesscmt/:id",
    component: Editcreateprocesscmt,
    name: "editprocesscmt",
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/aspirantescmt/:procesoid",
    component: Listaspirantescmt,
    name: "listaspirantescmt",
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/resultadoaspirantecmt/:aspiranteid",
    component: Resultadoaspirante,
    name: "resultadoaspirantecmt",
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/resultadoprocesocmt/:procesoid",
    component: Resultadoproceso,
    name: "resultadoprocesocmt",
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/loginPro",
    name: "aspirantscmt",
    component: Aspirantscmt,
    meta: {
      isPublic: true,
    },
  },

  // ********* Aqui terminan las rutas del CMT ********
  {
    path: "/cmtprocesosr",
    component: Cmtprocesosr,
    menu: {
      section: "Admin",
      icon: "article",
      title: "Resumen",
      scope: ["admin"],
    },
    name: "cmtprocesosr",
    meta: {
      isAuthenticated: true,
    },
  },

  {
    path: "/usermenu",
    component: UserMenu,
    name: "usermenu",
    menu: {
      section: "Admin",
      icon: "group",
      title: "Usuarios",
      scope: ["admin"],
    },
    meta: {
      isAuthenticated: true,
    },
    children: [
      {
        path: "/usermenu/adduser",
        component: AddUser,
        scope: ["admin"],
        name: "usermenu.adduser",
        meta: {
          isAuthenticated: true,
        },
      },
      {
        path: "/usermenu/users",
        component: Users,
        name: "usermenu.users",
        scope: ["admin"],
        meta: {
          isAuthenticated: true,
        },
      },
    ],
  },
  {
    path: "/cmtconfiguracion",
    component: Cmtconfiguracion,
    menu: {
      section: "Admin",
      icon: "settings",
      title: "Configuración",
      scope: ["admin"],
    },
    name: "cmtconfiguracion",
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/users/edit/:id",
    component: EditUser,
    name: "edituser",
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
    meta: {
      isAuthenticated: true,
    },
  },

  // Default
  {
    path: "*",
    redirect: "/landing",
  },
];

const router = new Router({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  let loggedin = localStorage.getItem("loggedin");
  loggedin = JSON.parse(loggedin);
  if (to.matched.some((record) => record.meta.isAuthenticated)) {
    if (!loggedin) {
      console.log("se va para landing");
      next("landing");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
