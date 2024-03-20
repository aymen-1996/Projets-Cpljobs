package com.cpl.jobs.controller;

import com.cpl.jobs.entities.*;
import com.cpl.jobs.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
public class PostController {

    @Autowired
    private PostRepository postRepository ;


    @Autowired
    private AnnonceRepository annonceRepository ;


    @Autowired
    private InfocanRepository infocanRepository ;


    @Autowired
    private InfoproRepository infoproRepository ;

    @PostMapping("/post/{id_annonce}/{id_info}/{id_infopro}")
    public Post save(@RequestBody Post post, @PathVariable Long id_annonce, @PathVariable Long id_info , @PathVariable Long id_infopro ) {


        Infocan infocan = infocanRepository.findById(id_info).orElse(null);
        Infopro infopro = infoproRepository.findById(id_info).orElse(null);
        post.setInfocan(infocan );
        post.setDate(new Date());
        post.setInfopro(infopro);

        Annonce annonce = annonceRepository.findById(id_annonce).orElse(null);
        post.setAnnonce(annonce);
        return postRepository.save(post);
    }

    @GetMapping("/post/{id_annonce}")
    public List<Post> posts(@PathVariable Long id_annonce) {
        return postRepository.findpostByid_annonce(id_annonce);
    }
    @GetMapping("/posts/{id_annonce}")
    public Long post(@PathVariable Long id_annonce) {
        return postRepository.countPostsByAnnonceId(id_annonce);
    }
}
