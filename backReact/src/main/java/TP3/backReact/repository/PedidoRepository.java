package TP3.backReact.repository;

import TP3.backReact.entities.Instrumento;
import TP3.backReact.entities.Pedido;
import TP3.backReact.entities.dto.PedidoInstrumentoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido,Integer> {

    @Query(value = "SELECT * FROM Pedido " +
            "WHERE fecha_actual BETWEEN :fechaInicio AND :fechaFin",
            nativeQuery = true)
    List<Pedido> findPedidosEntreFechas(@Param("fechaInicio") LocalDateTime fechaInicio, @Param("fechaFin") LocalDateTime fechaFin);

    @Query("SELECT new TP3.backReact.entities.dto.PedidoInstrumentoDTO(i.id, i.instrumento, COUNT(p)) " +
            "FROM Pedido p JOIN p.detallesPedido dp JOIN dp.instrumento i " +
            "GROUP BY i.id, i.instrumento")
    List<PedidoInstrumentoDTO> findCantidadPedidosAgrupadosPorInstrumento();
}
