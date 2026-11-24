import { podeAtenderPedido, estoqueAposVenda } from "./estoque.js";

function exibirNumero(valor) {
    return Number(valor).toFixed(0);
}

try {
    console.log(exibirNumero("5"));
    console.log(podeAtenderPedido(10, 4)); // true 
    console.log(podeAtenderPedido(3, 4)); // false
    console.log(podeAtenderPedido("10", 4)); // "Quantidade inválida"

    console.log(estoqueAposVenda(10, 4)); // 6
    console.log(estoqueAposVenda(3, 4)); // "Estoque insuficiente" 
    console.log(estoqueAposVenda(5, 4)); // 1 

    console.log(podeAtenderPedido(10, 4));   // deve dar true
    console.log(podeAtenderPedido(2.5, 1));  // deve dar "Quantidade inválida"
    console.log(podeAtenderPedido(10, 0));   // deve dar "Quantidade inválida"
} catch (error) {
    console.error(error);
}

/*
function exibirNumero(valor) {
    console.log(typeof valor);
    return valor.toFixed(0);
}

try {
    console.log(exibirNumero(5));
    console.log(exibirNumero("5"));
} catch (erro) {
    console.error(erro);
}
*/