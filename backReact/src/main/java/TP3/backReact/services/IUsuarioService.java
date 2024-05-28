package TP3.backReact.services;

import TP3.backReact.entities.Instrumento;
import TP3.backReact.entities.Usuario;

import java.util.List;

public interface IUsuarioService {
    Usuario getUserByName(String nombreUsuario);
    Usuario postUser(Usuario usuario);

    boolean validateUser(Usuario usuario);

}
