package TP3.backReact.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDetalle implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int cantidad;

    @ManyToOne
    @JoinColumn(name = "id_instrumento")
    private Instrumento instrumento;

    @ManyToOne
    @JoinColumn(name = "id_pedido")
    private Pedido pedido;
}
