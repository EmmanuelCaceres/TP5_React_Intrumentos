package TP3.backReact.repository;

import TP3.backReact.entities.Instrumento;
import TP3.backReact.entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido,Integer> {
}
