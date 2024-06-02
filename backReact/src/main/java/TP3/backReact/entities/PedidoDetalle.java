package TP3.backReact.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_instrumento")
    private Instrumento instrumento;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="id_pedido")
    @JsonBackReference
    private Pedido pedido;

}
