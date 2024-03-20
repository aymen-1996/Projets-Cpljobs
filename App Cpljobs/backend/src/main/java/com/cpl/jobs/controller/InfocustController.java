package com.cpl.jobs.controller;


import com.cpl.jobs.entities.Infocan;
import com.cpl.jobs.entities.Infocust;
import com.cpl.jobs.entities.User;
import com.cpl.jobs.repositories.*;
import com.cpl.jobs.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController

@CrossOrigin("*")

public class InfocustController {
    @Autowired
    private InfocustRepository infocustRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageService storage;

    @GetMapping("/infocust")
    public List<Infocust> findall() {
        return infocustRepository.findAll();
    }

    @GetMapping("/infocust/{id}")
    public Infocust findByid(@PathVariable Long id) {
        return infocustRepository.findById(id).orElse(null);
    }


    @PostMapping("/infocust/{id_user}")
    public Infocust save( @RequestParam("file") MultipartFile logo,Infocust infocust, @PathVariable Long id_user) {

        String cvFilename = storage.CreateNameCv(logo);
        storage.store(logo, cvFilename);


        infocust.setLogo(cvFilename);
        User user = userRepository.findById(id_user).orElse(null);
        infocust.setUser(user);




        return infocustRepository.save(infocust);

    }


    @DeleteMapping("/infocust/{id}")
    public void delete(@PathVariable Long id) {
        infocustRepository.deleteById(id);
    }


    @PutMapping("/infocust/{id}")
    public Infocust update( Infocust infocust  ,@PathVariable Long id) {
        infocust.setId(id);
        Infocust oldUser = infocustRepository.findById(id).orElse(null);
        infocust.setUser(oldUser.getUser());
        infocust.setLogo(oldUser.getLogo());
        return infocustRepository.save(infocust);
    }

    @GetMapping("/infocusts/{id_user}")
    public List<Infocust> infocust(@PathVariable Long id_user) {
        return infocustRepository.findinfocustBycan(id_user);
    }
}



