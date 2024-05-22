package TP3.backReact.services;

import TP3.backReact.entities.Categoria;
import TP3.backReact.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService implements ICategoriaService{

    @Autowired
    private CategoriaRepository categoriaRepository;
    @Override
    public List<Categoria> getAll() {
        return categoriaRepository.findAll();
    }
}
