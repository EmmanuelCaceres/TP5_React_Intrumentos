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

}
