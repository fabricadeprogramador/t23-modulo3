<template>
  <v-container grid-list-sm fluid>
    <v-layout class="my-4" justify-center row wrap>

      <!-- Cards com os Produtos -->
      <v-flex class="ma-2" v-for="produto in produtos" :key="produto.nome" align-start row xs12 sm6 md4 lg3-sm3>
        <v-card class="text-xs-center">

          <v-card flat tile class="d-flex ma-3">
            <v-img :src="produto.imagem" contain max-height="200px"> </v-img>
          </v-card>
          <v-card-title primary-title>
            <div>
              <h3>{{produto.descricao}}</h3>
              <h5 class="text-xs-left">R$ {{ produto.valor}}</h5>
            </div>
          </v-card-title>

          <v-card-text>
            <div class="subheading text-xs-left">{{ produto.marca }}</div>
          </v-card-text>

          <!-- inicio descrição do produto -->
          <v-flex class="text-xs-right">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-icon color="primary" dark @click="exibirDetalhes(produto)" right>
                search
              </v-icon>
            </v-card-actions>
          </v-flex>


        </v-card>
      </v-flex>
      <!-- ////Cards com os Produtos -->

    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

        <v-card>
          <v-toolbar color="grey darken-2 white--text">
            <v-btn icon dark @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-card>

                <v-img class="white--text" height="200px" :src="produtoSelecionado.imagem" contain>
                </v-img>

                <v-card-title>
                  <div>
                    <span class="grey--text">{{produtoSelecionado.marca}}</span><br>
                    <span>{{produtoSelecionado.descricao}}</span>
                  </div>
                </v-card-title>

                <v-layout align-center justify-center column fill-height>
                  <v-flex>
                    <v-card-actions>
                      <v-btn color="primary" @click="adicionarAoCarrinho()">Adicionar ao Carrinho</v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>


        </v-card>

      </v-dialog>
    </v-layout>
    <!-- fim descrição do produto -->
  </v-container>
</template>


<script>
  import HTTPRequest from '@/utils/HTTPRequests'

  export default {

    data: () => ({
      dialog: false,
      produtos: [],
      produtoSelecionado: {}
    }),

    mounted: function () {
      this.buscarProdutos()
    },

    methods: {

      buscarProdutos() {
        HTTPRequest.buscarProdutos()
          .then(produtos => {
            this.produtos = produtos
          })
      },

      exibirDetalhes(produto) {
        this.dialog = true
        this.produtoSelecionado = produto
      },

      adicionarAoCarrinho() {
        let carrinhoStr = localStorage.getItem("carrinho")
        if (carrinhoStr == null || carrinhoStr == undefined || carrinhoStr == "") {
          let produtos = []
          produtos.push(this.produtoSelecionado)

          localStorage.setItem("carrinho", JSON.stringify(produtos))

          alert("Produto adicionado ao carrinho com sucesso!")
          this.dialog = false
        } else {
          let produtos = JSON.parse(localStorage.getItem("carrinho"))
          let jaExiste = false

          for (let i = 0; i < produtos.length; i++) {
            if (produtos[i]._id == this.produtoSelecionado._id) {
              jaExiste = true
            }
          }

          if (!jaExiste) {
            produtos.push(this.produtoSelecionado)
            localStorage.setItem("carrinho", JSON.stringify(produtos))
            alert("Produto adicionado ao carrinho com sucesso!")
            this.dialog = false
          } else {
            alert("Produto já adicionado ao carrinho!")
          }

        }
      }

    },

  }
</script>