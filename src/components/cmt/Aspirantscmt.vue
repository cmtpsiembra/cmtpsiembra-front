<template>
  <div>
    <section class="hero is-dark is-bold is-fullheight" v-show="showlogin">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-6 is-offset-3">
            <div class="card">
              <div class="hero is-warning">
                <div class="hero-body">
                  <div class="container">
                    <!-- <span>
                    <img width="80%" src="@/assets/logo2.png" alt="Logo" />
                  </span> -->
                    <span>
                      <img width="80%" src="@/assets/logo2.png" alt="Logo" />
                    </span>
                    <h5 class="subtitle is-4 has-text-dark">
                      Cuestionario de motivación para el trabajo
                    </h5>
                  </div>
                </div>
              </div>
              <div class="hero is-white">
                <div class="hero-body">
                  <div class="container">
                    <div class="notification has-text-left is-info">
                      Por favor ingresar el código suministrado para empezar con
                      el Cuestionario de Motivación para el Trabajo.
                    </div>
                    <div class="field">
                      <div class="control has-icons-left">
                        <input
                          v-model="aspirante.codigo"
                          class="input is-large"
                          type="text"
                          placeholder="Código"
                          autocomplete="off"
                        />
                        <span class="icon is-medium is-left">
                          <i class="material-icons">done</i>
                        </span>
                      </div>
                    </div>
                    <button
                      class="button is-block is-link is-large is-fullwidth"
                      @click="validacodigo"
                    >
                      ENTRAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section" v-show="!showlogin">
      <div class="container">
        <div class="box" v-show="position === '1'">
          <div class="columns">
            <div class="column is-8">
              <h1 class="title">CMT - Datos Personales</h1>
              <h2 class="subtitle">
                Proceso para el cargo de {{ aspirante.proceso.cargo }} en la
                ciudad de {{ aspirante.proceso.ciudad }}
              </h2>
            </div>
            <div class="column has-text-right has-text-danger">
              <br />(*) Campos obligatorios
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label"
                  >Primer Nombre <span class="has-text-danger">*</span></label
                >
                <div class="control">
                  <input
                    v-model="aspirante.nombreUno"
                    class="input"
                    type="text"
                    placeholder="Primer Nombre"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label"
                  >Primer Apellido <span class="has-text-danger">*</span></label
                >
                <div class="control">
                  <input
                    v-model="aspirante.apellidoUno"
                    class="input"
                    type="text"
                    placeholder="Primer Nombre"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label"
                  >Cédula <span class="has-text-danger">*</span></label
                >
                <div class="control">
                  <input
                    v-model="aspirante.cedula"
                    class="input"
                    type="text"
                    placeholder="Número de identificación"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label"
                  >Edad <span class="has-text-danger">*</span></label
                >
                <div class="control">
                  <input
                    v-model="aspirante.edad"
                    class="input"
                    type="text"
                    placeholder="Edad"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label"
                  >Estudios <span class="has-text-danger">*</span></label
                >
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="aspirante.estudio">
                      <option :value="null">Seleccione estudio máximo</option>
                      <option value="primaria">Primaria</option>
                      <option value="tecnica">Técnica</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="pregrado">Pregrado</option>
                      <option value="posgrado">Posgrado</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">e-mail</label>
                <div class="control">
                  <input
                    v-model="aspirante.correo"
                    class="input"
                    type="text"
                    placeholder="Correo"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Segundo Nombre</label>
                <div class="control">
                  <input
                    v-model="aspirante.nombreDos"
                    class="input"
                    type="text"
                    placeholder="Segundo Nombre"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Segundo Apellido</label>
                <div class="control">
                  <input
                    v-model="aspirante.apellidoDos"
                    class="input"
                    type="text"
                    placeholder="Primer Nombre"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label"
                  >Sexo <span class="has-text-danger">*</span></label
                >
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="aspirante.sexo">
                      <option :value="null">Seleccione género</option>
                      <option value="mujer">Mujer</option>
                      <option value="hombre">Hombre</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label"
                  >Estado Civil <span class="has-text-danger">*</span></label
                >
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="aspirante.estCivil">
                      <option :value="null">Seleccione estado Civil</option>
                      <option value="soltero">Soltero</option>
                      <option value="casado">Casado</option>
                      <option value="divorciado">Divorciado</option>
                      <option value="viudo">Viudo</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label"
                  >Profesión <span class="has-text-danger">*</span></label
                >
                <div class="control">
                  <input
                    v-model="aspirante.profesion"
                    class="input"
                    type="text"
                    placeholder="A qué te dedicas?"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label"
                  >Experiencia <span class="has-text-danger">*</span></label
                >
                <div class="control">
                  <input
                    v-model="aspirante.experiencia"
                    class="input"
                    type="text"
                    placeholder="Cuántos años lleva trabajando?"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>
          </div>
          <button class="button is-large is-info" @click="next">
            Siguiente
          </button>
        </div>
        <div class="box" v-show="position === '2'">
          <h1 class="title">Cuestionario de Motivación para el trabajo</h1>
          <h2 class="subtitle">Instrucciones Generales</h2>
          <p class="has-text-justified">
            Este cuestionario tiene por objeto tener una idea general sobre
            aquellos aspectos del trabajo que son de interés para usted, y sobre
            las acciones que está dispuesto a realizar para conseguirlos.
          </p>
          <p class="has-text-justified">
            Todas las respuestas dadas por usted son importantes para comprender
            sus intereses en el trabajo. Por tanto no hay respuestas buenas ni
            malas. Lo único que cuenta es su veracidad.
          </p>
          <p class="has-text-justified">
            Esta encuesta está dividida en tres partes, cada una con sus
            respectivas instrucciones inciales. Léalas con atención y no
            comience a responder hasta tanto esté seguro de haberlas
            comprendido.
          </p>
          <p class="has-text-justified">
            Responda todos y cada uno de los puntos, pero no les dedique
            demasiado tiempo. Responda con rapidez y de la manera más veraz y
            espontánea.
          </p>
        </div>
        <div class="notification is-info" v-show="showpartes.show">
          <h1 class="title">{{ showpartes.data.Titulo }}</h1>
          <h2 class="subtitle">{{ showpartes.data.subtitulo }}</h2>
          <p class="has-text-justified">
            {{ showpartes.data.parrafo }}
          </p>
          <br />

          {{ showpartes.data.texto }}
          <br /><br />
          <div class="field is-grouped">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="2"
                style="width: 28px"
                autocomplete="off"
              />
            </div>
            <div class="control" style="padding-top: 5px">
              <span>{{ showpartes.data.a.texto }}</span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="3"
                style="width: 28px"
                autocomplete="off"
              />
            </div>
            <div class="control" style="padding-top: 5px">
              <span>{{ showpartes.data.b.texto }}</span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="4"
                style="width: 28px"
                autocomplete="off"
              />
            </div>
            <div class="control" style="padding-top: 5px">
              <span>{{ showpartes.data.c.texto }}</span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="5"
                style="width: 28px"
                autocomplete="off"
              />
            </div>
            <div class="control" style="padding-top: 5px">
              <span>{{ showpartes.data.d.texto }}</span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="1"
                style="width: 28px"
                autocomplete="off"
              />
            </div>
            <div class="control" style="padding-top: 5px">
              <span>{{ showpartes.data.e.texto }}</span>
            </div>
          </div>
        </div>
        <div class="box" v-show="showquestions.show">
          <h1 class="title">{{ preguntas[showquestions.number].Titulo }}</h1>
          <h2 class="subtitle has-text-danger">
            Numerar cada afirmación de 5 a 1, siendo 5 la más importante y 1 la
            menos importante
          </h2>
          <strong>{{ preguntas[showquestions.number].texto }}</strong>

          <br /><br />
          <div class="field is-grouped">
            <div class="control">
              <input
                v-model="preguntas[showquestions.number].a.valor"
                @click="addnumber('a')"
                class="input hand"
                :class="classinput('a')"
                type="number"
                style="width: 30px"
                autocomplete="off"
              />
            </div>
            <div class="control" style="padding-top: 5px">
              <span>{{ preguntas[showquestions.number].a.texto }}</span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <input
                v-model="preguntas[showquestions.number].b.valor"
                @click="addnumber('b')"
                class="input hand"
                :class="classinput('b')"
                type="number"
                style="width: 30px"
                autocomplete="off"
              />
            </div>
            <div class="control" style="padding-top: 5px">
              <span>{{ preguntas[showquestions.number].b.texto }}</span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <input
                v-model="preguntas[showquestions.number].c.valor"
                @click="addnumber('c')"
                class="input hand"
                :class="classinput('c')"
                type="number"
                style="width: 30px"
                autocomplete="off"
              />
            </div>
            <div class="control" style="padding-top: 5px">
              <span>{{ preguntas[showquestions.number].c.texto }}</span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <input
                v-model="preguntas[showquestions.number].d.valor"
                :class="classinput('d')"
                @click="addnumber('d')"
                class="input hand"
                type="number"
                style="width: 30px"
                autocomplete="off"
              />
            </div>
            <div class="control" style="padding-top: 5px">
              <span>{{ preguntas[showquestions.number].d.texto }}</span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <input
                v-model="preguntas[showquestions.number].e.valor"
                :class="classinput('e')"
                @click="addnumber('e')"
                class="input hand"
                type="number"
                style="width: 30px"
                autocomplete="off"
              />
            </div>
            <div class="control" style="padding-top: 5px">
              <span>{{ preguntas[showquestions.number].e.texto }}</span>
            </div>
          </div>
          <button class="button is-dark is-large" @click="limpiar">
            Limpiar
          </button>
          <button class="button is-large is-info" @click="next">
            Siguiente
          </button>
        </div>
        <div class="box" v-show="position === '21'">
          <h1 class="title" v-show="!termino">Enviar Cuestionario</h1>
          <h2 class="subtitle" v-show="!termino">
            Ha terminado de llenar el Cuestionario de Motivación para el
            Trabajo. Para finalizar haga clic en "Enviar resultados".
          </h2>
          <h1 class="title" v-show="termino">Cuestionario enviado</h1>
          <h2 class="subtitle" v-show="termino">
            Ha terminado de llenar el Cuestionario de Motivación para el
            trabajo. Ya puede salir".
          </h2>
          <div class="field is-grouped is-grouped-centered">
            <div class="control" v-show="!termino">
              <button class="button is-link is-large" @click="enviarresultados">
                Enviar resultados
              </button>
            </div>
            <div class="control" v-show="termino">
              <button class="button is-link is-large" @click="salir">
                Salir
              </button>
            </div>
          </div>
        </div>
        <div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button class="button is-link is-large" @click="back">
                <span class="icon is-small">
                  <span class="material-icons"> west </span>
                </span>
              </button>
            </div>
            <div class="control">
              <label class="radio">
                <input v-model="position" :value="'1'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'2'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'3'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'4'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'5'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'6'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'7'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'8'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'9'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'10'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'11'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'12'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'13'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'14'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'15'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'16'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'17'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'18'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'19'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'20'" type="radio" />
              </label>
              <label class="radio">
                <input v-model="position" :value="'21'" type="radio" />
              </label>
            </div>
            <div class="control">
              <button class="button is-link is-large" @click="next">
                <span class="icon is-small">
                  <span class="material-icons"> east </span>
                </span>
              </button>
            </div>
          </div>
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
      termino: false,
      showlogin: true,
      position: "1",
      aspirante: {
        codigo: null,
        proceso: {},
        nombreUno: null,
        nombreDos: null,
        apellidoUno: null,
        apellidoDos: null,
        cedula: null,
        sexo: null,
        edad: null,
        estCivil: null,
        estudio: null,
        profesion: null,
        experiencia: null,
        procesocmt: null,
        resultadosBrutos: {},
        empresaid: null,
        preguntas: {},
      },
      vName: [
        "Logro",
        "Poder",
        "Afiliación",
        "Auto-Realización",
        "Reconocimiento",
        "Dedicación a la tarea",
        "Aceptación autoridad",
        "Aceptación normas y valores",
        "Requisición",
        "Expectación",
        "Supervisión",
        "Grupo de trabajo",
        "Contenido de trabajo",
        "Salario",
        "Promoción",
        "Orientación al éxito",
        "Orientación a la tarea",
        "Adaptabilidad social",
        "Internalidad",
        "Externalidad",
      ],
      partes: {
        1: {
          Titulo: "Primera Parte",
          subtitulo: "Instrucciones Generales",
          parrafo:
            "En esta parte usted encontrará varios grupos de afirmaciones que representan deseos o aspiraciones relacionadas con el trabajo. Lea las afirmaciones de cada grupo y ordénelas según la importancia que cada una tiene para usted, comenzando por la más importante y terminando con la de menor importancia. Una vez decidido el orden, asígnele el número en el cuadro de texto delante de cada una de la siguiente manera: Cinco (5) a la que consideró más importante, el número cuatro (4) a la que consideró en segundo lugar, y continúe en orden descendente hasta asignarle uno (1) a la que consideró de menor importancia. Por ejemplo:",
          texto: "0. LA MAYOR SATISFACCIÓN QUE DESEO OBTENER EN EL TRABAJO ES:",
          a: {
            texto: "Dirigir personal.",
            valor: 2,
          },
          b: {
            texto: "Ser estimado.",
            valor: 3,
          },
          c: {
            texto: "Tener amistades.",
            valor: 5,
          },
          d: {
            texto: "Ser elogiado.",
            valor: 4,
          },
          e: {
            texto: "Llevar a cabo lo que soy capaz de hacer.",
            valor: 1,
          },
        },
        2: {
          Titulo: "Segunda Parte",
          subtitulo: "Instrucciones Generales",
          parrafo:
            "Aquí encontrará varios grupos de afirmaciones relacionadas con los medios más efectivos para alcanzar ciertos beneficios en el trabajo. Cada grupo está encabezado por una frase que muestra una situación de trabajo deseada. Enseguida se encuentran cinco frases que describen acciones que una persona puede realizar para lograr la situación deseada. Ordene las cinco acciones según el orden de importancia en el que usted está dispuesto a realizarlas. Una vez decidido el orden, asígnele el número en el cuadro de texto delante de cada una de la siguiente manera: Cinco (5) a la que consideró más importante, el número cuatro (4) a la que consideró en segundo lugar, y continúe en orden descendente hasta asignarle uno (1) a la que consideró de menor importancia. Por ejemplo:",
          texto:
            "0. EL MEDIO MÁS EFECTIVO PARA CONSEGUIR UNA MEJORA SALARIAL ES:",
          a: {
            texto: "Cumplir con el horario de trabajo.",
            valor: 2,
          },
          b: {
            texto: "Colaborar con los compañeros.",
            valor: 3,
          },
          c: {
            texto: "Solicitarlo directamente al jefe.",
            valor: 5,
          },
          d: {
            texto: "Cuidar los equipos e imlpementos de la empresa.",
            valor: 4,
          },
          e: {
            texto: "Vincularme a un grupo de presión.",
            valor: 1,
          },
        },
        3: {
          Titulo: "Tercera Parte",
          subtitulo: "Instrucciones Generales",
          parrafo:
            "Aquí también encontrará varios grupos de afirmaciones relacionadas con aspectos diferentes del trabajo. Cada grupo tiene cinco afirmaciones, léalas y ordénelas según el nivel de importancia que les concede. Asígnele el número en el cuadro de texto delante de cada una de la siguiente manera: Cinco (5) a la que consideró más importante, el número cuatro (4) a la que consideró en segundo lugar, y continúe en orden descendente hasta asignarle uno (1) a la que consideró de menor importancia. Por ejemplo:",
          texto: "0. LO MÁS IMPORTANTE PARA MÍ EN EL TRABAJO ES:",
          a: {
            texto: "Viajar a otros sitios como parte de mi trabajo.",
            valor: 2,
          },
          b: {
            texto: "Supervisar un gran número de personas.",
            valor: 3,
          },
          c: {
            texto:
              "Recibir elogios por contribuciones importantes en el trabajo.",
            valor: 5,
          },
          d: {
            texto: "Ganar mucho dinero.",
            valor: 4,
          },
          e: {
            texto: "Tener un puesto que me haga sentir competente y hábil.",
            valor: 1,
          },
        },
      },
      preguntas: {
        1: {
          Titulo: "Primera Parte",
          texto: "1. LA MAYOR SATISFACCIÓN QUE DESEO OBTENER EN EL TRABAJO ES:",
          a: {
            texto: "Saber que se reconocen mis conocimientos y capacidades.",
            valor: null,
          },
          b: {
            texto: "Poder coordinar y estimular los esfuerzos de otros.",
            valor: null,
          },
          c: {
            texto: "Saber que otras personas me aprecian.",
            valor: null,
          },
          d: {
            texto:
              "Idear formas más eficientes de hacer el trabajo para aventajar a otros con la calidad de los resultados.",
            valor: null,
          },
          e: {
            texto:
              "Poderme ocupar en aquellos trabajos para los que tengo buenas capacidades.",
            valor: null,
          },
        },
        2: {
          Titulo: "Primera Parte",
          texto: "2. LA MAYOR SATISFACCIÓN QUE DESEO OBTENER EN EL TRABAJO ES:",
          a: {
            texto: "Que mis ideas y propuestas sean tenidas en cuenta.",
            valor: null,
          },
          b: {
            texto:
              "Mantener una relación cordial con los compañeros de trabajo.",
            valor: null,
          },
          c: {
            texto:
              "Poder persuadir o convencer a otros para llevar a cabo actividades relacionadas con el trabajo.",
            valor: null,
          },
          d: {
            texto: "Poder ocuparme en lo que verdaderamente sé y puedo hacer.",
            valor: null,
          },
          e: {
            texto:
              "Poder resolver, con más éxito que los demás, los problemas difíciles del trabajo.",
            valor: null,
          },
        },
        3: {
          Titulo: "Primera Parte",
          texto: "3. LA MAYOR SATISFACCIÓN QUE DESEO OBTENER EN EL TRABAJO ES:",
          a: {
            texto:
              "Tener personas a cargo a las que yo pueda corregir o estimular por su rendimiento.",
            valor: null,
          },
          b: {
            texto:
              "Llegar a sentir aprecio y estimación por las otras personas.",
            valor: null,
          },
          c: {
            texto: "Darme cuenta de que perfecciona mis conocimientos.",
            valor: null,
          },
          d: {
            texto: "Ser mejor en el trabajo que el común de las personas.",
            valor: null,
          },
          e: {
            texto:
              "Que mis compañeros me tengan respeto y reconocimiento por lo que valgo como persona.",
            valor: null,
          },
        },
        4: {
          Titulo: "Primera Parte",
          texto: "4. LA MAYOR SATISFACCIÓN QUE DESEO OBTENER EN EL TRABAJO ES:",
          a: {
            texto:
              "Contar con la compañía y el apoyo de los compañeros de trabajo.",
            valor: null,
          },
          b: {
            texto: "Que mis ideas y propuestas sean tenidas en cuenta.",
            valor: null,
          },
          c: {
            texto:
              "Poder enseñar y dar sugerencias a otros sobre la solución de problemas relacionados con el trabajo.",
            valor: null,
          },
          d: {
            texto: "Saber que voy adquiriendo mayor habilidad en mi ocupación.",
            valor: null,
          },
          e: {
            texto:
              "Lograr resultados de mejor calidad que los que alcanzan otros en su trabajo.",
            valor: null,
          },
        },
        5: {
          Titulo: "Primera Parte",
          texto: "5. LA MAYOR SATISFACCIÓN QUE DESEO OBTENER EN EL TRABAJO ES:",
          a: {
            texto:
              "Tener la oportunidad de influir en la gente para sacar adelante las cosas.",
            valor: null,
          },
          b: {
            texto:
              "Estar con personas que sean unidas, se apoyen y se defiendan mutuamente.",
            valor: null,
          },
          c: {
            texto: "Que las otras personas acepten mis méritos.",
            valor: null,
          },
          d: {
            texto: "Idear algo de interés y luchar hasta sacarlo adelante.",
            valor: null,
          },
          e: {
            texto: "Poder aplicar los conocimientos que poseo.",
            valor: null,
          },
        },
        6: {
          Titulo: "Segunda Parte",
          texto:
            "6. USUALMENTE EL MEDIO MÁS EFECTIVO PARA OBTENER UN TRATO JUSTO Y CONSIDERADO POR PARTE DEL JEFE ES:",
          a: {
            texto:
              "Economizar materiales e implementos de trabajo y evitar los riesgos de pérdidas y daños.",
            valor: null,
          },
          b: {
            texto:
              "Con todo respeto solicitarle un trato justo y considerado, cuando sea necesario.",
            valor: null,
          },
          c: {
            texto: "Dar cumplimiento a lo que él espera que uno lleve a cabo.",
            valor: null,
          },
          d: {
            texto: "Dedicarse con empeño al trabajo durante el tiempo debido.",
            valor: null,
          },
          e: {
            texto: "Dar cumplimiento a sus instrucciones y sugerencias.",
            valor: null,
          },
        },
        7: {
          Titulo: "Segunda Parte",
          texto:
            "7. EL MEDIO MÁS EFECTIVO PARA TENER UN TRABAJO VERDADERAMENTE INTERESANTE ES:",
          a: {
            texto: "Ponerle empeño e imaginación.",
            valor: null,
          },
          b: {
            texto:
              "Solicitar personalmente al jefe mi ubicación en un trabajo que se acomode bien a mis capacidades o que me interese.",
            valor: null,
          },
          c: {
            texto:
              "Esforzarme por realizar con entusiasmo las funciones y tareas asignadas.",
            valor: null,
          },
          d: {
            texto: "Confiar en que la empresa me brinde una buena oportunidad.",
            valor: null,
          },
          e: {
            texto:
              "Aceptar con interés los cambios de puesto de trabajo o de actividad cuando el jefe lo solicite.",
            valor: null,
          },
        },
        8: {
          Titulo: "Segunda Parte",
          texto:
            "8. USUALMENTE EL MEDIO MÁS EFECTIVO PARA OBTENER AUMENTOS DE SUELDO Y MEJORES BENEFICIOS ECONÓMICOS ES:",
          a: {
            texto:
              "Convencer al jefe de que poseo los méritos suficientes para ello.",
            valor: null,
          },
          b: {
            texto: "Hacer el trabajo con eficiencia y responsabilidad.",
            valor: null,
          },
          c: {
            texto:
              "Aceptar y cumplir las funciones, normas y reglamentos de trabajo.",
            valor: null,
          },
          d: {
            texto: "Acatar las decisiones y orientaciones del jefe inmediato.",
            valor: null,
          },
          e: {
            texto:
              "Estar a la espera de que la empresa haga los aumentos convenientes según sus posibilidades.",
            valor: null,
          },
        },
        9: {
          Titulo: "Segunda Parte",
          texto:
            "9. EL MEDIO MÁS EFECTIVO PARA OBTENER UN ASCENSO EN EL TRABAJO ES:",
          a: {
            texto:
              "Dar apoyo a los proyectos, planes y políticas de la empresa.",
            valor: null,
          },
          b: {
            texto: "Presentar proyectos e iniciativas en el trabajo.",
            valor: null,
          },
          c: {
            texto:
              "Convencer al jefe, no sólo con palabras sino con mi rendimiento, de los méritos y capacidades con que cuento.",
            valor: null,
          },
          d: {
            texto:
              "Darle tiempo a la empresa para que se dé cuenta de mis conocimientos y capacidades.",
            valor: null,
          },
          e: {
            texto:
              "Dar colaboración y apoyo a las decisiones del jefe de la dependencia donde uno trabaja.",
            valor: null,
          },
        },
        10: {
          Titulo: "Segunda Parte",
          texto:
            "10. EL MEDIO MÁS EFICAZ PARA PODERSE INTEGRAR A UN GRUPO DE TRABAJO ES:",
          a: {
            texto: "Mostrar interés en la tarea encomendada al grupo.",
            valor: null,
          },
          b: {
            texto:
              "Ofrecerle apoyo cuando sea necesario trabajar para obtener ventajas o beneficios para el bien de todos.",
            valor: null,
          },
          c: {
            texto:
              "Colaborarle para que pueda sacar adelante los trabajos que su jefe le encargó.",
            valor: null,
          },
          d: {
            texto:
              "Esperar que, a medida que me vayan conociendo, me acepten y me tengan en cuenta.",
            valor: null,
          },
          e: {
            texto:
              "Mostrarse respetuoso de las personas y de las normas sociales.",
            valor: null,
          },
        },
        11: {
          Titulo: "Tercera Parte",
          texto: "11. LO MÁS IMPORTANTE PARA MÍ EN EL TRABAJO ES:",
          a: {
            texto: "Contar con un jefe que se preocupe de verdad por su gente.",
            valor: null,
          },
          b: {
            texto:
              "Ganar buenos auxilios económicos y buenas prestaciones extralegales para mi beneficio y el de mi familia.",
            valor: null,
          },
          c: {
            texto:
              "Tener ascensos que me permitan alcanzar un trabajo de mayor responsabilidad.",
            valor: null,
          },
          d: {
            texto:
              "Poder integrar mis esfuerzos a las actividades de otras personas para producir resultados conjuntos que beneficien a todos.",
            valor: null,
          },
          e: {
            texto: "Poder experimentar interés y motivación por mis tareas.",
            valor: null,
          },
        },
        12: {
          Titulo: "Tercera Parte",
          texto: "12. LO MÁS IMPORTANTE PARA MÍ EN EL TRABAJO ES:",
          a: {
            texto:
              "Ganar un sueldo que me permita atender adecuadamente todas mis necesidades y las de mi familia.",
            valor: null,
          },
          b: {
            texto:
              " Tener ascensos para lograr un trabajo más interesante e importante.",
            valor: null,
          },
          c: {
            texto: "Poderme integrar a un equipo con gente dinámica.",
            valor: null,
          },
          d: {
            texto:
              "Que mi jefe evalúe mi rendimiento de una manera considerada, comprensiva y justa.",
            valor: null,
          },
          e: {
            texto:
              "Desempeñar un trabajo que contenga actividades variadas y verdaderamente interesantes.",
            valor: null,
          },
        },
        13: {
          Titulo: "Tercera Parte",
          texto: "13. LO MÁS IMPORTANTE PARA MÍ EN EL TRABAJO ES:",
          a: {
            texto:
              "Contar con un sueldo equivalente o mejor que el de otras personas que trabajan en mi ocupación.",
            valor: null,
          },
          b: {
            texto: "Trabajar en equipo con gente de la que yo pueda aprender.",
            valor: null,
          },
          c: {
            texto:
              "Tener un jefe que me dé a conocer los resultados de mi trabajo.",
            valor: null,
          },
          d: {
            texto:
              "Tener ascensos que me permitan ir obteniendo mayor prestigio y autoridad.",
            valor: null,
          },
          e: {
            texto:
              "Poder atender con frecuencia asuntos y situaciones de trabajo diferentes.",
            valor: null,
          },
        },
        14: {
          Titulo: "Tercera Parte",
          texto: "14. LO MÁS IMPORTANTE PARA MÍ EN EL TRABAJO ES:",
          a: {
            texto:
              "Trabajar con otros para beneficiarme de sus conocimientos y experiencia.",
            valor: null,
          },
          b: {
            texto:
              "Saber que periódicamente puedo recibir aumentos salariales.",
            valor: null,
          },
          c: {
            texto:
              "Llevar a cabo actividades variadas y de interés que me eviten la rutina y la monotonía.",
            valor: null,
          },
          d: {
            texto:
              "Tener ascensos que me permitan sentir que progreso y me perfecciono en mi ocupación.",
            valor: null,
          },
          e: {
            texto:
              "Tener un jefe que se fije más en mis aciertos que en mis errores.",
            valor: null,
          },
        },
        15: {
          Titulo: "Tercera Parte",
          texto: "15. LO MÁS IMPORTANTE PARA MÍ EN EL TRABAJO ES:",
          a: {
            texto:
              "Estar en un grupo capaz de organizar y llevar a cabo actividades de interés y utilidad.",
            valor: null,
          },
          b: {
            texto: "Ganar un sueldo que verdaderamente recompense mi esfuerzo.",
            valor: null,
          },
          c: {
            texto: "Tener un jefe que, antes que exigir, me apoye y motive.",
            valor: null,
          },
          d: {
            texto:
              "Poder elegir la mejor entre diversas posibilidades de realizar las tareas.",
            valor: null,
          },
          e: {
            texto:
              "Tener ascensos que me den a conocer que se tiene en cuenta mis capacidades.",
            valor: null,
          },
        },
      },
    };
  },
  computed: {
    showpartes() {
      const _this = this;
      switch (_this.position) {
        case "3":
          return { show: true, data: _this.partes[1] };
        case "9":
          return { show: true, data: _this.partes[2] };
        case "15":
          return { show: true, data: _this.partes[3] };
        default:
          return { show: false, data: _this.partes[1] };
      }
    },
    showquestions() {
      const _this = this;
      switch (_this.position) {
        case "4":
          return { show: true, number: "1" };
        case "5":
          return { show: true, number: "2" };
        case "6":
          return { show: true, number: "3" };
        case "7":
          return { show: true, number: "4" };
        case "8":
          return { show: true, number: "5" };
        case "10":
          return { show: true, number: "6" };
        case "11":
          return { show: true, number: "7" };
        case "12":
          return { show: true, number: "8" };
        case "13":
          return { show: true, number: "9" };
        case "14":
          return { show: true, number: "10" };
        case "16":
          return { show: true, number: "11" };
        case "17":
          return { show: true, number: "12" };
        case "18":
          return { show: true, number: "13" };
        case "19":
          return { show: true, number: "14" };
        case "20":
          return { show: true, number: "15" };
        default:
          return { show: false, number: "1" };
      }
    },
  },
  methods: {
    salir() {
      this.showlogin = true;
      this.position = "1";
      this.aspirante = {
        codigo: null,
        proceso: {},
        nombreUno: null,
        nombreDos: null,
        apellidoUno: null,
        apellidoDos: null,
        cedula: null,
        sexo: null,
        edad: null,
        estCivil: null,
        estudio: null,
        profesion: null,
        experiencia: null,
        procesocmt: null,
        resultadosBrutos: {},
        empresaid: null,
      };
    },
    classinput(letra) {
      let repetido = false;
      let nocontrol = false;
      const controlnumbers = [1, 2, 3, 4, 5];
      const letras = ["a", "b", "c", "d", "e"];
      let numbers = [];
      for (let index in letras) {
        const l = letras[index];
        if (l !== letra && this.preguntas[this.showquestions.number][l].valor) {
          numbers.push(
            parseInt(this.preguntas[this.showquestions.number][l].valor)
          );
        }
      }
      if (
        this.preguntas[this.showquestions.number][letra].valor &&
        numbers.indexOf(
          parseInt(this.preguntas[this.showquestions.number][letra].valor)
        ) !== -1
      ) {
        repetido = true;
      }
      if (
        this.preguntas[this.showquestions.number][letra].valor &&
        controlnumbers.indexOf(
          parseInt(this.preguntas[this.showquestions.number][letra].valor)
        ) === -1
      ) {
        nocontrol = true;
      }
      if (nocontrol) {
        return "is-danger has-background-danger has-text-white";
      } else if (repetido) {
        return "is-danger has-background-danger has-text-white";
      } else if (this.preguntas[this.showquestions.number][letra].valor) {
        return "is-info has-background-info has-text-white";
      }
    },
    addnumber(letra) {
      let numbers = [];
      let numbers2 = [];
      if (this.preguntas[this.showquestions.number].a.valor) {
        numbers.push(
          parseInt(this.preguntas[this.showquestions.number].a.valor)
        );
      }
      if (this.preguntas[this.showquestions.number].b.valor) {
        numbers.push(
          parseInt(this.preguntas[this.showquestions.number].b.valor)
        );
      }
      if (this.preguntas[this.showquestions.number].c.valor) {
        numbers.push(
          parseInt(this.preguntas[this.showquestions.number].c.valor)
        );
      }
      if (this.preguntas[this.showquestions.number].d.valor) {
        numbers.push(
          parseInt(this.preguntas[this.showquestions.number].d.valor)
        );
      }
      if (this.preguntas[this.showquestions.number].e.valor) {
        numbers.push(
          parseInt(this.preguntas[this.showquestions.number].e.valor)
        );
      }
      const controlnumbers = [5, 4, 3, 2, 1];
      for (let index in controlnumbers) {
        const n = controlnumbers[index];
        if (numbers.indexOf(n) === -1) {
          numbers2.push(n);
        }
      }
      if (numbers.length === 0) {
        this.preguntas[this.showquestions.number][letra].valor = 5;
      } else if (!this.preguntas[this.showquestions.number][letra].valor) {
        this.preguntas[this.showquestions.number][letra].valor = numbers2[0];
      }
    },
    limpiar() {
      this.preguntas[this.showquestions.number].a.valor = null;
      this.preguntas[this.showquestions.number].b.valor = null;
      this.preguntas[this.showquestions.number].c.valor = null;
      this.preguntas[this.showquestions.number].d.valor = null;
      this.preguntas[this.showquestions.number].e.valor = null;
    },
    validacuestionario() {
      const _this = this;
      function validapregunta(letra) {
        let repetido = false;
        let nocontrol = false;
        const controlnumbers = [1, 2, 3, 4, 5];
        const letras = ["a", "b", "c", "d", "e"];
        let numbers = [];
        for (let index in letras) {
          const l = letras[index];
          if (
            l !== letra &&
            _this.preguntas[_this.showquestions.number][l].valor
          ) {
            numbers.push(
              parseInt(_this.preguntas[_this.showquestions.number][l].valor)
            );
          }
        }
        if (
          _this.preguntas[_this.showquestions.number][letra].valor &&
          numbers.indexOf(
            parseInt(_this.preguntas[_this.showquestions.number][letra].valor)
          ) !== -1
        ) {
          repetido = true;
        }
        if (
          _this.preguntas[_this.showquestions.number][letra].valor &&
          controlnumbers.indexOf(
            parseInt(_this.preguntas[_this.showquestions.number][letra].valor)
          ) === -1
        ) {
          nocontrol = true;
        }
        if (repetido) {
          return false;
        }
        if (nocontrol) {
          return false;
        }
        if (_this.preguntas[_this.showquestions.number][letra].valor) {
          return true;
        } else {
          return false;
        }
      }
      const validador = {
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
      };
      const letras = ["a", "b", "c", "d", "e"];
      for (let index in letras) {
        const l = letras[index];
        validador[l] = validapregunta(l);
      }
      if (
        validador.a &&
        validador.b &&
        validador.c &&
        validador.d &&
        validador.e
      ) {
        return true;
      } else {
        this.$store.dispatch("notify", {
          message:
            "Por favor llena correctamente todos los cuadros antes de continuar",
          type: "is-danger",
          position: "top-center",
          duration: 3000,
        });

        return false;
      }
    },
    validar() {
      if (this.position === "1") {
        if (!this.aspirante.nombreUno) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar el primer nombre",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.aspirante.apellidoUno) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar el primer apellido",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.aspirante.cedula) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar la cédula",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.aspirante.sexo) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar el sexo",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.aspirante.edad) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar la edad",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.aspirante.estCivil) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar el estado civil",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.aspirante.estudio) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar el estudio",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.aspirante.profesion) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar la profesión",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        if (!this.aspirante.experiencia) {
          this.$store.dispatch("notify", {
            message: "Debe diligenciar la experiencia",
            type: "is-danger",
            position: "top-center",
            duration: 3000,
          });
          return false;
        }
        return true;
      } else if (this.position === "2") {
        return true;
      } else if (this.position === "3") {
        return true;
      } else if (this.position === "4") {
        return this.validacuestionario();
      } else if (this.position === "5") {
        return this.validacuestionario();
      } else if (this.position === "6") {
        return this.validacuestionario();
      } else if (this.position === "7") {
        return this.validacuestionario();
      } else if (this.position === "8") {
        return this.validacuestionario();
      } else if (this.position === "9") {
        return true;
      } else if (this.position === "10") {
        return this.validacuestionario();
      } else if (this.position === "11") {
        return this.validacuestionario();
      } else if (this.position === "12") {
        return this.validacuestionario();
      } else if (this.position === "13") {
        return this.validacuestionario();
      } else if (this.position === "14") {
        return this.validacuestionario();
      } else if (this.position === "15") {
        return true;
      } else if (this.position === "16") {
        return this.validacuestionario();
      } else if (this.position === "17") {
        return this.validacuestionario();
      } else if (this.position === "18") {
        return this.validacuestionario();
      } else if (this.position === "19") {
        return this.validacuestionario();
      } else if (this.position === "20") {
        return this.validacuestionario();
      }
    },
    back() {
      let pos = parseInt(this.position);
      if (pos !== 1) {
        pos--;
        this.position = pos.toString();
      }
    },
    next() {
      let pos = parseInt(this.position);
      if (pos < 21) {
        if (this.validar()) {
          pos++;
          this.position = pos.toString();
        }
      }
    },
    async validacodigo() {
      try {
        const result = await apiServices.post(`/validacodigocmt`, {
          codigo: this.aspirante.codigo,
        });
        if (result.data) {
          if (result.data.message) {
            this.$store.dispatch("notify", {
              message: result.data.message,
              type: "is-danger",
              position: "top-center",
              duration: 5000,
            });
          } else {
            this.aspirante.proceso = result.data;
            this.aspirante.procesocmt = result.data._id;
            this.aspirante.empresaid = result.data.empresa;
            if (this.aspirante.proceso.activo === "Sí") {
              this.showlogin = false;
            } else {
              this.$store.dispatch("notify", {
                message: "El proceso no esta activo",
                type: "is-danger",
                position: "top-center",
                duration: 5000,
              });
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    tabulardatos() {
      this.aspirante.resultadosBrutos[this.vName[0]] =
        parseInt(this.preguntas["1"].d.valor) +
        parseInt(this.preguntas["2"].e.valor) +
        parseInt(this.preguntas["3"].d.valor) +
        parseInt(this.preguntas["4"].e.valor) +
        parseInt(this.preguntas["5"].d.valor);
      this.aspirante.resultadosBrutos[this.vName[1]] =
        parseInt(this.preguntas["1"].b.valor) +
        parseInt(this.preguntas["2"].c.valor) +
        parseInt(this.preguntas["3"].a.valor) +
        parseInt(this.preguntas["4"].c.valor) +
        parseInt(this.preguntas["5"].a.valor);
      this.aspirante.resultadosBrutos[this.vName[2]] =
        parseInt(this.preguntas["1"].c.valor) +
        parseInt(this.preguntas["2"].b.valor) +
        parseInt(this.preguntas["3"].b.valor) +
        parseInt(this.preguntas["4"].a.valor) +
        parseInt(this.preguntas["5"].b.valor);
      this.aspirante.resultadosBrutos[this.vName[3]] =
        parseInt(this.preguntas["1"].e.valor) +
        parseInt(this.preguntas["2"].d.valor) +
        parseInt(this.preguntas["3"].c.valor) +
        parseInt(this.preguntas["4"].d.valor) +
        parseInt(this.preguntas["5"].e.valor);
      this.aspirante.resultadosBrutos[this.vName[4]] =
        parseInt(this.preguntas["1"].a.valor) +
        parseInt(this.preguntas["2"].a.valor) +
        parseInt(this.preguntas["3"].e.valor) +
        parseInt(this.preguntas["4"].b.valor) +
        parseInt(this.preguntas["5"].c.valor);
      this.aspirante.resultadosBrutos[this.vName[5]] =
        parseInt(this.preguntas["6"].d.valor) +
        parseInt(this.preguntas["7"].a.valor) +
        parseInt(this.preguntas["8"].b.valor) +
        parseInt(this.preguntas["9"].b.valor) +
        parseInt(this.preguntas["10"].a.valor);
      this.aspirante.resultadosBrutos[this.vName[6]] =
        parseInt(this.preguntas["6"].e.valor) +
        parseInt(this.preguntas["7"].e.valor) +
        parseInt(this.preguntas["8"].d.valor) +
        parseInt(this.preguntas["9"].e.valor) +
        parseInt(this.preguntas["10"].c.valor);
      this.aspirante.resultadosBrutos[this.vName[7]] =
        parseInt(this.preguntas["6"].a.valor) +
        parseInt(this.preguntas["7"].c.valor) +
        parseInt(this.preguntas["8"].c.valor) +
        parseInt(this.preguntas["9"].a.valor) +
        parseInt(this.preguntas["10"].e.valor);
      this.aspirante.resultadosBrutos[this.vName[8]] =
        parseInt(this.preguntas["6"].b.valor) +
        parseInt(this.preguntas["7"].b.valor) +
        parseInt(this.preguntas["8"].a.valor) +
        parseInt(this.preguntas["9"].c.valor) +
        parseInt(this.preguntas["10"].b.valor);
      this.aspirante.resultadosBrutos[this.vName[9]] =
        parseInt(this.preguntas["6"].c.valor) +
        parseInt(this.preguntas["7"].d.valor) +
        parseInt(this.preguntas["8"].e.valor) +
        parseInt(this.preguntas["9"].d.valor) +
        parseInt(this.preguntas["10"].d.valor);
      this.aspirante.resultadosBrutos[this.vName[10]] =
        parseInt(this.preguntas["11"].a.valor) +
        parseInt(this.preguntas["12"].d.valor) +
        parseInt(this.preguntas["13"].c.valor) +
        parseInt(this.preguntas["14"].e.valor) +
        parseInt(this.preguntas["15"].c.valor);
      this.aspirante.resultadosBrutos[this.vName[11]] =
        parseInt(this.preguntas["11"].d.valor) +
        parseInt(this.preguntas["12"].c.valor) +
        parseInt(this.preguntas["13"].b.valor) +
        parseInt(this.preguntas["14"].a.valor) +
        parseInt(this.preguntas["15"].a.valor);
      this.aspirante.resultadosBrutos[this.vName[12]] =
        parseInt(this.preguntas["11"].e.valor) +
        parseInt(this.preguntas["12"].e.valor) +
        parseInt(this.preguntas["13"].e.valor) +
        parseInt(this.preguntas["14"].c.valor) +
        parseInt(this.preguntas["15"].d.valor);
      this.aspirante.resultadosBrutos[this.vName[13]] =
        parseInt(this.preguntas["11"].b.valor) +
        parseInt(this.preguntas["12"].a.valor) +
        parseInt(this.preguntas["13"].a.valor) +
        parseInt(this.preguntas["14"].b.valor) +
        parseInt(this.preguntas["15"].b.valor);
      this.aspirante.resultadosBrutos[this.vName[14]] =
        parseInt(this.preguntas["11"].c.valor) +
        parseInt(this.preguntas["12"].b.valor) +
        parseInt(this.preguntas["13"].d.valor) +
        parseInt(this.preguntas["14"].d.valor) +
        parseInt(this.preguntas["15"].e.valor);

      this.aspirante.resultadosBrutos[this.vName[15]] =
        (0.7 * this.aspirante.resultadosBrutos[this.vName[0]] +
          1.3 * this.aspirante.resultadosBrutos[this.vName[5]] +
          0.8 * this.aspirante.resultadosBrutos[this.vName[8]] +
          0.4 * this.aspirante.resultadosBrutos[this.vName[13]] +
          0.8 * this.aspirante.resultadosBrutos[this.vName[14]]) /
        5;
      this.aspirante.resultadosBrutos[this.vName[16]] =
        (0.7 * this.aspirante.resultadosBrutos[this.vName[0]] +
          1.1 * this.aspirante.resultadosBrutos[this.vName[3]] +
          1.3 * this.aspirante.resultadosBrutos[this.vName[5]] +
          0.9 * this.aspirante.resultadosBrutos[this.vName[12]]) /
        4;
      this.aspirante.resultadosBrutos[this.vName[17]] =
        (0.7 * this.aspirante.resultadosBrutos[this.vName[2]] +
          0.9 * this.aspirante.resultadosBrutos[this.vName[6]] +
          1.0 * this.aspirante.resultadosBrutos[this.vName[7]] +
          1.4 * this.aspirante.resultadosBrutos[this.vName[11]]) /
        4;
      this.aspirante.resultadosBrutos[this.vName[18]] =
        (0.7 * this.aspirante.resultadosBrutos[this.vName[0]] +
          0.9 * this.aspirante.resultadosBrutos[this.vName[1]] +
          1.5 * this.aspirante.resultadosBrutos[this.vName[5]] +
          0.9 * this.aspirante.resultadosBrutos[this.vName[8]]) /
        4;
      this.aspirante.resultadosBrutos[this.vName[19]] =
        (1.5 * this.aspirante.resultadosBrutos[this.vName[4]] +
          1.1 * this.aspirante.resultadosBrutos[this.vName[9]] +
          1.4 * this.aspirante.resultadosBrutos[this.vName[10]]) /
        3;
    },
    async enviarresultados() {
      try {
        this.aspirante.preguntas = this.preguntas;
        this.tabulardatos();
        await apiServices.post(`/addaspirante`, this.aspirante);
        this.termino = true;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>