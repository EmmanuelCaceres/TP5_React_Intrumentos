package TP3.backReact.services;

import TP3.backReact.entities.Usuario;
import TP3.backReact.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Base64;
@Service
public class UsuarioService implements IUsuarioService{
    @Autowired
    private UsuarioRepository usuarioRepository;

    private final String secretKey = "instrumentos";

    @Override
    public Usuario getUserByName(String nombreUsuario) {
        return usuarioRepository.findUserByName(nombreUsuario);
    }

    @Override
    public Usuario postUser(Usuario usuario) {
        String cadenaEncriptada = encode(secretKey,usuario.getClave());
        usuario.setClave(cadenaEncriptada);
        return usuarioRepository.save(usuario);
    }

    @Override
    public boolean validateUser(Usuario usuario) {
        Usuario user = getUserByName(usuario.getNombreUsuario());
        if (user != null) {
            String decryptedPassword = decode(secretKey, user.getClave());
            return decryptedPassword.equals(usuario.getClave());
        }
        return false;
    }


    public String encode(String secretKey, String cadena){
        String encriptacion = "";
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] llavePassword = md5.digest(secretKey.getBytes("utf-8"));
            byte[] bytesKey = Arrays.copyOf(llavePassword,24);
            SecretKey key = new SecretKeySpec(bytesKey,"DESede");
            Cipher cifrado = Cipher.getInstance("DESede");
            cifrado.init(Cipher.ENCRYPT_MODE,key);

            byte [] plainTextBytes = cadena.getBytes("utf-8");
            byte [] buf = cifrado.doFinal(plainTextBytes);

            byte [] base64Bytes = Base64.getEncoder().encode(buf);

            encriptacion = new String(base64Bytes);

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return  encriptacion;
    }
    public String decode(String secretKey, String cadenaEncriptada){
        String desencriptacion = "";
        try{
            byte [] message = Base64.getDecoder().decode(cadenaEncriptada.getBytes("utf-8"));
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte [] digestOfPassword = md5.digest(secretKey.getBytes("utf-8"));
            byte[] bytesKey = Arrays.copyOf(digestOfPassword,24);
            SecretKey key = new SecretKeySpec(bytesKey,"DESede");
            Cipher decipher = Cipher.getInstance("DESede");
            decipher.init(Cipher.DECRYPT_MODE,key);
            byte [] plainText = decipher.doFinal(message);
            desencriptacion = new String(plainText, "UTF-8");

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return  desencriptacion;
    }
}
