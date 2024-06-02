import PedidoDetalle from "./PedidoDetalle";

export default class Pedido{
    id:number = 0;
    fechaActual:Date = new Date();
    totalPedido:number = 0;
    detallesPedido: PedidoDetalle[] = [];
}