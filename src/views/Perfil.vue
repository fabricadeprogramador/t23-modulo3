<template>
  <v-form>
    <v-container>

      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-text-field v-model="clienteCorrente.nome" label="Nome" solo></v-text-field>
          <v-text-field v-model="clienteCorrente.cpf" label="CPF" solo></v-text-field>
          <v-text-field v-model="clienteCorrente.dataNascimento" label="Data de Nascimento" solo></v-text-field>

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

        clienteCorrente: {},

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

    }

  };
</script>

<style>
</style>