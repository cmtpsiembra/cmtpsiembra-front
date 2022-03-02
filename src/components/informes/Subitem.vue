<template>
  <div>
    <div
      v-if="subitem.tipo == 'title'"
      class="box has-text-centered is-shadowless"
      :style="color(subitem.data.color)"
    >{{subitem.data.texto}}</div>
    <div v-if="subitem.tipo == 'titulo'" class="has-text-centered titulo">
      <h1 class="title is-1">{{subitem.data.titulo}}</h1>
      <h1 class="subtitle is-5">{{subitem.data.subtitulo}}</h1>
    </div>
    <div v-if="subitem.tipo == 'card'" class="box">
      <h1 class="title is-4">{{subitem.data.title}}</h1>
      <h1 class="subtitle is-6 has-text-grey">{{subitem.data.subtitle}}</h1>
      <p>{{subitem.data.texto}}</p>
    </div>
    <div v-if="subitem.tipo == 'images'">
      <img class="imagen" :src="subitem.data.img" width="100%" />
    </div>
    <div v-if="subitem.tipo == 'files'" class="margin-top">
      <ul>
        <li v-for="(file, index) in subitem.data.file" :key="index">
          <a :href="file.url" v-if="subitem.data.file" target="_blank">
            <span class="icon icon-lista">
              <i class="material-icons">attach_file</i>
            </span>
            <span class="icon-listas">{{file.name}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div v-if="subitem.tipo == 'timeline'" class="time">
      <div class="timeline">
        <div class="timeline-item" v-for="(time, indextime) in subitem.timeline" :key="indextime">
          <div class="timeline-marker is-info is-icon">
            <i class="material-icons">{{time.icon}}</i>
          </div>
          <div class="timeline-content">
            <p class="heading">{{time.data.title}}</p>
            <p>{{time.data.texto}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="subitem.tipo == 'graphic'" class="box">
      <button class="button is-info is-small" @click="showDataGraphic">Ver Datos</button>
      <button class="button is-link is-small" @click="modificar(subitem.data)">Modificar</button>

      <br />
      <br />
      <y-graph :datagraph="sindecimales(subitem.data)" :cambio="cambio" :height="height"></y-graph>
    </div>
    <modalgraph
      :show="showData"
      :data-graphic="sindecimales(subitem.data)"
      @showmodalgraph="showmodalgraph"
    ></modalgraph>
  </div>
</template>

<script>
import yGraph from "@/components/dashboard/Graph.vue";
import modalgraph from "@/components/modals/Modalgraph.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      cambio: 0,
      height: 140,
      showData: false
    };
  },
  computed: {
    ...mapState(["isMovil"]),
    datasubitem() {
      if (this.subitem && this.subitem.data) {
        return this.subitem.data.data;
      }
      return false;
    }
  },
  props: {
    subitem: {
      type: Object
    },
    columna:{
      type: Number
    },
    iditem: {
      type: Number
    }
  },
  methods: {
    modificar(d) {
      console.log('el dato del subitem es ',d);
      const _this = this;
      // console.log('ejecuta modificar');
      const newObj = Object.assign({}, d);
      newObj.coordenadas = {
        iditem: _this.iditem,
        columna: _this.columna,
        idsubitem: _this.subitem.id
      }
      this.$store.commit("changeordengraph", {
        show: true,
        info: newObj
      });
    },
    sindecimales(d) {
      if (d && d.data) {
        const f = JSON.parse(JSON.stringify(d));
        f.data = [];
        d.data.forEach(k => {
          const a = [];
          k.forEach(k1 => {
            a.push(Math.round(k1 * 100) / 100);
          });
          f.data.push(a);
        });
        return f;
      }
    },
    showmodalgraph() {
      if (this.showData) {
        this.showData = false;
      } else {
        this.showData = true;
      }
    },
    color(c) {
      const colors = {
        "#15b7b9": "#ff7e67"
      };
      return {
        "background-color": colors[c["background-color"]]
          ? colors[c["background-color"]]
          : "#15b7b9",
        color: c["color"],
        "font-size": "28px"
      };
    },
    showDataGraphic() {
      console.log('ejecuta show data graphic')
      this.showData = true;
    }
  },
  created() {
    if (this.isMovil) {
      this.height = 350;
    } else {
      this.height = 140;
    }
  },
  watch: {
    datasubitem(nv, ov) {
      this.cambio++;
    },
    isMovil(nv, ov) {
      this.cambio++;
      if (nv) {
        this.height = 350;
      } else {
        this.height = 140;
      }
    }
  },
  components: {
    yGraph,
    modalgraph
  }
};
</script>

<style lang="scss" scoped>
.titulo {
  padding-top: 30px;
}
.imagen {
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  margin-top: 30px;
}
.box {
  margin-top: 30px;
}
.time {
  margin-top: 30px;
}
.icon-lista {
  vertical-align: bottom;
}
</style>


