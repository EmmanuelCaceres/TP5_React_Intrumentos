package TP3.backReact.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@Getter
@Setter
public class PedidoInstrumentoDTO {
    private Integer instrumentoId;
    private String instrumentoNombre;
    private Long cantidadPedidos;

    public PedidoInstrumentoDTO(Integer instrumentoId, String instrumentoNombre, Long cantidadPedidos) {
        this.instrumentoId = instrumentoId;
        this.instrumentoNombre = instrumentoNombre;
        this.cantidadPedidos = cantidadPedidos;
    }
}
