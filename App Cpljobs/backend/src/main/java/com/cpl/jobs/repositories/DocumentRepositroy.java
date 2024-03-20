package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Document;
import com.cpl.jobs.entities.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DocumentRepositroy extends JpaRepository<Document , Long> {
    @Query("SELECT d FROM Document d WHERE d.user.id = ?1")
    List<Document> finddoc(Long user);
}
