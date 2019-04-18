<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-text-field value="Jão da Silva" label="Editar nome" solo></v-text-field>
          <v-text-field value="048.030.891-89" label="Solo" solo readonly></v-text-field>
          <v-text-field value="11/08/1985" label="Solo" solo readonly></v-text-field>

          <v-text-field
            :append-icon="show3 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Senha anterior"
            value="wqfasds"
            class="input-group--focused"
            @click:append="show3 = !show3"
          ></v-text-field>

          <v-text-field
            :append-icon="show3 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Nova senha"
            value="wqfasds"
            class="input-group--focused"
            @click:append="show3 = !show3"
          ></v-text-field>

          <v-btn color="primary" dark @click="snackbar = true">Salvar edição</v-btn>

          <v-snackbar
            v-model="snackbar"
            :bottom="y === 'bottom'"
            :right="x === 'right'"
            :timeout="timeout"
            color="success"
          >
            {{ text }}
            <v-btn flat @click="snackbar = false">Fechar!</v-btn>
          </v-snackbar>
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
      color: null,

      right: false,
      snackbar: false,

      color: "colorValue",
      mode: "",
      timeout: 6000,
      text: "Usuario editado com sucesso!!",

      password: "Password",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Minimo 8 caracteres"
      }
    };
  },
  mounted: function (){
    this.buscarTodos()

  },
  buscarCliente(){

    HTTPRequest.buscarTodos()
        .then(clientes =>{
          this.clientes = clientes
        })

  },

};
</script>

<style>
</style>