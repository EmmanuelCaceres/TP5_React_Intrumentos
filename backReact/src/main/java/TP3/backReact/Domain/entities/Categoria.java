package TP3.backReact.Domain.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String denominacion;

    @OneToOne(mappedBy = "categoria")
    private Instrumento instrumento;
}
