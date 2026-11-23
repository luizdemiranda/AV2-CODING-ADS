// Funções de validação do programa.

export function podeAtenderPedido(estoque, pedido) {
    if (typeof estoque === "string" || typeof pedido === "string") {
        return "Quantidade inválida";
    }
    if (pedido <= estoque) {
        return true; // retorna o valor de pedido suficiente.
    } else {
        return false; // retorna o valor de pedido insuficiente.
    }
}

export function estoqueAposVenda(estoque, pedido) {
    if (typeof estoque === "string" || typeof pedido === "string") {
        return "Quantidade inválida";
    }
    else if (Number(pedido) > Number(estoque)) {
        return "Estoque Insuficiente";
    } else {
        return Number(estoque - pedido);
    }
}
