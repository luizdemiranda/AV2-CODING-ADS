function dadosValidos(estoque, pedido) {
    return Number.isInteger(estoque) && estoque >= 0 &&
           Number.isInteger(pedido) && pedido > 0;
}

export function podeAtenderPedido(estoque, pedido) {
    if (!dadosValidos(estoque, pedido)) {
        return "Quantidade inválida";
    }
    return pedido <= estoque;
}

export function estoqueAposVenda(estoque, pedido) {
    if (!dadosValidos(estoque, pedido)) {
        return "Quantidade inválida";
    }
    if (pedido > estoque) {
        return "Estoque insuficiente";
    }
    const saldo = estoque - pedido;
    if (saldo < 2) {
        return "Estoque mínimo atingido";
    }
    return saldo;
}

const esperado = "Estoque mínimo atingido";
const obtido = estoqueAposVenda(5, 4);

console.log("Esperado", esperado);
console.log("Obtido", obtido);

if (obtido === esperado) {
    console.log("PASSOU");
} else {
    console.log("FALHOU");
}

function testar(descricao, esperado, obtido) {
    console.log(descricao);
    console.log("Esperado", esperado);
    console.log("Obtido", obtido);

    if (obtido === esperado) {
        console.log("PASSOU");
    } else {
        console.log("FALHOU");
    }
    console.log("---");
}

testar("estoqueAposVenda(5, 3)", 2, estoqueAposVenda(5, 3));
testar("estoqueAposVenda(3, 4)", "Estoque insuficiente", estoqueAposVenda(3, 4));

testar("podeAtenderPedido(10, 4)", true, podeAtenderPedido(10, 4));
testar("podeAtenderPedido(3, 4)", false, podeAtenderPedido(3, 4));
testar('podeAtenderPedido("10", 4)', "Quantidade inválida", podeAtenderPedido("10", 4));
testar("estoqueAposVenda(2.5, 1)", "Quantidade inválida", estoqueAposVenda(2.5, 1));

testar("podeAtenderPedido(4, 4)", true, podeAtenderPedido(4, 4));