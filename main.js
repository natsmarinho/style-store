import { renderizaCatalogo } from "./src/cartao-produto.js";
import { inicilizarFiltro } from "./src/filtroCatalogo.js";
import { atualizaPrecoCarrinho, inicializaCarrinho, renderizarProdutosCarrinho } from "./src/menu-carrinho.js";


renderizaCatalogo();
inicializaCarrinho();
renderizarProdutosCarrinho();
atualizaPrecoCarrinho();
inicilizarFiltro();