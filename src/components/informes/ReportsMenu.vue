<template>
  <section class="section">
    <div class="container">
      <div class="tabs">
        <ul>
          <router-link tag="li" :to="{ name: 'reportsmenu.crea'}">
            <a>Crear informe</a>
          </router-link>
        </ul>
        <ul>
          <router-link tag="li" :to="{ name: 'reportsmenu.carpetaslist'}">
            <a>Editar Informes</a>
          </router-link>
        </ul>
        <ul>
          <router-link tag="li" :to="{ name: 'reportsmenu.plantillalist'}">
            <a>Plantillas</a>
          </router-link>
        </ul>
        <ul>
          <router-link tag="li" :to="{ name: 'reportsmenu.guides'}">
            <a>Guias</a>
          </router-link>
        </ul>
      </div>

      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tabs li.router-link-exact-active a {
  border-bottom-color: #07689f;
  color:  #07689f;
}
</style>