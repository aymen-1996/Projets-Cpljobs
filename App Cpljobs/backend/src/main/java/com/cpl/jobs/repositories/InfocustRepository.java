package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Infocust;
import com.cpl.jobs.entities.Infopro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InfocustRepository extends JpaRepository<Infocust , Long> {
    @Query("SELECT c FROM Infocust c WHERE c.user.id = ?1")
    List<Infocust> findinfocustBycan(Long user);




}
