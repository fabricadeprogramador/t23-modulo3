<template>
  <v-layout class="my-4" justify-center row wrap>
    
    <!-- Cards com os Produtos -->
    <v-flex class="ma-2" v-for="produto in produtos" :key="produto.nome" align-start row xs12 sm6 md4 lg3-sm3>
      <v-card class="text-xs-center">
        
        <v-img :src="produto.imagem" aspect-ratio="1" width="400px"></v-img>

        <v-card-title primary-title>
          <div>
            <h3>{{produto.descricao}}</h3>
            <h5 class="text-xs-left">R$ {{ produto.valor}}</h5>
          </div>
        </v-card-title>

        <v-card-text>
          <div class="subheading text-xs-left">{{ produto.marca }}</div>
        </v-card-text>

        <v-flex class="text-xs-right">
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-icon  color="primary" dark @click="editar(props.item)" right>
                search
              </v-icon>
          </v-card-actions>
        </v-flex>

      </v-card>
    </v-flex>
    <!-- ////Cards com os Produtos -->

  </v-layout>
</template>


<script>
import HTTPRequest from '@/utils/HTTPRequests'

export default {

  data: () => ({
    valid: false,
    produtos: []

  }),

  mounted: function () {
    this.buscarProdutos()
  },

  methods: {
    
    buscarProdutos(){
      HTTPRequest.buscarProdutos()
        .then(produtos =>{
            this.produtos = produtos
        })
    }

  },

}
</script>