package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Experience;
import com.cpl.jobs.entities.Infocan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExperienceRepository  extends JpaRepository<Experience , Long> {
    @Query("SELECT e FROM Experience e WHERE e.user.id = ?1")
    List<Experience> findexperience(Long user);
}
