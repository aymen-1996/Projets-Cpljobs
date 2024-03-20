package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Formation;
import com.cpl.jobs.entities.Infopro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FormationRepository extends JpaRepository<Formation ,Long> {
    @Query("SELECT f FROM Formation f WHERE f.user.id = ?1")
    List<Formation> findinfoproByformation(Long user);
}
