package com.bna.ebanking.repositories;

import com.bna.ebanking.entities.Candidat;
import com.bna.ebanking.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer , Long> {

    @Query("select c from Customer c where c.nom like :kw or c.prenom like :kw or c.secteur like :kw ")
    List<Customer> searchCustomers(@Param("kw") String keyword);

}
