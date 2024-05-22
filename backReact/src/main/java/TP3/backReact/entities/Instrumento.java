package TP3.backReact.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Instrumento implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private String precio;
    private String costoEnvio;
    private String cantidadVendida;
    private String descripcion;
    private Boolean activo;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @OneToMany(mappedBy = "instrumento")
    @JsonIgnore
    private List<PedidoDetalle> pedidoDetalle = new ArrayList<>();
}
