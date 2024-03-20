package com.bna.ebanking.controller;

import com.bna.ebanking.entities.Role;
import com.bna.ebanking.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@CrossOrigin("*")
public class RoleController {
@Autowired
private RoleRepository roleRepository;


    @GetMapping("/role")
    public List<Role> findall() {
        return roleRepository.findAll();
    }


    @GetMapping("/role/{id}")
    public Role findByid(@PathVariable Long id) {
        return roleRepository.findById(id).orElse(null);
    }
}
