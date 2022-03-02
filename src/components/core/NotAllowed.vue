<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <div class="container is-fluid">
          <h1 class="title">Ups... No tiene permisos</h1>
          <h2 class="subtitle">Regrese a la página inicial</h2>
        </div>
      </div>
    </section>
    <router-link :to="{ name: 'landing' }" class="button is-primary">
      <i class="material-icons">home</i>&nbsp; Regresar a inicio
    </router-link>
  </div>
</template>

<script>
export default {};
</script>
