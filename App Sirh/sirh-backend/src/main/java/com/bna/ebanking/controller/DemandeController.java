package com.bna.ebanking.controller;



import com.bna.ebanking.entities.*;
import com.bna.ebanking.exceptions.ResourceNotFoundException;

import com.bna.ebanking.repositories.DemandeRepository;
import com.bna.ebanking.repositories.InfoRepository;
import com.bna.ebanking.repositories.UserRepository;
import com.bna.ebanking.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin("http://localhost:4200")
@RestController

public class DemandeController {

    @Autowired
    private DemandeRepository demandeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageService storage;

    @Autowired
    private JavaMailSender javaMailSender;





    @GetMapping("/demandes")
    public List<Demande> getAllEmployees(){
        return demandeRepository.findAll();
    }


    @GetMapping("/demandes/search")
    public List<Demande> searchCustomers(@RequestParam(name = "keyword",defaultValue = "") String keyword){
        return demandeRepository.searchCustomers("%"+keyword+"%");
    }


    @PostMapping("/demandes/{id_user}")
    public Demande save( @PathVariable Long id_user, Demande demande) {
        User user  = userRepository.findById(id_user).orElse(null);
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("Belhassan.Bouhalfaya@cpljobs.tn ");


        msg.setSubject("test");
        msg.setText("Bonjour " +  "\n ton compte est inactive ,en cas d'activation,nous vous enverrons un mail.\n Merci! ");

        javaMailSender.send(msg);



        demande.setUser(user);


        return demandeRepository.save(demande);
    }


    @DeleteMapping("/demandes/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id){

        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("info not exist with id: " + id));

        demandeRepository.delete(demande);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
    @PutMapping("/demandes/{id}")
    public Demande update(@PathVariable Long id, @RequestBody Demande demande) {
        demande.setId(id);
        Demande oldCan = demandeRepository.findById(id).orElse(null);
        demande.setDocument(demande.getDocument() == null ? oldCan.getDocument() : demande.getDocument());
        demande.setMessage(demande.getMessage() == null ? oldCan.getMessage() : demande.getMessage());


        return demandeRepository.save(demande);
    }

    @GetMapping("/demandes/{id}")
    public Demande findById(@PathVariable Long id){

        return demandeRepository.findById(id).orElse(null);
    }


}



