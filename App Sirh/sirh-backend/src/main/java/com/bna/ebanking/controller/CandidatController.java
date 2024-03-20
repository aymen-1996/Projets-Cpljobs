package com.bna.ebanking.controller;

import com.bna.ebanking.entities.Candidat;
import com.bna.ebanking.entities.Info;
import com.bna.ebanking.exceptions.ResourceNotFoundException;
import com.bna.ebanking.repositories.CandidatRepository;
import com.bna.ebanking.repositories.InfoRepository;
import com.bna.ebanking.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController

public class CandidatController {

    @Autowired
    private CandidatRepository candidatRepository;
    @Autowired
    private StorageService storage;




    @GetMapping("/candidats")
    public List<Candidat> getAllEmployees(){
        return candidatRepository.findAll();
    }

        @GetMapping("/candidats/search")
        public List<Candidat> searchCustomers(@RequestParam(name = "keyword",defaultValue = "") String keyword){
            return candidatRepository.searchCustomers("%"+keyword+"%");
        }




    @PostMapping("/candidats")
    public Candidat save(@RequestBody Candidat candidat) {

        return candidatRepository.save(candidat);
    }


    @DeleteMapping("/candidats/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id){

        Candidat candidat = candidatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("info not exist with id: " + id));

        candidatRepository.delete(candidat);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }


    @GetMapping("/candidats/{id}")
    public Candidat findById(@PathVariable Long id){
        return candidatRepository.findById(id).orElse(null);
    }



    @PutMapping("/candidats/{id}")
    public Candidat update(@PathVariable Long id, @RequestBody Candidat candidat) {
        candidat.setId(id);
        Candidat oldCan = candidatRepository.findById(id).orElse(null);
        candidat.setTelephone(candidat.getTelephone() == null ? oldCan.getTelephone() : candidat.getTelephone());

        candidat.setEmail(candidat.getEmail() == null ? oldCan.getEmail() : candidat.getEmail());
        candidat.setEvaluation(candidat.getEvaluation() == null ? oldCan.getEvaluation() : candidat.getEvaluation());
        candidat.setEntretientel(candidat.getEntretientel() == null ? oldCan.getEntretientel() : candidat.getEntretientel());
        candidat.setEntretienphy(candidat.getEntretienphy() == null ? oldCan.getEntretienphy() : candidat.getEntretienphy());
        candidat.setParrainage(candidat.getParrainage() == null ? oldCan.getParrainage() : candidat.getParrainage());
        candidat.setSourcing(candidat.getSourcing() == null ? oldCan.getSourcing() : candidat.getSourcing());

        return candidatRepository.save(candidat);
    }

}



