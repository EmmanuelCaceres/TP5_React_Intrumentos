package TP3.backReact.repository;

import TP3.backReact.Domain.entities.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstrumentoRepository extends JpaRepository<Instrumento,Integer> {
}
