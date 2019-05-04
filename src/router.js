import Vue from 'vue'
import Router from 'vue-router'

import Produtos from './views/Produtos.vue'
import Carrinho from './views/Carrinho.vue'
import Compras from './views/Compras.vue'
import Perfil from './views/Perfil.vue'
import Logout from './views/Logout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Produtos",
      component: Produtos
    },
    {
      path: "/carrinho",
      name: "Carrinho",
      component: Carrinho
    },
    {
      path: "/compras",
      name: "Compras",
      component: Compras
    },
    {
      path: "/perfil",
      name: "Perfil",
      component: Perfil
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout
    }
  ]
})
