<template>
  <div>
    <div class="dropdown is-right" :class="{ 'is-active': show }">
      <div class="dropdown-trigger">
        <button
          @click="clickinput"
          class="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{{select}}</span>
          <span class="icon is-small">
            <i class="material-icons">keyboard_arrow_down</i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <div class="autocomplete">
            <div class="control">
              <input class="input" v-model="search" type="text" placeholder="Buscar" :id="idsearch" />
            </div>
          </div>
          <a v-for="(item, index) in filteredItems" :key="index" class="dropdown-item">{{item.text}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import functions from "@/helpers/functions";
export default {
  data() {
    return {
      search: "",
      show: false,
      select: "Empresa",
      idsearch: ""
    };
  },
  computed: {
    filteredItems: function() {
      if (this.items) {
        return functions.filterItems(
          this.search,
          this.items,
          [{ cod: "text" }],
          6
        );
      } else {
        return [];
      }
    }
  },
  props: {
    placeholder: {
      type: String
    },
    items: {
      type: Array
    }
  },
  mounted() {
    console.log(this.items);
  },
  methods: {
    clickinput() {
      const _this = this;
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
        setTimeout(function() {
          document.getElementById(_this.idsearch).focus();
        }, 50);
      }
    }
  },
  created() {
    this.idsearch = Math.random()
      .toString(36)
      .substr(2, 9);
  }
};
</script>

<style lang="scss" scoped>
.autocomplete {
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 10px;
}
.dropdown-trigger {
  left: auto;
  right: 0;
}
</style>

