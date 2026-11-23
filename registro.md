# O que deve ser feito.

01. A papelaria precisa conferir se tem unidades suficientes para um pedido.
02. Também precisa calcular quantas unidades sobram depois da venda.
03. Seu programa vai receber as quantidades e devolver uma resposta para cada pergunta.

04. A ia utilizada durante o projeto será o modelo ChatGPT da OpenAi.

# Código Inicial

    function exibirNumbero(valor) {
        return valor.toFixed(0);
    }

    try {
        console.log(exibirNumero("5"));
    } catch(erro) {
        //Execute o arquivo com o catch vazio.
    }

- Neste caso não é exibido nada no terminal.

# Código corrigido

```
function exibirNumero(valor) {
    return valor.toFixed(0);
}

try {
    console.log(exibirNumero("5"));
} catch (error) {
    console.error(error);
}
```

002. primeiro problema documentado: 
```
TypeError: valor.toFixed is not a function
```
o seguinte problema acontece pois toFixed apenas retorna um valor numérico, porém, no programa é inserido uma string, o que ocasiona o problema TypeError: toFixed is not a function.

- agora será utilizado o método "console.log(typeof valor)", para assim descobrirmos o tipo da variável valor.


003. Segundo problema documentado:
    O seguine problema foi uma falha no atendimento aos requisitos, onde a função podeAtenderPedido não fazia a validação se o valor era uma string ou do tipo number, sendo exibida a seguine saida:
    ´´´
        5
        true
        false
        true
        6
        Estoque Insuficiente
        1
    ´´´

# Qual solução foi dada pela IA no Problema 001?

```
Uma possível causa para esse problema é que o valor recebido pela função exibirNumero() está sendo passado como uma string ("5") em vez de um número (5).

O método .toFixed() é próprio de valores numéricos (Number) em JavaScript. Como o parâmetro valor recebe uma string, ocorre o erro:

TypeError: valor.toFixed is not a function

Como resolver
Uma solução é converter o valor para número antes de utilizar o método .toFixed():


javascript
function exibirNumero(valor) {
    return Number(valor).toFixed(0);
}

try {
    console.log(exibirNumero("5"));
} catch (error) {
    console.error(error);
}
Resultado esperado:


javascript
5
Outra hipótese importante
O erro também pode ocorrer se a função receber outros tipos de dados, como objetos, arrays ou valores indefinidos (undefined).

Recomendação: validar ou converter o tipo do parâmetro antes de chamar métodos específicos de números, garantindo que a função receba um valor numérico válido.
```


- Restrições apartir de agora:
    - O parâmetro estoque deve ser um número inteiro maior ou igual a zero.

    - o parâmetro pedido deve ser um nnúmero inteiro maior que zero.

    - Number.isInteger(5) retorne true. com "5" ou 2.5, retorne false.

    - Se algum argumento for inválido, as duas funções retornam "Quantidade inválida".


# Qual solução foi dada pela IA no Problema 002?
        O problema está em alguns detalhes de JavaScript, principalmente na utilização do typeof e na conversão de tipos.

        Vamos analisar os erros separadamente.

        1. Erro no typeof
        Você escreveu:


        javascript
        if (typeof estoque === String || typeof pedido === String)
        O problema é que typeof retorna uma string, e não o tipo String.

        Por exemplo:


        javascript
        typeof "10" // "string"
        typeof 10   // "number"
        Portanto, a comparação correta é:


        javascript
        if (typeof estoque === "string" || typeof pedido === "string") {
            return "Quantidade inválida";
        }
        Observe também que você estava usando console.log() dentro da função. Isso apenas exibe uma mensagem no console, mas não devolve o resultado para quem chamou a função.

        Use return.

        2. Função podeAtenderPedido()
        Seu código atual:


        javascript
        export function podeAtenderPedido(estoque, pedido) {
            if (pedido <= estoque) {
                return true;
            } else {
                return false;
            }
        }
        Aqui está outro problema: o JavaScript faz conversão automática de tipos em comparações.

        Por exemplo:


        javascript
        "10" <= 4 // false
        Mas, no seu caso, você quer impedir que uma string seja aceita como quantidade.

        Uma solução:


        javascript
        export function podeAtenderPedido(estoque, pedido) {
            if (typeof estoque !== "number" || typeof pedido !== "number") {
                return "Quantidade inválida";
            }

            if (pedido > estoque) {
                return false;
            }

            return true;
        }
        3. Função estoqueAposVenda()
        Aqui também precisamos corrigir a validação e padronizar a mensagem de retorno.


        javascript
        export function estoqueAposVenda(estoque, pedido) {
            if (typeof estoque !== "number" || typeof pedido !== "number") {
                return "Quantidade inválida";
            }

            if (pedido > estoque) {
                return "Estoque insuficiente";
            }

            return estoque - pedido;
        }
        4. Código completo corrigido

        javascript

        export function estoqueAposVenda(estoque, pedido) {
            if (typeof estoque !== "number" || typeof pedido !== "number") {
                return "Quantidade inválida";
            }

            if (pedido > estoque) {
                return "Estoque insuficiente";
            }

            return estoque - pedido;
        }

        export function podeAtenderPedido(estoque, pedido) {
            if (typeof estoque !== "number" || typeof pedido !== "number") {
                return "Quantidade inválida";
            }

            return pedido <= estoque;
        }
        5. Resultado esperado
        Execução

        Resultado

        podeAtenderPedido(10, 4)

        true

        podeAtenderPedido(3, 4)

        false

        podeAtenderPedido("10", 4)

        "Quantidade inválida"

        estoqueAposVenda(10, 4)

        6

        estoqueAposVenda(3, 4)

        "Estoque insuficiente"

        estoqueAposVenda(5, 4)

        1

        estoqueAposVenda("10", 4)

        "Quantidade inválida"

        6. Uma dica importante para seus estudos
        Existem três conceitos que você precisa guardar:

        typeof: verifica o tipo de dado.

        console.log(): mostra algo no console.

        return: devolve um resultado para quem chamou a função.

        Uma observação adicional: se você quiser impedir também valores como NaN, Infinity e números negativos, precisará acrescentar outras validações.

        Seu raciocínio estava correto! O principal problema foi confundir String com "string" e console.log() com return.

# Funções inseridas em estoque:
- Função podeAtenderPedido
    - Receba estoque e pedido. Valide os dois argumentos pimeiro.
    - Retorne true se o pedido for menor ou igual ao estoque
    - Retorne false se o pedido for maior que o estoque.

- Função estoqueAposVenda
    - Receba estoque e pedido. Use as mesmas regras de validação.
    - Se o pedido superar o estoque, retorne "Estoque insuficiente".
    - Nos outros casos, retorne o estoque menos a quantidade pedida.

# Conferência da primeira versão:
    podeAtenderPedido(10, 4) // true   
    podeAtenderPedido(3, 4) // false
    podeAtenderPedido("10", 4) // "Quantidade inválida"

    estoqueAposVenda(10, 4) // 6
    estoqueAposVenda(3, 4) // "Estoque insuficiente" 
    estoqueAposVenda(5, 4) // 1 

# Validação em uma função auxiliar
    // A validação repetida é a função:
        if (typeof estoque === "string" || typeof pedido === "string") {
        return "Quantidade inválida";
    }

# Novas Regras
01. Altere estoqueAposVenda para deixar pelo menos duas unidades em estoque.
02. Valide os argumentos e mantenha "Estoque insuficiente" se faltarem unidades para o pedido.
03. Quando houver unidades para o pedido, calcule o saldo. Se for menor que dois, retorne "Estoque mínimo atingido".
04. Retorne o saldo quando ele for dois ou mais.

Resultados de teste antes e depois da mudança
    
        estoqueAposVenda(5, 4)
        // Antes: 1
        // Depois: Estoque mínimo atingido
        
        estoqueAposVenda(5, 3)
        // Antes e depois: 2

        estoqueAposVenda(3, 4)
        // Anes e depois: "Estoque insuficiente

# Modelo de testes pelo terminal

    const esperado = 2;
    const obtido = estoqueAposVenda(5, 3);

    console.log("Esperado", esperado);
    console.log("Obtido", obtido);

    if (obtido === esperado) {
        console.log("PASSOU");
    } else {
        console.log("FALHOU);
    }