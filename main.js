import { renderizaCatalogo } from "./src/cartao-produto";
import { inicilizarFiltro } from "./src/filtroCatalogo";
import { atualizaPrecoCarrinho, inicializaCarrinho, renderizarProdutosCarrinho } from "./src/menu-carrinho";


renderizaCatalogo();
inicializaCarrinho();
renderizarProdutosCarrinho();
atualizaPrecoCarrinho();
inicilizarFiltro();