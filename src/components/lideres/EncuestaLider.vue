<template>
  <div>
    <section class="hero is-dark">
      <div class="logo">
        <img width="12%" src="@/assets/logo2.png" alt="Logo" />
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title has-text-white is-2">Líderes PhD</h1>
          <h2 class="subtitle has-text-white is-4">Personas que hacen la diferencia</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="box has-background-white-ter">
          <div v-show="pase === 0">
            <h1 class="title">¡Hola!</h1>
            <h2 class="subtitle">
              Aquí vas a evaluar a
              <strong>{{relacion.evaluado.nombre}}</strong>
            </h2>
            <!-- <p class="is-medium">{{title[tipo]}}</p> -->
            <div class="has-text-left">
              <p>{{candidate.isBoss ? consentimiento.lider.parrafo1 : consentimiento.colaboradores.parrafo1 }}</p>
              <br />
              <p>{{candidate.isBoss ? consentimiento.lider.parrafo2 : consentimiento.colaboradores.parrafo2 }}</p>
              <br />
              <p>{{candidate.isBoss ? consentimiento.lider.parrafo3 : consentimiento.colaboradores.parrafo3 }}</p>
              <br />
              <h2
                class="title is-7"
              >{{candidate.isBoss ? consentimiento.lider.parrafo4 : consentimiento.colaboradores.parrafo4 }}</h2>
            </div>
            <br />
            <h4>
              <strong>Continuar</strong>
            </h4>
            <br />
            <div class="control">
              <div class="field">
                <input
                  class="is-checkradio is-info"
                  type="radio"
                  id="agreeyes"
                  :value="true"
                  v-model="responses.agree"
                />
                <label for="agreeyes" class="is-capitalized">Si</label>
                <input
                  class="is-checkradio is-info"
                  type="radio"
                  id="agreeno"
                  :value="false"
                  v-model="responses.agree"
                />
                <label for="agreeno" class="is-capitalized">No</label>
              </div>
            </div>
            <br />
            <div class="has-text-centered">
              <button
                v-show="responses.agree"
                @click="next()"
                class="button is-primary"
                :disabled="!responses.agree"
              >Siguiente</button>
              <button
                v-show="!responses.agree"
                @click="endno()"
                class="button is-primary"
              >Terminar y Guardar</button>
            </div>
          </div>
          <div v-show="pase === 1">
            <div class="field">
              <label class="label">Género</label>
              <ul>
                <li>
                  <input
                    class="is-checkradio is-info"
                    type="radio"
                    id="genrem"
                    value="Masculino"
                    v-model="responses.genre"
                  />
                  <label for="genrem" class="is-capitalized">Masculino</label>
                </li>
                <li>
                  <input
                    class="is-checkradio is-info"
                    type="radio"
                    id="genref"
                    value="Femenino"
                    v-model="responses.genre"
                  />
                  <label for="genref" class="is-capitalized">Femenino</label>
                </li>
              </ul>
            </div>
            <div class="field">
              <label class="label">Edad</label>
              <div class="control">
                <input
                  class="input is-primary"
                  type="number"
                  style="width : auto"
                  name="age"
                  v-model="responses.age"
                  placeholder="Ingrese su edad"
                />
                <!-- <label class="radio">
                <input type="radio" name="age" v-model="responses.age" value="18-36" /> 18 a 36 años
              </label>
              <br />
              <label class="radio">
                <input type="radio" name="age" v-model="responses.age" value="37-51" />37 a 51 años
              </label>
              <br />
              <label class="radio">
                <input type="radio" name="age" v-model="responses.age" value="52-65" />52 a 65 años
                </label>-->
              </div>
            </div>

            <div class="field">
              <label class="label">Nivel Educativo Alcanzado</label>
              <ul>
                <li>
                  <input
                    class="is-checkradio is-info"
                    type="radio"
                    id="educationnin"
                    value="ninguno"
                    v-model="responses.education"
                  />
                  <label for="educationnin" class="is-capitalized">Ninguno</label>
                </li>
                <li>
                  <input
                    class="is-checkradio is-info"
                    type="radio"
                    id="educationpri"
                    value="primaria-completa"
                    v-model="responses.education"
                  />
                  <label for="educationpri" class="is-capitalized">Primaria completa</label>
                </li>
                <li>
                  <input
                    class="is-checkradio is-info"
                    type="radio"
                    id="educationbachi"
                    value="bachillerato-completo"
                    v-model="responses.education"
                  />
                  <label for="educationbachi" class="is-capitalized">Bachillerato completo</label>
                </li>
                <li>
                  <input
                    class="is-checkradio is-info"
                    type="radio"
                    id="educationtecn"
                    value="Tecnico/tecnologico-completo"
                    v-model="responses.education"
                  />
                  <label for="educationtecn" class="is-capitalized">Tecnico/tecnologico completo</label>
                </li>
                <li>
                  <input
                    class="is-checkradio is-info"
                    type="radio"
                    id="educationpro"
                    value="profesional-completo"
                    v-model="responses.education"
                  />
                  <label for="educationpro" class="is-capitalized">Profesional completo</label>
                </li>
                <li>
                  <input
                    class="is-checkradio is-info"
                    type="radio"
                    id="educationpost"
                    value="post-grado-completo"
                    v-model="responses.education"
                  />
                  <label for="educationpost" class="is-capitalized">Post-grado completo</label>
                </li>
              </ul>
            </div>
            <div class="field">
              <label class="label">País</label>
              <p class="control has-icons-left">
                <span class="select is-primary">
                  <select v-model="responses.country">
                    <option></option>
                    <option>ARGENTINA</option>
                    <option>BOLIVIA</option>
                    <option>BRASIL</option>
                    <option>CHILE</option>
                    <option>COLOMBIA</option>
                    <option>ECUADOR</option>
                    <option>ESTADOS UNIDOS</option>
                    <option>MEXICO</option>
                    <option>PARAGUAY</option>
                    <option>PERU</option>
                    <option>URUGUAY</option>
                    <option>VENEZUELA</option>
                  </select>
                </span>
                <span class="icon is-small is-left">
                  <i class="material-icons">language</i>
                </span>
              </p>
            </div>
            <div class="field">
              <label class="label">Ciudad</label>
              <p class="control has-icons-left">
                <span class="select is-primary">
                  <select v-model="responses.city">
                    <option></option>
                    <option>BARRANQUILLA</option>
                    <option>BOGOTA</option>
                    <option>BUCARAMANGA</option>
                    <option>CALI</option>
                    <option>CARTAGENA</option>
                    <option>CUCUTA</option>
                    <option>IBAGUE</option>
                    <option>MANIZALES</option>
                    <option>MEDELLIN</option>
                    <option>PEREIRA</option>
                    <option>VILLAVICENCIO</option>
                  </select>
                </span>
                <span class="icon is-small is-left">
                  <i class="material-icons">language</i>
                </span>
              </p>
            </div>
            <br />
            <div class="field has-text-centered">
              <button @click="prev()" class="button is-primary">Anterior</button>
              <button
                @click="next()"
                class="button is-primary"
                :disabled="!responses.genre || !responses.age || !responses.education || !responses.country || !responses.city"
              >Siguiente</button>
            </div>
          </div>
          <div v-show="pase === 2">
            <strong>Instrucciones:</strong>
            <br />
            <br />
            <p>{{candidate.isBoss ? instruccion.lider.parrafo1 : instruccion.colaboradores.parrafo1 }}</p>
            <br />
            <p>{{candidate.isBoss ? instruccion.lider.parrafo2 : instruccion.colaboradores.parrafo2 }}</p>
            <br />
            <p>
              <strong>{{candidate.isBoss ? instruccion.lider.parrafo3 : instruccion.colaboradores.parrafo3 }}</strong>
            </p>
            <br />
            <p>Si estás mas o menos en desacuerdo con esta afirmación puedes marcar así:</p>
            <img
              v-show="candidate.isBoss"
              src="@/assets/ejemploa1.png"
              width="700px"
              style="margin-top:2px;"
            />
            <img
              v-show="!candidate.isBoss"
              src="@/assets/ejemploa1(c).png"
              width="700px"
              style="margin-top:2px;"
            />
            <p>Si estás mas o menos de acuerdo con esta afirmación puedes marcar así:</p>
            <img
              v-show="candidate.isBoss"
              src="@/assets/ejemploa2.png"
              width="700px"
              style="margin-top:2px;"
            />
            <img
              v-show="!candidate.isBoss"
              src="@/assets/ejemploa2(c).png"
              width="700px"
              style="margin-top:2px;"
            />

            <div class="field has-text-centered">
              <button @click="prev()" class="button is-primary">Anterior</button>
              <button @click="next()" class="button is-primary">Siguiente</button>
            </div>
          </div>
          <div class="pase has-text-left question" v-show="pase === 3">
            <h2 class="title is-5">
              <strong
                v-show="candidate.isBoss"
              >Autoevaluación líderes - {{relacion.evaluado.nombre}}</strong>
              <strong v-show="!candidate.isBoss">Estás evaluando a {{relacion.evaluado.nombre}}</strong>
            </h2>
            <img src="@/assets/ejemplo4.png" width="900px" style="margin-top:-20px;" />
            <br />
            <br />
            <progress class="progress is-success" :value="page / numberOfPages * 100" max="100">%</progress>

            <div class="field" v-for="(question, index) in displayedQuestions" :key="index">
              <label class="label">
                <strong>{{question.numeroPregunta}}.</strong>
                {{candidate.isBoss ? question.lider : question.colaboradores }}
                <br />
              </label>
              <div class="control" :key="index">
                <input
                  v-if="!candidate.isBoss"
                  required
                  class="is-checkradio is-info"
                  type="radio"
                  :id="question.codigo+ '00'"
                  value="0"
                  v-model="responses[question.codigo]"
                />
                <label
                  v-if="!candidate.isBoss"
                  :for="question.codigo+ '00'"
                  class="is-capitalized"
                >No sé</label>
                <input
                  required
                  class="is-checkradio is-info"
                  type="radio"
                  :id="question.codigo+ '01'"
                  value="1"
                  v-model="responses[question.codigo]"
                />
                <label :for="question.codigo+'01'" class="is-capitalized">1</label>
                <input
                  required
                  class="is-checkradio is-info"
                  type="radio"
                  :id="question.codigo+'02'"
                  value="2"
                  v-model="responses[question.codigo]"
                />
                <label :for="question.codigo+'02'" class="is-capitalized">2</label>
                <input
                  required
                  class="is-checkradio is-info"
                  type="radio"
                  :id="question.codigo+'03'"
                  value="3"
                  v-model="responses[question.codigo]"
                />
                <label :for="question.codigo+'03'" class="is-capitalized">3</label>
                <input
                  required
                  class="is-checkradio is-info"
                  type="radio"
                  :id="question.codigo+'04'"
                  value="4"
                  v-model="responses[question.codigo]"
                />
                <label :for="question.codigo+'04'" class="is-capitalized">4</label>
                <input
                  required
                  class="is-checkradio is-info"
                  type="radio"
                  :id="question.codigo+'05'"
                  value="5"
                  v-model="responses[question.codigo]"
                />
                <label :for="question.codigo +'05'" class="is-capitalized">5</label>
                <input
                  required
                  class="is-checkradio is-info"
                  type="radio"
                  :id="question.codigo +'06'"
                  value="6"
                  v-model="responses[question.codigo]"
                />
                <label :for="question.codigo +'06'" class="is-capitalized">6</label>
                <input
                  required
                  class="is-checkradio is-info"
                  type="radio"
                  :id="question.codigo+ '07'"
                  value="7"
                  v-model="responses[question.codigo]"
                />
                <label :for="question.codigo+'07'" class="is-capitalized">7</label>
                <input
                  required
                  class="is-checkradio is-info"
                  type="radio"
                  :id="question.codigo +'08'"
                  value="8"
                  v-model="responses[question.codigo]"
                />
                <label :for="question.codigo +'08'" class="is-capitalized">8</label>
                <input
                  required
                  class="is-checkradio is-info"
                  type="radio"
                  :id="question.codigo +'09'"
                  value="9"
                  v-model="responses[question.codigo]"
                />
                <label :for="question.codigo +'09'" class="is-capitalized">9</label>
                <input
                  required
                  class="is-checkradio is-info"
                  type="radio"
                  :id="question.codigo+ '10'"
                  value="10"
                  v-model="responses[question.codigo]"
                />
                <label :for="question.codigo+'10'" class="is-capitalized">10</label>
              </div>
            </div>
            <div class="buttons">
              <button
                type="button"
                @click="page --; scrollTop()"
                v-if="page != 1"
                class="button is-primary"
              >Anterior</button>
              <button
                type="button"
                @click="nextquestions"
                v-if="page != numberOfPages"
                class="button is-link"
                :disabled="!(Object.keys(responses).length -6 == page * perPage)"
              >Siguiente</button>
              <br />
            </div>
            <div class="buttons is-centered">
              <button
                @click="end()"
                class="button is-success"
                v-if="page == numberOfPages"
                :disabled="!(questions.length == Object.keys(responses).length - 6)"
              >Finalizar</button>
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
      relacion: {
        evaluado: "",
        evaluador: "",
      },
      pase: 0,
      candidate: {},
      isBoss: null,
      responses: {
        agree: true,
      },
      title: {
        lider:
          'Esta es una prueba para la valoración del  estilo de liderazgo. Tiene una autoevaluación y una versión para ser respondida por los colaboradores. Se han diseñado afirmaciones que describen comportamientos acerca del estilo del liderazgo. Por favor lee cada una y responde en qué grado estás de acuerdo con que te comportas de esa manera. Para responder ten en cuenta la escala que se presenta a continuación. Vale la pena aclarar que el 1 corresponde al "No" rotundo y la 10 el "Sí" rotundo, puedes utilizar todos los niveles intermedios para expresar lo que piensas de tu propio comportamiento. Recuerda que no hay respuestas buenas o malas. Lo que importa es conocer tu percepción frente a tu comportamiento como líder. Trata de responder rápidamente, no te detengas mucho en cada afirmación. Evita usar la opción 0 (No sé/No tengo elementos suficientes para responder). Utilízala lo menos posible y sólo cuando sea muy necesario.',
        colaboradores:
          'Esta es una prueba para la valoración del  estilo de liderazgo. Tiene una autoevaluación y una versión para ser respondida por los colaboradores. Te invitamos a seguir las instrucciones: Se han diseñado afirmaciones que describen comportamientos acerca del estilo del liderazgo que pueden tener los jefes.  Por favor lee cada una y responde en qué grado estás de acuerdo con que tu jefe inmediato se comporta de esa manera. Para responder ten en cuenta la escala que se presenta a continuación. Vale la pena aclarar que el 1 corresponde al "No" rotundo y la 10 el "Sí" rotundo, puedes utilizar todos los niveles intermedios para expresar lo que piensas del comportamiento de tu líder. Recuerda que no hay respuestas buenas o malas. Lo que importa es conocer tu percepción frente al comportamiento de tu líder. Trata de responder rápidamente, no te detengas mucho en cada afirmación. Evita usar la opción 0 (No sé/No tengo elementos suficientes para responder). Utilízala lo menos posible y sólo cuando sea muy necesario.',
      },
      consentimiento: {
        lider: {
          parrafo1:
            "En este momento tu organización se encuentra realizando una evaluación de las competencias de los líderes, para ayudarles a identificar fortalezas y oportunidades, e implementar acciones para cerrar las brechas existentes.  ",
          parrafo2:
            "Es importante que te concentres en el diligenciamiento y no salgas hasta terminar. ",
          parrafo3:
            "Una vez se finalicen todas las aplicaciones, cada líder y el personal de gestión humana podrán ver la evaluación realizada por los colaboradores, siempre y cuando participen mínimo tres personas del equipo. Para garantizar la tranquilidad de quienes participan, esta plataforma no permite visualizar las respuestas individuales de los colaboradores. ",
          parrafo4:
            "*Estos datos podrán ser usados por Psiembra Talento para investigación, siempre guardando la confidencialidad de los mismos. ",
        },
        colaboradores: {
          parrafo1:
            "En este momento tu organización se encuentra realizando una evaluación de las competencias de los líderes, para ayudarles a identificar fortalezas y oportunidades, e implementar acciones para cerrar las brechas existentes.",
          parrafo2:
            "Es importante que te concentres en el diligenciamiento y no salgas hasta terminar.",
          parrafo3:
            "Una vez se finalicen todas las aplicaciones, cada líder y el personal de gestión humana podrán ver la evaluación realizada por los colaboradores, siempre y cuando participen mínimo tres personas del equipo. Para garantizar la tranquilidad de quienes participan, esta plataforma no permite visualizar las respuestas individuales de los colaboradores. ",
          parrafo4:
            "*Estos datos podrán ser usados por Psiembra Talento para investigación, siempre manteniendo la confidencialidad de los mismos. ",
        },
      },
      instruccion: {
        lider: {
          parrafo1:
            "Vas a encontrarte afirmaciones que describen comportamientos de los líderes. Responde en una escala de 1 a 10 qué tanto consideras que tu actúas de esa manera. Ten en cuenta que el 1 corresponde a “Totalmente en desacuerdo” y el 10 a “Totalmente de acuerdo”, puedes utilizar todos los niveles intermedios para expresar lo que piensas.",
          parrafo2:
            "Recuerda que no hay respuestas buenas o malas. Lo que importa es conocer tu percepción frente a tu comportamiento como líder. Trata de responder rápidamente, no te detengas mucho en cada afirmación.",
          parrafo3: "A continuación te presentamos algunos ejemplos:",
        },
        colaboradores: {
          parrafo1:
            "Vas a encontrarte afirmaciones que describen comportamientos de los líderes. Responde en una escala de 1 a 10 qué tanto consideras que tu líder actúa de esa manera. Ten en cuenta que el 1 corresponde a “Totalmente en desacuerdo” y el 10 a “Totalmente de acuerdo”, puedes utilizar todos los niveles intermedios para expresar lo que piensas. Evita usar la opción “No sé” o utilízala lo menos posible y solo cuando sea estrictamente necesario.",
          parrafo2:
            "Recuerda que no hay respuestas buenas o malas. Lo que importa es conocer tu percepción frente al comportamiento de tu líder. Trata de responder rápidamente, no te detengas mucho en cada afirmación.",
          parrafo3: "A continuación te presentamos algunos ejemplos:",
        },
      },
      tipo: "colaboradores",
      questions: [
        {
          codigo: "rel33",
          lider: "Soy coherente entre lo que digo y lo que hago.",
          colaboradores: "Es coherente entre lo que dice y lo que hace.",
        },
        {
          codigo: "dsm9",
          lider:
            "Pido retroalimentación de mis colaboradores sobre mi rol de líder.",
          colaboradores:
            "Pide retroalimentación de sus colaboradores sobre su rol de líder.",
        },
        {
          codigo: "con12",
          lider: "Dedico tiempo para enseñar a mis colaboradores.",
          colaboradores: "Dedica tiempo para enseñar a sus colaboradores.",
        },
        {
          codigo: "dpe39",
          lider:
            "Me aseguro que mis colaboradores participen en la capacitación y entrenamiento que requieren.",
          colaboradores:
            "Se asegura que sus colaboradores participen en la capacitación y entrenamiento que requieren.",
        },
        {
          codigo: "rel27",
          lider: "Expreso mis emociones respetando a otros.",
          colaboradores: "Expresa sus emociones respetando a otros.",
        },
        {
          codigo: "dsm4",
          lider: "Puedo reconocer mis errores con humildad.",
          colaboradores: "Puede reconocer sus errores con humildad.",
        },
        {
          codigo: "log26",
          lider: "Veo los cambios como oportunidades.",
          colaboradores: "Ve los cambios como oportunidades.",
        },
        {
          codigo: "dsm22",
          lider:
            "Verifico el avance de mis planes de desarrollo personal y mejoramiento del desempeño.",
          colaboradores:
            "Verifica el avance de sus planes de desarrollo personal y mejoramiento del desempeño.",
        },
        {
          codigo: "dpe27",
          lider: "Hago seguimiento al desempeño de mis colaboradores.",
          colaboradores: "Hace seguimiento al desempeño de sus colaboradores.",
        },
        {
          codigo: "log3",
          lider: "Identifico soluciones para resolver problemas de raíz.",
          colaboradores:
            "Identifica soluciones para resolver problemas de raíz.",
        },
        {
          codigo: "dpe29",
          lider:
            "Me aseguro de que las personas de mi equipo cuenten con la información que necesitan para hacer su trabajo.",
          colaboradores:
            "Se asegura de que las personas de su equipo cuenten con la información que necesitan para hacer su trabajo.",
        },
        {
          codigo: "rel43",
          lider:
            "Estimulo el apoyo mutuo entre las personas de mi equipo de trabajo.",
          colaboradores:
            "Estimula el apoyo mutuo entre las personas de su equipo de trabajo.",
        },
        {
          codigo: "rel22",
          lider: "Doy respuestas claras cuando se me solicita información.",
          colaboradores:
            "Da respuestas claras cuando se le solicita información.",
        },
        {
          codigo: "rel10",
          lider: "Transmito información veraz en mi trabajo.",
          colaboradores: "Transmite información veraz en su trabajo.",
        },
        {
          codigo: "rel18",
          lider: "Mi comunicación es oportuna.",
          colaboradores: "Su comunicación es oportuna.",
        },
        {
          codigo: "rel35",
          lider: "Muestro coherencia en mis acciones.",
          colaboradores: "Muestra coherencia en sus acciones.",
        },
        {
          codigo: "dsm23",
          lider:
            "Realizo seguimiento frecuente de mi desempeño con el fin de superarme a mí mismo.",
          colaboradores:
            "Realiza seguimiento frecuente de su propio desempeño con el fin de superarse a sí mismo.",
        },
        {
          codigo: "log7",
          lider: "Alcanzo las metas definidas para mi proceso.",
          colaboradores: "Alcanza las metas definidas para su proceso.",
        },
        {
          codigo: "log15",
          lider: "Mido los resultados de mi trabajo.",
          colaboradores: "Mide los resultados de su trabajo.",
        },
        {
          codigo: "rel31",
          lider:
            "Controlo mi tono de voz para mantener el interés de las personas en lo que digo.",
          colaboradores:
            "Controla su tono de voz para mantener el interés de las personas en lo que dice. ",
        },
        {
          codigo: "rel12",
          lider: "Miro a la otra persona cuando me está hablando.",
          colaboradores: "Mira a la otra persona cuando le está hablando.",
        },
        {
          codigo: "con11",
          lider: "Transmito el conocimiento a mis colaboradores.",
          colaboradores: "Transmite el conocimiento a sus colaboradores.",
        },
        {
          codigo: "dpe17",
          lider:
            "Oriento a las personas nuevas del equipo para que conozcan claramente qué hacer en su trabajo.",
          colaboradores:
            "Orienta a las personas nuevas del equipo para que conozcan claramente qué hacer en su trabajo.",
        },
        {
          codigo: "log8",
          lider: "Logro los resultados de mi trabajo en el tiempo previsto.",
          colaboradores:
            "Logra los resultados de su trabajo en el tiempo previsto.",
        },
        {
          codigo: "dpe18",
          lider:
            "Le transmito a mis colaboradores la importancia de lo que hacen.",
          colaboradores:
            "Le transmite a sus colaboradores la importancia de lo que hacen.",
        },
        {
          codigo: "dpe6",
          lider:
            "Estoy al tanto de los conocimientos, habilidades y actitudes que poseen mis colaboradores.",
          colaboradores:
            "Está al tanto de los conocimientos, habilidades y actitudes que poseen sus colaboradores.",
        },
        {
          codigo: "con18",
          lider: "Complemento mis conocimientos con los que poseen otros.",
          colaboradores:
            "Complementa sus conocimientos con los que poseen otros.",
        },
        {
          codigo: "dpe43",
          lider:
            "Busco que mis colaboradores pongan en práctica los conocimientos y habilidades que poseen.",
          colaboradores:
            "Busca que sus colaboradores pongan en práctica los conocimientos y habilidades que poseen.",
        },
        {
          codigo: "con1",
          lider: "Poseo conocimiento necesario para hacer bien mi trabajo.",
          colaboradores:
            "Posee conocimiento necesario para hacer bien su trabajo.",
        },
        {
          codigo: "log2",
          lider:
            "Tengo en cuenta las opiniones de los demás para tomar decisiones.",
          colaboradores:
            "Tiene en cuenta las opiniones de los demás para tomar decisiones.",
        },

        {
          codigo: "log9",
          lider:
            "Alcanzo los resultados en mi trabajo con los recursos asignados para hacerlo.",
          colaboradores:
            "Alcanza los resultados en su trabajo con los recursos asignados para hacerlo.",
        },
        {
          codigo: "rel24",
          lider: "Mantengo el hilo de la conversación.",
          colaboradores: "Mantiene el hilo de la conversación.",
        },
        {
          codigo: "log6",
          lider: "Cumplo los compromisos que asumo.",
          colaboradores: "Cumple los compromisos que asume.",
        },
        {
          codigo: "dsm3",
          lider: "Cuando hago algo bien lo reconozco con sencillez.",
          colaboradores: "Cuando hace algo bien lo reconoce con sencillez.",
        },
        {
          codigo: "log11",
          lider: "Logro resultados en mi trabajo con la calidad requerida.",
          colaboradores:
            "Logra resultados en su trabajo con la calidad requerida.",
        },
        {
          codigo: "dsm8",
          lider: "Acepto con facilidad las cosas que no salen como esperaba.",
          colaboradores:
            "Acepta con facilidad las cosas que no salen como esperaba.",
        },

        {
          codigo: "rel38",
          lider: "Manifiesto mi malestar con respeto.",
          colaboradores: "Manifiesta su malestar con respeto.",
        },
        {
          codigo: "log27",
          lider: "Afronto nuevos proyectos.",
          colaboradores: "Afronta nuevos proyectos.",
        },
        {
          codigo: "dpe5",
          lider:
            "Identifico capacidades y destrezas en las personas de mi equipo.",
          colaboradores:
            "Identifica capacidades y destrezas en las personas de su equipo.",
        },
        {
          codigo: "log1",
          lider: "Tomo decisiones rápidamente basándome en mi experiencia.",
          colaboradores:
            "Toma decisiones rápidamente basándose en su experiencia.",
        },
        {
          codigo: "dpe24",
          lider:
            "Sugiero a mis colaboradores maneras distintas de hacer las cosas en su trabajo.",
          colaboradores:
            "Sugiere a sus colaboradores maneras distintas de hacer las cosas en su trabajo.",
        },
        {
          codigo: "rel46",
          lider:
            "Establezco relaciones de apoyo con personas de diferentes áreas.",
          colaboradores:
            "Establece relaciones de apoyo con personas de diferentes áreas.",
        },
        {
          codigo: "log24",
          lider: "Propongo nuevas formas de hacer las cosas.",
          colaboradores: "Propone nuevas formas de hacer las cosas.",
        },
        {
          codigo: "con4",
          lider: "Adquiero conocimientos a partir de nuevas actividades.",
          colaboradores:
            "Adquiere conocimientos a partir de nuevas actividades. ",
        },
        {
          codigo: "dsm13",
          lider:
            "Lo que pienso sobre mí mismo(a) coincide con lo que otros piensan de mí.",
          colaboradores:
            "Lo que piensa sobre sí mismo(a) coincide con lo que otros piensan de él(ella).",
        },
        {
          codigo: "log4",
          lider:
            "Analizo diversas posibilidades de acción a la hora de tomar una decisión.",
          colaboradores:
            "Analiza diversas posibilidades de acción a la hora de tomar una decisión.",
        },
        {
          codigo: "rel42",
          lider: "Coopero con las personas de mi equipo de trabajo.",
          colaboradores: "Coopera con las personas de su equipo de trabajo. ",
        },
        {
          codigo: "log14",
          lider: "Llevo a cabo mis actividades de principio a fin.",
          colaboradores: "Lleva a cabo sus actividades de principio a fin.",
        },
        {
          codigo: "log23",
          lider:
            "Insisto cuando la situación es difícil manteniendo una actitud positiva.",
          colaboradores:
            "Insiste cuando la situación es difícil manteniendo una actitud positiva.",
        },
        {
          codigo: "dsm6",
          lider: "Asumo las consecuencias de las decisiones que tomo.",
          colaboradores: "Asume las consecuencias de las decisiones que toma.",
        },
        {
          codigo: "log25",
          lider: "Durante las crisis identifico el camino a seguir.",
          colaboradores: "Durante las crisis identifica el camino a seguir.",
        },
        {
          codigo: "rel17",
          lider: "Mi comunicación es clara.",
          colaboradores: "Su comunicación es clara.",
        },
        {
          codigo: "rel8",
          lider: "Me concentro en la otra persona mientras me habla.",
          colaboradores: "Se concentra en la otra persona mientras le habla.",
        },
        {
          codigo: "con8",
          lider:
            "Ayudo a otros a resolver problemas a partir de mis conocimientos.",
          colaboradores:
            "Ayuda a otros a resolver problemas a partir de sus conocimientos.",
        },
        {
          codigo: "dsm5",
          lider: "Asumo las consecuencias de mis acciones.",
          colaboradores: "Asume las consecuencias de sus acciones.",
        },
        {
          codigo: "dsm12",
          lider:
            "Pido retroalimentación a mi propio jefe sobre mi rol como líder.",
          colaboradores:
            "Pide retroalimentación a su propio jefe sobre su rol como líder.",
        },
        {
          codigo: "dpe10",
          lider:
            "Doy orientaciones claras a las personas para desarrollar su trabajo.",
          colaboradores:
            "Da orientaciones claras a las personas para desarrollar su trabajo.",
        },
        {
          codigo: "rel48",
          lider: "Me acerco a las personas de mi equipo con regularidad.",
          colaboradores:
            "Se acerca a las personas de su equipo con regularidad.",
        },
        {
          codigo: "rel53",
          lider:
            "Intervengo en las situaciones de conflicto entre mis colaboradores.",
          colaboradores:
            "Interviene en las situaciones de conflicto entre sus colaboradores.",
        },
        {
          codigo: "dsm7",
          lider: "Admito mis equivocaciones.",
          colaboradores: "Admite sus equivocaciones.",
        },
        {
          codigo: "rel40",
          lider: "Busco el momento apropiado para expresar mis opiniones.",
          colaboradores:
            "Busca el momento apropiado para expresar sus opiniones.",
        },

        {
          codigo: "dsm16",
          lider: "Planteo metas claras para mejorar en mi vida laboral.",
          colaboradores:
            "Plantea metas claras para mejorar en su vida laboral.",
        },

        {
          codigo: "dsm15",
          lider: "Implemento planes para mi desarrollo personal.",
          colaboradores: "Implementa planes para su desarrollo personal.",
        },
        {
          codigo: "rel1",
          lider: "Escucho atentamente cuando otras personas me están hablando.",
          colaboradores:
            "Escucha atentamente cuando otras personas le están hablando.",
        },
        {
          codigo: "rel50",
          lider: "Conozco a los miembros de mi equipo de trabajo.",
          colaboradores: "Conoce a los miembros de su equipo de trabajo.",
        },
        {
          codigo: "dpe20",
          lider:
            "Asesoro a las personas de mi equipo para que desempeñen bien su labor.",
          colaboradores:
            "Asesora a las personas de su equipo para que desempeñen bien su labor.",
        },
        {
          codigo: "con15",
          lider:
            "Me apoyo en el conocimiento de otros para hacer bien mi trabajo.",
          colaboradores:
            "Se apoya en el conocimiento de otros para hacer bien su trabajo.",
        },
        {
          codigo: "rel20",
          lider: "Verifico la efectividad de mis comunicaciones.",
          colaboradores: "Verifica la efectividad de sus comunicaciones.",
        },
        {
          codigo: "rel30",
          lider:
            "Utilizo un lenguaje respetuoso cuando me dirijo a otras personas.",
          colaboradores:
            "Utiliza un lenguaje respetuoso cuando se dirige a otras personas.",
        },
        {
          codigo: "rel23",
          lider: "Doy respuestas precisas a las preguntas que me hacen.",
          colaboradores: "Da respuestas precisas a las preguntas que le hacen.",
        },
        {
          codigo: "dsm11",
          lider:
            "Pido retroalimentación de mis compañeros de trabajo sobre mi rol como líder.",
          colaboradores:
            "Pide retroalimentación de sus compañeros de trabajo de su rol como líder.",
        },
        {
          codigo: "rel54",
          lider: "Recompenso a mis colaboradores por un trabajo bien hecho.",
          colaboradores:
            "Recompensa a sus colaboradores por un trabajo bien hecho.",
        },
        {
          codigo: "rel55",
          lider:
            "Retroalimento a mis colaboradores sobre los resultados de lo que hacen. ",
          colaboradores:
            "Retroalimenta a sus colaboradores sobre los resultados de lo que hacen. ",
        },
        {
          codigo: "rel56",
          lider: "Felicito a mis colaboradores cuando hacen bien las cosas.",
          colaboradores:
            "Felicita a sus colaboradores cuando hacen bien las cosas. ",
        },
        {
          codigo: "rel57",
          lider:
            "Retroalimento positivamente a mis colaboradores cuando cumplen sus metas y objetivos. ",
          colaboradores:
            "Retroalimenta positivamente a sus colaboradores cuando cumplen sus metas y objetivos. ",
        },
        {
          codigo: "dpe47",
          lider:
            "Animo a mis colaboradores para que tomen sus propias decisiones.",
          colaboradores:
            "Anima a sus colaboradores para que tomen sus propias decisiones.",
        },
        {
          codigo: "dpe48",
          lider:
            "Exijo a mis colaboradores que propongan diferentes maneras de hacer la cosas.",
          colaboradores:
            "Exige a sus colaboradores que propongan diferentes maneras de hacer la cosas.",
        },
        {
          codigo: "dpe49",
          lider:
            "Estimulo a mis colaboradores para que resuelvan los problemas de trabajo.",
          colaboradores:
            "Estimula a sus colaboradores para que resuelvan los problemas de trabajo. ",
        },
      ],
      page: 1,
      perPage: 8,
      numberOfPages: 0,
    };
  },
  methods: {
    scrollTop() {
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: 200,
      });
    },
    async traerelaciones() {
      this.relaciones = [];
      let result;
      try {
        result = await apiServices.get(
          `/relacionbyid/${this.$route.params.id}`
        );
        if (result.data) {
          this.relacion = result.data;
          if (result.data.responses) {
            this.responses = result.data.responses;
          }
          const cantidadresponses = Object.keys(this.responses).length;
          if (cantidadresponses >= 6) {
            this.pase = 3;
            const cantidad = cantidadresponses - 6;
            console.log("cantidad", cantidad);
            const calculo = Math.ceil(cantidad / this.perPage);
            console.log("calculo", calculo);

            this.page = cantidad % 2 === 0 ? calculo + 1 : calculo;
          }
          if (this.relacion.relacion === "Autoevaluacion") {
            this.candidate.isBoss = true;
          } else {
            this.candidate.isBoss = false;
          }
          if (
            this.relacion.status === "terminado" ||
            this.relacion.status === "calculado"
          ) {
            this.$router.replace({ name: "finencuesta" });
          }
        } else {
          this.$router.replace({ name: "finencuesta" });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async saveresponses(end) {
      this.relaciones = [];
      let result;
      const d = {
        id: this.$route.params.id,
        responses: this.responses,
      };
      if (end) {
        d.end = true;
      }
      try {
        result = await apiServices.post(`/saveresponseslider`, d);
        if (result.data) {
          this.relacion = result.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    prev() {
      this.pase -= 1;
    },
    next() {
      this.pase += 1;
      this.saveresponses();
    },
    nextquestions() {
      this.saveresponses();
      this.page++;
      this.scrollTop();
    },
    end() {
      if (this.checkresponses()) {
        this.saveresponses(true);
        this.$store.dispatch("notify", {
          message: `Perfecto. Encuesta finalizada con éxito`,
        });
        this.$router.replace({ name: "finencuesta" });
        setTimeout(function () {
          window.location.replace("https://cincel.com.co/");
        }, 3000);
      }
    },
    endno() {
      this.saveresponses(false);
      this.$store.dispatch("notify", {
        message: `Perfecto. Proceso finalizado con éxito`,
      });
      this.$router.replace({ name: "finencuesta" });
      setTimeout(function () {
        window.location.replace("https://cincel.com.co/");
      }, 3000);
    },

    checkresponses() {
      // verifica que todas las preguntas del formulario sean respondidas
      let x = 0;
      let i;
      for (i = 0; i < this.questions.length; i++) {
        // verifica que el objeto responses tenga la propiedad (variable codigo) de cada pregunta
        if (!this.responses.hasOwnProperty(this.questions[i].codigo)) {
          x++;
        }
      }
      if (x > 0) {
        this.$store.dispatch("notify", {
          message: "Aún le falta(n) " + x + " pregunta(s) por responder!",
          type: "is-warning",
          position: "top-center",
        });
        return false;
      } else {
        return true;
      }
    },
    paginate(questions) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return questions.slice(from, to);
    },
  },
  computed: {
    displayedQuestions() {
      return this.paginate(this.questions);
    },
  },
  created() {
    this.traerelaciones();
    this.numberOfPages = Math.ceil(this.questions.length / this.perPage);
    this.questions.forEach((question, index) => {
      question.numeroPregunta = index + 1;
      return question;
    });
  },
};
</script>

<style lang='scss'>
.logo {
  top: 15px;
  z-index: 31;
  margin-left: 100px;
}
</style>