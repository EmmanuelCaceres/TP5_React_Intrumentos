package TP3.backReact.business.service;

import TP3.backReact.Domain.entities.Instrumento;
import TP3.backReact.repository.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentoService implements IInstrumentoService {

    @Autowired
    private InstrumentoRepository repository;
    @Override
    public List<Instrumento> getAll(){
        return repository.findAll();
    }

    @Override
    public Instrumento getById(Integer id) {
        var instrumento = repository.findById(id);
        if(instrumento.isEmpty()) throw new RuntimeException("No existe ningun instrumento con ese id");
        return instrumento.get();
    }

}
