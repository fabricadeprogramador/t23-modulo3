<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
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

                                <v-flex xs7>

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
            <v-flex xs12>

                <v-btn color="blue" dark @click="finalizarCompra()" v-if="!exibirMensagem">
                    Finalizar Compra
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
            </v-flex>

            <div class="text-xs-center">
                <v-dialog v-model="dialogLogin" full-width>
                    <v-card>
                        <Login></Login>
                    </v-card>
                </v-dialog>
            </div>
            <!--  -->
        </v-layout>
    </v-container>
</template>

<script>
    import Login from '@/components/Login'
    import HTTPRequest from '@/utils/HTTPRequests'

    export default {
        components: {
            Login
        },
        data() {
            return {
                radioGroup: 1,
                dialog: false,
                dialogLogin: false,
                total: 0,
                items: [{}],
                mensagem: "Carrinho vazio!",
                exibirMensagem: true,
                carrinho: [],
                compra: {}
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
                if (carrinho != null) {
                    for (let i = 0; i < carrinho.length; i++) {
                        total = carrinho[i].valor + total
                    }
                    this.total = total
                }
            },

            pagar() {

                this.compra.produtos = this.items
                this.compra.valorTotal = this.total

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0')
                var mm = String(today.getMonth() + 1).padStart(2, '0')
                var yyyy = today.getFullYear()

                today = dd + '/' + mm + '/' + yyyy;
                this.compra.data = today

                if (this.radioGroup == 0) {
                    this.compra.pagamento = 'DINHEIRO'
                } else if (this.radioGroup == 1) {
                    this.compra.pagamento = 'DEBITO'
                } else {
                    this.compra.pagamento = 'CREDITO'
                }

                let usuario = JSON.parse(localStorage.getItem("usuarioLogado"))
                //Buscar cliente para compra
                HTTPRequest.buscarClientePorUsuario(usuario)
                    .then(cliente => {

                        this.compra.cliente = cliente[0]

                        HTTPRequest.salvarCompra(this.compra)
                            .then(compra => {
                                alert("Compra efetuada com sucesso!")
                                localStorage.setItem("carrinho", "")
                                this.exibirMensagem = true
                            })
                    })


                // this.compra.cliente
            },

            finalizarCompra() {
                if (localStorage.getItem("usuarioLogado") == null) {
                    //Abrir janela para logar
                    this.dialogLogin = true

                } else {
                    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))

                    if (usuarioLogado.username == "" || usuarioLogado.senha == "") {
                        //Abrir login também
                    } else {
                        //Abrir a janela de pagamento
                        this.dialog = true
                    }
                }
            }
        },

        mounted: function () {
            this.carregarCarrinho()
        }
    }
</script>

<style>

</style>