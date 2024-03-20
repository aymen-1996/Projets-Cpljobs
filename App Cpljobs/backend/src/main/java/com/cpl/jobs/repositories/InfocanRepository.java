package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Infocan;
import com.cpl.jobs.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InfocanRepository extends JpaRepository<Infocan , Long> {

    @Query("SELECT c FROM Infocan c WHERE c.user.id = ?1")
    List<Infocan> findinfoBycan(Long user);
}
