package TP3.backReact.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PagoMP {
    private Long id;
    private String nombre;
    private Double montoTotal;
}
