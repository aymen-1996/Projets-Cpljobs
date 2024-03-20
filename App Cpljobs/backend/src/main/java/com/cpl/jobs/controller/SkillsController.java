package com.cpl.jobs.controller;


import com.cpl.jobs.entities.Infopro;
import com.cpl.jobs.entities.Skills;
import com.cpl.jobs.entities.User;

import com.cpl.jobs.repositories.SkillsRepository;
import com.cpl.jobs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin("*")
public class SkillsController {
    @Autowired
    private SkillsRepository skillsRepository;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/skills")
    public List<Skills> findall() {
        return skillsRepository.findAll();
    }

    @GetMapping("/skills/{id}")
    public Skills findByid(@PathVariable Long id) {
        return skillsRepository.findById(id).orElse(null);
    }


    @PostMapping("/skills/save/{id_user}")
    public Skills save(  Skills skills, @PathVariable Long id_user) {

        User user = userRepository.findById(id_user).orElse(null);
        skills.setUser(user);

        return skillsRepository.save(skills);
    }



    @DeleteMapping("/skills/{id}")
    public void delete(@PathVariable Long id) {
        skillsRepository.deleteById(id);
    }

    @PutMapping("/skills/{id}")
    public Skills update(@PathVariable Long id,  Skills skills) {
        Skills oldSkills = skillsRepository.findById(id).orElse(null);



        skills.setUser(oldSkills.getUser());


        skills.setId(id);

        return skillsRepository.save(skills);
    }

    @GetMapping("/skill/{id_user}")
    public List<Skills> skills(@PathVariable Long id_user) {
        return skillsRepository.findinfoproByskills(id_user);
    }

}


