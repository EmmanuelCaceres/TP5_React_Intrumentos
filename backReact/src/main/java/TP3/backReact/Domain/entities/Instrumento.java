package TP3.backReact.Domain.entities;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "instrumentos")
@Getter
public class Instrumento {
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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

}
