<template>
  <v-app>
    <NavBar v-if="this.$router.currentRoute.path !== '/login' && $router.currentRoute.path !== '/cadastro'"/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <!-- <v-footer class="pa-2 grey darken-2 white--text">
      <v-spacer></v-spacer>
      <div>Fábrica de Programador - T23 &copy; {{ new Date().getFullYear() }}</div>
    </v-footer> -->
  </v-app>
</template>

<script>

  import NavBar from '@/components/NavBar'
  import {TheMask} from 'vue-the-mask'


  export default {
    name: 'App',
    components: {
      NavBar,
      TheMask
    },
    data() {
      return {
        //
      }
    }
  }
</script>
