package com.bna.ebanking.controller;


import com.bna.ebanking.entities.Demande;
import com.bna.ebanking.entities.Doc;

import com.bna.ebanking.exceptions.ResourceNotFoundException;

import com.bna.ebanking.repositories.DocRepository;

import com.bna.ebanking.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@CrossOrigin("http://localhost:4200")
@RestController

public class DocController {

    @Autowired
    private DocRepository docRepository;
    @Autowired
    private StorageService storage;




    @GetMapping("/docs")
    public List<Doc> getAllEmployees(){
        return docRepository.findAll();
    }

    @GetMapping("/file/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @GetMapping("/docs/search")
    public List<Doc> searchCustomers(@RequestParam(name = "keyword",defaultValue = "") String keyword){
        return docRepository.searchCustomers("%"+keyword+"%");
    }
    @PostMapping("/docs")
    public Doc save(@RequestParam("file") MultipartFile file, Doc doc) {
        String filename = storage.CreateNameCv(file);
        storage.store(file, filename);
        doc.setContrat(filename);
        return docRepository.save(doc);
    }
    @DeleteMapping("/docs/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id){

        Doc doc = docRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("info not exist with id: " + id));

        docRepository.delete(doc);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }


    @GetMapping("/docs/{id}")
    public Doc findById(@PathVariable Long id){
        return docRepository.findById(id).orElse(null);
    }
    @PutMapping("/docs/{id}")
    public Doc update(@PathVariable Long id, @RequestBody Doc doc) {
        doc.setId(id);
        Doc oldDoc = docRepository.findById(id).orElse(null);
        doc.setType_contrat(doc.getType_contrat() == null ? oldDoc.getType_contrat() : doc.getType_contrat());
        doc.setAnciennete(doc.getAnciennete() == null ? oldDoc.getAnciennete() : doc.getAnciennete());
        doc.setMobilite(doc.getMobilite() == null ? oldDoc.getMobilite() : doc.getMobilite());
        doc.setContrat(oldDoc.getContrat());

        return docRepository.save(doc);
    }

}



