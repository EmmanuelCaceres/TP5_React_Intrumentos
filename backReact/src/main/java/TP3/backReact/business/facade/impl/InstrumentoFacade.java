package TP3.backReact.business.facade.impl;

import TP3.backReact.Domain.DTO.BaseDto;
import TP3.backReact.Domain.DTO.InstrumentoDto;
import TP3.backReact.business.facade.IInstrumentoFacade;
import TP3.backReact.business.mapper.InstrumentoMapper;
import TP3.backReact.business.service.IInstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentoFacade implements IInstrumentoFacade {

    @Autowired
    private IInstrumentoService instrumentoService;
    @Autowired
    private InstrumentoMapper instrumentoMapper;

    @Override
    public BaseDto createNew(BaseDto request) {
        return null;
    }

    @Override
    public List<InstrumentoDto> getAll() {
        var instrumentos = instrumentoService.getAll();
        return instrumentoMapper.instrumentosToInstrumentosDto(instrumentos);
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public BaseDto update(BaseDto request, Long id) {
        return null;
    }



    @Override
    public InstrumentoDto getById(Long id) {
        return null;
    }
}
