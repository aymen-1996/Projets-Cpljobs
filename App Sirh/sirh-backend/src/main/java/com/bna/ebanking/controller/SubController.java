package com.bna.ebanking.controller;

import com.bna.ebanking.entities.Candidat;
import com.bna.ebanking.entities.Customer;
import com.bna.ebanking.entities.Sub;
import com.bna.ebanking.exceptions.ResourceNotFoundException;
import com.bna.ebanking.repositories.CandidatRepository;
import com.bna.ebanking.repositories.SubRepository;
import com.bna.ebanking.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:4200")
@RestController
public class SubController {
    @Autowired
    private SubRepository subRepository;
    @Autowired
    private StorageService storage;




    @GetMapping("/sub")
    public List<Sub> getAllEmployees(){

        return subRepository.findAll();
    }





    @PostMapping("/sub")
    public Sub save(@RequestBody Sub sub) {

        return subRepository.save(sub);
    }


    @DeleteMapping("/sub/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id){

        Sub sub = subRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("info not exist with id: " + id));

        subRepository.delete(sub);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
    @PutMapping("/sub/{id}")
    public Sub update(@PathVariable Long id, @RequestBody Sub sub) {
        sub.setId(id);
        Sub oldCan = subRepository.findById(id).orElse(null);
        sub.setNom(sub.getNom() == null ? oldCan.getNom() : sub.getNom());
        sub.setEmail(sub.getEmail() == null ? oldCan.getEmail() : sub.getEmail());
        sub.setPoste(sub.getPoste() == null ? oldCan.getPoste() : sub.getPoste());
        sub.setTel(sub.getTel() == null ? oldCan.getTel() : sub.getTel());


        return subRepository.save(sub);
    }
    @GetMapping("/sub/search")
    public List<Sub> searchCustomers(@RequestParam(name = "keyword",defaultValue = "") String keyword){
        return subRepository.searchCustomers("%"+keyword+"%");
    }

    @GetMapping("/sub/{id}")
    public Sub findById(@PathVariable Long id){
        return subRepository.findById(id).orElse(null);
    }





}

