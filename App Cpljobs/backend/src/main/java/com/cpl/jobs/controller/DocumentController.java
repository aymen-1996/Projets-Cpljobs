package com.cpl.jobs.controller;

import com.cpl.jobs.entities.Document;
import com.cpl.jobs.entities.Formation;
import com.cpl.jobs.entities.Infocan;
import com.cpl.jobs.entities.User;
import com.cpl.jobs.repositories.DocumentRepositroy;
import com.cpl.jobs.repositories.InfocanRepository;
import com.cpl.jobs.repositories.UserRepository;
import com.cpl.jobs.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@RestController

@CrossOrigin("*")
public class DocumentController {
    @Autowired
    private DocumentRepositroy documentRepositroy;
    @Autowired
    private StorageService storage;
    @Autowired
    private UserRepository userRepository;


    @GetMapping("/document")
    public List<Document> findall() {
        return documentRepositroy.findAll();
    }

    @GetMapping("/document/{id}")
    public Document findByid(@PathVariable Long id) {
        return documentRepositroy.findById(id).orElse(null);
    }





    @GetMapping("/document1/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }


    @PostMapping("/document/save/{id_user}")
    public Document save(@RequestParam("file") MultipartFile imageFile, Document document, @PathVariable Long id_user) {

        String cvFilename = storage.CreateNameCv(imageFile);


        storage.store(imageFile, cvFilename);


        document.setDoc(cvFilename);
        User user = userRepository.findById(id_user).orElse(null);
        document.setUser(user);

        return documentRepositroy.save(document);
    }



    @DeleteMapping("/document/{id}")
    public void delete(@PathVariable Long id) {
        documentRepositroy.deleteById(id);
    }

    @PutMapping("/document/{id}")
    public Document update(@PathVariable Long id, @RequestBody Document document) {
        Document oldDocument = documentRepositroy.findById(id).orElse(null);



        document.setUser(oldDocument.getUser());


        document.setId(id);

        return documentRepositroy.save(document);
    }

    @GetMapping("/documents/{id_user}")
    public List<Document> document(@PathVariable Long id_user) {
        return documentRepositroy.finddoc(id_user);
    }


}


