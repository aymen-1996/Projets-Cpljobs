package com.cpl.jobs.controller;


import com.cpl.jobs.entities.Document;
import com.cpl.jobs.entities.Skills;
import com.cpl.jobs.entities.User;
import com.cpl.jobs.entities.pointfort;
import com.cpl.jobs.repositories.SkillsRepository;
import com.cpl.jobs.repositories.UserRepository;
import com.cpl.jobs.repositories.pointfortRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class pointfortController {

        @Autowired
        private pointfortRepository pointfortRepository;

        @Autowired
        private UserRepository userRepository;


        @GetMapping("/pointfort")
        public List<pointfort> findall() {
            return pointfortRepository.findAll();
        }

        @GetMapping("/pointfort/{id}")
        public pointfort findByid(@PathVariable Long id) {
            return pointfortRepository.findById(id).orElse(null);
        }


        @PostMapping("/pointfort/save/{id_user}")
        public pointfort save(  pointfort pointfort, @PathVariable Long id_user) {

            User user = userRepository.findById(id_user).orElse(null);
            pointfort.setUser(user);

            return pointfortRepository.save(pointfort);
        }



        @DeleteMapping("/pointfort/{id}")
        public void delete(@PathVariable Long id) {
            pointfortRepository.deleteById(id);
        }

        @PutMapping("/pointfort/{id}")
        public pointfort update(@PathVariable Long id,  pointfort pointfort) {
            pointfort oldpointfort= pointfortRepository.findById(id).orElse(null);



            pointfort.setUser(oldpointfort.getUser());


            pointfort.setId(id);

            return pointfortRepository.save(pointfort);
        }


    @GetMapping("/pointforts/{id_user}")
    public List<pointfort> ptfort(@PathVariable Long id_user) {
        return pointfortRepository.findptfort(id_user);
    }
    }




