package com.bna.ebanking.controller;

import com.bna.ebanking.entities.*;
import com.bna.ebanking.repositories.CongeRepository;
import com.bna.ebanking.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin("http://localhost:4200")
@RestController
public class CongeController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CongeRepository congeRepository;

    @GetMapping("/conge")
    public List<Conge> findall() {

        return congeRepository.findAll();
    }

    @GetMapping("/conge/{id}")
    public Conge findByid(@PathVariable Long id) {

        return congeRepository.findById(id).orElse(null);
    }

    @PostMapping("/conge/{id}")
    public Conge save(@PathVariable Long id,  Conge congee) {
        User user  = userRepository.findById(id).orElse(null);

        congee.setUser(user);
        congee.setStatut("en attente");


        return congeRepository.save(congee);
    }


    @GetMapping("/conge/search")
    public List<Conge> searchCustomers(@RequestParam(name = "keyword",defaultValue = "") String keyword){
        return congeRepository.searchCustomers("%"+keyword+"%");
    }
    @DeleteMapping("/conge/{id}")
    public void delete(@PathVariable Long id) {
        congeRepository.deleteById(id);
    }

    @PutMapping("/conge/{id}")
    public Conge update(@PathVariable Long id, @RequestBody Conge conge) {
        conge.setId(id);
        Conge oldCon = congeRepository.findById(id).orElse(null);
        conge.setDateDebut(conge.getDateDebut() == null ? oldCon.getDateDebut() : conge.getDateDebut());
        conge.setDateFin(conge.getDateFin() == null ? oldCon.getDateFin() : conge.getDateFin());
        conge.setStatut(conge.getStatut() == null ? oldCon.getStatut() : conge.getStatut());

        return congeRepository.save(conge);
    }
    @PutMapping("/accepte/{id}")
    public boolean accepterConge(@PathVariable Long id) {
        Optional<Conge> customerOptional = congeRepository.findById(id);

        if (customerOptional.isPresent()) {
            Conge conge = customerOptional.get();
            conge.setStatut("Accepted");
            congeRepository.save(conge);
            return true;
        }
        return false;
    }
    @PutMapping("/refus/{id}")
    public  boolean refuseConge(@PathVariable Long id) {
        Optional<Conge> customerOptional = congeRepository.findById(id);

        if (customerOptional.isPresent()) {
            Conge conge = customerOptional.get();
            conge.setStatut("Refus");
            congeRepository.save(conge);
            return true ;
        }
        return false ;
    }



}