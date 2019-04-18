<template>
 <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="grey darken-2 white--text-">
                <v-toolbar-title>Cadastro</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="username" label="Username" type="text"></v-text-field>
                  <v-text-field prepend-icon="person" name="nomeDoUsuario" label="Nome Completo" type="text"></v-text-field>
                     <v-text-field prepend-icon="done" name="cpfDoUsuario" label="CPF" mask="###.###.###-##" type="text"></v-text-field>
                        <v-text-field prepend-icon="date_range" name="dataDeNascimento" label="Data de Nascimento" mask="##/##/####" type="text"></v-text-field>
                 <v-text-field
            :append-icon="show3 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            prepend-icon="lock"
            label="Senha"
            value="wqfasds"
            class="input-group--focused"
            @click:append="show3 = !show3"

          ></v-text-field>
                        <v-text-field
            :append-icon="show3 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            prepend-icon="lock"
            label="Confirmar senha"
            value="dsdsds"
            class="input-group--focused"
            @click:append="show3 = !show3"

          ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="snackbar = true">Cadastrar</v-btn>
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
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
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
      text: " Cadastrado com sucesso!!",

      password: "Password",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Minimo 8 caracteres"
      }
    };
  },
 

};
</script>

<style>
</style>