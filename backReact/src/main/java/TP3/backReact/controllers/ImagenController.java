package TP3.backReact.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@CrossOrigin("*")
@RestController
public class ImagenController {
    private static String UPLOAD_DIR = "src/main/resources/static/images/";
    @PostMapping("imagen/save")
    public ResponseEntity<String> uploadImage (@RequestParam("file") MultipartFile image){
        if (image.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file!");
        }
        try {
            byte[] bytes = image.getBytes();
            String originalFilename = image.getOriginalFilename();
            String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
            Path path = Paths.get(UPLOAD_DIR + uniqueFilename);
            Files.write(path, image.getBytes());
            return ResponseEntity.ok(uniqueFilename);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
