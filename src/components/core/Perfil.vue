<template>
  <section>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Perfil</h1>
          <h2 class="subtitle">Detalle de la información del usuario</h2>
        </div>
      </div>
    </section>
    <section class="container">
      <div class="box margin-top">
        <article class="media">
          <figure class="image is-96x96 media-left">
            <img class="is-rounded" :src="tokenUser.picture">
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{tokenUser.name}} </strong>
                <br>
                <small>{{tokenUser.email}}</small>
                <br>
                <strong>Permisos</strong>
                <br>
                <span v-for="rol in roles" :key="rol.$index">{{rol}}</span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      roles: []
    };
  },
  computed: {
    ...mapState(["user", "tokenUser"])
  },
  mounted() {
    
  }
};
</script>
