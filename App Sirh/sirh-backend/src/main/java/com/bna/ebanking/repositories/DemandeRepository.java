package com.bna.ebanking.repositories;

import com.bna.ebanking.entities.Customer;
import com.bna.ebanking.entities.Demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DemandeRepository extends JpaRepository<Demande,Long> {

    @Query("select d from Demande d left join d.user user where d.document like :kw or user.nom like :kw ")
    List<Demande> searchCustomers(@Param("kw") String keyword);
}
