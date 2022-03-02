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
        <h1 class="title">Instrucciones para subir archivo de las relaciones</h1>
        <br />
        <h2 class="subtitle">
          <p>
            El archivo de relaciones se utiliza para programar en el sistema qué personas serán evaluadas y a quienes les corresponder evaluarlos. Para subir el archivo de Excel con las relaciones solo se deben llenar dos columnas.
            La columna A se debe llamar evaluado y la columna B debe llamarse evaluador, estos dos encabezados deben escribirse en minúscula.
            Tener en cuenta las siguientes recomendaciones para diligenciar el archivo:
          </p>
        </h2>
        <br />
        <h2 class="subtitle">
          <ul>
            <li>- Cada columna se debe llenar solo con los correos de las personas.</li>
            <li>- Es importante que ninguna casilla quede en blanco en ninguna de las dos columnas.</li>
            <li>- Para las autoevaluaciones debe ir el mismo correo del jefe tanto en evaluado como en evaluador.</li>
            <li>- Para evitar inconvenientes los archivos no deben tener formatos especiales en sus celdas.</li>
          </ul>
        </h2>
        <center>
          <img src="@/assets/ejemrelaciones.png" width="700px" style="margin-top:2px;" />
        </center>
        <br />
        <h2 class="subtitle">
          <p>En la parte inferior izquierda encontrarás el botón – Descargar Ejemplo – allí podrás ver cómo es la estructura que se debe usar para subir el archivo con las relaciones en Excel."</p>
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
          evaluado: "correoevaluado01@correo.com",
          evaluador: "correoevaluador01@correo.com"
        },
        {
          evaluado: "correoevaluado02@correo.com",
          evaluador: "correoevaluador02@correo.com"
        },
        {
          evaluado: "correoevaluado03@correo.com",
          evaluador: "correoevaluador03@correo.com"
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
      const filename = "relaciones";
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    closeModal() {
      this.$emit("showmodalexamplerela", false);
    }
  }
};
</script>