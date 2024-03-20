package com.cpl.jobs.controller;

import com.cpl.jobs.entities.Infopro;
import com.cpl.jobs.entities.Langue;
import com.cpl.jobs.entities.User;
import com.cpl.jobs.repositories.InfoproRepository;
import com.cpl.jobs.repositories.LangueRepository;
import com.cpl.jobs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin("*")
public class LangueController {
    @Autowired
    private LangueRepository langueRepository;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/langue")
    public List<Langue> findall() {
        return langueRepository.findAll();
    }

    @GetMapping("/langue/{id}")
    public Langue findByid(@PathVariable Long id) {
        return langueRepository.findById(id).orElse(null);
    }








    @PostMapping("/langue/save/{id_user}")
    public Langue save(  Langue langue, @PathVariable Long id_user) {

        User user = userRepository.findById(id_user).orElse(null);
        langue.setUser(user);

        return langueRepository.save(langue);
    }



    @DeleteMapping("/langue/{id}")
    public void delete(@PathVariable Long id) {
        langueRepository.deleteById(id);
    }

    @PutMapping("/langue/{id}")
    public Langue update(@PathVariable Long id,  Langue langue) {
        Langue oldLangue = langueRepository.findById(id).orElse(null);



        langue.setUser(oldLangue.getUser());


        langue.setId(id);

        return langueRepository.save(langue);
    }

    @GetMapping("/langues/{id_user}")
    public List<Langue> langue(@PathVariable Long id_user) {
        return langueRepository.findinfoproBylangue(id_user);
    }

}


