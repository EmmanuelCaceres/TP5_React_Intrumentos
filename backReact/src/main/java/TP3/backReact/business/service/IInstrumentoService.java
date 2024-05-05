package TP3.backReact.business.service;

import TP3.backReact.Domain.entities.Instrumento;

import java.util.List;

public interface IInstrumentoService {
    List<Instrumento> getAll();
    Instrumento getById(Integer id);
}
