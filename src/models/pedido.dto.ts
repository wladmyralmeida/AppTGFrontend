import { RefDTO } from "./ref.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { ItemPedidoDTO } from "./item-pedido.dto";

export interface PedidoDTO {
    usuario: RefDTO;
    pagamento: PagamentoDTO;
    itens: ItemPedidoDTO[];
}
