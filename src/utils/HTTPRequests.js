const API_URL = "https://loja-ht-api-t23.herokuapp.com"
// const API_URL = "http://localhost:3000"
import axios from 'axios'

export default{
    // PRODUTOS

    async buscarProdutos(){
        //enviar requests para a API pedindo dados dos produtos para exibição na tela de Produtos
        return axios.get(API_URL + "/produtos").then(response => response.data);

    }

};