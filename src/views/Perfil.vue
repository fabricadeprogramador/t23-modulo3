<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-text-field value="Jão da Silva" label="Solo" solo readonly></v-text-field>
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

          <v-btn
            :loading="loading"
            :disabled="loading"
            color="secondary"
            @click="loader = 'loading'"
          >Salvar a edição</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      show3: false,
      show3: false,
      loader: null,
      loading: false,

      password: "Password",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Minimo 8 caracteres"
      }
    };
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360 deg);
  }
}
</style>