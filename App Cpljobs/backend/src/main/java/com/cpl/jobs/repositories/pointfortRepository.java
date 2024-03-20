package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Skills;
import com.cpl.jobs.entities.pointfort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface pointfortRepository extends JpaRepository<pointfort,Long> {
    @Query("SELECT p FROM pointfort p WHERE p.user.id = ?1")
    List<pointfort> findptfort(Long user);
}
