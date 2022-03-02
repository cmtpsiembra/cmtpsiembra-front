<template>
  <section class="section">
    <div class="container">
      <div class="tabs">
        <ul>
          <router-link tag="li" :to="{ name: 'graphicsmenu.graphics'}">
            <a>Crear Gráficas</a>
          </router-link>
        </ul>
        <ul>
          <router-link tag="li" :to="{ name: 'graphicsmenu.graphbycompany'}">
            <a>Lista de Gráficas</a>
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