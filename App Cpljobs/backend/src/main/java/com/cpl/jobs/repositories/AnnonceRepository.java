package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Annonce;
import com.cpl.jobs.entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface AnnonceRepository extends JpaRepository<Annonce , Long> {

    @Query("SELECT a FROM Annonce a WHERE " +
            "(a.titre LIKE %:kw%  OR  :kw IS NULL) " +  " AND (a.secteur LIKE %:sw%  OR  :sw IS NULL) " + " AND (a.region LIKE %:rw%  OR  :rw IS NULL) " )

    List<Annonce> searchAnnonce(@Param("kw") String keyword,@Param("sw") String secteur,@Param("rw") String region);


    @Query("SELECT a FROM Annonce a WHERE " +
            "(a.titre LIKE %:kw%  OR  :kw IS NULL) " +   " AND (a.region LIKE %:rw%  OR  :rw IS NULL) " )

    List<Annonce> searchAnnonce1(@Param("kw") String keyword,@Param("rw") String region);



    @Query("SELECT a FROM Annonce a WHERE a.user.id = ?1")
    List<Annonce> findann(Long user);



    @Query("SELECT COUNT(a) FROM Annonce a WHERE a.user.id = :userId AND DATE(a.date) = :date")
    long countAnnoncesCreatedOnDateByUser(@Param("date") Date date, @Param("userId") Long userId);




    @Query("SELECT COUNT(a) FROM Annonce a WHERE a.user.id = :userId AND DATE(a.date) BETWEEN :startDate AND :endDate")
    long countAnnoncesCreatedBetweenDatesByUser(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("userId") Long userId);


}
