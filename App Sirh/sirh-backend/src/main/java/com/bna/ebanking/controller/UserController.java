package com.bna.ebanking.controller;


import com.bna.ebanking.entities.Role;
import com.bna.ebanking.entities.User;
import com.bna.ebanking.enums.UserRole;
import com.bna.ebanking.repositories.RoleRepository;
import com.bna.ebanking.repositories.UserRepository;
import com.bna.ebanking.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")

public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StorageService storage;
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("")
    public List<User> findall() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User findByid(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @GetMapping("/u/{mail}")
    public User mail(@PathVariable String mail) {
        return userRepository.findUserByMail(mail);
    }

    @PostMapping("/auth")
    public User mailpass(@RequestBody User user) {
        return userRepository.findUserByMailAAndPassword(user.getEmail(), user.getPassword());
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping("/img")
    public User save(@RequestParam("file") MultipartFile file, User user) {
        String filename = storage.CreateNameCv(file);
        storage.store(file, filename);
        user.setImage(filename);
        return userRepository.save(user);
    }

    @PostMapping("/save/{id_role}")
    public User save(@RequestParam("file") MultipartFile file, User user, @PathVariable Long id_role) {
        String filename = storage.CreateNameCv(file);
        storage.store(file, filename);
        user.setImage(filename);

        Role role = roleRepository.findById(id_role).orElse(null);
        user.setRole(role);


        return userRepository.save(user);

    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        User oldUser = userRepository.findById(id).orElse(null);
        user.setNom(user.getNom() == null ? oldUser.getNom() : user.getNom());
        user.setPrenom(user.getPrenom() == null ? oldUser.getPrenom() : user.getPrenom());
        user.setPassword(user.getPassword() == null ? oldUser.getPassword() : user.getPassword());
        user.setEmail(user.getEmail() == null ? oldUser.getEmail() : user.getEmail());
        user.setNumtel(user.getNumtel() == null ? oldUser.getNumtel() : user.getNumtel());
        user.setCreated(user.getCreated() == null ? oldUser.getCreated() : user.getCreated());
        user.setImage(oldUser.getImage());
        return userRepository.save(user);
    }


}

