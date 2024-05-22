package TP3.backReact.controllers;

import TP3.backReact.entities.Instrumento;
import TP3.backReact.entities.PedidoDetalle;
import TP3.backReact.services.PedidoDetalleService;
import TP3.backReact.services.PedidoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
public class PedidoDetalleController {

    private static final Logger logger = LoggerFactory.getLogger(PedidoDetalleController.class);

    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private PedidoDetalleService pedidoDetalleService;

    @PostMapping(value = "/pedidoDetalle/save")
    public ResponseEntity<?> postData(@RequestBody List<PedidoDetalle> pedidoDetalles) throws JsonProcessingException {
        logger.info("Llegue hasta aqui");
        String pedidoDetallesJson = objectMapper.writeValueAsString(pedidoDetalles);
        logger.info("Received PedidoDetalles: {}", pedidoDetallesJson);
        for (PedidoDetalle pedidoDetalle : pedidoDetalles) {
            // Llamar al servicio para procesar cada pedidoDetalle
            pedidoDetalleService.postData(pedidoDetalle);
        }
        try{
            return ResponseEntity.status(HttpStatus.OK).body("Datos recibidos y procesados correctamente");
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente mas tarde.\"}");
        }

    }
}
