<template>
  <div class="modal" v-bind:class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"></p>
        <div class="buttons has-addons is-right">
          <button class="delete is-right" aria-label="close" @click="closeModal"></button>
        </div>
      </header>
      <section class="modal-card-body">
        <h1 class="title">Instrucciones para subir archivo de creación de los empleados</h1>
        <br />
        <h2 class="subtitle">
          <p>El archivo de creación de empleados se utiliza para configurar en el sistema la información básica de los participantes de la evaluación. 
            Para subir el archivo de Excel con los datos de los empleados se deben llenar 4 columnas, los encabezados de cada una se deben nombrar así: la columna A nombre, la columna B correo, la columna C cargo y, finalmente, la columna D dependencia, estas cuatro palabras deben ir escritas en minúscula. 
            Tener en cuenta las siguientes recomendaciones para diligenciar el archivo:
          </p>
        </h2>
        <h2 class="subtitle"><ul>- Cada columna debe diligenciarse con la información solicitada (en los encabezados) de cada participante.</ul>
        <ul>- Es importante que ninguna casilla quede en blanco en ninguna de las dos columnas.</ul>
        <ul>- Para evitar inconvenientes los archivos no deben tener formatos especiales en sus celdas.</ul></h2>
        <br />
        <center>
          <img src="@/assets/ejemempleado.png" width="700px" style="margin-top:2px;" />
        </center>
        <br />
        <h2 class="subtitle">
          <p>
            En la parte inferior izquierda encontrarás el botón – Descargar Ejemplo – allí podrás ver cómo es la estructura que se debe usar para subir el archivo con los empleados en Excel.
          </p>
          <br />
        </h2>

        <footer>
          <button class="button is-link is-large" style="margin-left:10px;" @click="exportExcelXls">
            <span class="icon">
              <i class="material-icons">cloud_download</i>
            </span>
            <span>Descargar Ejemplo</span>
          </button>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      dataToExport: [
        {
          nombre: "nombre apellido ",
          correo: "correoempleado01@correo.com",
          cargo: "auxiliar",
          dependencia: "administrativa"
        },
        {
          nombre: "nombre apellido ",
          correo: "correoempleado02@correo.com",
          cargo: "gerente",
          dependencia: "gerencia"
        },
        {
          nombre: "nombre apellido ",
          correo: "correoempleado03@correo.com",
          cargo: "developer",
          dependencia: "sistemas"
        }
      ],
      ruta: "",
      pass: "",
      id: ""
    };
  },
  props: {
    show: Boolean
  },
  methods: {
    exportExcelXls: function() {
      let data = XLSX.utils.json_to_sheet(this.dataToExport);
      const workbook = XLSX.utils.book_new();
      const filename = "empleados";
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    closeModal() {
      this.$emit("showmodalexampleempl", false);
    }
  }
};
</script>