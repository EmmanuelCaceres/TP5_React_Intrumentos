package TP3.backReact.controllers;

import TP3.backReact.Domain.DTO.InstrumentoDto;
import TP3.backReact.Domain.entities.Instrumento;
import TP3.backReact.business.facade.IInstrumentoFacade;
import TP3.backReact.business.service.IInstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
//@RequestMapping("/")
public class InstrumentoController {
    @Autowired
    private IInstrumentoService service;
    @Autowired
    private IInstrumentoFacade instrumentoFacade;

    @GetMapping("/instrumentos")
    public ResponseEntity<List<InstrumentoDto>> getAll(){
        System.out.println("entre");
        return ResponseEntity.ok().body(instrumentoFacade.getAll());
    }
//    @GetMapping("/instrumentos/{id}")
//    public Instrumento getById(@PathVariable String id){
//        return service.getById(Integer.parseInt(id));
//    }
}
