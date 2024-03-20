package com.cpl.recrutement.repositories;


import com.cpl.recrutement.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository< Customer, Long> {
    @Query("SELECT c FROM Customer c WHERE (c.nom LIKE :kw OR c.email LIKE :kw OR " +
            "c.anneeExperience LIKE :kw OR c.etude LIKE :kw OR c.secteur LIKE :kw OR c.region LIKE :kw OR CAST(c.telephone AS string) LIKE :kw) " +
            "AND c.age BETWEEN :minAge AND :maxAge")
    List<Customer> searchCustomers(@Param("kw") String keyword, @Param("minAge") Long minAge, @Param("maxAge") Long maxAge);
    
    @Query("SELECT c FROM Customer c WHERE " +
            "((c.nom LIKE %:kw% OR c.email LIKE %:kw% OR c.anneeExperience LIKE %:kw% ) OR  :kw IS NULL) " +
            "AND ((:minAge IS NULL OR c.age >= :minAge) AND (:maxAge IS NULL OR c.age <= :maxAge))" + "And(c.secteur like %:sw% OR  :sw IS NULL)"+ "And(c.region like %:rw% OR  :rw IS NULL)")
    List<Customer> searchCustomers2(@Param("kw") String keyword, @Param("minAge") Long minAge, @Param("maxAge") Long maxAge ,@Param("sw") String secteur ,@Param("rw") String region);




}



