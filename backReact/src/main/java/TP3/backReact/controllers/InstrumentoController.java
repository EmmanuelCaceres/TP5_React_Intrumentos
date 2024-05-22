package TP3.backReact.controllers;

import TP3.backReact.entities.Instrumento;
import TP3.backReact.services.IInstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
//@RequestMapping(value = "/instrumentos")
public class InstrumentoController {
    @Autowired
    private IInstrumentoService service;

    @GetMapping(value = "/instrumentos")
    public ResponseEntity<?> getAll(){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(service.getAll());
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente mas tarde.\"}");
        }

    }
    @GetMapping("/instrumentos/{id}")
    public Instrumento getById(@PathVariable String id){
        return service.getById(Integer.parseInt(id));
    }

    @PostMapping(value = "/instrumento/save")
    public ResponseEntity<?> postData(@RequestBody Instrumento instrumento){
        System.out.println(instrumento);
        try{
            return ResponseEntity.status(HttpStatus.OK).body(service.postData(instrumento));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente mas tarde.\"}");
        }

    }

    @PutMapping(value = "/instrumento/update/{id}")
    public  ResponseEntity<?> update (@PathVariable Integer id,@RequestBody Instrumento instrumento){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(service.putData(id,instrumento));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente mas tarde.\"}");
        }
    }
    @DeleteMapping(value = "instrumento/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(service.deleteData(id));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente mas tarde.\"}");
        }
    }

}
