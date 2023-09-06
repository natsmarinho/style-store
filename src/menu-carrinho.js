import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {}

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("right-[0px]");
    document.getElementById("carrinho").classList.remove("right-[-360px]");
};

function fecharCArrinho() {
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
};

function irParaCheckout() {
  if(Object.keys(idProdutoCarrinhoQuantidade).length === 0) {
    return;
  }
  window.location.href = "./styles/checkout.html"
}

export function inicializaCarrinho() {
    const btnFecharCarrinho = document.getElementById("fechar-carrinho");
    const btnAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoIrParaCheckout = document.getElementById("finalizar-compra");

    btnFecharCarrinho.addEventListener("click", fecharCArrinho)

    btnAbrirCarrinho.addEventListener("click", abrirCarrinho)

    atualizaPrecoCarrinho()
    botaoIrParaCheckout.addEventListener("click", irParaCheckout)
};

function removerProdutoCarrinho(idProduto) {
  delete idProdutoCarrinhoQuantidade[idProduto];
  atualizaPrecoCarrinho()
  renderizarProdutosCarrinho()
  salvarLocalStorage('carrinho', idProdutoCarrinhoQuantidade)
}

function incrementarQuantidadeProduto(idProduto) {
  idProdutoCarrinhoQuantidade[idProduto]++;
  atualizaPrecoCarrinho()
  atualizarQuantidadeProdutoNaTela(idProduto)
  salvarLocalStorage('carrinho', idProdutoCarrinhoQuantidade)
}

function decrementarQuantidadeProduto(idProduto) {
  if(idProdutoCarrinhoQuantidade[idProduto] === 1) {
    removerProdutoCarrinho(idProduto);
    return;
  }
  idProdutoCarrinhoQuantidade[idProduto]--;
  atualizaPrecoCarrinho()
  atualizarQuantidadeProdutoNaTela(idProduto);
}

function atualizarQuantidadeProdutoNaTela(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText = idProdutoCarrinhoQuantidade[idProduto]
  salvarLocalStorage('carrinho', idProdutoCarrinhoQuantidade)
}

function desenharProdutoNoCarrinho(idProduto) {
  
  const produto = catalogo.find((p) => p.id === idProduto);

    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");

    const elementoArticle = document.createElement("article");
    const articleClasses = [`flex`, `bg-slate-100`, `rounded-lg`, `p-1`, `relative`]
  
    for( const articleClass of articleClasses) {
      elementoArticle.classList.add(articleClass)
    }

    const cartaoProdutoCarrinho = `
    <button id="remover-item-${produto.id}" class="absolute top-0 right-2"><i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i></button>
    <img src="./img/${produto.nomeArquivoImagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg">
    <div class="p-2 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-slate-400 text-xs">Tamanho: M</p>
      <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class="flex items-end text-slate-950 absolute bottom-0 right-2 text-lg">
      <button id="decrementar-produto-${produto.id}">-</button>
      <p id="quantidade-${idProduto}" class="ml-2">${idProdutoCarrinhoQuantidade[produto.id]}</p>
      <button id="incrementar-produto-${produto.id}" class="ml-2">+</button>
    </div>`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;

  containerProdutosCarrinho.appendChild(elementoArticle);

  document.getElementById(`decrementar-produto-${produto.id}`).addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

  document.getElementById(`incrementar-produto-${produto.id}`).addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

  document.getElementById(`remover-item-${produto.id}`).addEventListener("click", () => removerProdutoCarrinho(produto.id))
}

export function renderizarProdutosCarrinho() {
  const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = "";

  for(const idProduto in idProdutoCarrinhoQuantidade) {
    desenharProdutoNoCarrinho(idProduto)
  }
}

export function adicionarAoCarrinho(idProduto) {
  if(idProduto in idProdutoCarrinhoQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    return;
  };

  idProdutoCarrinhoQuantidade[idProduto] = 1;
  salvarLocalStorage('carrinho', idProdutoCarrinhoQuantidade)
  desenharProdutoNoCarrinho(idProduto);
  atualizaPrecoCarrinho();
}

export function atualizaPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total")

  let precoTotalCarrinho = 0;

  for (const idProdutoNoCarrinho in idProdutoCarrinhoQuantidade) {
    precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * idProdutoCarrinhoQuantidade[idProdutoNoCarrinho]
  }
  precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`
}