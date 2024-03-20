package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Infopro;
import com.cpl.jobs.entities.Langue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LangueRepository extends JpaRepository<Langue,Long> {
    @Query("SELECT l FROM Langue l WHERE l.user.id = ?1")
    List<Langue> findinfoproBylangue(Long user);
}
