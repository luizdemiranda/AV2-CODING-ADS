# Registro – AV2 Controle de Estoque

**Aluno:** Luiz Augusto Barros de Miranda
**Disciplina/Turma:** ADS - CODING - MANHÃ

## IA utilizada

Uso do modelo ChatGPT (OpenAI) para investigar o erro inicial e corrigir a validação das funções. Também houve o uso de outros modelos, como o Claude (Anthropic), para revisar o código e organizar este registro. Em todos os casos, conferi as sugestões rodando o código no terminal.

---

## Etapa 1 – Diagnóstico

### Código inicial (`diagnostico.js`)

```javascript
function exibirNumero(valor) {
    return valor.toFixed(0);
}

try {
    console.log(exibirNumero("5"));
} catch (erro) {
    // Execute o arquivo com o catch vazio.
}
```

### O que foi observado

1. **Execução com o catch vazio:** nada apareceu no terminal.
2. **Execução com `console.error(erro)` no catch:** apareceu o erro abaixo.

```
TypeError: valor.toFixed is not a function
    at exibirNumero (teste1.js:3:18)
    at Object.<anonymous> (teste1.js:8:17)
```

A pilha aponta para a linha 3, onde `valor.toFixed(0)` é chamado, e a chamada que originou o erro foi `exibirNumero("5")`, na linha 8. O arquivo `teste1.js` foi um arquivo temporário, usado só para esta investigação.

3. **Com `console.log(typeof valor)` antes do return:**

| Chamada | `typeof valor` | Resultado |
|---|---|---|
| `exibirNumero("5")` | string | TypeError: valor.toFixed is not a function |
| `exibirNumero(5)` | number | 5 |

Com `5` (número) a função funciona. Com `"5"` (texto) ela falha, porque `toFixed` só existe em números.

### Hipótese da IA

A IA indicou que o valor chegava como texto (`"5"`) e não como número (`5`). O método `toFixed()` existe só em números, por isso a chamada falhava. Ela sugeriu converter com `Number(valor)` e validar o tipo antes de usar métodos numéricos.

### Causa do erro inicial e efeito do catch vazio

- **Causa:** `"5"` é uma string, e strings não têm o método `toFixed`. Isso gerou um `TypeError`.
- **Efeito do catch vazio:** o erro aconteceu, mas o `catch` não fazia nada com ele. Por isso a primeira execução ficou silenciosa, sem nenhuma mensagem no terminal. Com `console.error(erro)`, o erro passou a aparecer.

---

## Etapa 2 – Implementação

### Regras de entrada

- `estoque`: inteiro maior ou igual a zero.
- `pedido`: inteiro maior que zero.
- Qualquer argumento inválido: retornar `"Quantidade inválida"`.

### Primeira versão (antes da validação de tipos)

```javascript
export function podeAtenderPedido(estoque, pedido) {
    if (pedido <= estoque) {
        return true;
    } else {
        return false;
    }
}

export function estoqueAposVenda(estoque, pedido) {
    if (typeof estoque === "string" || typeof pedido === "string") {
        return "Quantidade inválida";
    } else if (Number(pedido) > Number(estoque)) {
        return "Estoque Insuficiente";
    } else {
        return Number(estoque - pedido);
    }
}
```

### Conferência da primeira versão

Saída observada no terminal nas primeiras execuções (nesta versão, `podeAtenderPedido` ainda só comparava `pedido <= estoque`, sem validar o tipo):

```
5
true
false
true
6
Estoque Insuficiente
1
```

**Problemas encontrados:**

1. `podeAtenderPedido("10", 4)` retornou `true`, mas o esperado era `"Quantidade inválida"`. A função ainda não validava o texto corretamente.
2. A mensagem saiu como `"Estoque Insuficiente"` (I maiúsculo), mas o PDF pede `"Estoque insuficiente"`.

### Sugestão da IA para o problema da validação

A IA explicou que `typeof` devolve uma string, então a comparação correta é `typeof x === "string"` (e não `=== String`). Também lembrou de usar `return` em vez de `console.log` dentro da função. Ela propôs validar com `typeof estoque !== "number"`.

### Como avaliei a sugestão (evidência)

A sugestão de usar só `typeof x !== "number"` resolve o caso `"10"`, mas parece não cobrir as regras do PDF. Para conferir, executei a validação sugerida pela IA:

```javascript
function estoqueAposVendaAntiga(estoque, pedido) {
    if (typeof estoque !== "number" || typeof pedido !== "number") {
        return "Quantidade inválida";
    }
    if (pedido > estoque) {
        return "Estoque insuficiente";
    }
    return estoque - pedido;
}

console.log(estoqueAposVendaAntiga(2.5, 1));
```

Resultado observado no terminal: `1.5`

`2.5` é do tipo `number`, então passou pela validação do `typeof` e a função calculou `2.5 - 1 = 1.5`. Mas o PDF diz que `2.5` deve ser inválido, e o esperado era `"Quantidade inválida"`. A sugestão da IA falha nesse caso.

Por isso troquei a validação por `Number.isInteger` com as checagens de faixa.

---

## Etapa 3 – Refatoração

A validação aparecia repetida nas duas funções. Extraí para a função auxiliar `dadosValidos`:

```javascript
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
    return estoque - pedido;
}
```

### Comparação das saídas (antes e depois da refatoração)

| Chamada | Antes | Depois |
|---|---|---|
| `podeAtenderPedido(10, 4)` | true | true |
| `podeAtenderPedido(3, 4)` | false | false |
| `podeAtenderPedido("10", 4)` | true (erro) | "Quantidade inválida" |
| `estoqueAposVenda(10, 4)` | 6 | 6 |
| `estoqueAposVenda(3, 4)` | "Estoque Insuficiente" | "Estoque insuficiente" |
| `estoqueAposVenda(5, 4)` | 1 | 1 |

Observação: as saídas de `podeAtenderPedido` na coluna "Depois" foram conferidas nos testes da Etapa 5, pois essa função não foi alterada depois da Etapa 3.

Conclusão: as saídas ficaram iguais, exceto em duas chamadas que a refatoração e a nova validação corrigiram: `podeAtenderPedido("10", 4)` agora retorna `"Quantidade inválida"` (antes retornava `true`), e a mensagem de `estoqueAposVenda(3, 4)` agora está com "i" minúsculo, como o PDF pede. Também testei `podeAtenderPedido(2.5, 1)` e `podeAtenderPedido(10, 0)`, que retornaram `"Quantidade inválida"`.

---

## Etapa 4 – Nova regra: estoque mínimo após a venda

Regra: `estoqueAposVenda` deve deixar pelo menos 2 unidades. Se o saldo for menor que 2, retorna `"Estoque mínimo atingido"`.

### Teste escrito e executado **antes** de alterar a função

```javascript
const esperado = "Estoque mínimo atingido";
const obtido = estoqueAposVenda(5, 4);

console.log("Esperado", esperado);
console.log("Obtido", obtido);

if (obtido === esperado) {
    console.log("PASSOU");
} else {
    console.log("FALHOU");
}
```

Resultado antes da mudança:

```
Esperado Estoque mínimo atingido
Obtido 1
FALHOU
```

Falhou como esperado, porque a regra nova ainda não existia.

### Função depois da mudança

```javascript
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
```

Resultado do mesmo teste depois da mudança:

```
Esperado Estoque mínimo atingido
Obtido Estoque mínimo atingido
PASSOU
```

### Antes e depois

| Chamada | Antes | Depois |
|---|---|---|
| `estoqueAposVenda(5, 4)` | 1 | "Estoque mínimo atingido" |
| `estoqueAposVenda(5, 3)` | 2 (valor pelo código da Etapa 3) | 2 |
| `estoqueAposVenda(3, 4)` | "Estoque insuficiente" | "Estoque insuficiente" |

`podeAtenderPedido` não foi alterada, pois continua verificando só se há unidades para o pedido.

---

## Etapa 5 – Testes

Testes executados com `node estoque.js`:

| # | Função | Entrada | Esperado | Obtido | Resultado |
|---|---|---|---|---|---|
| 1 | estoqueAposVenda | (5, 4) | "Estoque mínimo atingido" | "Estoque mínimo atingido" | PASSOU |
| 2 | estoqueAposVenda | (5, 3) | 2 | 2 | PASSOU |
| 3 | estoqueAposVenda | (3, 4) | "Estoque insuficiente" | "Estoque insuficiente" | PASSOU |
| 4 | podeAtenderPedido | (10, 4) | true | true | PASSOU |
| 5 | podeAtenderPedido | (3, 4) | false | false | PASSOU |
| 6 | podeAtenderPedido | ("10", 4) | "Quantidade inválida" | "Quantidade inválida" | PASSOU |
| 7 | estoqueAposVenda | (2.5, 1) | "Quantidade inválida" | "Quantidade inválida" | PASSOU |
| 8 | podeAtenderPedido | (4, 4) | true | true | PASSOU |

### Caso adicional sugerido pela IA

- **Caso sugerido:** `podeAtenderPedido(4, 4)`, que testa o limite em que o pedido é igual ao estoque.
- **Cálculo do esperado (feito por mim):** calculei `0`, pensando no saldo.
- **Obtido ao executar:** `true`. O teste deu `FALHOU`.
- **Análise:** o erro estava no meu cálculo, e não no código. `podeAtenderPedido` responde se o pedido pode ser atendido (`true` ou `false`), e não calcula saldo. Como 4 é menor ou igual a 4, o esperado correto é `true`.
- **Correção e nova execução:** troquei o esperado para `true` e o teste deu `PASSOU`.

---

## Sugestão da IA e evidência usada para avaliá-la

- **Sugestão:** validar as quantidades apenas com `typeof x !== "number"`.
- **Evidência:** ao executar `estoqueAposVendaAntiga(2.5, 1)` obtive `1.5`. Isso mostra que a sugestão sozinha não cumpre as regras do PDF (inteiro, estoque ≥ 0, pedido > 0).
- **Decisão:** usei `Number.isInteger` e as checagens de faixa dentro de `dadosValidos`.
