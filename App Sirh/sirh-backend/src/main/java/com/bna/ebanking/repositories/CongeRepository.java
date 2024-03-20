package com.bna.ebanking.repositories;

import com.bna.ebanking.entities.Candidat;
import com.bna.ebanking.entities.Conge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;


public interface CongeRepository extends JpaRepository<Conge, Long> {




    @Query("SELECT c FROM Conge c JOIN c.user u WHERE u.nom LIKE :keyword OR c.dateDebut = :dateDebut")
    List<Conge> searchCongesByUser(@Param("keyword") String keyword, @Param("dateDebut") LocalDate dateDebut);


    @Query("select c from Conge c left join c.user user where c.dateDebut like :kw or c.dateFin like :kw  or user.nom like :kw")
    List<Conge> searchCustomers(@Param("kw") String keyword );



}
