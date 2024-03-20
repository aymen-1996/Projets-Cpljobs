package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.Annonce;
import com.cpl.jobs.entities.Infocan;
import com.cpl.jobs.entities.Infopro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InfoproRepository extends JpaRepository<Infopro , Long> {
    @Query("SELECT c FROM Infopro c WHERE c.user.id = ?1")
    List<Infopro> findinfoproBycan(Long user);



    @Query("SELECT i FROM Infopro i WHERE " +
            "(:kw IS NULL OR i.titre LIKE %:kw%) " +
            "AND (:sw IS NULL OR i.secteur LIKE %:sw%) " +
            "AND (:lw IS NULL OR i.lieu LIKE %:lw%) " +
            "AND (:ew IS NULL OR i.experience LIKE %:ew%) " +
            "AND (:tw IS NULL OR i.etude LIKE %:tw%)")
    List<Infopro> searchInfopro(@Param("kw") String keyword,
                                @Param("sw") String secteur,
                                @Param("lw") String lieu,
                                @Param("ew") String experience,
                                @Param("tw") String etude);


}

