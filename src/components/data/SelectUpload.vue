<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1">Seleccione el tipo de dato a subir</h1>
      <router-link :to="{ name: 'uploaddataotros' }" class="button is-large is-info">
        Otros Estudios
      </router-link>
      <router-link :to="{ name: 'uploaddatafrs' }" class="button is-large is-info">
        Factores Psicosociales
      </router-link>
    </div>
  </section>
</template>