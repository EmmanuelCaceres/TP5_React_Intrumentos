package TP3.backReact.services;

import TP3.backReact.entities.Pedido;
import TP3.backReact.entities.PedidoDetalle;
import TP3.backReact.repository.PedidoDetalleRepository;
import TP3.backReact.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoDetalleService implements IPedidoDetalleService{

    @Autowired
    public PedidoDetalleRepository pedidoDetalleRepository;
    @Autowired
    public PedidoRepository pedidoRepository;

    @Override
    public PedidoDetalle postData(PedidoDetalle pedidoDetalle) {

        Pedido pedido = pedidoDetalle.getPedido();
        pedido = pedidoRepository.save(pedido);

        // Asignamos el pedido persistido a cada detalle del pedido

            pedidoDetalle.setPedido(pedido);


        return pedidoDetalleRepository.save(pedidoDetalle);
    }
}
