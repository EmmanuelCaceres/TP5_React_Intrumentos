package TP3.backReact.entities.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PedidosPorMesAnioDTO {
    private Integer month;
    private Long count;

    public PedidosPorMesAnioDTO(Integer month, Long count) {
        this.month = month;
        this.count = count;
    }

}
