package TP3.backReact.business.mapper;

import TP3.backReact.Domain.DTO.InstrumentoDto;
import TP3.backReact.Domain.entities.Instrumento;
import org.mapstruct.Mapper;

import java.util.Date;
import java.util.List;

@Mapper(componentModel = "spring",uses = {Date.class})
public interface InstrumentoMapper {

    List<InstrumentoDto> instrumentosToInstrumentosDto(List<Instrumento> instrumentos);
    InstrumentoDto instrumentoToInstrumentoDto(Instrumento instrumento);
    Instrumento instrumentoDtoToInstrumento(InstrumentoDto instrumentoDto);
}
