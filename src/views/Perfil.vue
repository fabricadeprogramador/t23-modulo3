<template>
  <v-form>
    <v-container>

      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-text-field v-model="clienteCorrente.nome" label="Nome" ></v-text-field>
          <v-text-field v-model="clienteCorrente.cpf" label="CPF" ></v-text-field>
          <v-text-field v-model="clienteCorrente.dataNascimento" label="Data de Nascimento" ></v-text-field>
          <v-text-field v-model="clienteCorrente.usuario.username" label="Username" ></v-text-field>

          <v-text-field type="password" label="Senha" v-model="clienteCorrente.usuario.senha" class="input-group--focused">
          </v-text-field>

          <v-btn color="primary" dark @click="salvarCliente()">Salvar</v-btn>

        </v-flex>
      </v-layout>

    </v-container>
  </v-form>
</template>

<script>
  import HTTPRequest from '@/utils/HTTPRequests'

  export default {
    data() {
      return {
        usuarioLogado: false,

        clienteCorrente: {
          "usuario": {}
        },

      };
    },

    mounted: function () {
      this.buscarCliente();
    },

    methods: {

      buscarCliente() {

        let usuarioLogado = localStorage.getItem("usuarioLogado")

        if (usuarioLogado != null && usuarioLogado != "") {
          HTTPRequest.buscarClientePorUsuario(JSON.parse(usuarioLogado))
            .then(clientes => {
              this.clienteCorrente = clientes[0]
            })

        } 

      },

      salvarCliente(){

        this.clienteCorrente.usuario.tipo = 'CLIENTE'

        HTTPRequest.salvarCliente(this.clienteCorrente)
          .then(cliente => {
              if(cliente._id != undefined){
                alert("Cliente salvo com sucesso!")
                localStorage.setItem("usuarioLogado", JSON.stringify(cliente.usuario))
                this.$router.push('/')
              } else {
                alert("Erro ao salvar cliente!")
              }
          })
      }

    }

  };
</script>

<style>
</style>