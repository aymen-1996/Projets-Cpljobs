package com.cpl.jobs.controller;


import com.cpl.jobs.entities.Experience;
import com.cpl.jobs.entities.Formation;
import com.cpl.jobs.entities.Infocan;
import com.cpl.jobs.entities.User;
import com.cpl.jobs.repositories.ExperienceRepository;
import com.cpl.jobs.repositories.FormationRepository;
import com.cpl.jobs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ExperienceController {


    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/experience")
    public List<Experience> findall() {
        return experienceRepository.findAll();
    }

    @GetMapping("/experience/{id}")
    public Experience findByid(@PathVariable Long id) {
        return experienceRepository.findById(id).orElse(null);
    }

    @PostMapping("/experience/save/{id_user}")
    public Experience save( @PathVariable Long id_user , Experience experience) {

        User user = userRepository.findById(id_user).orElse(null);
        experience.setUser(user);

        return experienceRepository.save(experience);
    }

    @DeleteMapping("/experience/{id}")
    public void delete(@PathVariable Long id) {
        experienceRepository.deleteById(id);
    }

    @PutMapping("/experience/{id}")
    public Experience update(@PathVariable Long id,  Experience experience) {
        Experience oldExperience = experienceRepository.findById(id).orElse(null);



        experience.setUser(oldExperience.getUser());


        experience.setId(id);

        return experienceRepository.save(experience);
    }
    @GetMapping("/experiences/{id_user}")
    public List<Experience> experience(@PathVariable Long id_user) {
        return experienceRepository.findexperience(id_user);
    }
}
