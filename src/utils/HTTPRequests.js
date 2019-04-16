const API_URL = "https://loja-ht-api-t23.herokuapp.com"
import axios from 'axios'

export default{
    // PRODUTOS

    async buscarProdutos(){
        return axios.get(API_URL + "/produtos").then(response => response.data);
    }


};
//enviar requests para a API pedindo dados dos produtos para exibição na tela de Produtos
