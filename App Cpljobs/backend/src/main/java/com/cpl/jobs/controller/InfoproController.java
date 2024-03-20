package com.cpl.jobs.controller;

import com.cpl.jobs.entities.Annonce;
import com.cpl.jobs.entities.Infocan;
import com.cpl.jobs.entities.Infopro;
import com.cpl.jobs.entities.User;
import com.cpl.jobs.repositories.InfocanRepository;
import com.cpl.jobs.repositories.InfoproRepository;
import com.cpl.jobs.repositories.UserRepository;
import com.cpl.jobs.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin("*")
public class InfoproController {
    @Autowired
    private InfoproRepository infoproRepository;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/infopro")
    public List<Infopro> findall() {
        return infoproRepository.findAll();
    }

    @GetMapping("/infopro/{id}")
    public Infopro findByid(@PathVariable Long id) {
        return infoproRepository.findById(id).orElse(null);
    }








    @PostMapping("/infopro/save/{id_user}")
    public Infopro save(  Infopro infopro, @PathVariable Long id_user) {

        User user = userRepository.findById(id_user).orElse(null);
        infopro.setUser(user);

        return infoproRepository.save(infopro);
    }



    @DeleteMapping("/infopro/{id}")
    public void delete(@PathVariable Long id) {
        infoproRepository.deleteById(id);
    }

    @PutMapping("/infopro/{id}")
    public Infopro update(@PathVariable Long id,  Infopro infopro) {
        Infopro oldInfopro = infoproRepository.findById(id).orElse(null);



        infopro.setUser(oldInfopro.getUser());


        infopro.setId(id);

        return infoproRepository.save(infopro);
    }

    @GetMapping("/infopros/{id_user}")
    public List<Infopro> infopro(@PathVariable Long id_user) {
        return infoproRepository.findinfoproBycan(id_user);
    }



    @GetMapping("/infopro/search")
    public List<Infopro> searchInfopro(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "secteur", required = false) String secteur,
            @RequestParam(value = "lieu", required = false) String lieu,
            @RequestParam(value = "experience", required = false) String experience,
            @RequestParam(value = "etude", required = false) String etude
    ) {
        return infoproRepository.searchInfopro(keyword, secteur, lieu, experience, etude);
    }


}


