package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Motivation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotivationRepository extends JpaRepository<Motivation , Long> {
}
