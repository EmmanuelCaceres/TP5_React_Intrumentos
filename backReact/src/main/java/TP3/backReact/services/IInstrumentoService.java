package TP3.backReact.services;

import TP3.backReact.entities.Instrumento;

import java.util.List;

public interface IInstrumentoService {
    List<Instrumento> getAll();
    Instrumento getById(Integer id);
    Instrumento postData(Instrumento instrumento);

    Instrumento putData(Integer id,Instrumento instrumento);

    boolean deleteData(Integer id) throws Exception;
}
