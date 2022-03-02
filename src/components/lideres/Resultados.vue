<template>
  <div>
    <br />
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{dep}}</h1>
          <h2 class="subtitle">Resumen del Resultado de Líderes Phd</h2>
          <div class="select" @change="changeselect">
            <select v-model="dependencia">
              <option v-for="(k,v) in dependencias" :value="k.valor" :key="v">{{k.nombre}}</option>
            </select>
          </div>
        </div>
      </div>
    </section>
    <br />
    <button class="button is-primary" @click="showInterpretation">Interpretación</button>
    <button class="button is-primary" @click="showGoals">Metas</button>
    <section class="section">
      <div class="columns">
        <div class="column" id="atuo0">
          <div
            class="has-text-centered titulopie"
            v-bind:style="styleObjecttitulo"
          >{{indexdatapie[0] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[0] === 0"
            v-bind:style="styleObjecttext"
          >{{datalider.autoevaluacion[estructura.categorias[0]] ? datalider.autoevaluacion[estructura.categorias[0]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[0] === 1"
            v-bind:style="styleObjecttext"
          >{{datalider.colaboradores[estructura.categorias[0]] ? datalider.colaboradores[estructura.categorias[0]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[0] === 0"
          >{{datalider.autoevaluacion[estructura.categorias[0]] ? rangos[datalider.autoevaluacion[estructura.categorias[0]].r] : rangos[0] }}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[0] === 1"
          >{{datalider.colaboradores[estructura.categorias[0]] ? rangos[datalider.colaboradores[estructura.categorias[0]].r] : rangos[0] }}</div>
          <h1 class="title is-5 has-text-centered">{{nombres[estructura.categorias[0]]}}</h1>
          <y-piephd :datagraph="datapie(0)" @tooltip="tooltip" :cambio="cambio[0]"></y-piephd>
          <br />
          <div class="control autoconciencia">
            <div class="tags has-addons">
              <span class="tag">Autoconciencia</span>
              <span
                v-if="datalider.autoconciencia[estructura.categorias[0]]"
                class="tag is-info"
              >{{rangoauto[datalider.autoconciencia[estructura.categorias[0]].r]}}</span>
            </div>
          </div>
          <h1 class="subtitle is-7">{{textos[estructura.categorias[0]]}}</h1>
          <hr />
        </div>
        <div class="column">
          <div
            class="has-text-centered titulopie"
            v-bind:style="styleObjecttitulo"
          >{{indexdatapie[1] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[1] === 0"
            v-bind:style="styleObjecttext"
          >{{datalider.autoevaluacion[estructura.categorias[1]] ? datalider.autoevaluacion[estructura.categorias[1]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[1] === 1"
            v-bind:style="styleObjecttext"
          >{{datalider.colaboradores[estructura.categorias[1]] ? datalider.colaboradores[estructura.categorias[1]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[1] === 0"
          >{{datalider.autoevaluacion[estructura.categorias[1]] ? rangos[datalider.autoevaluacion[estructura.categorias[1]].r] : rangos[0] }}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[1] === 1"
          >{{datalider.colaboradores[estructura.categorias[1]] ? rangos[datalider.colaboradores[estructura.categorias[1]].r] : rangos[0] }}</div>
          <h1 class="title is-5 has-text-centered">{{nombres[estructura.categorias[1]]}}</h1>
          <y-piephd :datagraph="datapie(1)" @tooltip="tooltip" :cambio="cambio[1]"></y-piephd>
          <br />
          <div class="control autoconciencia">
            <div class="tags has-addons">
              <span class="tag">Autoconciencia</span>
              <span
                v-if="datalider.autoconciencia[estructura.categorias[1]]"
                class="tag is-info"
              >{{rangoauto[datalider.autoconciencia[estructura.categorias[1]].r]}}</span>
            </div>
          </div>
          <h1 class="subtitle is-7">{{textos[estructura.categorias[1]]}}</h1>
          <hr />
        </div>
        <div class="column">
          <div
            class="has-text-centered titulopie"
            v-bind:style="styleObjecttitulo"
          >{{indexdatapie[2] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[2] === 0"
            v-bind:style="styleObjecttext"
          >{{datalider.autoevaluacion[estructura.categorias[2]] ? datalider.autoevaluacion[estructura.categorias[2]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[2] === 1"
            v-bind:style="styleObjecttext"
          >{{datalider.colaboradores[estructura.categorias[2]] ? datalider.colaboradores[estructura.categorias[2]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[2] === 0"
          >{{datalider.autoevaluacion[estructura.categorias[2]] ? rangos[datalider.autoevaluacion[estructura.categorias[2]].r] : rangos[0] }}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[2] === 1"
          >{{datalider.colaboradores[estructura.categorias[2]] ? rangos[datalider.colaboradores[estructura.categorias[2]].r] : rangos[0] }}</div>
          <h1 class="title is-5 has-text-centered">
            {{nombres[estructura.categorias[2]]}}&nbsp;&nbsp;
            <span
              @click="showResuld = !showResuld"
              class="icon has-text-dark hand"
            >
              <i class="material-icons">control_point</i>
            </span>
          </h1>
          <y-piephd :datagraph="datapie(2)" @tooltip="tooltip" :cambio="cambio[2]"></y-piephd>
          <br />
          <div class="control autoconciencia">
            <div class="tags has-addons">
              <span class="tag">Autoconciencia</span>
              <span
                v-if="datalider.autoconciencia[estructura.categorias[2]]"
                class="tag is-info"
              >{{rangoauto[datalider.autoconciencia[estructura.categorias[2]].r]}}</span>
            </div>
          </div>
          <h1 class="subtitle is-7">{{textos[estructura.categorias[2]]}}</h1>
          <hr />
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div
            class="has-text-centered titulopie"
            v-bind:style="styleObjecttitulo"
          >{{indexdatapie[3] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[3] === 0"
            v-bind:style="styleObjecttext"
          >{{datalider.autoevaluacion[estructura.categorias[3]] ? datalider.autoevaluacion[estructura.categorias[3]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[3] === 1"
            v-bind:style="styleObjecttext"
          >{{datalider.colaboradores[estructura.categorias[3]] ? datalider.colaboradores[estructura.categorias[3]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[3] === 0"
          >{{datalider.autoevaluacion[estructura.categorias[3]] ? rangos[datalider.autoevaluacion[estructura.categorias[3]].r] : rangos[0] }}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[3] === 1"
          >{{datalider.colaboradores[estructura.categorias[3]] ? rangos[datalider.colaboradores[estructura.categorias[3]].r] : rangos[0] }}</div>
          <h1 class="title is-5 has-text-centered">
            {{nombres[estructura.categorias[3]]}}&nbsp;&nbsp;
            <span
              @click="showDsm = !showDsm"
              class="icon has-text-dark hand"
            >
              <i class="material-icons">control_point</i>
            </span>
          </h1>
          <y-piephd :datagraph="datapie(3)" @tooltip="tooltip" :cambio="cambio[3]"></y-piephd>
          <br />
          <div class="control autoconciencia">
            <div class="tags has-addons">
              <span class="tag">Autoconciencia</span>
              <span
                v-if="datalider.autoconciencia[estructura.categorias[3]]"
                class="tag is-info"
              >{{rangoauto[datalider.autoconciencia[estructura.categorias[3]].r]}}</span>
            </div>
          </div>
          <h1 class="subtitle is-7">{{textos[estructura.categorias[3]]}}</h1>
          <hr />
        </div>
        <div class="column">
          <div
            class="has-text-centered titulopie"
            v-bind:style="styleObjecttitulo"
          >{{indexdatapie[4] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[4] === 0"
            v-bind:style="styleObjecttext"
          >{{datalider.autoevaluacion[estructura.categorias[4]] ? datalider.autoevaluacion[estructura.categorias[4]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[4] === 1"
            v-bind:style="styleObjecttext"
          >{{datalider.colaboradores[estructura.categorias[4]] ? datalider.colaboradores[estructura.categorias[4]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[4] === 0"
          >{{datalider.autoevaluacion[estructura.categorias[4]] ? rangos[datalider.autoevaluacion[estructura.categorias[4]].r] : rangos[0] }}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[4] === 1"
          >{{datalider.colaboradores[estructura.categorias[4]] ? rangos[datalider.colaboradores[estructura.categorias[4]].r] : rangos[0] }}</div>
          <h1 class="title is-5 has-text-centered">{{nombres[estructura.categorias[4]]}}</h1>
          <y-piephd :datagraph="datapie(4)" @tooltip="tooltip" :cambio="cambio[4]"></y-piephd>
          <br />
          <div class="control autoconciencia">
            <div class="tags has-addons">
              <span class="tag">Autoconciencia</span>
              <span
                v-if="datalider.autoconciencia[estructura.categorias[4]]"
                class="tag is-info"
              >{{rangoauto[datalider.autoconciencia[estructura.categorias[4]].r]}}</span>
            </div>
          </div>
          <h1 class="subtitle is-7">{{textos[estructura.categorias[4]]}}</h1>
          <hr />
        </div>
        <div class="column">
          <div
            class="has-text-centered titulopie"
            v-bind:style="styleObjecttitulo"
          >{{indexdatapie[5] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[5] === 0"
            v-bind:style="styleObjecttext"
          >{{datalider.autoevaluacion[estructura.categorias[5]] ? datalider.autoevaluacion[estructura.categorias[5]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered textpie"
            v-show="indexdatapie[5] === 1"
            v-bind:style="styleObjecttext"
          >{{datalider.colaboradores[estructura.categorias[5]] ? datalider.colaboradores[estructura.categorias[5]].e : 0 | textnumber(1)}}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[5] === 0"
          >{{datalider.autoevaluacion[estructura.categorias[5]] ? rangos[datalider.autoevaluacion[estructura.categorias[5]].r] : rangos[0] }}</div>
          <div
            class="has-text-centered subtitulopie"
            v-bind:style="styleObjecttitulo"
            v-show="indexdatapie[5] === 1"
          >{{datalider.colaboradores[estructura.categorias[5]] ? rangos[datalider.colaboradores[estructura.categorias[5]].r] : rangos[0] }}</div>
          <h1 class="title is-5 has-text-centered">
            {{nombres[estructura.categorias[5]]}}&nbsp;&nbsp;
            <span
              @click="showReld = !showReld"
              class="icon has-text-dark hand"
            >
              <i class="material-icons">control_point</i>
            </span>
          </h1>
          <y-piephd :datagraph="datapie(5)" @tooltip="tooltip" :cambio="cambio[5]"></y-piephd>
          <br />
          <div class="control autoconciencia">
            <div class="tags has-addons">
              <span class="tag">Autoconciencia</span>
              <span
                v-if="datalider.autoconciencia[estructura.categorias[5]]"
                class="tag is-info"
              >{{rangoauto[datalider.autoconciencia[estructura.categorias[5]].r]}}</span>
            </div>
          </div>
          <h1 class="subtitle is-7">{{textos[estructura.categorias[5]]}}</h1>
          <hr />
        </div>
      </div>
      <div class="columns">
        <div class="column is-8">
          <div class="box">
            <y-graph :datagraph="radar" :cambio="cambioradar"></y-graph>
          </div>
          <div class="box">
            <y-graph :datagraph="bar" :cambio="cambioradar"></y-graph>
          </div>
        </div>
        <div class="column">
          <div
            class="box has-text-centered is-shadowless"
            style="background-color: rgb(21, 183, 185); color: white; font-size: 28px;"
          >Autoconciencia</div>
          <div class="box box-height">
            <p>La Autoconciencia explora el nivel de similitud que existe entre la autoevaluación y la evaluación realizada por los colaboradores. Entre más cercanos estén ambos resultados, más alta será la autoconciencia.</p>
            <br />
            <p>Una autoconciencia alta evidencia capacidad de autocrítica, objetividad de juicio, madurez intelectual y orientación al aprendizaje. Además, promueve que los líderes sean más exitosos en el ejercicio de su rol y consigan mayores niveles de productividad y desempeño de sus equipos de trabajo.</p>
            <br />
            <p>Las personas con una baja autoconciencia suelen juzgarse de una forma más indulgente o mucho más severa que como lo hacen los demás. Esto dificulta que aprovechen las fortalezas que tienen y que tomen acción para superar sus oportunidades de mejora.</p>
          </div>
        </div>
      </div>
    </section>
    <modalinterpretation :show="showData" @showmodalinterpretation="showmodalinterpretation"></modalinterpretation>
    <modalgoals :show="showDataGoals" @showmodalgoals="showmodalgoals"></modalgoals>
    <div class="modal" v-bind:class="{ 'is-active': showResuld }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Gestión de Resultados</p>
          <button class="delete" aria-label="close" @click="closeModalResuld"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column">
              <div
                class="has-text-centered titulopiemodal"
                v-bind:style="styleObjecttitulo"
              >{{indexdatapie['resuld-0'] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
              <div
                class="has-text-centered textpiemodal"
                v-show="indexdatapie['resuld-0'] === 0"
                v-bind:style="styleObjecttext"
              >{{datalider.autoevaluacion[estructura.resuld[0]] ? datalider.autoevaluacion[estructura.resuld[0]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered textpiemodal"
                v-show="indexdatapie['resuld-0'] === 1"
                v-bind:style="styleObjecttext"
              >{{datalider.colaboradores[estructura.resuld[0]] ? datalider.colaboradores[estructura.resuld[0]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered subtitulopiemodal"
                v-bind:style="styleObjecttitulo"
                v-show="indexdatapie['resuld-0'] === 0"
              >{{datalider.autoevaluacion[estructura.resuld[0]] ? rangos[datalider.autoevaluacion[estructura.resuld[0]].r] : rangos[0] }}</div>
              <div
                class="has-text-centered subtitulopiemodal"
                v-bind:style="styleObjecttitulo"
                v-show="indexdatapie['resuld-0'] === 1"
              >{{datalider.colaboradores[estructura.resuld[0]] ? rangos[datalider.colaboradores[estructura.resuld[0]].r] : rangos[0] }}</div>
              <h1 class="title is-5 has-text-centered">{{nombres[estructura.resuld[0]]}}</h1>
              <y-piephd
                :datagraph="datapieSubcategory('resuld',0)"
                @tooltip="tooltip"
                :cambio="cambio['resuld-0']"
              ></y-piephd>
              <br />
              <div class="control autoconciencia">
                <div class="tags has-addons">
                  <span class="tag">Autoconciencia</span>
                  <span
                    v-if="datalider.autoconciencia[estructura.resuld[0]]"
                    class="tag is-info"
                  >{{rangoauto[datalider.autoconciencia[estructura.resuld[0]].r]}}</span>
                </div>
              </div>
              <h1 class="subtitle is-7">{{textos[estructura.resuld[0]]}}</h1>
              <hr />
            </div>
            <div class="column">
              <div
                class="has-text-centered titulopiemodal"
                v-bind:style="styleObjecttitulo"
              >{{indexdatapie['resuld-1'] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
              <div
                class="has-text-centered textpiemodal"
                v-show="indexdatapie['resuld-1'] === 0"
                v-bind:style="styleObjecttext"
              >{{datalider.autoevaluacion[estructura.resuld[1]] ? datalider.autoevaluacion[estructura.resuld[1]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered textpiemodal"
                v-show="indexdatapie['resuld-1'] === 1"
                v-bind:style="styleObjecttext"
              >{{datalider.colaboradores[estructura.resuld[1]] ? datalider.colaboradores[estructura.resuld[1]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered subtitulopiemodal"
                v-bind:style="styleObjecttitulo"
                v-show="indexdatapie['resuld-1'] === 0"
              >{{datalider.autoevaluacion[estructura.resuld[1]] ? rangos[datalider.autoevaluacion[estructura.resuld[1]].r] : rangos[0] }}</div>
              <div
                class="has-text-centered subtitulopiemodal"
                v-bind:style="styleObjecttitulo"
                v-show="indexdatapie['resuld-1'] === 1"
              >{{datalider.colaboradores[estructura.resuld[1]] ? rangos[datalider.colaboradores[estructura.resuld[1]].r] : rangos[0] }}</div>
              <h1 class="title is-5 has-text-centered">{{nombres[estructura.resuld[1]]}}</h1>
              <y-piephd
                :datagraph="datapieSubcategory('resuld',1)"
                @tooltip="tooltip"
                :cambio="cambio['resuld-1']"
              ></y-piephd>
              <br />
              <div class="control autoconciencia">
                <div class="tags has-addons">
                  <span class="tag">Autoconciencia</span>
                  <span
                    v-if="datalider.autoconciencia[estructura.resuld[1]]"
                    class="tag is-info"
                  >{{rangoauto[datalider.autoconciencia[estructura.resuld[1]].r]}}</span>
                </div>
              </div>
              <h1 class="subtitle is-7">{{textos[estructura.resuld[1]]}}</h1>
              <hr />
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="modal" v-bind:class="{ 'is-active': showDsm }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Gestión de Sí Mismo</p>
          <button class="delete" aria-label="close" @click="closeModalDsm"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column">
              <div
                class="has-text-centered titulopiemodal"
                v-bind:style="styleObjecttitulo"
              >{{indexdatapie['dsmd-0'] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
              <div
                class="has-text-centered textpiemodal"
                v-show="indexdatapie['dsmd-0'] === 0"
                v-bind:style="styleObjecttext"
              >{{datalider.autoevaluacion[estructura.dsmd[0]] ? datalider.autoevaluacion[estructura.dsmd[0]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered textpiemodal"
                v-show="indexdatapie['dsmd-0'] === 1"
                v-bind:style="styleObjecttext"
              >{{datalider.colaboradores[estructura.dsmd[0]] ? datalider.colaboradores[estructura.dsmd[0]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered subtitulopiemodal"
                v-bind:style="styleObjecttitulo"
                v-show="indexdatapie['dsmd-0'] === 0"
              >{{datalider.autoevaluacion[estructura.dsmd[0]] ? rangos[datalider.autoevaluacion[estructura.dsmd[0]].r] : rangos[0] }}</div>
              <div
                class="has-text-centered subtitulopiemodal"
                v-bind:style="styleObjecttitulo"
                v-show="indexdatapie['dsmd-0'] === 1"
              >{{datalider.colaboradores[estructura.dsmd[0]] ? rangos[datalider.colaboradores[estructura.dsmd[0]].r] : rangos[0] }}</div>
              <h1 class="title is-5 has-text-centered">{{nombres[estructura.dsmd[0]]}}</h1>
              <y-piephd
                :datagraph="datapieSubcategory('dsmd',0)"
                @tooltip="tooltip"
                :cambio="cambio['dsmd-0']"
              ></y-piephd>
              <br />
              <div class="control autoconciencia">
                <div class="tags has-addons">
                  <span class="tag">Autoconciencia</span>
                  <span
                    v-if="datalider.autoconciencia[estructura.dsmd[0]]"
                    class="tag is-info"
                  >{{rangoauto[datalider.autoconciencia[estructura.dsmd[0]].r]}}</span>
                </div>
              </div>
              <h1 class="subtitle is-7">{{textos[estructura.dsmd[0]]}}</h1>
              <hr />
            </div>
            <div class="column">
              <div
                class="has-text-centered titulopiemodal"
                v-bind:style="styleObjecttitulo"
              >{{indexdatapie['dsmd-1'] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
              <div
                class="has-text-centered textpiemodal"
                v-show="indexdatapie['dsmd-1'] === 0"
                v-bind:style="styleObjecttext"
              >{{datalider.autoevaluacion[estructura.dsmd[1]] ? datalider.autoevaluacion[estructura.dsmd[1]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered textpiemodal"
                v-show="indexdatapie['dsmd-1'] === 1"
                v-bind:style="styleObjecttext"
              >{{datalider.colaboradores[estructura.dsmd[1]] ? datalider.colaboradores[estructura.dsmd[1]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered subtitulopiemodal"
                v-bind:style="styleObjecttitulo"
                v-show="indexdatapie['dsmd-1'] === 0"
              >{{datalider.autoevaluacion[estructura.dsmd[1]] ? rangos[datalider.autoevaluacion[estructura.dsmd[1]].r] : rangos[0] }}</div>
              <div
                class="has-text-centered subtitulopiemodal"
                v-bind:style="styleObjecttitulo"
                v-show="indexdatapie['dsmd-1'] === 1"
              >{{datalider.colaboradores[estructura.dsmd[1]] ? rangos[datalider.colaboradores[estructura.dsmd[1]].r] : rangos[0] }}</div>
              <h1 class="title is-5 has-text-centered">{{nombres[estructura.dsmd[1]]}}</h1>
              <y-piephd
                :datagraph="datapieSubcategory('dsmd',1)"
                @tooltip="tooltip"
                :cambio="cambio['dsmd-1']"
              ></y-piephd>
              <br />
              <div class="control autoconciencia">
                <div class="tags has-addons">
                  <span class="tag">Autoconciencia</span>
                  <span
                    v-if="datalider.autoconciencia[estructura.dsmd[1]]"
                    class="tag is-info"
                  >{{rangoauto[datalider.autoconciencia[estructura.dsmd[1]].r]}}</span>
                </div>
              </div>
              <h1 class="subtitle is-7">{{textos[estructura.dsmd[1]]}}</h1>
              <hr />
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="modal" v-bind:class="{ 'is-active': showReld }">
      <div class="modal-background"></div>
      <div class="modal-card" style="width:1400px;">
        <header class="modal-card-head">
          <p class="modal-card-title">Gestión de Relaciones</p>
          <button class="delete" aria-label="close" @click="closeModalReld"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column">
              <div
                class="has-text-centered titulopiereld"
              >{{indexdatapie['reld-0'] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
              <div
                class="has-text-centered textpiereld"
                v-show="indexdatapie['reld-0'] === 0"
              >{{datalider.autoevaluacion[estructura.reld[0]] ? datalider.autoevaluacion[estructura.reld[0]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered textpiereld"
                v-show="indexdatapie['reld-0'] === 1"
              >{{datalider.colaboradores[estructura.reld[0]] ? datalider.colaboradores[estructura.reld[0]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered subtitulopiereld"
                v-show="indexdatapie['reld-0'] === 0"
              >{{datalider.autoevaluacion[estructura.reld[0]] ? rangos[datalider.autoevaluacion[estructura.reld[0]].r] : rangos[0] }}</div>
              <div
                class="has-text-centered subtitulopiereld"
                v-show="indexdatapie['reld-0'] === 1"
              >{{datalider.colaboradores[estructura.reld[0]] ? rangos[datalider.colaboradores[estructura.reld[0]].r] : rangos[0] }}</div>
              <h1 class="title is-5 has-text-centered">{{nombres[estructura.reld[0]]}}</h1>
              <y-piephd
                :datagraph="datapieSubcategory('reld',0)"
                @tooltip="tooltip"
                :cambio="cambio['reld-0']"
              ></y-piephd>
              <br />
              <div class="control autoconciencia">
                <div class="tags has-addons">
                  <span class="tag">Autoconciencia</span>
                  <span
                    v-if="datalider.autoconciencia[estructura.reld[0]]"
                    class="tag is-info"
                  >{{rangoauto[datalider.autoconciencia[estructura.reld[0]].r]}}</span>
                </div>
              </div>
              <h1 class="subtitle is-7">{{textos[estructura.reld[0]]}}</h1>
              <hr />
            </div>
            <div class="column">
              <div
                class="has-text-centered titulopiereld"
              >{{indexdatapie['reld-1'] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
              <div
                class="has-text-centered textpiereld"
                v-show="indexdatapie['reld-1'] === 0"
              >{{datalider.autoevaluacion[estructura.reld[1]] ? datalider.autoevaluacion[estructura.reld[1]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered textpiereld"
                v-show="indexdatapie['reld-1'] === 1"
              >{{datalider.colaboradores[estructura.reld[1]] ? datalider.colaboradores[estructura.reld[1]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered subtitulopiereld"
                v-show="indexdatapie['reld-1'] === 0"
              >{{datalider.autoevaluacion[estructura.reld[1]] ? rangos[datalider.autoevaluacion[estructura.reld[1]].r] : rangos[0] }}</div>
              <div
                class="has-text-centered subtitulopiereld"
                v-show="indexdatapie['reld-1'] === 1"
              >{{datalider.colaboradores[estructura.reld[1]] ? rangos[datalider.colaboradores[estructura.reld[1]].r] : rangos[0] }}</div>
              <h1 class="title is-5 has-text-centered">{{nombres[estructura.reld[1]]}}</h1>
              <y-piephd
                :datagraph="datapieSubcategory('reld',1)"
                @tooltip="tooltip"
                :cambio="cambio['reld-1']"
              ></y-piephd>
              <br />
              <div class="control autoconciencia">
                <div class="tags has-addons">
                  <span class="tag">Autoconciencia</span>
                  <span
                    v-if="datalider.autoconciencia[estructura.reld[1]]"
                    class="tag is-info"
                  >{{rangoauto[datalider.autoconciencia[estructura.reld[1]].r]}}</span>
                </div>
              </div>
              <h1 class="subtitle is-7">{{textos[estructura.reld[1]]}}</h1>
              <hr />
            </div>
            <div class="column">
              <div
                class="has-text-centered titulopiereld"
              >{{indexdatapie['reld-2'] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
              <div
                class="has-text-centered textpiereld"
                v-show="indexdatapie['reld-2'] === 0"
              >{{datalider.autoevaluacion[estructura.reld[2]] ? datalider.autoevaluacion[estructura.reld[2]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered textpiereld"
                v-show="indexdatapie['reld-2'] === 1"
              >{{datalider.colaboradores[estructura.reld[2]] ? datalider.colaboradores[estructura.reld[2]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered subtitulopiereld"
                v-show="indexdatapie['reld-2'] === 0"
              >{{datalider.autoevaluacion[estructura.reld[2]] ? rangos[datalider.autoevaluacion[estructura.reld[2]].r] : rangos[0] }}</div>
              <div
                class="has-text-centered subtitulopiereld"
                v-show="indexdatapie['reld-2'] === 1"
              >{{datalider.colaboradores[estructura.reld[2]] ? rangos[datalider.colaboradores[estructura.reld[2]].r] : rangos[0] }}</div>
              <h1 class="title is-5 has-text-centered">{{nombres[estructura.reld[2]]}}</h1>
              <y-piephd
                :datagraph="datapieSubcategory('reld',2)"
                @tooltip="tooltip"
                :cambio="cambio['reld-2']"
              ></y-piephd>
              <br />
              <div class="control autoconciencia">
                <div class="tags has-addons">
                  <span class="tag">Autoconciencia</span>
                  <span
                    v-if="datalider.autoconciencia[estructura.reld[2]]"
                    class="tag is-info"
                  >{{rangoauto[datalider.autoconciencia[estructura.reld[2]].r]}}</span>
                </div>
              </div>
              <h1 class="subtitle is-7">{{textos[estructura.reld[2]]}}</h1>
              <hr />
            </div>
            <div class="column">
              <div
                class="has-text-centered titulopiereld"
              >{{indexdatapie['reld-3'] === 0 ? 'Autoevaluación':'Colaborador'}}</div>
              <div
                class="has-text-centered textpiereld"
                v-show="indexdatapie['reld-3'] === 0"
              >{{datalider.autoevaluacion[estructura.reld[3]] ? datalider.autoevaluacion[estructura.reld[3]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered textpiereld"
                v-show="indexdatapie['reld-3'] === 1"
              >{{datalider.colaboradores[estructura.reld[3]] ? datalider.colaboradores[estructura.reld[3]].e : 0 | textnumber(1)}}</div>
              <div
                class="has-text-centered subtitulopiereld"
                v-show="indexdatapie['reld-3'] === 0"
              >{{datalider.autoevaluacion[estructura.reld[3]] ? rangos[datalider.autoevaluacion[estructura.reld[3]].r] : rangos[0] }}</div>
              <div
                class="has-text-centered subtitulopiereld"
                v-show="indexdatapie['reld-3'] === 1"
              >{{datalider.colaboradores[estructura.reld[3]] ? rangos[datalider.colaboradores[estructura.reld[3]].r] : rangos[0] }}</div>
              <h1 class="title is-5 has-text-centered">{{nombres[estructura.reld[3]]}}</h1>
              <y-piephd
                :datagraph="datapieSubcategory('reld',3)"
                @tooltip="tooltip"
                :cambio="cambio['reld-3']"
              ></y-piephd>
              <br />
              <div class="control autoconciencia">
                <div class="tags has-addons">
                  <span class="tag">Autoconciencia</span>
                  <span
                    v-if="datalider.autoconciencia[estructura.reld[3]]"
                    class="tag is-info"
                  >{{rangoauto[datalider.autoconciencia[estructura.reld[3]].r]}}</span>
                </div>
              </div>
              <h1 class="subtitle is-7">{{textos[estructura.reld[3]]}}</h1>
              <hr />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import apiServices from "@/services/yungol-services";
import modalinterpretation from "@/components/modals/Modalinterpretation.vue";
import modalgoals from "@/components/modals/Modalgoals.vue";
import yPiephd from "@/components/dashboard/Piephd.vue";
import yGraph from "@/components/dashboard/Graph.vue";

import { mapState } from "vuex";
export default {
  data() {
    return {
      showDataSubcategory: false,
      showResuld: false,
      showDsm: false,
      showReld: false,
      anchodiv: 0,
      showData: false,
      showDataGoals: false,
      dependencia: null,
      dependencias: [],
      cambioradar: 0,
      cambio: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        "resuld-0": 0,
        "resuld-1": 0,
        "dsmd-0": 0,
        "dsmd-1": 0,
        "reld-0": 0,
        "reld-1": 0,
        "reld-2": 0,
        "reld-3": 0
      },
      coloresrango: {
        0: "#fff",
        1: "#ff4646",
        2: "#ffd13b",
        3: "#fffd95",
        4: "#90ffcd",
        5: "#00f587",
        6: "#008c14"
      },
      indexdatapie: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        "resuld-0": 0,
        "resuld-1": 0,
        "dsmd-0": 0,
        "dsmd-1": 0,
        "reld-0": 0,
        "reld-1": 0,
        "reld-2": 0,
        "reld-3": 0
      },
      radar: {
        typeGraphic: "radar",
        colors: ["#07689f", "#10ddc2"],
        options: {
          scales: false,
          legend: {
            position: "right",
            display: true
          }
        },
        datasetOverride: [],
        series: ["Autoevaluacion", "Colaborador"],
        labels: [
          "Jefe",
          "Claridad",
          "Trato",
          "Recursos",
          "Apoyo Org.",
          "Estabilidad"
        ],
        data: [
          [68, 65.7, 65.9, 62.4, 63.9, 65.3],
          [39.4, 34.4, 55.9, 41.8, 50.7, 52.8]
        ]
      },
      bar: {
        typeGraphic: "bar",
        colors: ["#07689f", "#10ddc2"],
        options: {
          scales: false,
          legend: {
            position: "top",
            display: true
          }
        },
        datasetOverride: [],
        series: ["Autoevaluacion", "Colaborador"],
        labels: [
          "Jefe",
          "Claridad",
          "Trato",
          "Recursos",
          "Apoyo Org.",
          "Estabilidad"
        ],
        data: [
          [68, 65.7, 65.9, 62.4, 63.9, 65.3],
          [39.4, 34.4, 55.9, 41.8, 50.7, 52.8]
        ]
      },
      hover: {
        cond: false,
        dsmd: false,
        liderT: false,
        resuld: false,
        cambiod: false,
        logrod: false,
        gperd: false,
        reld: false,
        humid: false,
        autogd: false,
        cefectivad: false,
        asertivad: false,
        cercaniad: false,
        rad: false
      },
      datalider: {
        autoconciencia: {},
        autoevaluacion: {},
        colaboradores: {},
        dependencias: [],
        ncolaboradores: 0
      },
      rangos: {
        0: "Sin resultados",
        1: "Debilidad",
        2: "Oportunidad de Mejora",
        3: "En Desarrollo",
        4: "Fortaleza",
        5: "Fortaleza Destacada",
        6: "Fortaleza Excepcional"
      },
      rangoauto: {
        0: "Sin resultados",
        1: "Alta",
        2: "Media",
        3: "Baja"
      },
      nombres: {
        cond: "Gestión del Conocimiento",
        resuld: "Gestión de Resultados",
        cambiod: "Cambio y Toma de Decisiones",
        logrod: "Logro",
        dsmd: "Gestión de Sí Mismo",
        humid: "Humildad",
        autogd: "Autogestión",
        gperd: "Gestión de Personas",
        reld: "Gestión de Relaciones",
        cefectivad: "Comunicación Efectiva",
        asertivad: "Asertividad",
        cercaniad: "Cercanía",
        rad: "Retroalimentación",
        liderT: "Líder PHD"
      },

      textos: {
        cond:
          "Posee, utiliza, transmite y valora el conocimiento necesario para realizar el trabajo.",
        resuld: "Logra resultados exitosos en su trabajo.",
        cambiod:
          "Toma decisiones acertadas en el trabajo y busca nuevas formas de hacer las cosas.",
        logrod:
          "Alcanza las metas planteadas, mantiene el control de su gestión y cumple sus compromisos.",
        dsmd:
          "Valora de manera precisa su comportamiento y habilidades, aceptando sus errores y aciertos con sencillez e implementando planes para su propio desarrollo y mejora.",
        humid: "Acepta sus errores y aciertos con sencillez. ",
        autogd:
          "Valora de manera precisa sus fortalezas y debilidades e implementa planes para su propia mejora y desarrollo.",
        gperd:
          "Conoce, guía y desarrolla el potencial y desempeño de personas y equipos.",
        reld:
          "Establece vínculos cálidos y respetuosos basados en la comunicación efectiva, la asertividad, la coherencia y la retroalimentación. ",
        cefectivad:
          "Expresa clara y oportunamente sus ideas, escucha activamente a las otras personas y verifica la comprensión del mensaje. ",
        asertivad:
          "Expresa de manera abierta y respetuosa, pensamientos, opiniones y emociones y muestra coherencia entre lo que dice y hace .",
        cercaniad:
          "Conoce, apoya y se acerca regularmente  a los miembros de su equipo y  promueve la ayuda mutua ellos. ",
        rad:
          "Brinda retroalimentación constante  a sus colaboradores, tanto sobre sus exitos como sus fracasos.",
        liderT: "Líder PHD"
      },
      estructura: {
        categorias: ["liderT", "cond", "resuld", "dsmd", "gperd", "reld"],
        cond: [],
        resuld: ["cambiod", "logrod"],
        dsmd: ["humid", "autogd"],
        gperd: [],
        reld: ["cefectivad", "asertivad", "cercaniad", "rad"],
        liderT: []
      },
      showcategorias: {
        liderT: false,
        cond: false,
        resuld: false,
        dsmd: false,
        gperd: false,
        reld: false
      }
    };
  },
  props: {
    proceso: {
      type: Object
    }
  },
  computed: {
    ...mapState(["idtoken", "empresa", "windowwidth"]),
    routestateid() {
      return this.$route.params.liderid;
    },
    dep() {
      if (!this.dependencia) {
        return this.empresa.nombre;
      } else {
        return this.dependencia;
      }
    },
    styleObjecttext() {
      let d = {};
      const marginleft = (this.anchodiv - 80) / 2;
      d["margin-left"] = marginleft - 10 + "px";
      return d;
    },
    styleObjecttitulo() {
      let d = {};

      const marginleft = (this.anchodiv - 100) / 2;
      d["margin-left"] = marginleft - 13 + "px";
      return d;
    }
  },
  methods: {
    closeModalResuld() {
      this.showResuld = false;
    },
    closeModalDsm() {
      this.showDsm = false;
    },
    closeModalReld() {
      this.showReld = false;
    },
    graficaradar() {
      const _this = this;
      this.radar.labels = [];
      this.bar.labels = [];
      this.estructura.categorias.forEach(function(categoria, index) {
        _this.radar.labels.push(_this.nombres[categoria]);
        _this.radar.data[0][index] =
          _this.datalider.autoevaluacion[categoria].e;
        _this.radar.data[1][index] = _this.datalider.colaboradores[categoria].e;
        _this.bar.labels.push(_this.nombres[categoria]);
        _this.bar.data[0][index] = _this.datalider.autoevaluacion[categoria].e;
        _this.bar.data[1][index] = _this.datalider.colaboradores[categoria].e;
      });
      this.cambioradar++;
    },
    tooltip(n) {
      this.indexdatapie[n.datapie] = n.tooltipItem.datasetIndex;
    },
    datapie(n) {
      const _this = this;
      let datoautoevaluacion = 0;
      let datocolaborador = 0;
      let colorautoevaluacion = "#f5f5f5";
      let colorcolaborador = "#f5f5f5";
      if (_this.datalider.autoevaluacion[_this.estructura.categorias[n]]) {
        datoautoevaluacion = parseFloat(
          _this.datalider.autoevaluacion[_this.estructura.categorias[n]].e
        );
        datocolaborador = parseFloat(
          _this.datalider.colaboradores[_this.estructura.categorias[n]].e
        );
        colorautoevaluacion =
          _this.coloresrango[
            _this.datalider.autoevaluacion[_this.estructura.categorias[n]].r
          ];
        colorcolaborador =
          _this.coloresrango[
            _this.datalider.colaboradores[_this.estructura.categorias[n]].r
          ];
      }
      const rotador = (100 - datoautoevaluacion) / 100;
      const pie = {
        datapie: n,
        colors: [colorautoevaluacion, colorcolaborador, "#fff"],
        options: {
          legend: {
            display: false
          },
          cutoutPercentage: 70,
          rotation: (0.5 + rotador) * Math.PI
        },
        series: ["Autoevaluación", "Colaboradores"],
        labels: [`${_this.estructura.categorias[n]}`, "", ""],
        data: [
          [datoautoevaluacion, 0, 100 - datoautoevaluacion],
          [0, datocolaborador, 100 - datocolaborador]
        ]
      };
      return pie;
    },
    datapieSubcategory(campo, n) {
      const _this = this;
      let datoautoevaluacion = 0;
      let datocolaborador = 0;
      let colorautoevaluacion = "#f5f5f5";
      let colorcolaborador = "#f5f5f5";
      if (_this.datalider.autoevaluacion[_this.estructura[campo][n]]) {
        datoautoevaluacion = parseFloat(
          _this.datalider.autoevaluacion[_this.estructura[campo][n]].e
        );
        datocolaborador = parseFloat(
          _this.datalider.colaboradores[_this.estructura[campo][n]].e
        );
        colorautoevaluacion =
          _this.coloresrango[
            _this.datalider.autoevaluacion[_this.estructura[campo][n]].r
          ];
        colorcolaborador =
          _this.coloresrango[
            _this.datalider.colaboradores[_this.estructura[campo][n]].r
          ];
      }
      const rotador = (100 - datoautoevaluacion) / 100;
      const pie = {
        datapie: `${campo}-${n}`,
        colors: [colorautoevaluacion, colorcolaborador, "#fff"],
        options: {
          legend: {
            display: false
          },
          cutoutPercentage: 70,
          rotation: (0.5 + rotador) * Math.PI
        },
        series: ["Autoevaluación", "Colaboradores"],
        labels: [`${_this.estructura[campo][n]}`, "", ""],
        data: [
          [datoautoevaluacion, 0, 100 - datoautoevaluacion],
          [0, datocolaborador, 100 - datocolaborador]
        ]
      };
      return pie;
    },
    showInterpretation() {
      this.showData = true;
    },
    showmodalinterpretation() {
      if (this.showData) {
        this.showData = false;
      } else {
        this.showData = true;
      }
    },
    showGoals() {
      this.showDataGoals = true;
    },
    showmodalgoals() {
      if (this.showDataGoals) {
        this.showDataGoals = false;
      } else {
        this.showDataGoals = true;
      }
    },
    visibility(d) {
      if (this.hover[d]) {
        this.hover[d] = false;
      } else {
        this.hover[d] = true;
      }
    },
    hidecategory(d) {
      if (this.showcategorias[d]) {
        this.showcategorias[d] = false;
      } else {
        this.showcategorias[d] = true;
      }
    },
    fondo(n) {
      if (n === 0) {
        return "is-light";
      } else if (n === 1) {
        return "is-deb";
      } else if (n === 2) {
        return "is-opor";
      } else if (n === 3) {
        return "is-desarr";
      } else if (n === 4) {
        return "is-forta";
      } else if (n === 5) {
        return "is-fdest";
      } else if (n === 6) {
        return "is-fex";
      }
    },
    changeselect() {
      this.traeData(this);
    },
    async traeData(_this) {
      let result;
      try {
        result = await apiServices.post(`/resumenlider`, {
          dependencia: _this.dependencia,
          procesoid: _this.proceso._id
        });
        _this.datalider = result.data;
        _this.dependencias = [];
        _this.dependencias.push({
          nombre: _this.empresa.nombre,
          valor: null
        });
        _this.datalider.dependencias.forEach(function(k) {
          _this.dependencias.push({
            nombre: k,
            valor: k
          });
        });
        const campos = Object.keys(_this.cambio);
        campos.forEach(function(k) {
          _this.cambio[k]++;
        });
        _this.graficaradar();
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    windowwidth(nv, ov) {
      this.anchodiv = document.getElementById("atuo0").clientWidth;
    },
    idtoken(newv, oldv) {
      if (newv) {
        this.traeData(this);
      }
    },
    routestateid(nv, ov) {
      this.traeData(this);
    }
  },
  mounted() {
    this.anchodiv = document.getElementById("atuo0").clientWidth;
  },
  created() {
    if (this.idtoken) {
      this.traeData(this);
    }
  },
  components: {
    modalinterpretation,
    modalgoals,
    yPiephd,
    yGraph
  }
};
</script>

<style lang="scss" scoped>
.textpie {
  width: 80px;
  position: absolute;
  margin-top: 105px;
  font-size: 33px;
}
.titulopie {
  width: 100px;
  position: absolute;
  margin-top: 92px;
  font-size: 12px;
}
.subtitulopie {
  width: 100px;
  position: absolute;
  margin-top: 151px;
  font-size: 12px;
}
.autoconciencia {
  width: 300px;
  position: absolute;
  margin-top: -40px;
  font-size: 12px;
}
.textpiemodal {
  width: 110px;
  position: absolute;
  margin-top: 110px;
  font-size: 33px;
}
.titulopiemodal {
  width: 130px;
  position: absolute;
  margin-top: 95px;
  font-size: 12px;
}
.subtitulopiemodal {
  width: 125px;
  position: absolute;
  margin-top: 160px;
  font-size: 12px;
}
.autoconcienciamodal {
  width: 300px;
  position: absolute;
  margin-top: -40px;
  font-size: 12px;
}
.textpiereld {
  width: 320px;
  position: absolute;
  margin-top: 98px;
  font-size: 25px;
}
.titulopiereld {
  width: 320px;
  position: absolute;
  margin-top: 85px;
  font-size: 12px;
}
.subtitulopiereld {
  width: 320px;
  position: absolute;
  margin-top: 130px;
  font-size: 12px;
}
.is-deb {
  background-color: #ff4646;
  color: #fff;
}
.is-opor {
  background-color: #ffd13b;
  color: #4a4a4a;
}
.is-desarr {
  background-color: #fffd95;
  color: #4a4a4a;
}
.is-forta {
  background-color: #90ffcd;
  color: #4a4a4a;
}
.is-fdest {
  background-color: #00f587;
  color: #4a4a4a;
}
.is-fex {
  background-color: #008c14;
  color: #fff;
}

</style>