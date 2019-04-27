const API_URL = "https://loja-ht-api-t23.herokuapp.com"
// const API_URL = "http://localhost:3000"
import axios from 'axios'

export default{

    // LOGIN
    async autenticar(usuario){
        return axios.post(API_URL + "/autenticar", usuario).then(response => response.data);
    },

    //CLIENTE
    async buscarClientePorUsuario(usuario){
        return axios.post(API_URL + "/clientes/usuario", usuario).then(response => response.data);
    },
    // PRODUTOS
    async buscarProdutos(){
        //enviar requests para a API pedindo dados dos produtos para exibição na tela de Produtos
        return axios.get(API_URL + "/produtos").then(response => response.data);

    },

    //Compras
    async buscarCompras(){
        return axios.get(API_URL + "/compras").then(response => response.data);
    },

    async salvarCompra(compra){
        return axios.post(API_URL + "/compras", compra).then(response => response.data);
    }

};
