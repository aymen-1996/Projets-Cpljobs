package com.bna.ebanking.repositories;

import com.bna.ebanking.entities.Candidat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {


    @Query("select c from Candidat c where c.email like :kw ")
    List<Candidat> searchCustomers(@Param("kw") String keyword);


}
