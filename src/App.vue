<template>
  <v-app>
    <NavBar v-if="this.$router.currentRoute.path !== '/login'"/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer class="pa-2 grey darken-2 white--text">
      <v-spacer></v-spacer>
      <div>Fábrica de Programador - T23 &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>

  import NavBar from '@/components/NavBar'

  export default {
    name: 'App',
    components: {
      NavBar
    },
    data() {
      return {
        //
      }
    }
  }
</script>
