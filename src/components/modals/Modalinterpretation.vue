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
        <center>
          <div class="tile is-ancestor">
            <div class="tile is-vertical">
              <div class="tile">
                <div class="tile is-parent is-vertical">
                  <article class="tile is-child notification is-link">
                    <p class="subtitle">Mayor de 90 Fortaleza excepcional (Líder PHD)</p>
                    <div class="content">
                      <p>
                        Este resultado es extraordinario y debe ser considerado como una fortaleza destacada del líder.
                        El reto de las competencias ubicadas en este nivel es su mantenimiento.
                        También la identificación de las prácticas que tiene el líder con su equipo servirá como insumo para jefes con oportunidades de mejora en la misma.
                      </p>
                    </div>
                  </article>
                  <article class="tile is-child notification is-info">
                    <p class="subtitle">80-89 Fortaleza destacada</p>
                    <div class="content">
                      <p>Estos resultados son positivos y el reto será mantenerlos.</p>
                    </div>
                  </article>
                  <article class="tile is-child notification is-success">
                    <p class="subtitle">70-79 Fortaleza</p>
                    <div class="content">
                      <p>
                        Este resultado es conveniente, evidencia que el jefe muestra algunos de los comportamientos relacionados con la competencia,
                        pero en algunas situaciones o con algunas personas del equipo puede no evidenciar algunos de ellos.
                      </p>
                    </div>
                  </article>
                  <article class="tile is-child notification is-warning">
                    <p class="subtitle">60-69 En desarrollo</p>
                    <div class="content">
                      <p>
                        Este resultado es medianamente conveniente.
                        evidencia que el jefe muestra algunos de los comportamientos relacionados con la competencia,
                        pero en algunas situaciones o con algunas personas del equipo puede no evidenciar algunos de ellos.
                        Por esta razón es importante implementar acciones para convertirlo en una fortaleza.
                      </p>
                    </div>
                  </article>
                  <article class="tile is-child notification is-primary">
                    <p class="subtitle">50-59 Oportunidad de mejora</p>
                    <div class="content">
                      <p>
                        Este resultado es poco favorable y evidencia que el jefe posee brecha relevante en su ejercicio de liderazgo en este aspecto.
                        Al obtener resultados en este nivel debería desarrollarse un plan de mejoramiento por parte del jefe con el fin de alcanzar mínimo el nivel de fortaleza.
                      </p>
                    </div>
                  </article>
                  <article class="tile is-child notification is-danger">
                    <p class="subtitle">Menor de 50 Debilidad</p>
                    <div class="content">
                      <p>
                        Este resultado es inconveniente y puede evidenciar dificultades importantes en el ejercicio del liderazgo.
                        Se sugiere que si se encuentran competencias en este nivel el jefe reciba acompañamiento en la elaboración e implementación de un plan de mejoramiento con el fin de alcanzar mínimo el nivel medio-alto.
                        De no intervenirse las competencias con este resultado se podrían presentar efectos inconvenientes con el equipo que pueden afectar tanto la productividad del equipo como la calidad de vida de las personas que conforman el mismo.
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </center>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruta: "",
      pass: "",
      id: ""
    };
  },
  props: {
    show: Boolean
  },
  methods: {
    closeModal() {
      this.$emit("showmodalinterpretation", false);
    }
  }
};
</script>