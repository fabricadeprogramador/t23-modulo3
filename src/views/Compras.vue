<template>
<v-container>
    <v-layout align-center justify-center id="app">
  <h1>Histórico de Compras</h1>
    </v-layout>
<v-data-table
    :headers="headers"
    :items="compras"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td class="text-xs-left">{{ props.item.data }}</td>
      <td class="text-xs-left">{{ props.item.valorTotal }}</td>
      <td class="text-xs-left">{{ props.item.pagamento }}</td>
    </template>
  </v-data-table>   
</v-container>
</template>

<script>
import HTTPRequest from '@/utils/HTTPRequests'

  export default {
    data () {
      return {
        headers: [
          { text: 'Data', value: 'item' },
          { text: 'Valor', value: 'valor' },
          { text: 'Forma de Pagamento', value: 'pagamento' },
        ],

      valid: false,
      compras: []
      }
    },
        mounted: function () {
      this.buscarCompras()
    },

    methods: {

      buscarCompras() {
        HTTPRequest.buscarCompras()
          .then(compras => {
            this.compras = compras
          })
      }

    }
    
  }
</script>
<style>

</style>
