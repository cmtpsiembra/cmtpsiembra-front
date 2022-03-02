<template>
  <div>
    <section class="hero is-warning">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-end">
              <div class="tabs is-right">
                <span v-if="!isAuthenticated" class="navbar-item">
                  <router-link
                    :to="{ name: 'login' }"
                    class="button is-dark is-outlined"
                    data-tooltip="Tooltip Text"
                  >
                    <i class="material-icons">person</i>&nbsp; Mi cuenta
                  </router-link>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <span>
            <img width="80%" src="@/assets/logo2.png" alt="Logo" />
          </span>
          <h1 class="title has-text-dark is-4">
            CUESTIONARIO DE MOTIVACIÓN PARA EL TRABAJO CMT
          </h1>
          <h2 class="subtitle has-text-dark is-6">
            Personas motivadas, personas y empresas más productivas
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <center>
          <h1 class="title">Bienvenidos</h1>
          <h1 class="title">CUESTIONARIO DE MOTIVACIÓN PARA EL TRABAJO CMT</h1>
          <h2 class="subtitle">
            Tecnología científica para detección de personas orientadas al éxito
          </h2>
        </center>
        <br />
        <p class="has-text-justified">
          A la par con los conocimientos y las habilidades, la motivación para
          el trabajo es un determinante necesario del desempeño de las personas.
          Sin embargo, un alto nivel de conocimiento o una habilidad destacada
          no son suficientes para un desempeño exitoso. Hacen falta interés,
          entusiasmo, compromiso, empeño, persistencia y propósitos, que son
          manifestaciones de la motivación personal. Los conocimientos y
          habilidades se pueden adquirir o mejorar en el trabajo mediante
          acciones educativas pero la motivación es un aspecto estable de la
          personalidad, que trae consigo cada persona, y es más difícil de
          modificar o encausar.
        </p>
        <br />
        <p class="has-text-justified">
          Hay dos aspectos del desempeño laboral que todo empleador necesita
          asegurar en las personas que vincula a un trabajo: alto nivel de
          rendimiento en tareas, decisiones, operaciones y procesos
          encomendados, pero también alto nivel de calidad en las relaciones y
          demás aspectos sociales del trabajo. Dado que la motivación es un
          requisito esencial para estos dos aspectos del desempeño, es necesario
          conocer de antemano las fortalezas y limitaciones motivacionales de un
          candidato.
        </p>
        <br />
        <p class="has-text-justified">
          El CMT es un instrumento único de diagnóstico motivacional que permite
          al empleador identificar potencialidades motivacionales o limitaciones
          en relación con 15 aspectos de la motivación que la ciencia
          psicológica ha identifcado de tiempo atrás. Cinco de esos aspectos se
          refieren a motivadores internos, que caracterizan a la persona y la
          impulsan desde dentro al éxito y la excelencia. Otros cinco se
          refieren a la medida en que la persona valora varios hechos y
          realidades del trabajo que estimulan desde afuera el desempeño social
          y de tarea. Un tercer aspecto contempla acciones laborales que una
          persona estaría dispuesta a realizar si sus motivadores internos y
          externos son suficientes para moverla a la acción.
        </p>
        <br />
        <p class="has-text-justified">
          Este conjunto de elementos que registra y valora el CMT ofrecen al
          empleador un perfil motivacional que describe fortalezas y
          limitaciones de un candidato. El proceso es completamente virtual,
          despliega gráficos con toda la información consolidada. En caso de
          contar con varios candidatos permite al examinador jerarquizarlos a
          partir de sus puntuaciones en cada una de las 15 variables
          motivacionales o de acuerdo con una puntuación total ponderada,
          haciendo más fácil la identificación de los mejores para un cargo
          particular.
        </p>
        <br />
        <p class="has-text-justified">
          El CMT es un test psicométrico diseñado, validado y parametrizado para
          poblaciones de habla hispana. Su diseño está fundamentado en teoría
          motivacional desarrollada por la ciencia psicológica y referida a la
          motivación en contextos de trabajo. Cuenta con escalas de calificación
          relacionadas con un número variado de ocupaciones y se soporta en una
          plataforma tecnológica que hace su manejo ágil, sencillo y seguro y
          facilita la administración, generación de resultados y la toma de
          decisiones. No existe en el medio latino un instrumento de evaluación
          motivacional equivalente, tan ampliamente utilizado, sistematizado e
          idóneo para actividades de diagnóstico, evaluación o selección de
          personal.
        </p>
        <hr />
        <center>
          <h1 class="title">Elige uno de nuestros planes</h1>
          <h2 class="subtitle">
            Adquiere el plan que se adapte mejor a tus necesidades
          </h2>
        </center>
        <div class="pricing-table">
          <div class="pricing-plan is-dark">
            <div class="plan-header">Básico</div>
            <div class="plan-price">
              <span class="plan-price-amount"
                ><span class="plan-price-currency">$</span>1.250.000</span
              >/6 meses
            </div>
            <div class="plan-items">
              <div class="plan-item">Valor del pin $25.000</div>
              <div class="plan-item">Número de pines 50</div>
              <div class="plan-item">Vigencia 6 meses</div>
            </div>
            <div class="plan-footer">
              <button class="button is-fullwidth" @click="iwantToKnow(1)">
                Seleccionar
              </button>
            </div>
          </div>

          <div class="pricing-plan is-warning">
            <div class="plan-header">Intermedio</div>
            <div class="plan-price">
              <span class="plan-price-amount"
                ><span class="plan-price-currency">$</span>2.000.000</span
              >/anual
            </div>
            <div class="plan-items">
              <div class="plan-item">Valor del pin $20.000</div>
              <div class="plan-item">Número de pines 100</div>
              <div class="plan-item">Vigencia 1 año</div>
            </div>
            <div class="plan-footer">
              <button class="button is-fullwidth" @click="iwantToKnow(2)">
                Seleccionar
              </button>
            </div>
          </div>

          <div class="pricing-plan is-info">
            <div class="plan-header">Premium</div>
            <div class="plan-price">
              <span class="plan-price-amount"
                ><span class="plan-price-currency">$</span>7.500.000</span
              >/anual
            </div>
            <div class="plan-items">
              <div class="plan-item">Valor del pin $15.000</div>
              <div class="plan-item">Número de pines 500</div>
              <div class="plan-item">Vigencia 1 año</div>
            </div>
            <div class="plan-footer">
              <button class="button is-fullwidth" @click="iwantToKnow(3)">
                Seleccionar
              </button>
            </div>
          </div>

          <div class="pricing-plan is-danger">
            <div class="plan-header">Personalizado</div>
            <div class="plan-price">
              <span class="plan-price-amount"
                ><span class="plan-price-currency">$</span>40.000</span
              >/pin
            </div>
            <div class="plan-items">
              <div class="plan-item">Valor del pin $40.000</div>
              <div class="plan-item">Número de pines de 1 a 49</div>
              <div class="plan-item">Vigencia 2 meses</div>
            </div>
            <div class="plan-footer">
              <button class="button is-fullwidth" @click="iwantToKnow(4)">
                Seleccionar
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <div class="box" id="boxform">
              <h1 class="title">Quiero Saber Más</h1>
              <h2 class="subtitle">
                Déjanos tus datos para brindarte una asesoría personalizada
              </h2>
              <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                  <input
                    id="name"
                    v-model="interested.name"
                    class="input"
                    type="text"
                    placeholder="Nombre"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Correo Electrónico</label>
                <div class="control">
                  <input
                    v-model="interested.email"
                    class="input"
                    type="text"
                    placeholder="Correo electrónico"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Celular</label>
                <div class="control">
                  <input
                    v-model="interested.phone"
                    class="input"
                    type="phone"
                    placeholder="Nombre"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Mensaje </label>
                <div class="control">
                  <textarea
                    v-model="interested.message"
                    class="textarea"
                    placeholder="Mensaje"
                  ></textarea>
                </div>
              </div>
              <div class="button is-large is-dark" @click="sendMesage()">
                Enviar
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <y-Footer></y-Footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import yFooter from "@/components/core/Footer.vue";
import apiServices from "@/services/yungol-services-public";
export default {
  data() {
    return {
      interested: {
        name: null,
        email: null,
        phone: null,
        message: null,
      },
      phoneNumber: "3105349585",
      mensajeBasico: "Quiero saber sobre el plan básico de yungol",
      mensajeRecomendado: "Quiero saber sobre el plan recomendado de yungol",
    };
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    async sendMesage() {
      try {
        const result = await apiServices.post(`/contactus`, this.interested);
        if (result.data) {
          this.$store.dispatch("notify", {
            message:
              "Mensaje enviado. Muy pronto un asesor lo estara contactando.",
          });
          this.interested = {
            name: null,
            email: null,
            phone: null,
            message: null,
          };
        }
      } catch (err) {
        console.log(err);
      }
    },
    scrollTo(id) {
      const el = document.getElementById(id);
      let coords = el.getBoundingClientRect();
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: coords.top + window.pageYOffset,
      });
    },
    iwantToKnow(n) {
      this.scrollTo("boxform");
      if (n === 1) {
        this.interested.message = "Quiero saber más del plan básico";
      } else if (n === 2) {
        this.interested.message = "Quiero saber más del plan intermedio";
      } else if (n === 3) {
        this.interested.message = "Quiero saber más del plan premium";
      } else if (n === 4) {
        this.interested.message = "Quiero saber más del plan personalizado";
      }
      setTimeout(function () {
        document.getElementById("name").focus();
      }, 800);
    },
    registroGoogle() {
      this.$store.dispatch("notify", {
        message: "Este es un mensaje de prueba",
        type: "is-link",
      });
      this.$ga.event("landing", "prueba"); // con esto se registran eventos en google analytics
    },
  },
  components: {
    yFooter,
  },
};
</script>


<style>
</style>
