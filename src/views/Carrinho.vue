<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-title></v-list-tile-title>
                        <v-list-tile-title>Descrição</v-list-tile-title>
                        <v-list-tile-title>Valor</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile v-for="item in items" :key="item._id" avatar>
                        <v-list-tile-avatar v-if="!exibirMensagem">
                            <img :src="item.imagem">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-if="exibirMensagem" v-text="mensagem"></v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-content>
                            <v-list-tile-title v-if="!exibirMensagem" v-text="item.descricao"></v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-content>
                            <v-list-tile-title v-if="!exibirMensagem"> R$ {{item.valor}} </v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action v-if="!exibirMensagem">
                            <v-icon color="red" @click="exluirItemCarriho(item)">remove_shopping_cart</v-icon>
                        </v-list-tile-action>


                    </v-list-tile>

                    <v-list-tile>
                        <v-layout align-end justify-center row>


                            <v-flex xs1>

                                <v-list-tile-title v-if="!exibirMensagem" class="title font-weight-black">Total
                                </v-list-tile-title>
                            </v-flex>
                            <!-- <v-spacer></v-spacer> -->
                            <v-flex xs3 class="text-xs-right">

                                <v-list-tile-title v-if="!exibirMensagem" class="title font-weight-black">R$
                                    {{total}}
                                </v-list-tile-title>
                            </v-flex>
                        </v-layout>
                    </v-list-tile>

                </v-list>
            </v-card>
        </v-flex>
        <!--  -->
        <div class="text-xs-center">
            <v-btn color="red lighten-2" dark @click="dialog = true">
                Finalizar Compras
            </v-btn>
            <v-dialog v-model="dialog" width="500">

                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                        Forma de Pagamento
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-container fluid px-2>
                        <v-radio-group v-model="radioGroup">
                            <v-radio label="Dinheiro " value="0"></v-radio>
                            <v-radio label="Debito " value="1"></v-radio>
                            <v-radio label="Credito " value="2"></v-radio>
                        </v-radio-group>
                    </v-container>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="pagar()">
                            Pagar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <!--  -->
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                radioGroup: 1,
                dialog: false,
                total: 0,
                items: [{}],
                mensagem: "Carrinho vazio!",
                exibirMensagem: true,
                carrinho: []
            }

        },
        methods: {

            carregarCarrinho() {
                let carrinho = JSON.parse(localStorage.getItem("carrinho"))
                if (carrinho != null) {
                    this.items = carrinho
                    this.exibirMensagem = false
                }
                this.calcularTotal(carrinho)
            },

            exluirItemCarriho(itemCarrinho) {

                let carrinho = JSON.parse(localStorage.getItem('carrinho'))
                for (let i = 0; i < carrinho.length; i++) {

                    if (itemCarrinho._id == carrinho[i]._id) {
                        carrinho.splice(i, 1);
                    }
                }

                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                this.items = carrinho;
            },

            calcularTotal(carrinho) {
                let total = 0
                for (let i = 0; i < carrinho.length; i++) {
                    total = carrinho[i].valor + total
                }
                this.total = total
            },

            pagar(){
                alert(this.radioGroup)
            }
        },

        mounted: function () {
            this.carregarCarrinho()
        }
    }
</script>

<style>

</style>