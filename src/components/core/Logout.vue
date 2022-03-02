<template>
  <div>Logged out</div>
</template>
<script>
export default {
  async mounted () {
    await this.$auth.logout()
    localStorage.removeItem('loggedin');
    this.$store.commit('refreshUser', null)
    this.$store.commit('refreshAuth')
    this.$router.replace({name: 'landing'})
  }
}
</script>