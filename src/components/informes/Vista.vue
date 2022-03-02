<template>
  <section class="section">
    <div class="container">
      <div v-for="(item, index) in vista" :key="index">
        <div v-if="!item.isgraficador" class="columns">
          <div class="column" v-if="item.tColumna1" :class="color(item.tColumna1)">
            <div v-for="(subitem, subindex) in item.columna1" :key="subindex">
              <y-subitem :subitem="subitem" :columna="1" :iditem="item.id"></y-subitem>
            </div>
          </div>
          <div class="column" v-if="item.tColumna2" :class="color(item.tColumna2)">
            <div v-for="(subitem, subindex) in item.columna2" :key="subindex">
              <y-subitem :subitem="subitem" :columna="2" :iditem="item.id"></y-subitem>
            </div>
          </div>
          <div class="column" v-if="item.tColumna3" :class="color(item.tColumna3)">
            <div v-for="(subitem, subindex) in item.columna3" :key="subindex">
              <y-subitem :subitem="subitem" :columna="3" :iditem="item.id"></y-subitem>
            </div>
          </div>
        </div>
        <div v-if="item.isgraficador">
          <y-graphiccreatorfrs :idfrs="idfrs"></y-graphiccreatorfrs>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ySubitem from "@/components/informes/Subitem.vue";
import yGraphiccreatorfrs from "@/components/informes/Graphiccreatorfrs.vue"

export default {
  props: {
    vista: {
      type: Array
    },
    idfrs: {
      type: String
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
    }
  },
  components: {
    ySubitem,
    yGraphiccreatorfrs
  }
};
</script>