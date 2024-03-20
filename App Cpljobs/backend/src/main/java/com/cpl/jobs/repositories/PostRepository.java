package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post , Long> {
    @Query("SELECT a FROM Post a WHERE a.annonce.id = ?1")
    List<Post> findpostByid_annonce(Long annonce);

    @Query("SELECT COUNT(p) FROM Post p WHERE p.annonce.id = :annonceId")
    Long countPostsByAnnonceId(@Param("annonceId") Long annonceId);
}
