package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Infopro;
import com.cpl.jobs.entities.Skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SkillsRepository extends JpaRepository<Skills , Long> {
    @Query("SELECT s FROM Skills s WHERE s.user.id = ?1")
    List<Skills> findinfoproByskills(Long user);
}
