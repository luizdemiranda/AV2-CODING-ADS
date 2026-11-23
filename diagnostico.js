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
} catch (error) {
    console.error(error);
}