export const catalogo = [
    {
        id: "1",
        nome: "Casaco Branco",
        marca: "Shein",
        preco: 120,
        nomeArquivoImagem: "product-1.jpg",
        feminino: false
    }, 
    {
        id: "2",
        nome: "Sobretudo azul marinho",
        marca: "Shein",
        preco: 120,
        nomeArquivoImagem: "product-2.jpg", 
        feminino: true
    }, 
    {
        id: "3",
        nome: "Casaco de couro",
        marca: "Shein",
        preco: 105,
        nomeArquivoImagem: "product-3.jpg",
        feminino: false
    },
    {
        id: "4", 
        nome: "Blazer preto",
        marca: "Shein",
        preco: 95,
        nomeArquivoImagem: "product-4.jpg",
        feminino: false
    },
    {
        id: "5",
        nome: "Casaco preto",
        marca: "Shein",
        preco: 80,
        nomeArquivoImagem: "product-5.jpg",
        feminino: false
    },
    {
        id: "6",
        nome: "Casaco marrom",
        marca: "Shein",
        preco: 150,
        nomeArquivoImagem: "product-6.jpg",
        feminino: true
    },
    {
        id: "7",
        nome: "Casaco preto",
        marca: "Shein",
        preco: 120,
        nomeArquivoImagem: "product-7.jpg",
        feminino: true
    },
    {
        id: "8",
        nome: "Sobretudo bege",
        marca: "Shein",
        preco: 160,
        nomeArquivoImagem: "product-8.jpg", 
        feminino: true
    }
]

export function salvarLocalStorage(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
   return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
    localStorage.removeItem(chave)
}

export function desenharProdutoNoCarrinhoSimples(idProduto, idContainerHtml, quantidadeDoProduto) {
  
    const produto = catalogo.find((p) => p.id === idProduto);
  
      const containerProdutosCarrinho = document.getElementById(idContainerHtml);
  
      const elementoArticle = document.createElement("article");
      const articleClasses = [`flex`, `bg-stone-200`, `rounded-lg`, `p-1`, `relative`, `mb-2`, `w-96`]
    
      for( const articleClass of articleClasses) {
        elementoArticle.classList.add(articleClass)
      }
  
      const cartaoProdutoCarrinho = `
      <img src="./img/${produto.nomeArquivoImagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg">
      <div class="p-2 flex flex-col justify-between">
        <p class="text-slate-900 text-sm">${produto.nome}</p>
        <p class="text-slate-400 text-xs">Tamanho: M</p>
        <p class="text-green-700 text-lg">$${produto.preco}</p>
      </div>
      <div class="flex items-end text-slate-950 absolute bottom-0 right-2 text-lg">
        <p id="quantidade-${idProduto}" class="ml-2">${quantidadeDoProduto}</p>
      </div>`;
  
    elementoArticle.innerHTML = cartaoProdutoCarrinho;
  
    containerProdutosCarrinho.appendChild(elementoArticle);
  }