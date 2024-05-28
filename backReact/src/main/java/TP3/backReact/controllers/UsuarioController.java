package TP3.backReact.controllers;

import TP3.backReact.entities.Instrumento;
import TP3.backReact.entities.Usuario;
import TP3.backReact.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.postUser(usuario));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente mas tarde.\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {
        boolean isValidUser = usuarioService.validateUser(usuario);
        if (isValidUser) {
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.getUserByName(usuario.getNombreUsuario()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Usuario o contraseña incorrectos.\"}");
        }
    }
}
