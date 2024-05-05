package TP3.backReact.business.facade;

import TP3.backReact.Domain.DTO.BaseDto;
import TP3.backReact.Domain.DTO.InstrumentoDto;
import TP3.backReact.Domain.entities.Instrumento;

import java.util.List;

public interface IInstrumentoFacade extends IBaseFacade{
    List<InstrumentoDto> getAll();
    InstrumentoDto getById(Long id);
}
