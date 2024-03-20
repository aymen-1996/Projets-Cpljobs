package com.cpl.jobs.controller;



import com.cpl.jobs.entities.Infocan;

import com.cpl.jobs.entities.Post;
import com.cpl.jobs.entities.User;
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

public class InfocanController {
    @Autowired
    private InfocanRepository infocanRepository;
    @Autowired
    private StorageService storage;
    @Autowired
    private UserRepository userRepository;


    @GetMapping("/infocan")
    public List<Infocan> findall() {
        return infocanRepository.findAll();
    }

    @GetMapping("/infocan/{id}")
    public Infocan findByid(@PathVariable Long id) {
        return infocanRepository.findById(id).orElse(null);
    }








    @PostMapping("/save/{id_user}")
    public Infocan save(@RequestParam(value = "file", required = false) MultipartFile imageFile,   Infocan infocan, @PathVariable Long id_user) {

        String cvFilename = storage.CreateNameCv(imageFile);


        storage.store(imageFile, cvFilename);


        infocan.setPhoto(cvFilename);
        User user = userRepository.findById(id_user).orElse(null);
        infocan.setUser(user);

        return infocanRepository.save(infocan);
    }


    @GetMapping("/infocan/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @DeleteMapping("/infocan/{id}")
    public void delete(@PathVariable Long id) {
        infocanRepository.deleteById(id);
    }

    @PutMapping("/infocan/{id}")
    public Infocan update(@PathVariable Long id,  Infocan infocan) {
        Infocan oldInfocan = infocanRepository.findById(id).orElse(null);



        infocan.setUser(oldInfocan.getUser());
        infocan.setPhoto(oldInfocan.getPhoto());
        infocan.setGenre(oldInfocan.getGenre());


        infocan.setId(id);

        return infocanRepository.save(infocan);
    }



    @GetMapping("/infocans/{id_user}")
    public List<Infocan> infocans(@PathVariable Long id_user) {
        return infocanRepository.findinfoBycan(id_user);
    }
}


