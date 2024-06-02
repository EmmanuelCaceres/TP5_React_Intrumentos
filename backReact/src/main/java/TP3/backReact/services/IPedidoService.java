package TP3.backReact.services;

import TP3.backReact.entities.Pedido;
import TP3.backReact.entities.PedidoDetalle;
import org.apache.poi.ss.usermodel.Workbook;

import java.time.LocalDateTime;
import java.util.List;

public interface IPedidoService {

    Pedido postData(Pedido pedido);

    Workbook imprimirExcelPedidos(LocalDateTime fechaInicio, LocalDateTime fechaFin);

}
