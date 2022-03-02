<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <p class="title">Resumen de Procesos</p>
          <p class="subtitle">
            En esta sección podrá ver los últimos 50 procesos creados de todas
            las empresas en la aplicación.
          </p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="table-container">
          <table class="table is-narrow is-striped">
            <thead>
              <tr>
                <th></th>
                <th>Empresa</th>
                <th>Cargo</th>
                <th>Área</th>
                <th>Grupo Ocupacional</th>
                <th>País</th>
                <th>Ciudad</th>
                <th>Fecha</th>
                <th>Código</th>
                <th>Activo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in procesos" :key="index">
                <td class="has-text-right">{{ index + 1 }}</td>
                <td>
                  {{
                    item.empresa
                      ? item.empresa.nombre
                      : item.usercmtviejo.empresa
                  }}
                </td>
                <td>{{ item.cargo }}</td>
                <td>{{ item.area }}</td>
                <td>
                  {{ item.gocupcmt ? item.gocupcmt.nombre : "N/A" }}
                </td>
                <td>{{ item.pais }}</td>
                <td>{{ item.ciudad }}</td>
                <td>{{ item.fecha | date() }}</td>
                <td>{{ item.codigo }}</td>
                <td>{{ item.activo }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import apiServices from "@/services/yungol-services";
export default {
  data() {
    return {
      procesos: [],
    };
  },
  methods: {
    async findprocess() {
      try {
        const result = await apiServices.get(`/getprocesoscmtall`);
        if (result.data) {
          this.procesos = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.findprocess();
  },
};
</script>