
package com.cpl.jobs.service;


import com.cpl.jobs.Security.JwtResponse;
import com.cpl.jobs.Security.SignInRequest;
import com.cpl.jobs.Security.TokenUtil;
import com.cpl.jobs.entities.User;
import com.cpl.jobs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServices implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Autowired
     StorageService storage;

    @Autowired
    UserServices userServicesimp;
    @Autowired
    TokenUtil tokenUtil;
    @Autowired
    AuthenticationManager authenticationManager;



    public List<User> findAll() {
        return userRepository.findAll();
    }


    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }


    public JwtResponse signIn(SignInRequest signInRequest) {
        UserDetails userDetails = loadUserByUsername(signInRequest.getUsername());
        JwtResponse response = new JwtResponse(null, null, null, null, null);

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenUtil.generateToken(userDetails);
        String refreshToken = tokenUtil.generateRefreshToken(userDetails);
        String authExpiration = tokenUtil.getTokenValidity().toString();
        String refreshExpiration = tokenUtil.getrefreshTokenValidity().toString();
        User user = userRepository.findUserByMail(signInRequest.getUsername());
        response = new JwtResponse(token, refreshToken, user, authExpiration, refreshExpiration);

        return response;
    }



    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("mail is : " + username);
        User loclaUser=userRepository.findUserByMail(username);
        if(loclaUser!=null){
            org.springframework.security.core.userdetails.User springUser=new org.springframework.security.core.userdetails.User(loclaUser.getEmail(),loclaUser.getPassword(),new ArrayList<>());
            return springUser;
        }
        return null;
    }

    public String encodePassword(String password) {
        return passwordEncoder().encode(password);

    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    private boolean encoderMatches(String rawPassword, String encodedPassword) {
        return passwordEncoder().matches(rawPassword, encodedPassword);
    }

    public List<User> findall() {
        return userRepository.findAll();
    }

    public User changerMotDePasse(Long userId, String ancienMotDePasse, String nouveauMotDePasse) {
        Optional<User> utilisateurOptional = userRepository.findById(userId);

        if (utilisateurOptional.isPresent()) {
            User utilisateur = utilisateurOptional.get();

            if (encoderMatches(ancienMotDePasse, utilisateur.getPassword())) {
                String encodedNewPassword = encodePassword(nouveauMotDePasse);
                utilisateur.setPassword(encodedNewPassword);
                return userRepository.save(utilisateur);
            } else {
                throw new RuntimeException("Mot de passe actuel incorrect");
            }
        } else {
            throw new RuntimeException("Utilisateur non trouvé");
        }
    }


    public User save(User user) {
        user.setPassword(encodePassword(user.getPassword()));
        return userRepository.save(user);
    }

}

