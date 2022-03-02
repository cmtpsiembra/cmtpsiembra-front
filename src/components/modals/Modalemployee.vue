<template>
  <div class="modal" v-bind:class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <h1 class="title">Seleccione el evaluado</h1>
        <p class="modal-card-title"></p>
        <div class="buttons has-addons is-right">
          <button class="delete is-right" @click="closeModal"></button>
        </div>
      </header>
      <section class="modal-card-body">
        <div class="control has-icons-left has-icons-right">
          <input class="input is-large" type="text" v-model="search" v-on:keyup.enter="find" placeholder="Buscar" />
          <span class="icon is-medium is-left">
            <i class="material-icons">search</i>
          </span>
          <span class="icon is-medium is-right">
            <i class="fas fa-check fa-lg"></i>
          </span>
        </div>
        <hr />
        <div class="container">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th></th>
                <th>Empleado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, v) in employees" :key="v">
                <td>{{v + (pagination.inicial*20) +1 }}</td>
                <td>
                  <h5 class="title is-5">{{item.nombre}}</h5>
                  <h6 class="subtitle is-6">{{item.cargo}}</h6>
                </td>
                <td>
                  <a @click="employeeSelected(item)" class="button is-link">Seleccionar</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav class="pagination" role="navigation" aria-label="pagination">
          <a class="pagination-previous" @click="previous">Anterior</a>
          <a class="pagination-previous">{{pagination.inicial+1}}</a>
          <a class="pagination-next" @click="next">Siguiente</a>
          <ul class="pagination-list">
            <li>
              <a
                class="pagination-link"
                :class="pagination.inicial === 0 ? 'is-current' : ''"
                aria-label="Page 1"
                aria-current="page"
                @click="ir(0)"
              >1</a>
            </li>
            <li v-show="pagination.total > 1">
              <a
                class="pagination-link"
                :class="pagination.inicial === 1 ? 'is-current' : ''"
                aria-label="Goto page 2"
                @click="ir(1)"
              >2</a>
            </li>
            <li v-show="pagination.total > 2">
              <a
                class="pagination-link"
                :class="pagination.inicial === 2 ? 'is-current' : ''"
                aria-label="Goto page 3"
                @click="ir(2)"
              >3</a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-show="pagination.total > 5">
              <a
                class="pagination-link"
                :class="pagination.inicial === pagination.mitad -1 ? 'is-current' : ''"
                @click="ir(pagination.mitad -1)"
              >{{pagination.mitad}}</a>
            </li>
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            <li v-show="pagination.total > 4">
              <a
                class="pagination-link"
                :class="pagination.inicial === pagination.total-1 ? 'is-current' : ''"
                aria-label="Goto page 47"
                @click="ir(pagination.total-1)"
              >{{pagination.total}}</a>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  </div>
</template>
<script>
import apiServices from "@/services/yungol-services";
export default {
  data() {
    return {
      search: "",
      employees: [],
      pagination: {
        count: 0,
        inicial: 0,
        total: 0,
        mitad: 0,
      },
      evaluados: [],
      evaluadores: [],

    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    employeeSelected(employee) {
      this.$emit("evaluatedEmployee", employee);
      this.closeModal();
    },
    closeModal() {
      this.$emit("showSelectEmployee", false);
    },
    next() {
      if (this.pagination.inicial + 1 < this.pagination.total) {
        this.pagination.inicial++;
        this.find();
      }
    },
    previous() {
      if (this.pagination.inicial > 0) {
        this.pagination.inicial--;
        this.find();
      }
    },
    ir(n) {
      this.pagination.inicial = n;
      this.find();
    },
    async find() {
      const _this = this;
      const f = {
        search: _this.search,
        inicial: _this.pagination.inicial * 20,
      };
      let result;
      try {
        result = await apiServices.post(`/searchemployee`, f);
        

        _this.employees = result.data.data;
        _this.pagination.count = result.data.count;
        _this.pagination.total = Math.ceil(_this.pagination.count / 20);
        _this.pagination.mitad = Math.round(
          (_this.pagination.total - 3) / 2 + 3
        );
        console.log("empleados search: ", _this.employees);
        if (_this.employees.length === 0) {
          _this.pagination.inicial = 0;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    search(nv,ov){
      this.find();
    }
  },
  created() {
    this.find();
  },
};
</script>