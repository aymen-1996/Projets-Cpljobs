package com.bna.ebanking.repositories;

import com.bna.ebanking.entities.Candidat;
import com.bna.ebanking.entities.Sub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubRepository extends JpaRepository<Sub,Long> {
    @Query("select s from Sub s where s.nom like :kw  or s.poste like :kw")
    List<Sub> searchCustomers(@Param("kw") String keyword);

}
