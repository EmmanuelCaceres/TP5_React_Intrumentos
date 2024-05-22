package TP3.backReact.services;

import TP3.backReact.entities.Instrumento;
import TP3.backReact.repository.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstrumentoService implements IInstrumentoService{

    @Autowired
    private InstrumentoRepository repository;
    @Override

    public List<Instrumento> getAll(){
        return repository.findAll();
    }

    @Override
    public Instrumento getById(Integer id) {
        return repository.findById(id).get();
    }

    @Override
    public Instrumento postData(Instrumento instrumento) {
        return repository.save(instrumento);
    }

    @Override
    public Instrumento putData(Integer id, Instrumento entity) {
        Optional<Instrumento> instrumentoOptional = repository.findById(id);
        Instrumento instrumento = instrumentoOptional.get();
        instrumento = repository.save(entity);
        return instrumento;
    }

    @Override
    public boolean deleteData(Integer id) throws Exception {
        if(repository.existsById(id)){
            repository.deleteById(id);
            return true;
        }else {
            throw new Exception();
        }
    }

}
