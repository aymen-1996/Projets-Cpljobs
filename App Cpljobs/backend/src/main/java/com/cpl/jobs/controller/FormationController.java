package com.cpl.jobs.controller;

import com.cpl.jobs.entities.Formation;
import com.cpl.jobs.entities.Infopro;
import com.cpl.jobs.entities.User;
import com.cpl.jobs.repositories.FormationRepository;
import com.cpl.jobs.repositories.InfoproRepository;
import com.cpl.jobs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController

@CrossOrigin("*")
public class FormationController {
    @Autowired
    private FormationRepository formationRepository;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/formation")
    public List<Formation> findall() {
        return formationRepository.findAll();
    }

    @GetMapping("/formation/{id}")
    public Formation findByid(@PathVariable Long id) {
        return formationRepository.findById(id).orElse(null);
    }








    @PostMapping("/formation/save/{id_user}")
    public Formation save(  Formation formation, @PathVariable Long id_user) {

        User user = userRepository.findById(id_user).orElse(null);
        formation.setUser(user);

        return formationRepository.save(formation);
    }



    @DeleteMapping("/formation/{id}")
    public void delete(@PathVariable Long id) {
        formationRepository.deleteById(id);
    }

    @PutMapping("/formation/{id}")
    public Formation update(@PathVariable Long id,  Formation formation) {
        Formation oldFormation = formationRepository.findById(id).orElse(null);



        formation.setUser(oldFormation.getUser());


        formation.setId(id);

        return formationRepository.save(formation);
    }


    @GetMapping("/formations/{id_user}")
    public List<Formation> formation(@PathVariable Long id_user) {
        return formationRepository.findinfoproByformation(id_user);
    }
}




