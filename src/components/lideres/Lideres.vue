<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{data.nombre}}</h1>
          <h2 class="subtitle">{{data.email}}</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <article class="media">
          <div class="media-content">
            <div>
              <h1 class="title">Gestion del conocimiento</h1>
              <h1
                class="subtitle"
              >Posee, utiliza, transmite y valora el conocimiento necesario para realizar el trabajo.</h1>
              <div class="field">
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-medium" :class="clase(data.data.gconocimiento)">{{data.data.gconocimiento}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="media">
          <div class="media-content">
            <div>
              <h1 class="title">Gestion de resultados</h1>
              <h1 class="subtitle">Logra resultados exitosos en su trabajo.</h1>
              <div class="field">
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-medium" :class="clase(data.data.gresultados)">{{data.data.gresultados}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="media">
          <figure class="media-left">
            <p class="image is-48x48"></p>
          </figure>
          <div class="media-content">
            <h1 class="title is-4">Cambio y toma decisiones</h1>
            <h1
              class="subtitle"
            >Toma decisiones acertadas en el trabajo y busca nuevas formas de hacer las cosas.</h1>
            <div class="field">
              <div class="control">
                <div class="tags has-addons">
                  <span class="tag" :class="clase(data.data.cambioytoma)">{{data.data.cambioytoma}}</span>
                </div>
              </div>
            </div>
            <article class="media">
              <div class="media-content">
                <h1 class="title is-4">Logro</h1>
                <h1
                  class="subtitle"
                >Alcanza las metas planteadas, mantiene el control de su gestión y cumple sus compromisos.</h1>
                <div class="field">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag" :class="clase(data.data.logro)">{{data.data.logro}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </article>
        <article class="media">
          <div class="media-content">
            <div>
              <h1 class="title">Gestión de sí mismo</h1>
              <h1
                class="subtitle"
              >Valora de manera precisa su comportamiento y habilidades, aceptando sus errores y aciertos con sencillez e implementando planes para su propio desarrollo y mejora.</h1>
              <div class="field">
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-medium" :class="clase(data.data.gdesimismo)">{{data.data.gdesimismo}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="media">
          <figure class="media-left">
            <p class="image is-48x48"></p>
          </figure>
          <div class="media-content">
            <h1 class="title is-4">Humildad</h1>
            <h1 class="subtitle">Acepta sus errores y aciertos con sencillez.</h1>
            <div class="field">
              <div class="control">
                <div class="tags has-addons">
                  <span class="tag" :class="clase(data.data.humildad)">{{data.data.humildad}}</span>
                </div>
              </div>
            </div>
            <article class="media">
              <div class="media-content">
                <h1 class="title is-4">Autogestión</h1>
                <h1
                  class="subtitle"
                >Valora de manera precisa sus fortalezas y debilidades e implementa planes para su propia mejora y desarrollo.</h1>
                <div class="field">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag" :class="clase(data.data.autogestion)">{{data.data.autogestion}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </article>
        <article class="media">
          <div class="media-content">
            <div>
              <h1 class="title">Gestión de personas</h1>
              <h1
                class="subtitle"
              >Conoce, guía y desarrolla el potencial y desempeño de personas y equipos.</h1>
              <div class="field">
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-medium" :class="clase(data.data.gdepersonas)">{{data.data.gdepersonas}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="media">
          <div class="media-content">
            <div>
              <h1 class="title">Gestión de relaciones</h1>
              <h1
                class="subtitle"
              >Establece vínculos cálidos y respetuosos basados en la comunicación efectiva, la asertividad, la coherencia y la retroalimentación.</h1>
              <div class="field">
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-medium" :class="clase(data.data.gderelaciones)">{{data.data.gderelaciones}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="media">
          <figure class="media-left">
            <p class="image is-48x48"></p>
          </figure>
          <div class="media-content">
            <h1 class="title is-4">Asertividad</h1>
            <h1
              class="subtitle"
            >Expresa de manera abierta y respetuosa, pensamientos, opiniones y emociones y muestra coherencia entre lo que dice y hace.</h1>
            <div class="field">
              <div class="control">
                <div class="tags has-addons">
                  <span class="tag" :class="clase(data.data.asertividad)">{{data.data.asertividad}}</span>
                </div>
              </div>
            </div>
            <article class="media">
              <div class="media-content">
                <h1 class="title is-4">Comunicación efectiva</h1>
                <h1
                  class="subtitle"
                >Expresa clara y oportunamente sus ideas, escucha activamente a las otras personas y verifica la comprensión del mensaje.</h1>
                <div class="field">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag" :class="clase(data.data.comunicacione)">{{data.data.comunicacione}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article class="media">
              <div class="media-content">
                <h1 class="title is-4">Retroalimentación</h1>
                <h1
                  class="subtitle"
                >Brinda retroalimentación constante a sus colaboradores, tanto sobre sus exitos como sus fracasos.</h1>
                <div class="field">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag" :class="clase(data.data.retroalmientacion)">{{data.data.retroalmientacion}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article class="media">
              <div class="media-content">
                <h1 class="title is-4">Cercania</h1>
                <h1
                  class="subtitle"
                >Conoce, apoya y se acerca regularmente a los miembros de su equipo y promueve la ayuda mutua ellos.</h1>
                <div class="field">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag" :class="clase(data.data.cercania)">{{data.data.cercania}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </article>
        <article class="media">
          <div class="media-content">
            <div>
              <h1 class="title">Líderes PHD</h1>
              <div class="field">
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-medium" :class="clase(data.data.liderphd)">{{data.data.liderphd}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import apiServices from "@/services/yungol-services";
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: {
        nombre: 'Cargando...',
        email: '....',
        data: {
          gconocimiento: '...',
          gresultados: '...',
          cambioytoma: '...',
          logro: '...',
          gdesimismo: '...',
          humildad:'...',
          autogestion: '...',
          gdepersonas: '...',
          gderelaciones: '...',
          asertividad: '...',
          comunicacione: '...',
          retroalmientacion: '...',
          cercania: '...',
          liderphd: '...'
        }
      }
    };
  },
  computed: {
    ...mapState(["isAuthenticated", "idtoken"]),
    
  },
  methods: {
    clase(d){
      let clase;
      if(d === 'Fortaleza excepcional'){
        clase = 'is-excepcional';
      }else if(d === 'Fortaleza destacada'){
        clase = 'is-destacada';
      }else if(d === 'Fortaleza'){
        clase = 'is-fortaleza';
      }else if(d === 'En desarrollo'){
        clase = 'is-desarrollo';
      }else if(d === 'En desarrollo'){
        clase = 'is-desarrollo';
      }else if(d === 'Oportunidad de mejora'){
        clase = 'is-mejora';
      }else if(d === 'Debilidad'){
        clase = 'is-debilidad';
      }
      return clase;
    },
    async traedata() {
      const _this = this;
      let result;
      try {
        result = await apiServices.get(
          `/resultadoslideresbyid/${_this.$route.params.id}`
        );
        this.data.nombre = result.data.nombre;
        this.data.email = result.data.email;
        this.data.data.gconocimiento = result.data.data.gconocimiento;
        this.data.data.gresultados = result.data.data.gresultados;
        this.data.data.cambioytoma = result.data.data.cambioytoma;
        this.data.data.logro = result.data.data.logro;
        this.data.data.gdesimismo = result.data.data.gdesimismo;
        this.data.data.humildad = result.data.data.humildad;
        this.data.data.autogestion = result.data.data.autogestion;
        this.data.data.gdepersonas = result.data.data.gdepersonas;
        this.data.data.gderelaciones = result.data.data.gderelaciones;
        this.data.data.asertividad = result.data.data.asertividad;
        this.data.data.comunicacione = result.data.data.comunicacione;
        this.data.data.retroalmientacion = result.data.data.retroalmientacion;
        this.data.data.cercania = result.data.data.cercania;
        this.data.data.liderphd = result.data.data.liderphd;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.traedata();
  }
};
</script>
<style lang="scss" scoped>
.is-excepcional {
    background-color: #008c14;
    color: #fff;
}
.is-destacada {
    background-color: #00f587;
    color: #fff;
}
.is-fortaleza {
    background-color: #90ffcd;
    color: #4a4a4a;
}
.is-desarrollo {
    background-color: #fffd95;
    color: #4a4a4a;
}
.is-mejora {
    background-color: #ffd13b;
    color: #4a4a4a;
}
.is-debilidad {
    background-color: #ff4646;
    color: #fff;
}

</style>