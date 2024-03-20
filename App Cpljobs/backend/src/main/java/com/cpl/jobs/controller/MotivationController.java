package com.cpl.jobs.controller;


import com.cpl.jobs.entities.Infocan;
import com.cpl.jobs.entities.Motivation;
import com.cpl.jobs.entities.User;
import com.cpl.jobs.repositories.InfocanRepository;
import com.cpl.jobs.repositories.MotivationRepository;
import com.cpl.jobs.repositories.UserRepository;
import com.cpl.jobs.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin("*")
public class MotivationController {
    @Autowired
    private MotivationRepository motivationRepository;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/motivation")
    public List<Motivation> findall() {
        return motivationRepository.findAll();
    }

    @GetMapping("/motivation/{id}")
    public Motivation findByid(@PathVariable Long id) {
        return motivationRepository.findById(id).orElse(null);
    }


    @PostMapping("/motivation/save/{id_user}")
    public Motivation save(Motivation motivation, @PathVariable Long id_user) {


        User user = userRepository.findById(id_user).orElse(null);
        motivation.setUser(user);

        return motivationRepository.save(motivation);
    }


    @DeleteMapping("/motivation/{id}")
    public void delete(@PathVariable Long id) {
        motivationRepository.deleteById(id);
    }

    @PutMapping("/motivation/{id}")
    public Motivation update(@PathVariable Long id, @RequestBody Motivation motivation) {
        Motivation oldMotivation = motivationRepository.findById(id).orElse(null);


        motivation.setUser(oldMotivation.getUser());


        motivation.setId(id);

        return motivationRepository.save(motivation);
    }

}



