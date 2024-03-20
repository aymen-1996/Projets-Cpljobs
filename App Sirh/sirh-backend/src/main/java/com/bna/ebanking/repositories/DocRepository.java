package com.bna.ebanking.repositories;

import com.bna.ebanking.entities.Demande;
import com.bna.ebanking.entities.Doc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocRepository extends JpaRepository<Doc, Long> {

    @Query("select d from Doc d where d.mobilite like :kw  or d.type_contrat like :kw  ")
    List<Doc> searchCustomers(@Param("kw") String keyword);
}
