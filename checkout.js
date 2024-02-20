import { apagarDoLocalStorage, desenharProdutoNoCarrinhoSimples, lerLocalStorage, salvarLocalStorage } from "./src/utilidades";

document.getElementById("numero-cartao").addEventListener("input", function (e) {
    let inputCartaoCredito = e.target;
    const regexCartao = inputCartaoCredito.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formatoCartaoNaTela = "";

    for (let i = 0; i < regexCartao.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formatoCartaoNaTela += " ";
        }
        formatoCartaoNaTela += regexCartao[i];
    }

    inputCartaoCredito.value = formatoCartaoNaTela;
})

function desenharProdutosCheckout() {
    const idProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};

    for(const idProduto in idProdutoCarrinhoQuantidade) {
        desenharProdutoNoCarrinhoSimples(idProduto, "container-produtos-checkout", idProdutoCarrinhoQuantidade[idProduto]);
    }
}


function finalizarCompra(evento) {
    evento.preventDefault();
    const idProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};
    if(Object.keys(idProdutoCarrinhoQuantidade).length === 0) {
        return
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idProdutoCarrinhoQuantidade
    }

    const historicoPedidos = lerLocalStorage("historico") ?? [];
    const historicoPedidosAtualizado = [pedidoFeito, ...historicoPedidos]

    salvarLocalStorage("historico", historicoPedidosAtualizado)
    apagarDoLocalStorage("carrinho")
    window.location.href = "./pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));