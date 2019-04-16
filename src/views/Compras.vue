<template>
<v-container>
    <v-layout align-center justify-center id="app">
  <h1>Histórico de Compras</h1>
    </v-layout>
<v-data-table
    :headers="headers"
    :items="historico"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.item }}</td>
      <td class="text-xs-right">{{ props.item.valor }}</td>
    </template>
  </v-data-table>   
</v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'ITEM', value: 'item' },
          { text: 'Valor', value: 'valor' }
        ]
      }
    }
  }
</script>
<style>

</style>
