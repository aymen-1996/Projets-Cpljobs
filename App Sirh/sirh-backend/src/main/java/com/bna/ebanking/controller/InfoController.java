package com.bna.ebanking.controller;


import com.bna.ebanking.entities.Doc;
import com.bna.ebanking.entities.Info;
import com.bna.ebanking.exceptions.ResourceNotFoundException;

import com.bna.ebanking.repositories.InfoRepository;
import com.bna.ebanking.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin("http://localhost:4200")
@RestController

public class InfoController {

    @Autowired
    private InfoRepository infoRepository;
    @Autowired
    private StorageService storage;




    @GetMapping("/infos")
    public List<Info> getAllEmployees(){
        return infoRepository.findAll();
    }


    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @GetMapping("/infos/search")
    public List<Info> searchinfos(@RequestParam(name = "keyword",defaultValue = "") String keyword){
        return infoRepository.searchInfos("%"+keyword+"%");
    }

    @PostMapping("/infos")
    public Info save(@RequestParam("file") MultipartFile file, Info info) {
        String filename = storage.CreateNameCv(file);
        storage.store(file, filename);
        info.setCv(filename);
        return infoRepository.save(info);
    }

    @DeleteMapping("/infos/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id){

        Info info = infoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("info not exist with id: " + id));

        infoRepository.delete(info);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }


    @GetMapping("/infos/{id}")
    public Info findById(@PathVariable Long id){
        return infoRepository.findById(id).orElse(null);
    }


    @PutMapping("/infos/{id}")
    public Info update(@PathVariable Long id, @RequestBody Info info) {
        info.setId(id);
        Info oldInfo = infoRepository.findById(id).orElse(null);
        info.setNom(info.getNom() == null ? oldInfo.getNom() : info.getNom());

        info.setAge(info.getAge() == null ? oldInfo.getAge() : info.getAge());
        info.setAdresse(info.getAdresse() == null ? oldInfo.getAdresse() : info.getAdresse());
        info.setCaracteristiques(info.getCaracteristiques() == null ? oldInfo.getCaracteristiques() : info.getCaracteristiques());
        info.setCnss(info.getCnss() == null ? oldInfo.getCnss() : info.getCnss());
        info.setRib(info.getRib() == null ? oldInfo.getRib() : info.getRib());
        info.setCv(oldInfo.getCv());

        return infoRepository.save(info);
    }

}



