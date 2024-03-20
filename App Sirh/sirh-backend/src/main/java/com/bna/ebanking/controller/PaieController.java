package com.bna.ebanking.controller;

import com.bna.ebanking.entities.Demande;
import com.bna.ebanking.entities.Info;
import com.bna.ebanking.entities.Paie;


import com.bna.ebanking.entities.User;
import com.bna.ebanking.exceptions.ResourceNotFoundException;
import com.bna.ebanking.repositories.PaieRepository;
import com.bna.ebanking.repositories.UserRepository;
import com.bna.ebanking.service.MailService;
import com.bna.ebanking.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController

@CrossOrigin("*")
public class PaieController {

    @Autowired
    private StorageService storage;

    @Autowired
    private PaieRepository paieRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailService mailService;



    @GetMapping("/paie")
    public List<Paie> getAllEmployees(){
        return paieRepository.findAll();
    }

    @PostMapping("/paie/{id_user}")
    public Paie save(@RequestParam("file") MultipartFile file, Paie paie, @PathVariable Long id_user) {
        String filename = storage.CreateNameCv(file);
        storage.store(file, filename);
        paie.setFichier(filename);
        String filePath = storage.getFilePath(filename);

        User user = userRepository.findById(id_user).orElse(null);
        paie.setUser(user);
        paie.setDate(new Date());
        mailService.sendMailWithAttachmentAndCalendar(
                "belhassenbouhalfaya@gmail.com",
                "Fiche de paie",
                "Monsieur , Madame : "+user.getNom()+" voici votre fiche de paie",
                filePath
        );


        return paieRepository.save(paie);

    }
    @DeleteMapping("/paie/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id){

        Paie paie = paieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("info not exist with id: " + id));

        paieRepository.delete(paie);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
