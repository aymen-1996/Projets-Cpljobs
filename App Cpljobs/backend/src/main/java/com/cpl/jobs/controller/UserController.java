package com.cpl.jobs.controller;



import com.cpl.jobs.Security.JwtResponse;
import com.cpl.jobs.Security.SignInRequest;
import com.cpl.jobs.entities.User;

import com.cpl.jobs.repositories.UserRepository;
import com.cpl.jobs.service.StorageService;
import com.cpl.jobs.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/user")

public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StorageService storage;
    @Autowired
    private UserServices userService;
    @Autowired
    private PasswordEncoder passwordEncoder;


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

    @PostMapping("/auth1")
    public User mailpass(@RequestBody User user) {
        return userRepository.findUserByMailAAndPassword(user.getEmail(), user.getPassword());
    }
    @PostMapping(value = {"/auth"})
    public JwtResponse signIn(@RequestBody SignInRequest signInRequest) {
        return userService.signIn(signInRequest);
    }
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping("/save1")
    public User save1( User user) {

        user.setPassword(userService.encodePassword(user.getPassword()));

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

        user.setPassword(user.getPassword() == null ? oldUser.getPassword() : user.getPassword());
        user.setEmail(user.getEmail() == null ? oldUser.getEmail() : user.getEmail());



        return userRepository.save(user);
    }

    @PostMapping("/save")
    public User save(
            User user

    ) {
        return userService.save(user);
    }
}

