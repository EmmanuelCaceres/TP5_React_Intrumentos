package TP3.backReact.controllers;

import TP3.backReact.entities.Pedido;
import TP3.backReact.entities.PedidoDetalle;
import TP3.backReact.services.PedidoDetalleService;
import TP3.backReact.services.PedidoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(value = "*")
public class PedidoController {
    private static final Logger logger = LoggerFactory.getLogger(Pedido.class);

    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private PedidoService pedidoService;

    @PostMapping(value = "/pedido/save")
    public ResponseEntity<?> postData(@RequestBody Pedido pedido) throws JsonProcessingException {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(pedidoService.postData(pedido));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente mas tarde.\"}");
        }

    }

    @GetMapping("/pedidos/api/downloadExcel")
    public  ResponseEntity<?> getExcelPedidos(@RequestParam("fechaInicio") String fechaInicio,
                                              @RequestParam("fechaFin") String fechaFin) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
            LocalDateTime inicio = LocalDateTime.parse(fechaInicio, formatter);
            LocalDateTime fin = LocalDateTime.parse(fechaFin, formatter);
            Workbook libroExcel = pedidoService.imprimirExcelPedidos(inicio,fin);
//            // Escribir el libro de trabajo en un flujo de bytes
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            libroExcel.write(outputStream);
//
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment", "pedidos.xlsx");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/cantidadPedido")
    public  List<List<Object>> getPedidosByFecha(){
        return pedidoService.getcantidadPedido();
    }
    @GetMapping("/pedidoPorMes")
    public  List<List<Object>> getPedidosPorMesYAnio(@RequestParam("anio") Integer anio){
        return pedidoService.getPedidosPorMesYAnio(anio);
    }
}
